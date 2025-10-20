class HomeWorkModel {
  /**
   * 存儲資料
   */
  data;

  constructor() {
    switch (api) {
      case API.JSON:
        this.data = this.jsonEnd();
        break;
      case API.PHP:
        this.data = this.backEnd();
        break;
    }
  }

  /**
   * 向 json 抓取資料
   */
  async jsonEnd() {
    try {
      let urls = [1, 2];
      const allData = await Promise.all(
        urls.map((url) =>
          fetch(PATH.FRONT(`homeWork${url}`)).then((res) => res.json())
        )
      );

      return new Promise((res, rej) => {
        if (!allData) {
          rej(new Error("data is undefinded"));
        } else {
          res({ arr1: allData[0], arr2: allData[1] });
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * 向 php 抓取資料
   */
  async backEnd(payload) {
    try {
      const urls = ["firstGroup", "secondGroup"];
      const encode = new Jwt(payload).token;

      return Promise.all(
        urls.map((url) =>
          fetch(PATH.BACK(url), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: encode,
            },
          })
            .then((res) => res.json())
            .then((res) => {
              switch (res.status) {
                case RESPONSE.SUC:
                  return res.data;

                case RESPONSE.FEI:
                  throw new Error(res.errMsg);

                default:
                  throw new Error(res);
              }
            })
        )
      ).then((data) => ({ arr1: data[0], arr2: data[1] }));
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

class TopicModel {
  /**
   * 存儲資料
   */
  data;

  constructor() {
    switch (api) {
      case API.JSON:
        this.data = this.getTopic();
        break;
      case API.PHP:
        this.data = this.backTopic();
        break;
    }
  }

  /**
   * 向 json 抓取題目
   */
  async getTopic() {
    try {
      const topic = await fetch(PATH.FRONT("topic")).then((res) => res.json());

      return new Promise((res, rej) => {
        if (!topic || topic.length == 0) {
          rej(new Error("topic is null"));
        } else {
          res(topic);
        }
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }
  /**
   * 向 php 抓取題目
   */
  async backTopic(payload) {
    try {
      const encode = new Jwt(payload).token;

      return await fetch(PATH.BACK("topic"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: encode,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          switch (res.status) {
            case RESPONSE.SUC:
              return res.data;

            case RESPONSE.FEI:
              throw new Error(res.errMsg);

            default:
              throw new Error(res);
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

class UidStatus {
  uuid;
  constructor() {
    this._uuid();
  }
  _uuid() {
    this.uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

class Jwt {
  token;

  constructor(payload) {
    const before_sign =
      this.parseUtf8(JWT.HEADER) + "." + this.parseUtf8(payload);
    const signature = CryptoJS.HmacSHA256(before_sign, JWT.SECRET);

    this.token = `${before_sign}.${this.enCode(signature)}`;
  }

  parseUtf8(item) {
    return this.enCode(CryptoJS.enc.Utf8.parse(JSON.stringify(item)));
  }

  enCode(str) {
    const encodeSource = CryptoJS.enc.Base64.stringify(str);
    const reg = new RegExp("/", "g");

    return encodeSource
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(reg, "_");
  }
}

class UserModel {
  /**
   * 註冊帳號密碼
   * @param payload (object) username，password
   */
  async signup(payload) {
    try {
      const encode = new Jwt(payload).token;
      return await fetch(PATH.BACK("signup"), {
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
              return response.data;

            case RESPONSE.FEI:
              throw new Error(response.errMsg);

            default:
              throw new Error(response);
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
