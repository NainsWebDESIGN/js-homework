/**
 * 取得抓取 json 的路徑
 * @param url (string) 檔案名稱
 */
function basehref(url){
  return `./json/${url}.json`;
}

/**
 * 取得抓取 php 的路徑
 * @param url (string) 檔案名稱
 */
function backhref(url){
  return `./php/${url}.php`;
}

/**
 * 打印出有樣式的資料
 * @param t (string) 要打印的文字(預設為正常打印)
 * @param a (string) l = 正常，s = 成功，e = 錯誤，w = 警告
 */
function log(t, a = "l") {
  const type = {
    l: {
      key: "log",
      background: "#57a3f3",
      color: "#000",
    },
    s: {
      key: "success",
      background: "#19be6b",
      color: "#000",
    },
    e: {
      key: "error",
      background: "#ed4014",
      color: "#000",
    },
    w: {
      key: "warning",
      background: "#ffad33",
      color: "#000",
    },
  };

  console.log(
    `%c ${t} `,
    `background: ${type[a].background}; padding: 1px; border-radius: 3px; color: ${type[a].color};`
    // `%c ${(!type[a].key) ? a : type[a].key} %c ${t} %c`,
    // "background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
    // `background: ${type[a].background}; padding: 1px;border-radius: 0 3px 3px 0; color: ${type[a].color}`,
    // "background: transparant"
  );
}


class HomeWorkModel {

  /**
   * 存儲資料
   */
  data = {};

  /**
   * 取得作業的倉庫資訊
   */
  getData(){
    try{
      return new Promise((res, rej) => {
        if(!this.data || this.data.length == 0){
          rej(new Error("data is null"));
        }else{
          res(this.data);
        }
      });
    }catch(e){
      throw new Error(e.message);
    }
  }

  /**
   * 向 json 抓取資料
   * @param param (number) 第幾個資料
   */
  async ajax(param) {
    try {
      await fetch(basehref(`homeWork${param}`))
        .then((res) => res.json())
        .then((res) => (this.data[`arr${param}`] = res));

      return this;

    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * 向 php 抓取資料
   * @param param (number) 第幾個資料
   */
  async backEnd(param){
    try {
      await fetch(`${backhref("getDataBase")}?getWay=data${param}`)
        .then((res) => res.json())
        .then((res) => (this.data[`arr${param}`] = res.data));

      return this;

    } catch (e) {
      throw new Error(e.message);
    }
  }

}

class TopicModel {

  /**
   * 存儲資料
   */
  topic = [];

  /**
   * 向 json 抓取題目
   */
  async getTopic() {
    try {
      await fetch(basehref("topic"))
        .then((res) => res.json())
        .then((res) => this.topic = res);

      return new Promise((res, rej) => {
        if(!this.topic || this.topic.length == 0){
          rej(new Error("topic is null"));
        }else{
          res(this.topic);
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * 向 php 抓取題目
   * @getWay (string) 題目識別
   */
  async backTopic(getWay){
    try {
      await fetch(backhref("postDataBase"), {
        method: 'POST',
        body: JSON.stringify({ message: getWay })
    })
        .then((res) => res.json())
        .then((res) => this.topic = res.data);

      return new Promise((res, rej) => {
        if(!this.topic || this.topic.length == 0){
          rej(new Error("topic is null"));
        }else{
          res(this.topic);
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}