import lib from "../lib/index.js";

var contact = (function() {
  "use strict";

  function getTemplate() {
    return `<div>contact
                </div>`;
  }
  // function updateData(updateObj) {
  //   lib.dom.updateObj(contact_data, updateObj);
  // }
  return {
    getTemplate
    // updateData
  };
})();

export default contact;
