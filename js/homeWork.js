function homeWorkFormat(data){
    const flatArr = Object.values(data).map((item) =>
      item.flat(Infinity)
    );
    console.log(flatArr);

    const newArr = flatArr[0].concat(flatArr[1]);
    console.log(newArr);

    const redMay = "夏紅梅";
    const findIndexArr = newArr.findIndex((item) => item.name == redMay);
    const indexOfArr = newArr.map((item) => item.name).indexOf(redMay);
    log(findIndexArr);
    log(indexOfArr);

    const repeatArr = newArr.filter(
      (a, b, c) => c.map((item) => item.id).indexOf(a.id) === b
    );
    const reduceArr = newArr.reduce(
      (a, b) => (a.map((item) => item.id).includes(b.id) ? a : [...a, b]),
      []
    );
    console.log(repeatArr);
    console.log(reduceArr);

    const filterArr = repeatArr.filter((item) => item.age < 25);
    console.log(filterArr);

    const all = filterArr.map((item) => item.age).reduce((a, b) => a + b, 0);
    const mapArr = filterArr.map((item) => ({
      ...item,
      ageGap: all - item.age,
      allAge: all,
    }));
    console.log(mapArr);

    const sortArr = mapArr.sort((a, b) => a.id - b.id);
    console.log(sortArr);

    const Odds = [];
    const Evens = [];
    sortArr.forEach((item) => {
      if (Number(item.id) % 2 === 0) {
        Evens.push(item);
      } else {
        Odds.push(item);
      }
    });
    console.log(Odds, Evens);

    const liouSu = "流蘇";
    if (Odds.map((item) => item.name).includes(liouSu)) {
      log("Odds");
    }
    if (Evens.map((item) => item.name).includes(liouSu)) {
      log("Evens");
    }

    const nameString = sortArr.map((item) => item.name).join(",");
    log(nameString);

    for (const item of sortArr) {
      console.log(item);
    }
  
}
const homeWorkModel = new HomeWorkModel();

homeWorkModel
  .ajax(1)
  .then((model) => model.ajax(2))
  .then((model) => model.getData())
  .then(homeWorkFormat)
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));

// homeWorkModel
//   .backEnd(1)
//   .then((model) => model.backEnd(2))
//   .then((model) => model.getData())
//   .then(homeWorkFormat)
//   .catch((err) => log(err, "w"))
//   .finally(() => log("Home Work Completed!", "s"));
