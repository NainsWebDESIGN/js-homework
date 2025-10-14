function homeWorkFormat(data){
  // 請將答案寫在這邊
}
const homeWorkModel = new HomeWorkModel();

function GEThomeWork(){
  switch(api){
    case "json": // 向 json 抓作業資料
      return homeWorkModel
        .ajax(1)
        .then((model) => model.ajax(2));
    case "php": // 向 php 抓作業資料
      return homeWorkModel
        .backEnd(1)
        .then((model) => model.backEnd(2));
  }
}

GEThomeWork()
  .then((model) => model.getData())
  .then(homeWorkFormat)
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
