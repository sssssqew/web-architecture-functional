var dom = (function() {
  "use strict";

  function render(domID, htmlString) {
    var d = document.getElementById(domID);
    d.innerHTML = htmlString;
    return d;
  }

  function renderMany(renderItems) {
    var itemTemplates = "";
    renderItems.forEach(function(renderItem) {
      itemTemplates += renderItem.getTemplate();
    });
    render("list", itemTemplates);
  }

  // 컴포넌트 데이터 객체 업데이트
  function updateObj(targetObj, updateObj) {
    for (var key in updateObj) {
      if (key in targetObj) {
        targetObj[key] = updateObj[key];
      }
    }
  }

  // 컴포넌트 데이터 객체 업데이트 및 렌더링
  function update(target, updateObj, domID) {
    target.updateData(updateObj);
    render(domID, target.getTemplate());
  }

  return {
    render,
    renderMany,
    updateObj,
    update
  };
})();

export default dom;
