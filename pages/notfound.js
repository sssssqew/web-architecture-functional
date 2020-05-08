var notfound = (function() {
  "use strict";

  var notfound_data = {
    title: ""
  };
  function bindData(data) {
    notfound_data.title = data.title;
    return `<div>${notfound_data.title} 
                </div>`;
  }
  return {
    bindData
  };
})();

export default notfound;
