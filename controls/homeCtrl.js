import pages from "../pages/index.js";
import components from "../components/index.js";
import utils from "../lib/utils.js";

var home = (function() {
  "use strict";

  var home_data;
  var template;

  function init() {
    home_data = null;
    template = { home: "", item: "", nav: "" };
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(params) {
    // home_data = fetch();
    home_data = {
      title: "home page",
      list: ["apple", "banana", "orange"],
      nav: ["about", "contact", "product", "notfound"]
    };
  }
  // set Data function needed

  // bind data to template (View)
  function bindDataAll() {
    template.home = pages.home.bindData(home_data);
    template.nav = components.nav.bindData(home_data);

    home_data.list.forEach(function(fruit) {
      template.item += components.item.bindData(fruit);
    });
  }

  //  dom 요소의 id값을 변수로 가져오면 dom 객체를 얻을수 있음
  // dom 요소의 id값을 변수로 가져오면 window 객체의 프로퍼티에 추가됨
  // 만약 id 값이 history라서 history 객체를 가져오려고 한다면 이미 window 객체에
  // history 프로퍼티가 있어서 객체를 가져오지 못하므로 getElementById 등의 메서드를 사용하는게 맞음
  // render to root element and to parent element (View)
  function render() {
    utils.updateDom("root", template.home);
    utils.updateDom("list", template.item);
    utils.updateDom("nav", template.nav);
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(router) {
    console.log("homepage handler attached !");

    nav.addEventListener("click", function(e) {
      router(e.target.dataset.url);
      // console.log(utils.generateUUID4());
    });
  }

  // pay attention to orders of methods
  function control(router, params) {
    init();
    getData(params);
    bindDataAll();
    render();
    attachHandler(router);
  }
  return {
    control
  };
})();

export default home;
