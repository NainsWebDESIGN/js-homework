<?php
$method = $_SERVER['REQUEST_METHOD'];

// 设置响应头以支持 JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding, X-Requested-with, Origin, Authorization');
header('Access-Control-Expose-Headers:X-My-Custom-Header');

$token = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : null;
$param = $_GET['gateWay'];
$responseStatus;
$responseMessage;
?>