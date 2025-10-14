const API = Object.freeze({
  PHP: "PHP",
  JSON: "JSON"
});
const RESPONSE = Object.freeze({
  SUC: true,
  FEI: false
});

const api = API.PHP;

/**
 * 取得抓取 json 的路徑
 * @param url (string) 檔案名稱
 */
function basehref(url){
  return `./json/${url}.json`;
}

/**
 * 打印出有樣式的資料
 * @param t (string) 要打印的文字(預設為正常打印)
 * @param a (string) l = 正常，s = 成功，e = 錯誤，w = 警告
 */
function log(t, a = "l") {
  const type = {
    l: {
      key: "log",
      background: "#57a3f3",
      color: "#000",
    },
    s: {
      key: "success",
      background: "#19be6b",
      color: "#000",
    },
    e: {
      key: "error",
      background: "#ed4014",
      color: "#000",
    },
    w: {
      key: "warning",
      background: "#ffad33",
      color: "#000",
    },
  };

  console.log(
    `%c ${t} `,
    `background: ${type[a].background}; padding: 1px; border-radius: 3px; color: ${type[a].color};`
    // `%c ${(!type[a].key) ? a : type[a].key} %c ${t} %c`,
    // "background: #35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;",
    // `background: ${type[a].background}; padding: 1px;border-radius: 0 3px 3px 0; color: ${type[a].color}`,
    // "background: transparant"
  );
}