import home_control from "./controls/homeCtrl.js";
import about_control from "./controls/aboutCtrl.js";
import contact_control from "./controls/contactCtrl.js";
import product_control from "./controls/productCtrl.js";

// check if  path and one of routes match
function isURLmatched(urlFragments, pathFragments, params) {
  return urlFragments.every(function(fragment, i) {
    var hasColon = fragment[0] === ":";
    if (hasColon) {
      var name = fragment.slice(1);
      params[name] = decodeURIComponent(pathFragments[i]);
    }
    return fragment === pathFragments[i] || hasColon;
  });
}

// parse URL and execute matched conftroller
function router(path) {
  var urls = Object.keys(routes);
  var r = null;
  var match = false;
  var params = {};

  urls.some(function(url) {
    var pathFragments = path.split("/");
    var urlFragments = url.split("/");
    if (pathFragments.length !== urlFragments.length) return;

    if (isURLmatched(urlFragments, pathFragments, params)) {
      r = routes[url]; // store matched controller
      return;
    }
  });

  (r || routes.otherwise)(params); // execute controller

  console.log(params);

  // (routes[path] || routes.otherwise)(path);
}

var routes = {
  "/": function(params) {
    home_control.control(router, params);
  },
  "/about": function(params) {
    about_control.control(router, params);
  },
  "/contact": function(params) {
    contact_control.control(router, params);
  },
  "/product/:id": function(params) {
    product_control.control(router, params);
  },
  otherwise() {
    console.log("page not found !");
  }
};

var path = window.location.pathname;
router(path);

// navigate forwards or backwards from url history
window.addEventListener("popstate", function(e) {
  router(window.location.pathname);
});
