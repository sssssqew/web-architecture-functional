import home from "./home.js";
import about from "./about.js";
import contact from "./contact.js";
import product from "./product.js";
import notfound from "./notfound.js";

var pages = (function() {
  "use strict";

  return {
    home,
    about,
    contact,
    product,
    notfound
  };
})();

export default pages;
