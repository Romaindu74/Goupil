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

if (
    file_exists(ROOT_PATH . 'Libraries/common.php')
) {
    require_once ROOT_PATH . 'Libraries/common.php';
}?>