import lib from "../lib/index.js";

// 컴포넌트(즉시실행함수)는 하나의 실행환경이다
// 업데이트는 하나의 실행환경(클로저)을 변경하는 것이다
var nav = (function() {
  "use strict";

  var nav_data = {
    home: "/",
    about: "/about",
    contact: "/contact",
    product: "/product/9?name=computer&price=$30",
    notfound: "/notfound",
    wishBtnDisplay: true
  };

  function getTemplate() {
    return `<button class="nav-btn" data-url=${nav_data.home}>home</button>
                <button class="nav-btn" data-url=${
                  nav_data.about
                }>about</button>
                <button class="nav-btn" data-url=${
                  nav_data.contact
                }>contact</button>
                <button class="nav-btn" data-url=${
                  nav_data.product
                }>product</button>
                <button class="nav-btn" data-url=${
                  nav_data.notfound
                }>notfound</button>
                ${
                  nav_data.wishBtnDisplay
                    ? '<button class="nav-wish-list" id="nav-wish-list">picked items</button>:'
                    : ""
                }
              `;
  }
  function updateData(updateObj) {
    lib.dom.updateObj(nav_data, updateObj);
  }
  function getData() {
    return nav_data;
  }
  return {
    getTemplate,
    updateData,
    getData
  };
})();

export default nav;
