var product = (function() {
  "use strict";

  var product_data = {
    title: "",
    id: ""
  };
  function bindData(data) {
    product_data.title = data.title;
    product_data.id = data.id;
    return `<div>${product_data.title} (${product_data.id})
                </div>`;
  }
  return {
    bindData
  };
})();

export default product;
