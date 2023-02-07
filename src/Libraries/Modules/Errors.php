<?php

$errors = array(
    'error-not-found' => 'Une erreur est survenue',
    'server-not-found' => 'Le serveur choisi n\'a pas été trouvé',
    'db-not-found' => 'La base de donné choisie n\'a pas été trouvé',
    'mysql-error-connecting' => 'La liaison à la base de donné a rencontré une erreur',
    'content-type-not-found' => 'Le type demander n\'a pas été trouvé',
    'mysql-not-found' => 'Le fichier "MySql" n\'a pas été trouvé',
    'content_type-not-found' => 'La fonction "content_type" n\'a pas été trouvé',
    'send_json-not-found' => 'La fonction "send_json" n\'a pas été trouvé',
    'Table_Exists-not-found' => 'La fonction "Table_Exists" n\'a pas été trouvé'
);


if (!function_exists('get_error')){
    function get_error($error) {
        global $errors;
        if (!array_key_exists($error, $errors)) {
            return get_error('error-not-found');
        } else {
            return $errors[$error];
        }
    }
}