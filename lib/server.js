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
    var res = await fetch(url, init);

    return res;
  }
  return {
    transfer
  };
})();

export default server;
