<?php
class Jwt {
    public $secret = "nains-123456789-shizuna-987654321-secret";
    public $verify = false;

    public function __construct($gateway, $jwt, $user = array()){
        switch($gateway){
            case "signup":
                $this->verifyJwtPayload($jwt, $user);
                break;
        }
    }

    private function Encode($data) {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
    
    private function Decode($data) {
        $padding = strlen($data) % 4;
        if ($padding) {
            $data .= str_repeat('=', 4 - $padding);
        }
        return json_decode(base64_decode(strtr($data, '-_', '+/')), true);
    }
    
    /**
     * 編碼
     */
    private function jwtEncode($payload) {
        $headerJson = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
        $payloadJson = json_encode($payload);
        
        $base64UrlHeader = $this->Encode($headerJson);
        $base64UrlPayload = $this->Encode($payloadJson);
        
        $signature = hash_hmac('sha256', $base64UrlHeader . '.' . $base64UrlPayload, $this->secret, true);
        $base64UrlSignature = $this->Encode($signature);
        
        return $base64UrlHeader . '.' . $base64UrlPayload . '.' . $base64UrlSignature;
    }

    /**
     * 解碼
     */
    private function jwtDecode($jwt) {
        list($header, $payload, $signature) = explode('.', $jwt);
        
        $expectedSignature = $this->Encode(hash_hmac('sha256', $header . '.' . $payload, $this->secret, true));
        
        if ($expectedSignature !== $signature) {
            throw new Exception('Invalid signature');
        }
        
        return $this->Decode($payload);
    }

    /**
     * 驗證
     */
    private function verifyJwtPayload($jwt, $user) {
        // 解碼 JWT
        $decode = $this->jwtDecode($jwt);

        if(!isset($decode['username'])){
            return $this->verify = false;
        }

        // 檢查會員中是否已有帳號
        $checkUser = in_array($decode['username'], array_map(function($item) {
            return $item['username'];
        }, $user));

        if($checkUser){
            $this->verify = false;
        }else{
            $this->verify = true;
        }
    }

    
}
?>