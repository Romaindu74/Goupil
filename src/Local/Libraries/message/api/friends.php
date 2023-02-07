<?php
header('Content-Type: application/json');

if (!isset($_SERVER['HTTP_T'])) {
    echo json_encode(array());
    return;
}
$Token = AntiSql($_SERVER['HTTP_T']);

$mysql = Connect();

$table_exist = $mysql -> query("SELECT EXISTS ( SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = 'message');") -> fetch_all();
if ($table_exist[0][0] == 0){
    echo json_encode(array());
    return;
}

$info = $mysql->query("SELECT `Id`, `Name` FROM `info` WHERE `Token`='$Token'")->fetch_all();

if (empty($info)){
    echo json_encode(array('c' => true));
    return;
}

$friends = $mysql->query("SELECT `Friend-Token`, `Ok` FROM `message` WHERE `Token`='".$Token."'")->fetch_all();
$_friends = $mysql->query("SELECT `Token`, `Ok` FROM `message` WHERE `Friend-Token`='".$Token."'")->fetch_all();
$result = array();
if (!empty($friends)) {
    for ($i = 0;$i < count($friends);$i++){
        $friend = $mysql->query("SELECT `Name`, `Id` FROM `info` WHERE `Token`='".$friends[$i][0]."'")->fetch_all();
        if (!empty($friend)){
            $result[] = array(
                "Name" => $friend[0][0],
                "Id" => $friend[0][1],
                "Ok" => $friends[$i][1]
            );
        }
    }
} else if (!empty($_friends)) {
    for ($i = 0;$i < count($_friends);$i++){
        $friend = $mysql->query("SELECT `Name`, `Id` FROM `info` WHERE `Token`='".$_friends[$i][0]."'")->fetch_all();
        if (!empty($friend)){
            $result[] = array(
                "Name" => $friend[0][0],
                "Id" => $friend[0][1],
                "Ok" => $_friends[$i][1]
            );
        }
    }
}

echo json_encode($result);
