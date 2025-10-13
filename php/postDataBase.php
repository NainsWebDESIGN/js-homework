<?php

// 设置响应头以支持 JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Authorization');
header('Access-Control-Expose-Headers:X-My-Custom-Header');

// 获取 AJAX 请求的输入数据
$request = json_decode(file_get_contents("php://input"), true);

// 处理数据并返回响应
if ($request['message'] === "topic") {
    echo json_encode(array('errMsg' => '', 'status' => true, 'data' => array(
    "請將物件內的每個陣列扁平化(把多維陣列改為一維陣列)", 
    "請將兩個陣列合併", 
    "請分別用 indexOf、findIndex 找出夏紅梅在陣列的第幾個位置", 
    "請用 reduce、filter 依照 id 刪除重複值", 
    "請將合併後的陣列篩選成剩下年齡小於 25 的值", 
    "請將陣列內的每筆資料都添加年紀總和及個人年紀差了幾歲", 
    "請按照 id 大小排序陣列", "請將 id 的奇偶數丟進相應的陣列裡", 
    "請用 includes 找出有流蘇的陣列", 
    "請將名字用逗號合成一段字串", 
    "請用 array.keys 的方式將陣列內的值都打印一次"
)));
} else {
    echo json_encode(array('errMsg' => 'Invalid message', 'status' => false, 'data' => array()));
}
?>