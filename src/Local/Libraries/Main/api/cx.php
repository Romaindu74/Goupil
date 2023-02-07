<?php

if (!function_exists('get_error')) {
    echo 'La fonction "get_error" n\'a pas été trouvé';
    exit();
}
if (!function_exists('Connect')) {
    echo get_error('mysql-not-found');
    exit();
}

$mysql = Connect('default', 'rpa-bot\'s');

if (!Table_Exists($mysql, 'connexion')) {
    exit();
}

$e = isset($_GET['e']) ? AntiSql($_GET['e']) : null;
$p = isset($_GET['p']) ? AntiSql($_GET['p']) : null;

if (!$e || !$p) {
	exit();
}

$rep = $mysql -> query("SELECT `token` FROM `connexion` WHERE `email`='$e' AND `password`='$p'") -> fetch_all(MYSQLI_ASSOC);

if (empty($rep)) {
    send_json(array('data' => array('message' => 'Email or Password is incorect'), 'event' => 'error'));
} else {
    echo json_encode(array('data' => array('token' => $rep[0]['token']), 'event' => 'success'));
}