function basehref(url){
  return `./json/${url}.json`;
}

function backhref(url){
  return `./php/${url}.php`;
}

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

  data = {};

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

  topic = [];

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