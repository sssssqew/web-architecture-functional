/*contact data
{
  title,
}
*/
import contact_page from "../pages/contact.js";
import utils from "../lib/utils.js";

var contact_control = (function() {
  "use strict";

  var contact_data;
  var contact_template;

  function init() {
    var contact_data = null;
    var contact_template = "";
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData(params) {
    // contact_data = fetch();
    contact_data = { title: "contact page" };
  }
  function bindData() {
    contact_template = contact_page.bindData(contact_data);
  }

  // render to root element and to parent element
  function render() {
    utils.updateDom("root", contact_template);
  }

  // dictate all of handlers for page
  function attachHandler(router) {
    console.log("contactpage handler attached !");
  }

  // watch out orders of methods
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

export default contact_control;
