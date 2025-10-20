function topicFormate(data) {
  const myApp = document.getElementById("myApp");

  data.forEach((item, index) => {
    const newP = document.createElement("p");
    newP.textContent = `${index + 1}. ${item}`;
    myApp.appendChild(newP);
  });
}

const user = { username: "Nains", password: "123456789" };
const check = api == API.JSON;

new TopicModel()
  [check ? "getTopic" : "backTopic"](check ? null : user)
  .then(topicFormate)
  .catch((err) => log(err, "w"))
  .finally(() => log("Topic Completed!", "s"));
