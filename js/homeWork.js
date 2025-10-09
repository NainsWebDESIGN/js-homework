ajaxModel
  .ajax()
  .then((model) => { })
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
