var modal = (function() {
  "use strict";

  var modal_data = {
    src: "../resources/loading-noback.gif"
  };
  function getTemplate() {
    return `<div class="modal-frame">
    MODAL
    </div>`;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(modal_data, updateObj);
  }

  //  컴포넌트의 데이터 객체는 변경하기 전에 확인하기 위하여 getData 메서드를 추가함
  function getData() {
    return modal_data;
  }
  return {
    getTemplate,
    updateData,
    getData
  };
})();

export default modal;
