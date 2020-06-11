import lib from "../lib/index.js";

var contact = (function() {
  "use strict";

  var contact_data = {
    title: "contact page"
  };
  function getTemplate() {
    return `<div>${contact_data.title} 
                </div>`;
  }
  function updateData(updateObj) {
    lib.utils.updateObj(contact_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default contact;
