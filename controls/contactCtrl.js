import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

var contact = (function() {
  "use strict";

  function init(params) {
    var data = { params };
    return data;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    // home_data = fetch();

    return initData;
  }

  // render to root element and to parent element (View)
  function renderAll(data) {
    var doms = {};
    doms["root"] = lib.dom.render("root", pages.contact.getTemplate()); // root must be the first
    return doms;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(dom) {
    console.log("contactpage handler attached !");
  }

  // pay attention to orders of methods
  // 스코프 체인에 의해 attachHandler 메서드는 외부에서 router를 찾음
  function control(params) {
    var initData = init(params);
    var data = getData(initData);
    var doms = renderAll(data);
    attachHandler(doms);
  }
  return {
    control
  };
})();

export default contact;
