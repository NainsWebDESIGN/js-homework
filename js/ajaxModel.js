class AjaxModel {
  type = {
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

  data = {};

  topic = [];

  constructor() {}

  async ajax() {
    try {
      await fetch("../json/homeWork1.json")
        .then((res) => res.json())
        .then((res) => (this.data["arr1"] = res));
      await fetch("../json/homeWork2.json")
        .then((res) => res.json())
        .then((res) => (this.data["arr2"] = res));
      return this;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getTopic() {
    try {
      await fetch("../json/topic.json")
        .then((res) => res.json())
        .then((res) => (this.topic = res));

      return this;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  log(t, a = "l") {
    console.log(
      `%c ${t} `,
      `background: ${this.type[a].background}; padding: 1px; border-radius: 3px; color: ${this.type[a].color};`
      // `%c ${(!this.type[a].key) ? a : this.type[a].key} %c ${t} %c`,
      // "background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
      // `background: ${this.type[a].background}; padding: 1px;border-radius: 0 3px 3px 0; color: ${this.type[a].color}`,
      // "background: transparant"
    );
  }
}
