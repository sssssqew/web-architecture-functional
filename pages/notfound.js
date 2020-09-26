import lib from "../lib/index.js";
import notFoundImage from "../resources/notfound.jpg";

// 구글에 sorry image 로 검색하면 많이 나옴
var notfound = (function() {
  "use strict";

  function getTemplate() {
    return `<div class="notfound-page">
                  <img src="${notFoundImage}"/>
                  <h1 class="notfound-text">Page is not found :( </h1>
                </div>`;
  }
  // function updateData(updateObj) {
  //   lib.dom.updateObj(notfound_data, updateObj);
  // }
  return {
    getTemplate
    // updateData
  };
})();

export default notfound;
