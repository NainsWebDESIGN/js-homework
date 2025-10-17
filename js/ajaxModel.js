class JwtEncoder {
  token;

  constructor(payload) {
    this.createToken(payload);
  }

  base64UrlEncode(data) {
    // 將數據轉換為 JSON 字符串並進行 UTF-8 編碼
    const json = JSON.stringify(data);
    const base64 = btoa(unescape(encodeURIComponent(json))); // 將字符串轉換為 Base64
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); // 轉換為 Base64Url
  }

  sign(data) {
    // 使用 HMAC SHA-256 簽名
    const encoder = new TextEncoder();
    const key = encoder.encode(this.secret);
    const dataBuffer = encoder.encode(data);

    return crypto.subtle.sign("HMAC", key, dataBuffer).then((signature) => {
      return this.base64UrlEncode(new Uint8Array(signature));
    });
  }

  async createToken(payload) {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const base64Header = this.base64UrlEncode(header);
    const base64Payload = this.base64UrlEncode(payload);

    const signature = await this.sign(`${base64Header}.${base64Payload}`);

    this.token = new Promise((res, rej) => {
      if (!payload) {
        rej;
      }
    });
    return `${base64Header}.${base64Payload}.${signature}`;
  }
}

// 使用示例
const secret = "your-256-bit-secret"; // 確保這裡的密鑰安全
const jwtEncoder = new JwtEncoder(secret);
const data = { userId: 123, name: "John Doe" };

jwtEncoder
  .createToken(data)
  .then((token) => {
    console.log("Generated JWT:", token);
  })
  .catch((err) => {
    console.error("Error:", err);
  });

class DeCodeJwt {
  payload;

  constructor(token) {
    this.decode(token);
  }

  decode(token) {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format");
    }

    const [header, payload, signature] = parts;

    // 驗證簽名
    const expectedSignature = this.sign(`${header}.${payload}`, secret);
    if (expectedSignature !== signature) {
      throw new Error("Invalid signature");
    }

    // 解碼 payload
    const decodedPayload = this.Decode(payload);

    this.payload = new Promise((res, rej) => {
      if (!token) {
        rej("data is undefinded");
      } else {
        res(JSON.parse(decodedPayload));
      }
    });
  }

  Decode(str) {
    // 將 Base64Url 格式轉換為標準 Base64 格式
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const base64WithPadding = base64 + padding;

    // 解碼
    const decoded = CryptoJS.enc.Base64.parse(base64WithPadding).toString(
      CryptoJS.enc.Utf8
    );
    return decoded;
  }

  sign(data, secret) {
    return CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Base64url);
  }
}

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
