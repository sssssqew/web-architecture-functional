import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

// router 모듈 함수형 프로그래밍 적용하기
//  컨트롤러 좀 더 정리하기 (init 함수 필요한지 생각해보기 )
// filter map 함수 사용하기
// 데이터 유효성 검사하기
//  에러 처리하기
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
      // console.log(lib.utils.checkTypeOfData([1, 2, 3, 4]));
      // testDeepCopy();

      // console.log(lib.utils.generateUUID4());
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
