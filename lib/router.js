var router = (function() {
  "use strict";

  function changeURL(path) {
    window.history.pushState({}, "", path); // change window location object and url
  }

  function parseQuerystring(params) {
    var search = window.location.search;
    if (search === "") return;

    var qs = search.slice(1).split("&");
    params.queries = qs.map(function(q) {
      var pair = q.split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      return { key, value };
    });
  }

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

  function findMatchedURL(urls, params) {
    var matchedURL = "";
    urls.some(function(url) {
      var pathFragments = window.location.pathname.split("/");
      var urlFragments = url.split("/");
      if (pathFragments.length !== urlFragments.length) return;

      if (isURLmatched(urlFragments, pathFragments, params)) {
        matchedURL = url;
        return;
      }
    });
    return matchedURL;
  }

  function routeToMatchedURL(params) {
    var r = null;
    var urls = Object.keys(window.routes);
    var matchedURL = findMatchedURL(urls, params);
    r = window.routes[matchedURL]; // store matched controller
    (r || window.routes.otherwise)(params); // execute controller
  }

  // path는 다음에 이동할 URL 주소이므로 history pushState함수로 location 객체를 다음 URL 상태로 변경해줘야
  // 다음 URL의 parameter나 querystring을 가져올 수 있으므로 history pushState 함수는 상단에 위치하였음

  // parse URL and execute matched conftroller
  function router(path) {
    var params = {};

    // don't change order of code
    changeURL(path);
    parseQuerystring(params);
    routeToMatchedURL(params);
    console.log(params);
  }
  return router;
})();

export default router;
