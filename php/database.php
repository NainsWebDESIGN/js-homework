<?php
class DataBase {
    public $status;
    public $data;

    public function __construct($gateway){
        switch($gateway){
            case "firstGroup":
                $this->first();
                break;
            case "secondGroup":
                $this->second();
                break;
            case "topic":
                $this->topic();
                break;
            case "user":
                $this->user();
            default:
            $this->status = 404;
            $this->data = array();
                break;
        }
    }

    private function first(){
        $this->status = 200;
        $this->data = array(
                array('id' => 1, 'name' => '江曉翠', 'age' => 13),
                array('id' => 2, 'name' => '劉大友', 'age' => 15),
                array(
                    array('id' => 3, 'name' => '翁陸源', 'age' => 19),
                    array('id' => 10, 'name' => '趙吉', 'age' => 11),
                    array(
                        array('id' => 4, 'name' => '陸起杉', 'age' => 23),
                        array('id' => 5, 'name' => '夏紅梅', 'age' => 17)
                    )
                )
            );
    }
    
    private function second(){
        $this->status = 200;
        $this->data = array(
                array('id' => 8, 'name' => '流蘇', 'age' => 14),
                array('id' => 10, 'name' => '趙吉', 'age' => 11),
                array('id' => 9, 'name' => '趙千歡', 'age' => 15),
                array(
                    array('id' => 11, 'name' => '夏寧', 'age' => 27),
                    array('id' => 13, 'name' => '海安', 'age' => 31),
                    array(
                        array('id' => 4, 'name' => '陸起杉', 'age' => 23)
                    )
                )
            );
    }
    
    private function topic(){
        $this->status = 200;
        $this->data = array(
                    "請將物件名稱(key)打印出來",
                    "請將物件值(value)打印出來",
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
        );
    }

    private function user(){
        $this->data = array(
            array('username' => 'Nains', 'password' => '123456789'),
            array('username' => 'Shizuna', 'password' => '987654321')
        );
    }
}
?>