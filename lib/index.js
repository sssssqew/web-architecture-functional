import utils from "./utils.js";
import router from "./router.js";
import server from "./server.js";
import dom from "./dom.js";

var lib = (function() {
  "use strict";

  return {
    utils,
    router,
    server,
    dom
  };
})();

export default lib;
