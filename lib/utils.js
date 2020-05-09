var utils = (function() {
  "use strict";

  function getDom(selector) {
    var dom = document.getElementById(selector);
    return dom;
  }

  function compose(fns) {
    return function(args) {
      return fns.reduce(function(result, f) {
        return f(result);
      }, args);
    };
  }

  // take advange of recursion (only with objects)
  // if property value is array it will not work well
  function deepCopyObj(target, source) {
    var target = target || {};

    for (var key in source) {
      if (source[key] === "object") {
        deepCopyObj(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  function generateUUID4() {
    var uuid = "",
      ii;
    for (ii = 0; ii < 32; ii += 1) {
      switch (ii) {
        case 8:
        case 20:
          uuid += "-";
          uuid += ((Math.random() * 16) | 0).toString(16);
          break;
        case 12:
          uuid += "-";
          uuid += "4";
          break;
        case 16:
          uuid += "-";
          uuid += ((Math.random() * 4) | 8).toString(16);
          break;
        default:
          uuid += ((Math.random() * 16) | 0).toString(16);
      }
    }
    return uuid;
  }

  return {
    getDom,
    compose,
    deepCopyObj,
    generateUUID4
  };
})();

export default utils;
