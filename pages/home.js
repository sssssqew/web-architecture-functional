import lib from "../lib/index.js";

var home = (function() {
  "use strict";

  var home_data = {
    title: "home page"
  };
  function getTemplate() {
    return `<div>${home_data.title} 
                  <ul id="list"></ul>
                  <div id="nav"></div>
                </div>`;
  }
  function updateData(updateObj) {
    lib.utils.updateObj(home_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default home;
