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
        .then((res) => res.status ? res.data : res.errMsg)
        .then((data) => {

          switch (typeof data) {
            case "string":
              throw new Error(data);
              break;
          
            default:
              this.data[`arr${param}`] = data;
              break;
          }

        });

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
   * @param getWay (string) 題目識別
   */
  async backTopic(getWay){
    try {
      const url = backhref("postDataBase");
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: getWay })
    })
        .then((res) => res.json())
        .then((res) => res.status ? res.data : res.errMsg)
        .then((data) => {

          switch (typeof data) {
            case "string":
              throw new Error(data);
              break;
          
            default:
              this.topic = data;
              break;
          }
          
        });

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