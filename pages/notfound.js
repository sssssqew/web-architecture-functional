import lib from "../lib/index.js";
import notFoundImage from "../resources/notfound.jpg";

// TODO:not found page 만들기
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
