var contact_page = (function() {
  "use strict";

  var contact_data = {
    title: ""
  };
  function bindData(data) {
    contact_data.title = data.title;
    return `<div>${contact_data.title} 
                </div>`;
  }
  return {
    bindData
  };
})();

export default contact_page;
