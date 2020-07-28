import lib from "../lib/index.js";

var home = (function() {
  "use strict";

  var home_data = {
    title: "home page"
  };
  function getTemplate() {
    return `<div>
                  <div id="nav"></div>
                  <ul id="list" style="display:flex; flex-wrap: wrap; justify-content: space-evenly;"></ul>         
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
