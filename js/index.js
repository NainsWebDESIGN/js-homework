const ajaxModel = new AjaxModel();

ajaxModel
  .getTopic()
  .then((res) => res.topic)
  .then((res) => {
    const myApp = document.getElementById("myApp");

    res.forEach((item, index) => {
      const newP = document.createElement("p");
      newP.textContent = `${index + 1}. ${item}`;
      myApp.appendChild(newP);
    });
  })
  .catch((err) => ajaxModel.log(err, "e"));
