import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";
import item from "../components/item.js";

// filter map 함수 사용하기
// 데이터 유효성 검사하기
//  에러 처리하기

// 페이지 업데이트는 하지말고 컴포넌트만 업데이트 하자
//  초기렌더링시에 핸들러 다 연결해주는게 나을듯

var home = (function() {
  "use strict";

  var home_data = {};

  function init(params) {
    var data = { params };
    home_data.params = params; // 비동기 업데이트시 params를 사용하기 위함
    return data;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    var numOfMovies = 50;
    // var proxy =
    //   "http://ec2-13-125-247-196.ap-northeast-2.compute.amazonaws.com:8081/"; // 포트포워딩 설정

    var proxy = "http://localhost:8081/"; // 포트포워딩 설정
    var BASE_URL = "https://yts.lt/api/v2/";
    var LIST_MOVIES_URL = `${proxy +
      BASE_URL}list_movies.json?limit=${numOfMovies}`;
    console.log(LIST_MOVIES_URL);

    lib.server
      .transfer(LIST_MOVIES_URL)
      .then(function(res) {
        return res.json();
      })
      .then(function(sdata) {
        console.log(sdata.data.movies.length);
        var movies = sdata.data.movies;

        // 서로 다른 페이지에서 movies 데이터를 공유하기 위하여 로컬스토리지에 저장함
        localStorage.setItem("movies", JSON.stringify(movies));

        var itemTemplates = "";

        var items = movies.map(function(movie) {
          var item = components.item();

          item.updateData({
            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            cover: movie.medium_cover_image
          });
          itemTemplates += item.getTemplate();
          return item;
        });

        lib.dom.render("list", itemTemplates);

        // 컴포넌트만 업데이트할 거면 컴포넌트 데이터 교체하고 템플릿 가져온 다음 페이지 특정 위치에 삽입해주면 됨
        // 컴포넌트(즉시실행함수)는 하나의 실행환경이다
        // 업데이트는 하나의 실행환경(클로저)을 변경하는 것이다

        // params는  init 함수내에서 전역변수에 저장했다가 업데이트(리랜더링)시 사용하기
      });

    console.log("after fetch ...");
    return initData;
  }

  // render to root element and to parent element (View)
  function renderAll(data) {
    var doms = {};
    doms["root"] = lib.dom.render("root", pages.home.getTemplate()); // root must be the first
    doms["nav"] = lib.dom.render("nav", components.nav.getTemplate());
    doms["list"] = lib.dom.render("list", "Loading ...");
    return doms;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(doms) {
    console.log("homepage handler attached !");

    doms.nav.addEventListener("click", function(e) {
      lib.router(e.target.dataset.url);
    });
    //  이벤트 위임을 사용하여 ul 요소에만 핸들러를 붙여줌
    doms.list.addEventListener("click", function(e) {
      console.log("list clicked !");
      lib.router(`/about/${e.target.id}`);
    });
  }

  // pay attention to orders of methods
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

export default home;
