import components from "../components/index.js";

var dom = (function() {
  "use strict";

  function render(domID, htmlString) {
    var d = document.getElementById(domID);
    d.innerHTML = htmlString;
    return d;
  }

  // 컴포넌트 데이터 객체 업데이트
  function updateObj(targetObj, updateObj) {
    for (var key in updateObj) {
      if (key in targetObj) {
        targetObj[key] = updateObj[key];
      }
    }
  }

  // 다수의 컴포넌트 데이터 객체 업데이트 및 렌더링
  function updateAndRenderMany(target, renderItems, domID) {
    var renderTemplates = renderItems.map(function(renderItem) {
      target.updateData(renderItem);
      return target.getTemplate();
    });
    render(domID, renderTemplates.join(""));
  }

  // 하나의 컴포넌트 데이터 객체 업데이트 및 렌더링
  function updateAndRenderSingle(target, renderItem, domID) {
    target.updateData(renderItem);
    render(domID, target.getTemplate());
  }

  // 모달창 관련
  function showModal(modalEl) {
    // 모달창 생길때 스크롤바 안생기게 함
    document.body.style.overflow = "hidden";
    // getElementById는 document의 메서드 (다른 자식 메서드에서 사용불가)
    var modal = modalEl.querySelector("#modal-frame");
    modal.classList.add("show"); // 모달창 보이기
  }
  function hideModal(modalEl) {
    document.body.style.overflow = "auto";
    var modal = modalEl.querySelector("#modal-frame");
    modal.classList.remove("show"); // 모달창 감추기
  }

  // 스크롤 관련
  function getScrollPosition() {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

    var x = supportPageOffset
      ? window.pageXOffset
      : isCSS1Compat
      ? document.documentElement.scrollLeft
      : document.body.scrollLeft;
    var y = supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    return { xpos: x, ypos: y };
  }

  // about 페이지로 이동하기 전에 스크롤 위치를 기억했다가 다시 home으로 돌아왔을때 해당 위치로 돌아올수 있게 함
  function saveScrollPosition(key) {
    console.log("before scroll...");
    console.log(getScrollPosition());

    sessionStorage.setItem(key, JSON.stringify(getScrollPosition()));
  }

  return {
    render,
    updateObj,
    updateAndRenderMany,
    updateAndRenderSingle,
    showModal,
    hideModal,
    getScrollPosition,
    saveScrollPosition
  };
})();

export default dom;
