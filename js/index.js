const topicModel = new TopicModel();

// topicModel
//   .getTopic()
//   .then((res) => {
//     const myApp = document.getElementById("myApp");
    
//     res.forEach((item, index) => {
//       const newP = document.createElement("p");
//       newP.textContent = `${index + 1}. ${item}`;
//       myApp.appendChild(newP);
//     });
//   })
//   .catch((err) => log(err, "w"))
//   .finally(() => log("Topic Completed!", "s"));

topicModel
  .backTopic('topic')
  .then((res) => {
    const myApp = document.getElementById("myApp");
    
    res.forEach((item, index) => {
      const newP = document.createElement("p");
      newP.textContent = `${index + 1}. ${item}`;
      myApp.appendChild(newP);
    });
  })
  .catch((err) => log(err, "w"))
  .finally(() => log("Topic Completed!", "s"));