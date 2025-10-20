function homeWorkFormat(data) {
  // 請將答案寫在這邊
}

const user = { username: "Nains", password: "123456789" };
const check = api == API.JSON;

new HomeWorkModel()
  [check ? "jsonEnd" : "backEnd"](check ? null : user)
  .then(homeWorkFormat)
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
