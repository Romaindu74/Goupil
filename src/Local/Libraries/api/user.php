<?php

if (!function_exists('get_error')) {
    echo 'La fonction "get_error" n\'a pas été trouvé';
    exit();
}
if (!function_exists('Connect')) {
    echo get_error('mysql-not-found');
    exit();
}

if ($Token == null) {
    exit();
}

$mysql = Connect('default', 'rpa-bot\'s');

if (!Table_Exists($mysql, 'info')) {
    exit();
}

$response = $mysql -> query("SELECT `Name`, `Id` FROM `info` WHERE `Token`='$Token'") -> fetch_all(MYSQLI_ASSOC);

content_type('json');
if (!empty($response)) {
    send_json($response[0]);
}