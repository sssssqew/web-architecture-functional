import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

var home = (function() {
  "use strict";

  // 필요없을지도 모른다
  // params를 곧바로 getData 메서드에 주입할 수도 있다
  function init(params) {
    var data = { params };
    return data;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    // home_data = fetch();

    var data = {
      params: initData.params,
      title: "home page",
      list: ["apple", "banana", "orange"],
      nav: ["about", "contact", "product", "notfound"]
    };
    return data;
  }
  // set Data function needed

  // bind data to template (View)
  function bindDataAll(data) {
    var template = {};
    var home = pages.home.bindData(data);
    var nav = components.nav.bindData(data);
    var item = "";

    data.list.forEach(function(fruit) {
      item += components.item.bindData(fruit);
    });
    template = { home, nav, item };

    return template;
  }

  //  lib 에 함수를 따로 뺄수도 있다
  function renderToPage(array) {
    var dom = {};
    array.forEach(function(obj) {
      var d = lib.utils.getDom(obj.id);
      d.innerHTML = obj.tem;
      dom[obj.id] = d;
    });
    return dom;
  }

  // render to root element and to parent element (View)
  function render(template) {
    var dom = {};
    var domIDs = [
      { id: "root", tem: template.home },
      { id: "list", tem: template.item },
      { id: "nav", tem: template.nav }
    ]; // root must be the first
    dom = renderToPage(domIDs);

    return dom;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(dom) {
    console.log("homepage handler attached !");

    dom.nav.addEventListener("click", function(e) {
      lib.router(e.target.dataset.url);
      // console.log(utils.generateUUID4());
    });
  }

  // pay attention to orders of methods
  function control(params) {
    var fns = [init, getData, bindDataAll, render, attachHandler];
    var composedFunc = lib.utils.compose(fns);
    composedFunc(params);
  }
  return {
    control
  };
})();

export default home;
