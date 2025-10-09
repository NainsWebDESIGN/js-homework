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
function log(t, a = "l") {
    console.log(
      `%c ${t} `,
      `background: ${type[a].background}; padding: 1px; border-radius: 3px; color: ${type[a].color};`
      // `%c ${(!type[a].key) ? a : type[a].key} %c ${t} %c`,
      // "background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
      // `background: ${type[a].background}; padding: 1px;border-radius: 0 3px 3px 0; color: ${type[a].color}`,
      // "background: transparant"
    );
  }
class AjaxModel {
  basehref = url => `./json/${url}.json`;

  data = {};

  topic = [];

  constructor() {}

  async ajax() {
    try {
      await fetch(this.basehref("homeWork1"))
        .then((res) => res.json())
        .then((res) => (this.data["arr1"] = res));
      await fetch(this.basehref("homeWork2"))
        .then((res) => res.json())
        .then((res) => (this.data["arr2"] = res));

      return new Promise((res, rej) => {
        if(!this.data || this.data.length == 0){
          rej(new Error("data is null"));
        }else{
          res(this.data);
        }
      });

    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getTopic() {
    try {
      await fetch(this.basehref("topic"))
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

}
