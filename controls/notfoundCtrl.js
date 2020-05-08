import pages from "../pages/index.js";
import utils from "../lib/utils.js";

var notfound = (function() {
  "use strict";

  var notfound_data;
  var template;

  function init() {
    notfound_data = null;
    template = { notfound: "" };
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData(params) {
    // notfound_data = fetch();
    notfound_data = { title: "notfound page" };
  }
  // bind data to template (View)
  function bindData() {
    template.notfound = pages.notfound.bindData(notfound_data);
  }

  // render to root element and to parent element
  function render() {
    utils.updateDom("root", template.notfound);
  }

  // dictate all of handlers for page
  function attachHandler(router) {
    console.log("notfoundpage handler attached !");
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

export default notfound;
