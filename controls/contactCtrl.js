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

    var data = {
      params: initData.params,
      title: "contact page"
    };
    return data;
  }
  // set Data function needed

  // bind data to template (View)
  function bindDataAll(data) {
    var template = {};
    var contact = pages.contact.bindData(data);

    template = { contact };

    return template;
  }

  // render to root element and to parent element (View)
  function render(template) {
    var dom = {};

    var root = lib.utils.getDom("root");
    root.innerHTML = template.contact;
    dom = { root };

    return dom;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(dom) {
    console.log("contactpage handler attached !");
  }

  // pay attention to orders of methods
  // 스코프 체인에 의해 attachHandler 메서드는 외부에서 router를 찾음
  function control(params) {
    var fns = [init, getData, bindDataAll, render, attachHandler];
    var composedFunc = lib.utils.compose(fns);
    composedFunc(params);

    // var initData = init(params);
    // var data = getData(initData);
    // var template = bindDataAll(data);
    // var dom = render(template);
    // attachHandler(dom);
  }
  return {
    control
  };
})();

export default contact;
