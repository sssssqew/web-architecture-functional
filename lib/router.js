var router = (function() {
  "use strict";

  function concatObj(obj1, obj2) {
    var ret = {};
    for (var key in obj1) {
      ret[key] = obj1[key];
    }
    for (var key in obj2) {
      ret[key] = obj2[key];
    }
    return ret;
  }
  function changeURL(path) {
    const prevPath = sessionStorage.getItem("currentUrl");

    // // 현재 들어온 path와 이전 경로를 비교해서 다른 경우 (페이지 이동을 의미함)
    if (prevPath !== path) {
      window.history.pushState({}, "", path); // change window location object and url
      // 페이지를 이동할때마다 세션에 현재 URL주소를 저장해뒀다가 새로고침하면 세션에 저장된 페이지로 이동함 (서버 사이드 렌더링 없이 현재 페이지 보여줌)
      sessionStorage.setItem("currentUrl", path);
    }
  }

  function getFragments(discriminator) {
    var fragments = {};
    for (var i = 1; i < arguments.length; i++) {
      fragments[i] = arguments[i].split(discriminator);
    }
    return fragments;
  }

  function parseQuerystring(search) {
    // var search = window.location.search;
    var params = {};
    if (search === "") return params;

    var qs = search.slice(1).split("&");
    params.queries = qs.map(function(q) {
      var pair = q.split("=");
      var key = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      return { key, value };
    });
    return params;
  }

  function parseURLparameter(url) {
    var parsed = {};

    var fragments = getFragments("/", url, window.location.pathname);
    var urlFragments = fragments[1];
    var pathFragments = fragments[2];

    urlFragments.some(function(fragment, i) {
      if (fragment[0] === ":" && pathFragments[i]) {
        // 파라미터가 없는 경우도 여기에 걸리므로 반드시 파라미터 값이 있는지 체크해야 함
        var name = fragment.slice(1);
        parsed[name] = decodeURIComponent(pathFragments[i]);
      }
    });

    return parsed;
  }

  // check if  path and one of routes match
  function isURLmatched(urlFragments, pathFragments) {
    return urlFragments.every(function(fragment, i) {
      return fragment === pathFragments[i] || fragment[0] === ":";
    });
  }

  function findMatchedURL(urls) {
    var matchedURL = "";
    urls.some(function(url) {
      var fragments = getFragments("/", url, window.location.pathname);
      var urlFragments = fragments[1];
      var pathFragments = fragments[2];

      //  주석 처리 이유는 /about /about/:id 처럼 파라미터 유무에 따른 두 가지 경우 모두 라우팅하기 위함
      // if (pathFragments.length !== urlFragments.length) return;
      if (isURLmatched(urlFragments, pathFragments)) {
        matchedURL = url;
        return;
      }
    });
    return matchedURL;
  }

  function routeToMatchedURL(params) {
    var r = null;
    var parsed = null;
    var paramsAll = null;
    var urls = Object.keys(window.routes);
    var matchedURL = findMatchedURL(urls);

    parsed = parseURLparameter(matchedURL);
    paramsAll = concatObj(params, parsed);
    console.log(paramsAll);

    r = window.routes[matchedURL]; // store matched controller
    (r || window.routes.otherwise)(paramsAll); // execute controller
    return paramsAll;
  }

  // path는 다음에 이동할 URL 주소이므로 history pushState함수로 location 객체를 다음 URL 상태로 변경해줘야
  // 다음 URL의 parameter나 querystring을 가져올 수 있으므로 history pushState 함수는 상단에 위치하였음

  // parse URL and execute matched conftroller
  function router(path) {
    var params = null;
    var paramsAll = null;

    // don't change order of code
    changeURL(path);
    params = parseQuerystring(window.location.search);
    paramsAll = routeToMatchedURL(params);
  }
  return router;
})();

export default router;
