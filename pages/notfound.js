import lib from "../lib/index.js";

var notfound = (function() {
  "use strict";

  function getTemplate() {
    return `<div>notfound
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
