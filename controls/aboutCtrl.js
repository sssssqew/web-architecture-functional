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
    // home_data = fetch();

    // 파라미터가 없는 경우에는 영화를 클릭하지 않은 경우이므로 아래 프로세스 진행 필요없음
    // 특정 영화를 클릭한 경우 클로저 환경(메모리)에 이전에 업데이트된 정보가 남아있기 때문에
    // 그냥 /about 페이지를 클릭하더라도 이전에 저장된 정보가 보여짐
    // 클로저는 메모리에 저장하기 때문에 새로고침하면 저장된 데이티가 초기화됨
    if (initData.params.id) {
      var movies = JSON.parse(localStorage.getItem("movies"));

      // console.log("clicked movie id:", initData.params.id);
      // console.log("movies: ", movies);

      var clicked_movie = movies.filter(function(movie) {
        return movie.id === parseInt(initData.params.id);
      });

      // console.log(clicked_movie[0].genres.join("#"));

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
  // set Data function needed

  // bind data to template (View)
  function getTemplateAll(data) {
    // console.log(data);
    var template = {};
    var about = pages.about.getTemplate();
    var detail = components.detail.getTemplate();

    template = { about, detail };
    return template;
  }

  //  lib 에 함수를 따로 뺄수도 있다
  function renderToPage(array) {
    var dom = {};
    array.forEach(function(obj) {
      var d = lib.utils.getDom(obj.id);
      d.innerHTML = obj.tem;
      dom[obj.id] = d;
    });
    return dom;
  }

  // render to root element and to parent element (View)
  function render(template) {
    var dom = {};

    var domIDs = [
      { id: "root", tem: template.about },
      { id: "detail", tem: template.detail }
    ]; // root must be the first
    dom = renderToPage(domIDs);

    return dom;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(dom) {
    console.log("aboutpage handler attached !");
  }

  // pay attention to orders of methods
  // 스코프 체인에 의해 attachHandler 메서드는 외부에서 router를 찾음
  function control(params) {
    var fns = [init, getData, getTemplateAll, render, attachHandler];
    var composedFunc = lib.utils.compose(fns);
    composedFunc(params);

    // var initData = init(params);
    // var data = getData(initData);
    // var template = getTemplateAll(data);
    // var dom = render(template);
    // attachHandler(dom);
  }
  return {
    control
  };
})();

export default about;
