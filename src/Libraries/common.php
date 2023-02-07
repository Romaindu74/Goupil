<?php

if (
    !defined('ROOT_PATH')
) {
    $result = '';
    $_ = preg_split('/[\\\]/', __DIR__ . DIRECTORY_SEPARATOR);

    for ($i = 0; $i < count($_); $i++)
    {
        if (
            $_[$i] != ''
        ) {
            $result .= $_[$i] . '/';
        }
    }

    define('ROOT_PATH', $result);
}

require_once ROOT_PATH . 'Libraries/Modules/Errors.php';
require_once ROOT_PATH . 'Libraries/Modules/Content-Type.php';
require_once ROOT_PATH . 'Libraries/MySql.php';
require_once ROOT_PATH . 'Libraries/Modules/send.php';

$origin = $_SERVER['HTTP_HOST'];

if (
    !defined('GET')
) {
    if (
        isset($_GET['request'])
    ) {
        $result = '';
        $_ = preg_split('/[\/]/', $_GET['request']);

        for ($i = 0; $i < count($_); $i++)
        {
            if (
                $_[$i] != ''
            ) {
                $result .= $_[$i] . ((count($_) - 1 != $i) ? '/' : '');
            }
        }

        define('GET', $result);
    } else {
        define('GET', '');
    }
}

function AntiSql($str) {
    $ch0 = array("'"=>"\\'",'"'=>'\\"');
    $str = strtr($str,$ch0);
    return $str;
}

function Cache_Control($value) {
    header("Cache-Control: ".$value);
}

$Token = isset($_SERVER['HTTP_T']) ? AntiSql($_SERVER['HTTP_T']) : null;
$path = ROOT_PATH . 'Local/';

if (GET == '') {
    $path .= 'index.html';
} else {
    $path .= GET;
}

$ext = pathinfo($path, PATHINFO_EXTENSION);

if ($ext == '' && file_exists($path . '.html')) {
    $path .= '.html';
}

if (is_dir($path)) {
    if (file_exists($path . 'index.html')) {
        $path .= 'index.html';
    } else {
        require_once ROOT_PATH . 'Libraries/Modules/Folders.php';
        return;
    }
}

if ($ext != 'php') {
    Cache_Control("public, max-age=604800, immutable");
}

$ext = pathinfo($path, PATHINFO_EXTENSION);

header('Content-Type: ' . get_content_type($ext));

if (file_exists($path)) {
    if ($ext == 'php') {
        require_once $path;
    } else {
        echo file_get_contents($path);
    }
} else {
    http_response_code(404);
    require_once ROOT_PATH . 'Libraries/Modules/404.php';
}
