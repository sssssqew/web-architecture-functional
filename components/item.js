var item_component = (function() {
  "use strict";

  var item_data = {
    name: ""
  };

  function bindData(data) {
    item_data.name = data;
    return `<li>${item_data.name}</li>`;
  }
  return {
    bindData
  };
})();

export default item_component;
