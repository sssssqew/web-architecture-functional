import lib from "../lib/index.js";

var nav = (function() {
  "use strict";

  var nav_data = {
    urls: ["about", "contact", "product", "notfound"]
  };

  function getTemplate() {
    return `<button data-url="/">home</button>
                <button data-url="/${nav_data.urls[0]}">${nav_data.urls[0]}</button>
                <button data-url="/${nav_data.urls[1]}">${nav_data.urls[1]}</button>
                <button data-url="/${nav_data.urls[2]}/9?name=computer&price=$30">${nav_data.urls[2]}</button>
                <button data-url="/${nav_data.urls[3]}">${nav_data.urls[3]}</button>
              `;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(nav_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default nav;
