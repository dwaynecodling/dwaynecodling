<?php
/**
 * @author      Daryl Cecile <darylcecile@gmail.com>
 * @copyright   (c) 2020 Daryl Cecile
 * @license     MIT public license
 *
 * Date Created: 06/06/2020
 * Repo: https://github.com/daryl-cecile/Nano
 */
namespace Nano;

class Router{

    private $baseRoute = ""; // base route
    private $serverBasePath = "";
    private $reqMethod = ""; // method of request e.g. POST, GET, etc..
    private $middlewareCount = 0;

    private $routes = [
        "GET" => [],
        "POST" => [],
        "PUT" => [],
        "DELETE" => [],
        "OPTIONS" => [],
        "PATCH" => [],
        "HEAD" => []
    ];
    private $callbacks = [
        "notFound" => []
    ];

    function __construct($basePath=""){
        $this->serverBasePath = $basePath;

        $this->middleware(function($req, $res, $next){
            header("X-Powered-By: NanoRouter");
            $next();
        });
    }

    public static function init($basePath=""){
        return new self($basePath);
    }

    private function patternToRegExp($pattern){
        $pattern = preg_replace('/([()<>$.+]|\[|\]|\^)/m', "\\\\$1", $pattern);
        $pattern = preg_replace('/(\/)/m', '\\/', $pattern);
        $pattern = preg_replace('/([ ])/m', '[ ]', $pattern);

        $re = '/:(?<ctag>[a-zA-Z_]+)|{(?<btag>[a-zA-Z0-9 _-]+)}/m';
        $subst = '(?<$1$2>.+)';

        $result = preg_replace($re, $subst, $pattern);

        $re = '/(\*)/m';
        $result = preg_replace($re, '(.+)', $result);

        $result = "^" . preg_replace('/([{}])/m', "\\\\$1", $result) . "$";

        return $result;
    }

    private function generateRegExpString($pattern){
        return "/" . $this->patternToRegExp($pattern) . "/m";
    }

    private function parsePattern($pattern, $str){
        $re = $this->generateRegExpString($pattern);
        preg_match_all($re, $str, $matches, PREG_SET_ORDER, 0);
        return count($matches) > 0 ? $matches[0] : null;
    }

    private function setStub(array $methods, String $pattern, callable $handler){
        $pattern = $this->baseRoute ? rtrim($this->baseRoute . "/" . trim($pattern, "/"), "/") : $pattern;

        foreach ($methods as $method) {
            $this->routes[$method][] = [
                'pattern' => $pattern,
                'handler' => $handler,
                'isMiddleware' => false
            ];
        }
    }

    private function all(String $pattern, callable $handler){
        $this->setStub(["GET","POST","PUT","DELETE","OPTIONS","PATCH","HEAD"], $pattern, $handler);
    }

    public function middleware(callable $handler){
        $pattern = $this->baseRoute ? rtrim($this->baseRoute . "/" . trim("/*", "/"), "/") : "/*";

        foreach (["GET","POST","PUT","DELETE","OPTIONS","PATCH","HEAD"] as $method){
            // make sure the middleware is inserted before routes
            $this->routes[$method] = array_merge(
                array_splice($this->routes[$method], 0, $this->middlewareCount),
                [
                    [
                        'pattern' => $pattern,
                        'handler' => $handler,
                        'isMiddleware' => true
                    ]
                ]
                ,
                array_splice($this->routes[$method], $this->middlewareCount)
            );
        }
        $this->middlewareCount++;
        return $this;
    }

    public function setBaseRoute(string $path){
        $this->baseRoute = $path;
        return $this;
    }

    public function mount(string $path, callable $handler){
        $oldBaseRoute = $this->baseRoute;
        $newBaseRoute = $this->baseRoute . "/" . ltrim($path, "/");
        $this->setBaseRoute($newBaseRoute);
        $handler($this);
        $this->setBaseRoute($oldBaseRoute);
        return $this;
    }

    // METHOD HANDLERS
    public function onGET(String $pattern, callable $handler){
        $this->setStub(["GET"], $pattern, $handler);
    }

    public function onPOST(String $pattern, callable $handler){
        $this->setStub(["POST"], $pattern, $handler);
    }

    public function onPATCH(String $pattern, callable $handler){
        $this->setStub(["PATCH"], $pattern, $handler);
    }

    public function onOPTIONS(String $pattern, callable $handler){
        $this->setStub(["OPTIONS"], $pattern, $handler);
    }

    public function onDELETE(String $pattern, callable $handler){
        $this->setStub(["DELETE"], $pattern, $handler);
    }

    public function onPUT(String $pattern, callable $handler){
        $this->setStub(["PUT"], $pattern, $handler);
    }
    // END OF METHODS HANDLERS

    public function on404($handler){
        $this->callbacks["notFound"][] = $handler;
        return $this;
    }

