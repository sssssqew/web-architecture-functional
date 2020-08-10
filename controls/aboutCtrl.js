import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

var about = (function() {
  "use strict";

  var about_data = {};

  function init(params) {
    var data = { params };
    about_data.params = params; // 비동기 업데이트시 params를 사용하기 위함
    about_data.movies = JSON.parse(localStorage.getItem("movies")) || [];
    return data;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    // 파라미터가 없는 경우에는 영화를 클릭하지 않은 경우이므로 아래 프로세스 진행 필요없음
    // 특정 영화를 클릭한 경우 클로저 환경(메모리)에 이전에 업데이트된 정보가 남아있기 때문에
    // 그냥 /about 페이지를 클릭하더라도 이전에 저장된 정보가 보여짐
    // 클로저는 메모리에 저장하기 때문에 새로고침하면 저장된 데이티가 초기화됨

    if (initData.params.id) {
      var clicked_movie = about_data.movies.filter(function(movie) {
        return movie.id === parseInt(initData.params.id);
      });
      components.detail.updateData(clicked_movie[0]);
    }
    components.nav.updateData({ wishBtnDisplay: false });

    return initData;
  }

  // render to root element and to parent element (View)
  function renderAll(data) {
    var doms = {};

    doms["root"] = lib.dom.render("root", pages.about.getTemplate()); // root must be the first
    doms["nav"] = lib.dom.render("nav", components.nav.getTemplate());
    doms["detail"] = lib.dom.render("detail", components.detail.getTemplate()); // root must be the first

    return doms;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(doms) {
    console.log("aboutpage handler attached !");

    doms.nav.addEventListener("click", function(e) {
      lib.router(e.target.dataset.url);
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
