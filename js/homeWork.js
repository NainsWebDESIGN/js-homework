//| 請先用 ajaxModel 將 json 的陣列取出來並將下列題目的答案 打印(console.log) 出來

ajaxModel
  .ajax()
  .then((model) => {
    console.log(model.data);
    console.log(model);

    //| 請將物件內的每個陣列扁平化(把多維陣列改為一維陣列)
    const flatArr = Object.values(model.data).map((item) =>
      item.flat(Infinity)
    );
    console.log(flatArr);

    //| 請將兩個陣列合併
    const newArr = flatArr[0].concat(flatArr[1]);
    console.log(newArr);

    //| 請分別用 indexOf、findIndex 找出夏紅梅在陣列的第幾個位置
    const redMay = "夏紅梅";
    const findIndexArr = newArr.findIndex((item) => item.name == redMay);
    const indexOfArr = newArr.map((item) => item.name).indexOf(redMay);
    model.log(findIndexArr, "s");
    model.log(indexOfArr, "s");

    //| 請用 reduce、filter 依照 id 刪除重複值
    const repeatArr = newArr.filter(
      (a, b, c) => c.map((item) => item.id).indexOf(a.id) === b
    );
    const reduceArr = newArr.reduce(
      (a, b) => (a.map((item) => item.id).includes(b.id) ? a : [...a, b]),
      []
    );
    console.log(repeatArr);
    console.log(reduceArr);

    //| 請將合併後的陣列篩選成剩下年齡小於 25 的值
    const filterArr = repeatArr.filter((item) => item.age < 25);
    console.log(filterArr);

    //| 請將陣列內的每筆資料都添加年紀總和及個人年紀差了幾歲
    const all = filterArr.map((item) => item.age).reduce((a, b) => a + b, 0);
    const mapArr = filterArr.map((item) => ({
      ...item,
      ageGap: all - item.age,
      allAge: all,
    }));
    console.log(mapArr);

    //| 請按照 id 大小排序陣列
    const sortArr = mapArr.sort((a, b) => a.id - b.id);
    console.log(sortArr);

    //| 請將 id 的奇偶數丟進相應的陣列裡
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

    //| 請用 includes 找出有流蘇的陣列
    const liouSu = "流蘇";
    if (Odds.map((item) => item.name).includes(liouSu)) {
      model.log("Odds", "w");
    }
    if (Evens.map((item) => item.name).includes(liouSu)) {
      model.log("Evens", "w");
    }

    //| 請將名字用逗號合成一段字串
    const nameString = sortArr.map((item) => item.name).join(",");
    model.log(nameString);

    //| 請用 array.keys 的方式將陣列內的值都打印一次
    for (const item of sortArr) {
      console.log(item);
    }
  })
  .catch((err) => ajaxModel.log(err, "e"));
