// fetch 는 인터넷 익스플로러나 마이크로소프트 엣지에서 지원하지 않음
// 크로스 브라우징을 위하여 axios 패키지를 사용함
import axios from "axios";

var server = (function() {
  "use strict";

  async function transfer(url, method, data) {
    if (!url) return new Error("there is no url to fetch !");
    var method = method || "GET";

    var init = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    };
    if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
      init.body = JSON.stringify(data || {});
    }
    var res = await axios(url, init);

    return res;
  }
  return {
    transfer
  };
})();

export default server;
