import lib from "../lib/index.js";

var home = (function() {
  "use strict";

  var home_data = {
    title: "home page"
  };
  function getTemplate() {
    return `<div>
                  <div id="nav"></div>
                  <ul id="list" class="home-list"></ul>         
                </div>`;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(home_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default home;
