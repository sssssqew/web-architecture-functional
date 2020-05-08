/*product data
{
  title,id
}
*/
import product_page from "../pages/product.js";
import utils from "../lib/utils.js";

var product_control = (function() {
  "use strict";

  var product_data;
  var product_template;

  function init() {
    var product_data = null;
    var product_template = "";
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring
  function getData(params) {
    // product_data = fetch();
    product_data = { title: "product page", id: params.id };
  }
  function bindData() {
    product_template = product_page.bindData(product_data);
  }

  // render to root element and to parent element
  function render() {
    utils.updateDom("root", product_template);
  }

  // dictate all of handlers for page
  function attachHandler(router) {
    console.log("productpage handler attached !");
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

export default product_control;
