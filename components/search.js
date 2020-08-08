import lib from "../lib/index.js";

var search = (function() {
  "use strict";

  var search_data = {
    inputString: ""
  };

  function getTemplate() {
    return `<input type="text" placeholder="search movie here ... (type the title of movie and enter) " class="search-box"/>`;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(search_data, updateObj);
  }

  //  컴포넌트의 데이터 객체는 변경하기 전에 확인하기 위하여 getData 메서드를 추가함
  function getData() {
    return search_data;
  }
  return {
    getTemplate,
    updateData,
    getData
  };
})();

export default search;
