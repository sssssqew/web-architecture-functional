var about_page = (function() {
  "use strict";

  var about_data = {
    title: ""
  };
  function bindData(data) {
    about_data.title = data.title;
    return `<div>${about_data.title} 
                </div>`;
  }
  return {
    bindData
  };
})();

export default about_page;
