var nav = (function() {
  "use strict";

  var nav_data = {
    urls: null
  };

  function bindData(data) {
    nav_data.urls = data.nav;
    return `<button data-url="/">home</button>
                <button data-url="/${nav_data.urls[0]}">${nav_data.urls[0]}</button>
                <button data-url="/${nav_data.urls[1]}">${nav_data.urls[1]}</button>
                <button data-url="/${nav_data.urls[2]}/9">${nav_data.urls[2]}</button>
                <button data-url="/${nav_data.urls[3]}">${nav_data.urls[3]}</button>
              `;
  }
  return {
    bindData
  };
})();

export default nav;
