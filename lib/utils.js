var utils = (function() {
  "use strict";

  // 리액트의 상태 변경 함수와 유사함
  function setState(stateObj, property, value) {
    stateObj[property] = value;
  }

  function compose(fns) {
    return function(args) {
      return fns.reduce(function(result, f) {
        return f(result);
      }, args);
    };
  }

  function checkTypeOfData(data) {
    return Object.prototype.toString.call(data);
  }

  //  copy object deeply using recursion
  function deepCopyObj(target, source) {
    var target = target || {};

    for (var key in source) {
      // 객체의 속성이 배열인 경우 요소(item)를 순회하면서 요소가 객체이면 깊은복사를 하고 요소가 배열이면 배열을 깊은복사한다.
      // 그러나 요소가 배열인 경우 내부에 객체가 있으면 얕은복사가 된다.
      if (checkTypeOfData(source[key]) === "[object Array]") {
        target[key] = source[key].map(function(item) {
          if (checkTypeOfData(item) === "[object Object]") {
            return deepCopyObj({}, item);
          } else if (checkTypeOfData(item) === "[object Array]") {
            return [].concat(item);
          } else {
            return item;
          }
        });
        // 객체의 속성이 객체인 경우 재귀함수에 의해 깊은복사가 된다.
      } else if (checkTypeOfData(source[key]) === "[object Object]") {
        target[key] = deepCopyObj(target[key], source[key]);
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
    setState,
    compose,
    checkTypeOfData,
    deepCopyObj,
    generateUUID4
  };
})();

export default utils;
