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
  function bindData() {
    template.home = pages.home.bindData(home_data);
    template.nav = components.nav.bindData(home_data);

    home_data.list.forEach(function(fruit) {
      template.item += components.item.bindData(fruit);
    });
  }

  // render to root element and to parent element (View)
  function render() {
    utils.updateDom("root", template.home);
    utils.updateDom("list", template.item);
    utils.updateDom("nav", template.nav);
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(router) {
    console.log("homepage handler attached !");

    components.nav.addEventListener("click", function(e) {
      router(e.target.dataset.url);
      // console.log(utils.generateUUID4());
    });
  }

  // pay attention to orders of methods
  function control(router, params) {
    init();
    getData(params);
    bindData();
    render();
    attachHandler(router);
  }
  return {
    control
  };
})();

export default home;
