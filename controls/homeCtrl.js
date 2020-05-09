import pages from "../pages/index.js";
import components from "../components/index.js";
import utils from "../lib/utils.js";

var home = (function() {
  "use strict";

  function init(params) {
    var obj = {};
    obj.data = null;
    obj.template = { home: "", item: "", nav: "" };
    obj.params = params;
    return obj;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(obj) {
    // home_data = fetch();
    var newObj = Object.create(obj); // Object 상속
    newObj.data = {
      title: "home page",
      list: ["apple", "banana", "orange"],
      nav: ["about", "contact", "product", "notfound"]
    };
    return newObj;
  }
  // set Data function needed

  // bind data to template (View)
  function bindDataAll(newObj) {
    var brandNewObj = Object.create(newObj); // Object 상속

    brandNewObj.template.home = pages.home.bindData(newObj.data);
    brandNewObj.template.nav = components.nav.bindData(newObj.data);

    newObj.data.list.forEach(function(fruit) {
      brandNewObj.template.item += components.item.bindData(fruit);
    });

    return brandNewObj;
  }

  //  dom 요소의 id값을 변수로 가져오면 dom 객체를 얻을수 있음
  // dom 요소의 id값을 변수로 가져오면 window 객체의 프로퍼티에 추가됨
  // 만약 id 값이 history라서 history 객체를 가져오려고 한다면 이미 window 객체에
  // history 프로퍼티가 있어서 객체를 가져오지 못하므로 getElementById 등의 메서드를 사용하는게 맞음
  // render to root element and to parent element (View)
  function render(brandNewObj) {
    var newnewObj = Object.create(brandNewObj);
    var root = utils.getDom("root");
    root.innerHTML = brandNewObj.template.home;
    var item = utils.getDom("list");
    item.innerHTML = brandNewObj.template.item;
    var nav = utils.getDom("nav");
    nav.innerHTML = brandNewObj.template.nav;
    var elements = { root, item, nav };
    newnewObj.elements = elements;
    return newnewObj;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(router, newnewObj) {
    console.log("homepage handler attached !");

    newnewObj.elements.nav.addEventListener("click", function(e) {
      router(e.target.dataset.url);
      // console.log(utils.generateUUID4());
    });
  }

  // pay attention to orders of methods
  function control(router, params) {
    var obj = init(params);
    var newObj = getData(obj);
    var brandNewObj = bindDataAll(newObj);
    var newnewObj = render(brandNewObj);
    attachHandler(router, newnewObj);
  }
  return {
    control
  };
})();

export default home;
