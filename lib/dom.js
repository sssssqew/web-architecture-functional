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
  function updateAndRenderSingle(target, updateObj, domID) {
    target.updateData(updateObj);
    render(domID, target.getTemplate());
  }

  return {
    render,
    updateObj,
    updateAndRenderMany,
    updateAndRenderSingle
  };
})();

export default dom;
