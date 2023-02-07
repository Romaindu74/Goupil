<?php
$files = array(
    '/' => array(
        array(
            'path' => 'Libraries/Actu/Js',
            'name' => 'Actu-Import.js',
            'type' => 'script',
        )
    ),
    '/actu/index' => array(
        array(
            'path' => 'Libraries/Actu/Js',
            'name' => 'Actu-Is.js',
            'type' => 'script',
        )
    ),
    '/User/config' => array(
        array(
            'path' => 'Libraries/User/config',
            'name' => 'core.js',
            'type' => 'script',
        ),
        array(
            'path' => 'Libraries/User/config',
            'name' => 'edit.js',
            'type' => 'script',
        ),
        array(
            'path' => 'Libraries/User/config',
            'name' => 'core.scss',
            'type' => 'style',
        ),
    ),
    '/User/index' => array(
        array(
            'path' => 'Libraries/User/index/Js',
            'name' => 'Core.js',
            'type' => 'script',
        ),
        array(
            'path' => 'Libraries/User/index/Scss',
            'name' => 'core.scss',
            'type' => 'style',
        ),
    ),
    "/Connexion" => array(
        array(
            'path' => 'Libraries/Connexion/Scss',
            'name' => 'core.scss',
            'type' => 'style',
        ),
        array(
            'path' => 'Libraries/Connexion/Js',
            'name' => 'core.js',
            'type' => 'script',
        ),
    ),
    "/Message/" => array(
        array(
            'path' => 'Libraries/Message/Js',
            'name' => 'core.js',
            'type' => 'script',
        ),
        array(
            'path' => 'Libraries/Message/Scss',
            'name' => 'core.scss',
            'type' => 'style',
        ),
    ),
);

if (!isset($_GET['path'])) {
    return;
}

header('Content-Type: application/json');

$result = array();

$result[] =  array(
    'path' => 'Libraries/Main/Js',
    'name' => 'User.js',
    'type' => 'script'
);

$result[] =  array(
    'path' => 'Libraries/Main/Scss',
    'name' => 'index.scss',
    'type' => 'style',
);

if (array_key_exists($_GET['path'], $files)) {
    for ($i = 0; $i < count($files[$_GET['path']]); $i++){
        $result[] = $files[$_GET['path']][$i];
    }
}

echo json_encode($result);