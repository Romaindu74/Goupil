<?php
if (!isset($_SERVER['HTTP_TOKEN']) || !isset($_SERVER['HTTP_ID']) || !isset($_SERVER['HTTP_OK'])) {
    echo 1;
    return;
}
$Token = AntiSql($_SERVER['HTTP_TOKEN']);
$Id = AntiSql($_SERVER['HTTP_ID']);
$Ok = AntiSql($_SERVER['HTTP_OK']);

if ($Ok != 0 && $Ok != 1){
    return;
}

$mysql = Connect();

$table_exist = $mysql -> query("SELECT EXISTS ( SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = 'message');") -> fetch_all();
if ($table_exist[0][0] == 0){
    return;
}

$info = $mysql->query("SELECT `Id` FROM `info` WHERE `Token`='$Token'")->fetch_all();
$amis = $mysql->query("SELECT `Token` FROM `info` WHERE `Id`='$Id'")->fetch_all();

if (empty($info)){
    echo json_encode(array('c' => true));
    return;
}

if (empty($amis)) {
    return;
}

$amis_token = $amis[0][0];

$friends = $mysql->query("SELECT `Ok` FROM `message` WHERE `Token`='$Token' AND `Friend-Token`='$amis_token'")->fetch_all();
if (!empty($friends)) {
    $mysql->query("UPDATE `message` SET `Ok`='$Ok' WHERE `Token`='$Token' AND `Friend-Token`='$amis_token'");
    return;
}

$friends = $mysql->query("SELECT `Ok` FROM `message` WHERE `Friend-Token`='$Token' AND `Token`='$amis_token'")->fetch_all();
if (!empty($friends)) {
    $mysql->query("UPDATE `message` SET `Ok`='$Ok' WHERE `Friend-Token`='$Token' AND `Token`='$amis_token'");
    return;
}
