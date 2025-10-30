<?php
include "./view/header.php";

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

$status = $formateData['status'];
$data = $formateData['data'];

http_response_code($status);
echo json_encode(
    array(
    'errMsg' => ($status == 200) ? '' : $data,
    'status' => !(gettype($data) === "string"),
    'data' => ($status == 200) ? $data : array()
    )
);
exit;
?>