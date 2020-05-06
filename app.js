import home_control from "./controls/homeCtrl.js";
import about_control from "./controls/aboutCtrl.js";
import contact_control from "./controls/contactCtrl.js";

var routes = {
  "/": function() {
    home_control.control(this);
  },
  "/about": function() {
    about_control.control(this);
  },
  "/contact": function() {
    contact_control.control(this);
  }
};

var path = window.location.pathname;
routes[path]();

window.addEventListener("popstate", function(e) {
  routes[window.location.pathname]();
});
