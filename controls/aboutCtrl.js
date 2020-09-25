import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

var about = (function() {
  "use strict";

  var about_data = {};

  function init(params) {
    var data = { params };

    about_data.domIDs = {
      root: "root",
      nav: "nav",
      detail: "detail"
    };

    about_data.sessionStorageIDs = {
      movies: "movies"
    };

    about_data.params = params; // 련재 페이지에서 비동기 업데이트시 params를 사용하기 위함
    about_data.movies =
      JSON.parse(sessionStorage.getItem(about_data.sessionStorageIDs.movies)) ||
      [];
    return data;
  }

  // fetch data from server, REST API, sessionStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    // 파라미터가 없는 경우에는 영화를 클릭하지 않은 경우이므로 아래 프로세스 진행 필요없음
    // 특정 영화를 클릭한 경우 클로저 환경(메모리)에 이전에 업데이트된 정보가 남아있기 때문에
    // 그냥 /about 페이지를 클릭하더라도 이전에 저장된 정보가 보여짐
    // 클로저는 메모리에 저장하기 때문에 새로고침하면 저장된 데이티가 초기화됨

    if (initData.params.id) {
      console.log(about_data.movies);
      var clicked_movie = about_data.movies.filter(function(movie) {
        return movie.id === parseInt(initData.params.id);
      });
      components.detail.updateData(clicked_movie[0]);

      // 한번이라도 상세 페이지에 들어온 경우 현재 상세 페이지의 id 를 저장했다가 다른 페이지에서 다시 about 버튼을 클릭하면 최근에 본 상세페이지로 이동함
      sessionStorage.setItem("movie_id", initData.params.id);
    }
    components.nav.updateData({
      wishBtnDisplay: false
    });

    return initData;
  }

  // render to root element and to parent element (View)
  function renderAll(data) {
    var doms = {};

    doms[about_data.domIDs.root] = lib.dom.render(
      about_data.domIDs.root,
      pages.about.getTemplate()
    ); // root must be the first
    doms[about_data.domIDs.nav] = lib.dom.render(
      about_data.domIDs.nav,
      components.nav.getTemplate()
    );
    doms[about_data.domIDs.detail] = lib.dom.render(
      about_data.domIDs.detail,
      components.detail.getTemplate()
    ); // root must be the first

    return doms;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(doms) {
    console.log("aboutpage handler attached !");

    doms.nav.addEventListener("click", function(e) {
      var routingUrl = e.target.dataset.url;
      var movieId = sessionStorage.getItem("movie_id");
      if (routingUrl) {
        // 만약 이전에 상세 페이지에 한번이라도 들어왔다면 about 버튼 클릭시 최근 상세페이지로 이동하도록 navigation url을 변경함
        // 물론 모든 페이지들이 클로저라서 상세페이지에 한번이라도 들어왔다면 메모리에 저장된 데이터로 최근 상세페이지를 보여주지만
        // 만약에 홈페이지를 새로고침하게 되면 최근 상세페이지 데이터들이 사라지므로 about 버튼으로 다시 들어가면 초기화되었음
        if (routingUrl === "/about" && movieId) {
          routingUrl = `/about/${movieId}`;
        }
        lib.router(routingUrl);
      }
    });
  }

  // pay attention to orders of methods
  // 스코프 체인에 의해 attachHandler 메서드는 외부에서 router를 찾음
  function control(params) {
    var initData = init(params);
    var data = getData(initData);
    var doms = renderAll(data);
    attachHandler(doms);
  }
  return {
    control
  };
})();

export default about;
