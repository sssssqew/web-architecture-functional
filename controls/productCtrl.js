import pages from "../pages/index.js";
import utils from "../lib/utils.js";

var product = (function() {
  "use strict";

  var product_data;
  var template;

  function init() {
    product_data = null;
    template = { product: "" };
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(params) {
    // product_data = fetch();
    product_data = { title: "product page", id: params.id };
  }
  // bind data to template (View)
  function bindData() {
    template.product = pages.product.bindData(product_data);
  }

  // render to root element and to parent element (View)
  function render() {
    utils.updateDom("root", template.product);
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(router) {
    console.log("productpage handler attached !");
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

export default product;
