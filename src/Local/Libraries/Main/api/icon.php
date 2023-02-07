<?php

if (!function_exists('get_error')) {
    echo 'La fonction "get_error" n\'a pas été trouvé';
    exit();
}
if (!function_exists('Connect')) {
    echo get_error('mysql-not-found');
    exit();
}

$Id = isset($_GET['id']) ? AntiSql($_GET['id']) : null;

if ($Id == null) {
    exit();
}

$mysql = Connect('default', 'rpa-bot\'s');

if (!Table_Exists($mysql, 'info')) {
    exit();
}

$icon = $mysql -> query("SELECT `Icon` FROM `info` WHERE `Id`='$Id'") -> fetch_all(MYSQLI_ASSOC);

if (!empty($icon)) {
    content_type('png');
    echo $icon[0]['Icon'];
}