<?php
function signupController($payload){
    if(isset($payload)){
        include "./model/memberModel.php";
        $user = new MemberModel();
        $check = new JwtModel("signup", $payload, $user->data);

        return array('status' => 200, 'data' => ($check->verify) ? 'OK' : 'This account is already in use');
    }else{
        return array('status' => 404, 'data' => 'Payload is undefinded');
    }
}
?>