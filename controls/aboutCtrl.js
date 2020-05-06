"use strict";

/*about data
{
  title,
}
*/
import about_page from "../pages/about.js";

var about_control = (function() {
  var about_data;
  var about_template;

  function init() {
    var about_data = null;
    var about_template = "";
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData() {
    // about_data = fetch();
    about_data = { title: "about page" };
  }
  function bindData() {
    about_template = about_page.bindData(about_data);
  }

  // render to root element and to parent element
  function render() {
    var root = document.getElementById("root");
    root.innerHTML = about_template;
  }

  // dictate all of handlers for page
  function attachHandler(routes) {
    console.log("aboutpage handler attached !");
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

export default about_control;
