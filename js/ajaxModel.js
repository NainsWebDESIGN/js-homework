class HomeWorkModel {
  /**
   * 存儲資料
   */
  data = {};

  /**
   * 取得作業的倉庫資訊
   */
  getData() {
    try {
      return new Promise((res, rej) => {
        if (!this.data || this.data.length == 0) {
          rej(new Error("data is null"));
        } else {
          res(this.data);
        }
      });
    } catch (e) {
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
  async backEnd(param) {
    try {
      await fetch(`./php/system.php?gateWay=${param}Group`)
        .then((res) => res.json())
        .then((response) => {
          switch (response.status) {
            case RESPONSE.SUC:
              this.data[`arr${param}`] = response.data;
              break;

            case RESPONSE.FEI:
              throw new Error(data.errMsg);

            default:
              throw new Error(data);
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
        .then((res) => (this.topic = res));

      return new Promise((res, rej) => {
        if (!this.topic || this.topic.length == 0) {
          rej(new Error("topic is null"));
        } else {
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
  async backTopic(getWay) {
    try {
      await fetch(`./php/system.php?gateWay=${getWay}`)
        .then((res) => res.json())
        .then((response) => {
          switch (response.status) {
            case RESPONSE.SUC:
              this.topic = response.data;
              break;

            case RESPONSE.FEI:
              throw new Error(data.errMsg);

            default:
              throw new Error(data);
          }
        });

      return new Promise((res, rej) => {
        if (!this.topic || this.topic.length == 0) {
          rej(new Error("topic is null"));
        } else {
          res(this.topic);
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

class UserModel {
  signupStatus = false;
  /**
   * 註冊帳號密碼
   * @param payload (object) username，password
   */
  async signup(payload) {
    try {
      const encode = await new EnCodeJwt(payload).token;
      await fetch("./php/system.php?gateWay=signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: encode,
        },
        body: JSON.stringify({ message: "signup" }),
      })
        .then((res) => res.json())
        .then((response) => {
          switch (response.status) {
            case RESPONSE.SUC:
              this.signupStatus = response.data;
              break;

            case RESPONSE.FEI:
              throw new Error(data.errMsg);

            default:
              throw new Error(data);
          }
        });
      return new Promise((res, rej) => {
        if (!this.signupStatus) {
          rej(new Error("Signup is feiled"));
        } else {
          res(this.signupStatus);
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
