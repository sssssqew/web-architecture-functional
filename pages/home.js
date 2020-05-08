var home_page = (function() {
  "use strict";

  var home_data = {
    title: ""
  };
  function bindData(data) {
    home_data.title = data.title;
    return `<div>${home_data.title} 
                  <ul id="list"></ul>
                  <div id="nav"></div>
                </div>`;
  }
  return {
    bindData
  };
})();

export default home_page;
