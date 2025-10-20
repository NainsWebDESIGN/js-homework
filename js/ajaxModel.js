class HomeWorkModel {
  /**
   * 向 json 抓取資料
   */
  async jsonEnd() {
    try {
      let urls = [1, 2];
      const allData = await Promise.all(
        urls.map((url) =>
          fetch(basehref(`homeWork${url}`)).then((res) => res.json())
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
          fetch(backhref(url))
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
   * 向 json 抓取題目
   */
  async getTopic() {
    try {
      const topic = await fetch(basehref("topic")).then((res) => res.json());

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
      return await fetch(backhref("topic"))
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
