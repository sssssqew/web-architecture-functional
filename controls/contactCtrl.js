"use strict";

/*contact data
{
  title,
}
*/
import contact_page from "../pages/contact.js";

var contact_control = (function() {
  var contact_data;
  var contact_template;

  function init() {
    var contact_data = null;
    var contact_template = "";
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData() {
    // contact_data = fetch();
    contact_data = { title: "contact page" };
  }
  function bindData() {
    contact_template = contact_page.bindData(contact_data);
  }

  // render to root element and to parent element
  function render() {
    var root = document.getElementById("root");
    root.innerHTML = contact_template;
  }

  // dictate all of handlers for page
  function attachHandler(routes) {
    console.log("contactpage handler attached !");
  }

  // watch out orders of methods
  function control(routes) {
    init();
    getData();
    bindData();
    render();
    attachHandler(routes);
  }
  return {
    control
  };
})();

export default contact_control;
