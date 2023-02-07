<?php

if (!isset($_SERVER['HTTP_FROM']) || !isset($_SERVER['HTTP_TO']) || !isset($_SERVER['HTTP_UID'])) {
    return;
}

$From = AntiSql($_SERVER['HTTP_FROM']);
$To = AntiSql($_SERVER['HTTP_TO']);
$Uid = AntiSql($_SERVER['HTTP_UID']);

if ($From == $To) {
    return;
}

$mysql = Connect();

$table_exist = $mysql -> query("SELECT EXISTS ( SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_NAME = 'messages');") -> fetch_all();
if ($table_exist[0][0] == 0){
    return;
}

$i = 0;
$info = $mysql -> query("SELECT `from`, `to`, `messages` FROM `messages` WHERE `from` = '$From' AND `to` = '$To'") -> fetch_all();
if (empty($info)){
    $i = 1;
    $info = $mysql->query("SELECT `from`, `to`, `messages` FROM `messages` WHERE `to` = '$From' AND `from` = '$To'")->fetch_all();
    if (empty($info)) {
        $i = 0;
        $mysql->query("INSERT INTO `messages`(`from`, `to`, `messages`) VALUES ('$From','$To','[]')");
        $info = array(array($From, $To, '[]'));
    }
}

$content = json_decode($info[0][2], true);

$message = null;

for ($j = 0;$j < count($content);$j++) {
    if ($content[$j]['uid'] == $Uid && $message == null) {
        $message = $j;
    }
}
print_r($From);
print_r($To);
print_r($message);
print_r($content);
print_r($content[$message]);

unset($content[$message]);

$result = json_encode($content);

if ($result == false) {
    $result = '[]';
}


if ($i == 0){
    $mysql->query("UPDATE `messages` SET `messages`='$result' WHERE `from` = '$From' AND `to` = '$To'");
} else {
    $mysql->query("UPDATE `messages` SET `messages`='$result' WHERE `to` = '$From' AND `from` = '$To'");
}