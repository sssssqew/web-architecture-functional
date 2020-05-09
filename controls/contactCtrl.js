import pages from "../pages/index.js";
import utils from "../lib/utils.js";

var contact = (function() {
  "use strict";

  var contact_data;
  var template;

  function init() {
    contact_data = null;
    template = { contact: "" };
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(params) {
    // contact_data = fetch();
    contact_data = { title: "contact page" };
  }
  // bind data to template (View)
  function bindDataAll() {
    template.contact = pages.contact.bindData(contact_data);
  }

  // render to root element and to parent element (View)
  function render() {
    utils.updateDom("root", template.contact);
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(router) {
    console.log("contactpage handler attached !");
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

export default contact;
