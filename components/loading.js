import lib from "../lib/index.js";
import loadingImgUrl from "../resources/loading-noback.gif";

var loading = (function() {
  "use strict";

  //  사실 loading 컴포넌트는 따로 만들지 않고 control 파일에 직접 템플릿 하드코딩해도 됨
  // 왜냐하면 loading src는 값이 변경될 일이 없다
  var loading_data = {
    src: loadingImgUrl
  };
  function getTemplate() {
    return `<img src=${loading_data.src} />`;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(loading_data, updateObj);
  }

  //  컴포넌트의 데이터 객체는 변경하기 전에 확인하기 위하여 getData 메서드를 추가함
  function getData() {
    return loading_data;
  }
  return {
    getTemplate,
    updateData,
    getData
  };
})();

export default loading;
