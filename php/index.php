<?php
include "./view/header.php";
include "./view/function.php";

switch ($method) {
    case 'GET':
        if(in_array($param, array("firstGroup", "secondGroup"))){

            include "./controller/groupController.php";
            $formateData = groupController($param);

        }elseif($param == "topic"){

            include "./controller/topicController.php";
            $formateData = topicController($param);

        }else{
            $formateData = array('status' => 404, 'data' => 'Received gateWay error');
        }
        break;
        
    case 'POST':
        $request = json_decode(file_get_contents("php://input"), true);
        
        if($param == "signup"){

            include "./controller/memberController.php";
            $formateData = signupController($request['payload']);

        }
        break;

    default:
        $formateData = array('status' => 404, 'data' => 'Methods Error');
        break;
}

$responseStatus = $formateData['status'];
$responseMessage = finalData($responseStatus, $formateData['data']);

http_response_code($responseStatus);
echo json_encode($responseMessage);
exit;
?>