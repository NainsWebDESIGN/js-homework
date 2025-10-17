function homeWorkFormat(data) {}

const homeWorkModel = new HomeWorkModel();

function GEThomeWork() {
  switch (api) {
    case API.JSON: // 向 json 抓作業資料
      return homeWorkModel
        .ajax(1)
        .then((model) => model.ajax(2))
        .then((model) => model.getData());
    case API.PHP: // 向 php 抓作業資料
      return homeWorkModel
        .backEnd("first")
        .then((model) => model.backEnd("second"))
        .then((model) => model.getData());
  }
}

GEThomeWork()
  .then(homeWorkFormat)
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
