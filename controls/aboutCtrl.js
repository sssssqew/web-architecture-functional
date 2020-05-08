/*about data
{
  title,
}
*/
import about_page from "../pages/about.js";
import utils from "../lib/utils.js";

var about_control = (function() {
  "use strict";

  var about_data;
  var about_template;

  function init() {
    var about_data = null;
    var about_template = "";
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData(params) {
    // about_data = fetch();
    about_data = { title: "about page" };
  }
  function bindData() {
    about_template = about_page.bindData(about_data);
  }

  // render to root element and to parent element
  function render() {
    utils.updateDom("root", about_template);
  }

  // dictate all of handlers for page
  function attachHandler(router) {
    console.log("aboutpage handler attached !");
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

export default about_control;
