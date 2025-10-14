const topicModel = new TopicModel();

function GETtopic(){
  switch(api){
    case "json": // 向 json 抓題目資料
      return topicModel
        .getTopic();
    case "php": // 向 php 抓題目資料
      return topicModel
        .backTopic('topic');
  }
}

GETtopic()
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