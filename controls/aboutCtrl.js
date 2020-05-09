import pages from "../pages/index.js";
import utils from "../lib/utils.js";

var about = (function() {
  "use strict";

  var about_data;
  var template;

  function init() {
    about_data = null;
    template = { about: "" };
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData(params) {
    // about_data = fetch();
    about_data = { title: "about page" };
  }
  // bind data to template (View)
  function bindDataAll() {
    template.about = pages.about.bindData(about_data);
  }

  // render to root element and to parent element
  function render() {
    utils.updateDom("root", template.about);
  }

  // dictate all of handlers for page
  function attachHandler(router) {
    console.log("aboutpage handler attached !");
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

export default about;
