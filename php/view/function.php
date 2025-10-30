<?php
function finalData($status, $data){
    return array(
        'errMsg' => ($status == 200) ? '' : $data,
        'status' => !(gettype($data) === "string"),
        'data' => ($status == 200) ? $data : array()
    );
}
?>