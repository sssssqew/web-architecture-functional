import home_control from "./controls/homeCtrl.js";
import about_control from "./controls/aboutCtrl.js";
import contact_control from "./controls/contactCtrl.js";

function router(path) {
  (routes[path] || routes.otherwise)(path);
}

var routes = {
  "/": function() {
    home_control.control(router);
  },
  "/about": function() {
    about_control.control(router);
  },
  "/contact": function() {
    contact_control.control(router);
  },
  otherwise(path) {
    console.log("page not found !");
  }
};

var path = window.location.pathname;
router(path);

window.addEventListener("popstate", function(e) {
  router(window.location.pathname);
});
