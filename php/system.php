<?php
$method = $_SERVER['REQUEST_METHOD'];

// 设置响应头以支持 JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding, X-Requested-with, Origin, Authorization');
header('Access-Control-Expose-Headers:X-My-Custom-Header');

switch ($method) {
    case 'GET':
        header("Access-Control-Allow-Methods: GET");
        $param = $_GET['getWay'];
        if($param == 'data1'){
            require "data1.php";
            echo json_encode(array('errMsg' => '', 'status' => true, 'data' => $data));
            exit;
        }elseif($param == 'data2'){
            require "data2.php";
            echo json_encode(array('errMsg' => '', 'status' => true, 'data' => $data));
            exit;
        }else{
            echo json_encode(array('errMsg' => 'not found param', 'status' => false, 'data' => array()));
            exit;
        }
        break;
        
    case 'POST':
        header("Access-Control-Allow-Methods: POST");
        $request = json_decode(file_get_contents("php://input"), true);
        
        if($request['message'] === "topic"){
            require "topic.php";
            echo json_encode(array('errMsg' => '', 'status' => true, 'data' => $data));
            exit;
        }else{
            echo json_encode(array('errMsg' => 'Invalid message', 'status' => false, 'data' => array()));
            exit;
        }
        break;

    default:
        echo json_encode(array('errMsg' => 'Invalid message', 'status' => false, 'data' => array()));
        exit;
        break;
}
?>