console.time("rendertime");
import controls from "./controls/index.js";
import lib from "./lib/index.js";

window.routes = {
  "/": function(params) {
    controls.home.control(params);
  },
  "/about": function(params) {
    controls.about.control(params);
  },
  "/contact": function(params) {
    controls.contact.control(params);
  },
  "/product/:id": function(params) {
    controls.product.control(params);
  },
  otherwise() {
    controls.notfound.control();
  }
};
lib.router("/");

// navigate forwards or backwards from url history
window.addEventListener("popstate", function(e) {
  lib.router(window.location.pathname);
});
console.timeEnd("rendertime");
