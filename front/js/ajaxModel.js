const apiModel = new ApiModel();
apiModel.Api = API.PHP;
class HomeWorkModel {
  /**
   * 存儲資料
   */
  data;

  constructor() {
    switch (apiModel.Api) {
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
          axios.get(PATH.FRONT(`homeWork${url}`)).then((res) => res.data)
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
  async backEnd() {
    try {
      const urls = ["firstGroup", "secondGroup"];

      return Promise.all(
        urls.map((url) =>
          axios
            .get(PATH.BACK(url))
            .then((res) => res.data)
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
    switch (apiModel.Api) {
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
      const topic = await axios
        .get(PATH.FRONT("topic"))
        .then((res) => res.data);

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
  async backTopic() {
    try {
      return await axios
        .get(PATH.BACK("topic"))
        .then((res) => res.data)
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
    this.uid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  set uid(uid) {
    this.uuid = uid;
  }

  get uid() {
    return this.uuid;
  }
}

class Jwt {
  _token;

  constructor(payload) {
    const before_sign =
      this.parseUtf8(JWT.HEADER) + "." + this.parseUtf8(payload);
    const signature = CryptoJS.HmacSHA256(before_sign, JWT.SECRET);

    this._token = `${before_sign}.${this.enCode(signature)}`;
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

  set token(jwt) {
    this._token = jwt;
  }

  get token() {
    return this._token;
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
      return await axios
        .post(
          PATH.BACK("signup"),
          { message: "signup", payload: encode },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiModel.API_TOKEN}`,
            },
          }
        )
        .then((res) => res.data)
        .then((response) => {
          switch (response.status) {
            case RESPONSE.SUC:
              return response.data;

            case RESPONSE.FEI:
              throw new Error(response.data);

            default:
              throw new Error(response);
          }
        });
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
