import home from "./homeCtrl.js";
import about from "./aboutCtrl.js";
import contact from "./contactCtrl.js";
import product from "./productCtrl.js";

var controls = (function() {
  "use strict";

  return {
    home,
    about,
    contact,
    product
  };
})();

export default controls;