    private function getAllHeaders(){
        // When using FastCGI, Nginx, or PHP-FPM, getallheaders doesn't exist so imitag
        if (!function_exists('getallheaders')) {
            $headers = [];
            foreach ($_SERVER as $name => $value) {
                if (substr($name, 0, 5) == 'HTTP_') {
                    $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                }
            }
            return $headers;
        }
        else{
            return getallheaders();
        }
    }

    public function getRelativeURL(){
        $relativeURI = substr(rawurldecode($_SERVER["REQUEST_URI"]), strlen($this->getServerBasePath()));

        if (strstr($relativeURI, '?')) {
            // remove query
            $relativeURI = explode('?', $relativeURI)[0];
        }

        return '/' . trim($relativeURI, '/');
    }

    public function getRequestInfo(){
        $headers = $this->getAllHeaders();
        $method = $_SERVER["REQUEST_METHOD"];

        if ($_SERVER['REQUEST_METHOD'] == 'HEAD') {
            // as per HTTP spec, don't output body but handle as GET
            $method = 'GET';
            ob_start();
        }
        elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (isset($headers['X-HTTP-Method-Override']) && in_array($headers['X-HTTP-Method-Override'], ['PUT', 'DELETE', 'PATCH'])) {
                $method = $headers['X-HTTP-Method-Override'];
            }
        }

        return [
            "method" => $method,
            "headers" => $headers
        ];
    }

    public function getServerBasePath()
    {
        if ($this->serverBasePath == null) {
            $this->serverBasePath = implode('/', array_slice(explode('/', $_SERVER['SCRIPT_NAME']), 0, -1)) . '/';
        }

        return $this->serverBasePath;
    }

    private function handleRoutes($routes, $reqInfo){
        $count = 0;

        $uri = $this->getRelativeURL();

        foreach($routes as $route){
            $continueNextHandler = false;
            $matches = $this->parsePattern($route["pattern"], $uri);

            if ($matches){

                $request = $reqInfo; // copy by value
                $request['params'] = $matches;
                $request['uri'] = $_SERVER["REQUEST_URI"];
                $request['query'] = $_GET;
                $request['body'] = $_POST;
                $request['method'] = $_SERVER['REQUEST_METHOD'];
                $request['pattern'] = $this->generateRegExpString($route["pattern"]);
                $request['var'] = [
                    "POST" => function($key, $fallback=null){
                        return isset($_POST[$key]) ? $_POST[$key] : $fallback;
                    },
                    "GET" => function($key, $fallback=null){
                        return isset($_GET[$key]) ? $_GET[$key] : $fallback;
                    }
                ];

                $response = [
                    "redirect" => function($url, bool $isPermanent=false){
                        if (headers_sent() === false)
                        {
                            header('Location: ' . $url, true, ($isPermanent === true) ? 301 : 302);
                        }
                        else{
                            echo "<meta http-equiv=\"refresh\" content=\"0;url=$url\">";
                        }

                        exit();
                    },
                    "end" => function() use(&$continueNextHandler){
                        $continueNextHandler = false;
                        exit();
                    },
                    "json" => function($object){
                        if (headers_sent() === false) header("Content-Type: application/json");
                        echo json_encode($object, JSON_PRETTY_PRINT);
                    }
                ];

                $route["handler"]($request, $response, function() use (&$continueNextHandler){
                    $continueNextHandler = true;
                });

                if ($route['isMiddleware'] === false) $count++;

                if ($continueNextHandler === false) break;
            }
        }

        return $count;
    }

    public function listen()
    {
        $requestInfo = $this->getRequestInfo();
        $this->reqMethod = $requestInfo["method"];


        $numHandled = 0;
        if (isset($this->routes[$this->reqMethod])) {
            $numHandled = $this->handleRoutes($this->routes[$this->reqMethod], $requestInfo);
        }

        if ($numHandled === 0) {
            if ($this->callbacks["notFound"]) {
                $request = [];
                $request['method'] = $this->reqMethod; // copy by value
                $request['uri'] = $this->getRelativeURL();

                $response = [
                    "redirect" => function($url, bool $isPermanent=false){
                        if (headers_sent() === false)
                        {
                            header('Location: ' . $url, true, ($isPermanent === true) ? 301 : 302);
                        }
                        else{
                            echo "<meta http-equiv=\"refresh\" content=\"0;url=$url\">";
                        }

                        exit();
                    },
                    "json" => function($object){
                        if (headers_sent() === false) header("Content-Type: application/json");
                        echo json_encode($object, JSON_PRETTY_PRINT);
                    }
                ];

                foreach($this->callbacks["notFound"] as $callbackHandler){
                    if (is_callable($callbackHandler)){
                        $callbackHandler($request, $response);
                    }
                }
            } else {
                header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found');
            }
        }

        if ($_SERVER['REQUEST_METHOD'] == 'HEAD') {
            // empty buffers so no outputs are sent
            ob_end_clean();
        }

        return $numHandled !== 0;
    }
}