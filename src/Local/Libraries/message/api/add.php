<?php

if (!isset($_SERVER['HTTP_FROM']) || !isset($_SERVER['HTTP_TO'])) {
    return;
}

$From = AntiSql($_SERVER['HTTP_FROM']);
$To = AntiSql($_SERVER['HTTP_TO']);
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

$post = file_get_contents('php://input');
if ($post) {
    $post = json_decode($post, true);
}
if (isset($post['content']) && isset($_SERVER['HTTP_UID'])) {
    $Content = AntiSql($post['content']);
    $Uid = AntiSql($_SERVER['HTTP_UID']);
    
    if ($Content == '<br>') {
        return;
    }

    
    $content = json_decode($info[0][2], true);
    
    $content[] = array(
        'author' => $From,
        'content' => $Content,
        'uid' => $Uid
    );
    
    $result = json_encode($content);

    // $result = "[]";

    if ($i == 0){
        $mysql->query("UPDATE `messages` SET `messages`='$result' WHERE `from` = '$From' AND `to` = '$To'");
    } else {
        $mysql->query("UPDATE `messages` SET `messages`='$result' WHERE `to` = '$From' AND `from` = '$To'");
    }
} else {
    echo $info[0][2];
}
