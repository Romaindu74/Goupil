<?php
if (null === ROOT_PATH || null === 'GET') {
    echo 'Les fonctions "ROOT_PATH", "GET" n\'ont pas été trouvés';
    exit();
}
?>

<style>
    img {
        width: 20;
        height: 20;
    }
    div#head, div#body, div.el {
        display: flex;
        align-items: center;
    }
    span#pointer {
        width: 10px
    }
</style>

<script>
    function main(root){
        for (child of root.parentNode.childNodes) {
            if (child.id == 'body'){
                child.style.display = (child.style.display == 'none' ? 'block' : 'none')
            }
            if (child.id == 'head'){
                for (_ of child.childNodes) {
                    if (_.id == 'pointer') {
                        _.innerHTML = (_.innerHTML == '+' ? '-' : '+')
                    }
                }
            }
        }
    }
</script>

<?php

$json_file = json_decode(file_get_contents(ROOT_PATH . '/Local/Libraries/icons/material-icons.json'), true);
echo "<title>".GET."</title><h1>".GET."</h1><br><div style='margin-left: 2em;' class='el'><a href='../'>Retour</a><br></div>";

function dirToArray($dir, $p = '.', $t = 0) {
    global $origin, $json_file;

    $result = "";
    $cdir = scandir($dir);

    foreach ($cdir as $key => $value) {
        if (!in_array($value, array(".",".."))) {
            $_ = $dir . DIRECTORY_SEPARATOR . $value;

            if (is_dir($_)) {
                $result .= "<div style='margin-left: ".$t."em;'><div style='cursor: pointer' id='head' onclick='main(this)'><span id='pointer'>+</span><img src='http://$origin/libraries/icons/folder.svg'><a href='$p/$value/'>$value</a></div><div id='body' style='display: none'>".dirToArray($_, $p.'/'.$value, $t + 1)."</div></div>";
            } else {
                $ext = pathinfo($dir . DIRECTORY_SEPARATOR . $value, PATHINFO_EXTENSION);
                $id = "unknown";
                if (array_key_exists($ext, $json_file['languageIds'])) {
                    $id = $json_file['languageIds'][$ext];
                }
                if (array_key_exists($ext, $json_file['Extensions'])) {
                    $id = $json_file['Extensions'][$ext];
                }

                $result .= "<div style='margin-left: ".$t."em;' class='el'><img src='http://$origin/libraries/".$json_file['path'][$id]['iconPath']."'><a href='$p/$value'>$value</a><br></div>";
            }
        }
    }
    return $result;
}

echo dirToArray($path);