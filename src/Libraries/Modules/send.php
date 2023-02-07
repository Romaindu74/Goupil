<?php

if (!function_exists('utf8_string_array_encode')) {
    function utf8_string_array_encode(&$array){
        $func = function(&$value){
            if(is_string($value)){
                $value = mb_convert_encoding($value, "UTF-8", "ISO-8859-1");
            }
            if(is_array($value)){
                utf8_string_array_encode($value);
            }
        };
        array_walk($array,$func);
        return $array;
    }
}

if (!function_exists('send_json')) {
    function send_json(mixed $value) {
        echo json_encode(utf8_string_array_encode($value));
    }
}

if (!function_exists('send')) {
    function send(string $value) {
        echo $value;
    }
}

if (!function_exists('send_m')) {
    function send_m(mixed $value) {
        print_r($value);
    }
}

