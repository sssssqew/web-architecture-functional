import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

var about = (function() {
  "use strict";

  function init(params) {
    var data = { params };
    return data;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    // 파라미터가 없는 경우에는 영화를 클릭하지 않은 경우이므로 아래 프로세스 진행 필요없음
    // 특정 영화를 클릭한 경우 클로저 환경(메모리)에 이전에 업데이트된 정보가 남아있기 때문에
    // 그냥 /about 페이지를 클릭하더라도 이전에 저장된 정보가 보여짐
    // 클로저는 메모리에 저장하기 때문에 새로고침하면 저장된 데이티가 초기화됨

    if (initData.params.id) {
      var movies = JSON.parse(localStorage.getItem("movies"));

      var clicked_movie = movies.filter(function(movie) {
        return movie.id === parseInt(initData.params.id);
      });

      components.detail.updateData({
        id: clicked_movie[0].id,
        title: clicked_movie[0].title,
        rating: clicked_movie[0].rating,
        cover: clicked_movie[0].large_cover_image,
        summary: clicked_movie[0].summary,
        genres: clicked_movie[0].genres
          ? clicked_movie[0].genres.join(" #")
          : "",
        trailer: clicked_movie[0].yt_trailer_code,
        torrentUrl: clicked_movie[0].torrents[1]
          ? clicked_movie[0].torrents[1].url
          : ""
      });
    }

    return initData;
  }

  // render to root element and to parent element (View)
  function renderAll(data) {
    var doms = {};

    doms["root"] = lib.dom.render("root", pages.about.getTemplate()); // root must be the first
    doms["detail"] = lib.dom.render("detail", components.detail.getTemplate()); // root must be the first

    return doms;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(dom) {
    console.log("aboutpage handler attached !");
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
