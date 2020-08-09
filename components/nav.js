import lib from "../lib/index.js";

var nav = (function() {
  "use strict";

  var nav_data = {
    home: "/",
    about: "/about",
    contact: "/contact",
    product: "/product/9?name=computer&price=$30",
    notfound: "/notfound"
  };

  function getTemplate() {
    return `<button class="nav-btn" data-url=${nav_data.home}>home</button>
                <button class="nav-btn" data-url=${nav_data.about}>about</button>
                <button class="nav-btn" data-url=${nav_data.contact}>contact</button>
                <button class="nav-btn" data-url=${nav_data.product}>product</button>
                <button class="nav-btn" data-url=${nav_data.notfound}>notfound</button>
                <button class="nav-wish-list" id="nav-wish-list" checked="false">picked items</button>
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
