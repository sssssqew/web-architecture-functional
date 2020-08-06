var dom = (function() {
  "use strict";

  function render(domID, htmlString) {
    var d = document.getElementById(domID);
    d.innerHTML = htmlString;
    return d;
  }

  function updateObj(targetObj, updateObj) {
    for (var key in updateObj) {
      if (key in targetObj) {
        targetObj[key] = updateObj[key];
      }
    }
  }

  function update(target, updateObj, domID) {
    target.updateData(updateObj);
    render(domID, target.getTemplate());
  }

  return {
    render,
    updateObj,
    update
  };
})();

export default dom;
