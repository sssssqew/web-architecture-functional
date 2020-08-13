import lib from "../lib/index.js";

var about = (function() {
  "use strict";

  function getTemplate() {
    return `<div class="about-page">
                  <div id="nav" class="about-nav"></div>
                  <div id="detail" class="about-detail"></div>
                </div>`;
  }
  // function updateData(updateObj) {
  //   lib.dom.updateObj(about_data, updateObj);
  // }
  return {
    getTemplate
    // updateData
  };
})();

export default about;
