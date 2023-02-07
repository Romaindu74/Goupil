<?php

if (!function_exists('get_error')) {
    echo 'La fonction "get_error" n\'a pas été trouvé';
    exit();
}

$servers = array();

if (!function_exists('Connect')) {
    function Connect($server = 'default', $dbname = 'rpa-bot\'s'){
        global $servers;
        if (!array_key_exists($server, $servers)) {
            echo get_error('server-not-found');
            exit();
        }

        $_ = $servers[$server];

        if (!in_array($dbname, $_['db'])) {
            echo get_error('db-not-found');
            exit();
        }

        try {
            $MySqli = new mysqli($_['host'] . ':' . $_['port'], $_['user'], $_['password'], $dbname);
        } catch (mysqli_sql_exception $e) {
            echo get_error('mysql-error-connecting');
            exit();
        }

        return $MySqli;
    }
}

if (!function_exists('Table_Exists')) {
    function Table_Exists(mixed $MySql, string $Name) {
        $table_exist = $MySql -> query("SELECT EXISTS ( SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = '$Name');") -> fetch_all();
        return ($table_exist[0][0] == 0) ? false : true;
    }
}