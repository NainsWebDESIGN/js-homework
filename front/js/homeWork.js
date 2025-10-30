function homeWorkFormat(data) {
  // 請將答案寫在這邊
}

new HomeWorkModel().data
  .then(homeWorkFormat)
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
