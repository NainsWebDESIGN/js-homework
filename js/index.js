function topicFormate(data) {
  const myApp = document.getElementById("myApp");

  data.forEach((item, index) => {
    const newP = document.createElement("p");
    newP.textContent = `${index + 1}. ${item}`;
    myApp.appendChild(newP);
  });
}

new TopicModel().data
  .then(topicFormate)
  .catch((err) => log(err, "w"))
  .finally(() => log("Topic Completed!", "s"));
