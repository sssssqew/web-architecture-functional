import home from "./homeCtrl.js";
import about from "./aboutCtrl.js";
import contact from "./contactCtrl.js";
import product from "./productCtrl.js";
import notfound from "./notfoundCtrl.js";

var controls = (function() {
  "use strict";

  return {
    home,
    about,
    contact,
    product,
    notfound
  };
})();

export default controls;
