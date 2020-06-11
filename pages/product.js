import lib from "../lib/index.js";

var product = (function() {
  "use strict";

  var product_data = {
    title: "product page",
    id: ""
  };
  function getTemplate() {
    return `<div>${product_data.title} (${product_data.id})
                </div>`;
  }
  function updateData(updateObj) {
    lib.utils.updateObj(product_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
})();

export default product;
