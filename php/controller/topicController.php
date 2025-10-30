<?php
function topicController($gateWay){
    switch($gateWay){
        case "topic":
            include "./model/topicModel.php";
            $topic = new TopicModel();
            
            return array('status' => 200, 'data' => $topic->data);
        default:
            return array('status' => 404, 'data' => 'Received gateWay error');
    }
}
?>