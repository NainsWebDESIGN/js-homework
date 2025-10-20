function homeWorkFormat(data) {
  // 第 1 題
  const key$ = Object.keys(data);
  console.log(1, key$);
  // 第 2 題
  const value$ = Object.values(data);
  console.log(2, value$);
  // 第 3 題
  const flatArr = value$.map((item) => item.flat(Infinity));
  console.log(3, flatArr);
  // 第 4 題
  const newArr = flatArr[0].concat(flatArr[1]);
  console.log(4, newArr);
  // 第 5 題
  const redMay = "夏紅梅";
  const findIndexArr = newArr.findIndex((item) => item.name == redMay);
  const indexOfArr = newArr.map((item) => item.name).indexOf(redMay);
  log(`5 ${findIndexArr}`);
  log(`5 ${indexOfArr}`);
  // 第 6 題
  const repeatArr = newArr.filter(
    (a, b, c) => c.map((item) => item.id).indexOf(a.id) === b
  );
  const reduceArr = newArr.reduce(
    (a, b) => (a.map((item) => item.id).includes(b.id) ? a : [...a, b]),
    []
  );
  console.log(6, repeatArr);
  console.log(6, reduceArr);
  // 第 7 題
  const filterArr = repeatArr.filter((item) => item.age < 25);
  console.log(7, filterArr);
  // 第 8 題
  const all = filterArr.map((item) => item.age).reduce((a, b) => a + b, 0);
  const mapArr = filterArr.map((item) => ({
    ...item,
    ageGap: all - item.age,
    allAge: all,
  }));
  console.log(8, mapArr);
  // 第 9 題
  const sortArr = mapArr.sort((a, b) => a.id - b.id);
  console.log(9, sortArr);
  // 第 10 題
  const Odds = [];
  const Evens = [];
  sortArr.forEach((item) => {
    if (Number(item.id) % 2 === 0) {
      Evens.push(item);
    } else {
      Odds.push(item);
    }
  });
  console.log(10, Odds, Evens);
  // 第 11 題
  const liouSu = "流蘇";
  if (Odds.map((item) => item.name).includes(liouSu)) {
    log("11 Odds");
  }
  if (Evens.map((item) => item.name).includes(liouSu)) {
    log("11 Evens");
  }
  // 第 12 題
  const nameString = sortArr.map((item) => item.name).join(",");
  log(`12 ${nameString}`);
  // 第 13 題
  for (const item of sortArr) {
    console.log(13, item);
  }
}

const user = { username: "Nains", password: "123456789" };
const check = api == API.JSON;

new HomeWorkModel()
  [check ? "jsonEnd" : "backEnd"](check ? null : user)
  .then(homeWorkFormat)
  .catch((err) => log(err, "w"))
  .finally(() => log("Home Work Completed!", "s"));
