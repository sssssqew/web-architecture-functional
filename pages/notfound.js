import lib from "../lib/index.js";

var notfound = (function() {
  "use strict";

  var notfound_data = {
    title: "notfound page"
  };
  function getTemplate() {
    return `<div>${notfound_data.title} 
                </div>`;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(notfound_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default notfound;
