import lib from "../lib/index.js";
import deleteImgUrl from "../resources/delete.png";

var modal = (function() {
  "use strict";

  // TODO:  추후 필요에 따라 모달창 footer 섹션도 변경이 가능하도록 하기
  var modal_data = {
    src: deleteImgUrl,
    bodyString: "",
    footerBtnString: ""
  };
  function getTemplate() {
    return `<div id="modal-frame" class="modal-frame">
                  <div class="modal-content">
                    <div class="modal-header">
                      <img src=${modal_data.src}>
                    </div>
                    <div class="modal-body">
                      ${modal_data.bodyString}
                    </div>
                    <div class="modal-footer">
                      <div class="modal-btns">
                        <button id="modal-delete" class="modal-delete">${modal_data.footerBtnString}</button>
                        <button id="modal-close" class="modal-close">Close</button>
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
