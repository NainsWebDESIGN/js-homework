const homeWorkModel = new HomeWorkModel();

// homeWorkModel
//   .ajax(1)
//   .then((model) => model.ajax(2))
//   .then((model) => model.getData())
//   .then((data) => { })
//   .catch((err) => log(err, "w"))
//   .finally(() => log("Home Work Completed!", "s"));

homeWorkModel
  .backEnd(1)
  .then((model) => model.backEnd(2))
  .then((model) => model.getData())
  .then((data) => { })
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
