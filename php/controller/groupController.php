<?php
function groupController($param){
    switch($param){
        case "firstGroup":
            include "./model/groupModel.php";
            $first = new GroupModel("first");

            if(isset($first->data)){
                return array('status' => 200, 'data' => $first->data);
            }else{
                return array('status' => 404, 'data' => 'firstModel is null');
            }
        case "secondGroup":
            include "./model/groupModel.php";
            $second = new GroupModel("second");
            
            if(isset($second->data)){
                return array('status' => 200, 'data' => $second->data);
            }else{
                return array('status' => 404, 'data' => 'secondGroup is null');
            }
        default:
            return array('status' => 404, 'data' => 'Received gateWay error');
    }
}
?>