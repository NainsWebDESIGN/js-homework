<?php

// 设置响应头以支持 JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Origin: https://nainsjs.zeabur.app');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding, X-Requested-with, Origin, Authorization');
header('Access-Control-Expose-Headers:X-My-Custom-Header');

if (isset($_GET['getWay'])) {
    $param = $_GET['getWay'];

    if($param == 'data1'){
        echo json_encode(array('errMsg' => '', 'status' => true, 'data' => array(
                array('id' => 1, 'name' => '江曉翠', 'age' => 13),
                array('id' => 2, 'name' => '劉大友', 'age' => 15),
                array(
                    array('id' => 3, 'name' => '翁陸源', 'age' => 19),
                    array('id' => 10, 'name' => '趙吉', 'age' => 11),
                    array(
                        array('id' => 4, 'name' => '陸起杉', 'age' => 23),
                        array('id' => 5, 'name' => '夏紅梅', 'age' => 17)
                    )
                )
            )));
    }elseif($param == 'data2'){
        echo json_encode(array('errMsg' => 'not found param', 'status' => false, 'data' => array(
                array('id' => 8, 'name' => '流蘇', 'age' => 14),
                array('id' => 10, 'name' => '趙吉', 'age' => 11),
                array('id' => 9, 'name' => '趙千歡', 'age' => 15),
                array(
                    array('id' => 11, 'name' => '夏寧', 'age' => 27),
                    array('id' => 13, 'name' => '海安', 'age' => 31),
                    array(
                        array('id' => 4, 'name' => '陸起杉', 'age' => 23)
                    )
                )
            )));
    }else{
        echo json_encode(array('errMsg' => 'not found param', 'status' => false, 'data' => array()));
    }


}else{
    echo json_encode(array('errMsg' => 'Invalid message', 'status' => false, 'data' => array()));
}
?>