import lib from "../lib/index.js";

var about = (function() {
  "use strict";

  var about_data = {
    title: "about page"
  };
  function getTemplate() {
    return `<div>
                  <div id="detail" ></div>
                </div>`;
  }
  function updateData(updateObj) {
    lib.utils.updateObj(about_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default about;
