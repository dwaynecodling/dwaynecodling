<?php

include_once "Router.php";
include_once "ViewHelper.php";

use Nano\ViewHelper;
use Nano\Router;

ViewHelper::setRootDir(__DIR__); // sets the absolute root directory

$router = Router::init();

// make assets folder public
$router->onGET("/assets/{path}", function($req, $res, $next){
    $filePath = __DIR__ . "/" . $req['params']['path'];
    if (!file_exists($filePath)) return $next();
    readfile($filePath);
    return null;
});



// handle not found
$router->on404(function($req, $res){
    echo "NOT FOUND";
});


// pages
$router->onGET("/", function($req, $res, $next){
    ViewHelper::renderView("homepage");
});

$router->onGET("/contact-me", function($req, $res, $next){
    ViewHelper::renderView("contact_me");
});

$router->onGET("/about-me", function($req, $res, $next){
    ViewHelper::renderView("about_me");
});

$router->onGET("/posts", function($req, $res, $next){
    ViewHelper::renderView("all_posts");
});

$router->onGET("/post/{identifier}", function($req, $res, $next){

    // get the identifier/slug
    $identifier = $req['params']['identifier'];

    ViewHelper::renderView("single_post", [
        "identifier" => $identifier
    ]);
});



// endpoint
$router->onPOST("/form/contact", function($req, $res, $next){
    // run the php script to handle incoming contact form
    require "./php_scripts/contact.php";
});


// start listening to request
$router->listen();
