const topicModel = new TopicModel();

// 向 json 抓題目資料
topicModel
  .getTopic()
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

// 向 php 抓題目資料
// topicModel
//   .backTopic('topic')
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