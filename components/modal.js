var modal = (function() {
  "use strict";

  var modal_data = {
    src: "../resources/delete.png"
  };
  function getTemplate() {
    return `<div id="modal-frame" class="modal-frame">
                  <div class="modal-content">
                    <div class="modal-header">
                      <img src=${modal_data.src}>
                    </div>
                    <div class="modal-body">
                      You are sure to delte this movie?
                    </div>
                    <div class="modal-footer">
                      <div class="modal-btns">
                        <button class="modal-delete">Delete</button>
                        <button class="modal-close">Close</button>
                      </div>
                    </div>
                  </div>
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
