<?php
if (!isset($_GET['p'])) {
    return;
}

$files = array(
    '/' => array(),
    '/message/' => array(
        array(
            'p' => 'Libraries/gateway/Js',
            'n' => 'gateway.min.js',
            'c' => 'text/javascript',
            't' => 'script'
        ),
        array(
            'p' => 'Libraries/gateway/Js',
            'n' => 'z.min.js',
            'c' => 'text/javascript',
            't' => 'script'
        ),
        array(
            'p' => 'Libraries/message/Js',
            'n' => 'core.js',
            'c' => 'text/javascript',
            't' => 'script'
        ),
        array(
            'p' => 'Libraries/message/Scss',
            'n' => 'core.scss',
            'c' => 'stylesheet',
            't' => 'style'
        )
    )
);

content_type('json');

$result = array();

$result[] =  array(
    'p' => 'Libraries/Main/Js',
    'n' => 'User.js',
    'c' => 'text/javascript',
    't' => 'script'
);

$result[] =  array(
    'p' => 'Libraries/Main/Scss',
    'n' => 'index.scss',
    'c' => 'stylesheet',
    't' => 'style'
);

if (array_key_exists($_GET['p'], $files)) {
    for ($i = 0; $i < count($files[$_GET['p']]); $i++){
        $result[] = $files[$_GET['p']][$i];
    }
}

send_json($result);