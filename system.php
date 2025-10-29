<?php
include "./php/header.php";
include "./php/database.php";

switch ($method) {
    case 'GET':
        $staff = new DataBase($param);
        $responseStatus = $staff->status;
        $responseMessage = array(
            'errMsg' => ($responseStatus !== 200) ? 'gateWay or body is undefinded' : '',
            'status' => ($responseStatus !== 200) ? false : true, 
            'data' => $staff->data
        );
        break;
        
    case 'POST':
        $request = json_decode(file_get_contents("php://input"), true);
        
        if($param == "signup"){
            include "./php/Base64Url.php";
            $user = new DataBase("user");
            $check = new Jwt($request['message'], $token, $user->data);
            $responseStatus = ($check->verify) ? 200 : 404;
            $responseMessage = array(
                'errMsg' => ($responseStatus !== 200) ? '' : 'This account is already in use',
                'status' => ($responseStatus !== 200) ? false : true,
                'data' => ($responseStatus !== 200) ? 'OK' : ''
            );
        }
        break;

    default:
        $responseStatus = 404;
        $responseMessage = array('errMsg' => 'Methods Error', 'status' => false, 'data' => array(), 'token' => $token);
        break;
}

http_response_code($responseStatus);
echo json_encode($responseMessage);
exit;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/fira.ttf.min.css">
    <link rel="stylesheet" href="./css/style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body id="myApp">
    <h3>請先用 ajaxModel 將取得的資料取出來並將下列題目的答案在 homeWork.js 中打印(console.log) 出來</h3>
    <hr>
</body>
<script src="./js/void.js"></script>
<script src="./js/ajaxModel.js"></script>
<script src="./js/index.js"></script>
<script src="./js/homeWork.js"></script>

</html>