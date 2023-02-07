<?php

function utf8_string_array_encode(&$array){
    $func = function(&$value){
        if(is_string($value)){
            $value = utf8_encode($value);
        }
        if(is_array($value)){
            utf8_string_array_encode($value);
        }
    };
    array_walk($array,$func);
    return $array;
}
$mysql = Connect();
$result = array();

if (!isset($_GET['a'])) {
    if(isset($_GET['l'])){
        $l = $_GET['l'];
    } else {
        $l = 5;
    }
    if(isset($_GET['p'])){
        $offset = $_GET['p'] * $l;
    } else {
        $offset = 0;
    }
    
    $rep = $mysql->query("SELECT `id`, `title`, `desc`, `author`, `date`, `time`, `image`, `url` FROM `actu` ORDER BY `id` DESC LIMIT $l OFFSET $offset")->fetch_all();
    for ($i=0;$i<count($rep);$i++){
        $result[] = array(
            "author" => $rep[$i][3],
            "image" => $rep[$i][6],
            "title" => $rep[$i][1],
            "time" => $rep[$i][5],
            "date" => $rep[$i][4],
            "desc" => $rep[$i][2],
            "url" => $rep[$i][7],
            "id" => $rep[$i][0],
        );
    }
} else {
    $a = AntiSql($_GET['a']);
    $rep = $mysql->query("SELECT `id`, `title`, `long-desc`, `author`, `date`, `time`, `image`, `url` FROM `actu` WHERE `id` = $a")->fetch_all();
    if (count($rep) >= 1) {
        $result[] = array(
            "author" => $rep[0][3],
            "image" => $rep[0][6],
            "title" => $rep[0][1],
            "time" => $rep[0][5],
            "date" => $rep[0][4],
            "desc" => $rep[0][2],
            "url" => $rep[0][7],
            "id" => $rep[0][0],
        );
    }
}





header('application/json');
echo json_encode(utf8_string_array_encode($result));