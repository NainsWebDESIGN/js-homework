<?php
include "header.php";
include "database.php";

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
            include "Base64Url.php";
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