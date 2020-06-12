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

class ViewHelper
{
    static private $rootDir = __DIR__;

    static private function runContent($filePath,$viewModel){

        $functionString = 'return function($model){
                ob_start();
                include ( "' . $filePath . '" );
                return ob_get_clean();
            };';

        $ff = eval($functionString);

        return $ff($viewModel);
    }

    static public function setRootDir($dir){
        self::$rootDir = $dir;
    }

    static public function getPartialContent($partialName, $viewModel=null){
        $path = rtrim(self::$rootDir,"/") . "/view_partials/$partialName.php";
        return self::runContent($path,$viewModel);
    }

    static public function getViewContent($viewName, $viewModel=null){
        $path = rtrim(self::$rootDir,"/") . "/views/$viewName.php";
        return self::runContent($path,$viewModel);
    }

    static public function renderPartial($partialName, $viewModel=null){
        echo self::getPartialContent($partialName,$viewModel);
        return null;
    }

    static public function renderView($viewName, $viewModel=null){
        echo self::getViewContent($viewName,$viewModel);
        return null;
    }
}