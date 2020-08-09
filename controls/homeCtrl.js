import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";
import item from "../components/item.js";

// filter map 함수 사용하기
// 데이터 유효성 검사하기
//  에러 처리하기

// 페이지 업데이트는 하지말고 컴포넌트만 업데이트 하자
//  초기렌더링시에 핸들러 다 연결해주는게 나을듯
// 현재 페이지에서 사용할 state는 home_data에 저장하고 사용하면 됨

var home = (function() {
  "use strict";

  var home_data = {};

  function init(params) {
    var data = { params };

    // 아래와 같이 리액트처럼 state를 초기화해도 됨
    // home_data = {
    //   params: params,
    //   picks: [],
    //   checked: false
    // }

    home_data.params = params; // 비동기 업데이트시 params를 사용하기 위함
    home_data.picks = []; // 위시리스트 아이템 모음
    home_data.checked = false; // 위시리스트 버튼 클릭여부 판단
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

        home_data.items = items; // 추후 아이템 각각의 데이터 변경과 검색을 위하여 home_data에 저장하고 이벤트가 일어난 경우 사용함
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
    doms["search"] = lib.dom.render("search", components.search.getTemplate());
    doms["list"] = lib.dom.render("list", components.loading.getTemplate());
    return doms;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(doms) {
    console.log("homepage handler attached !");

    doms.nav.addEventListener("click", function(e) {
      // navigation 버튼을 클릭한 경우
      if (e.target.dataset.url) {
        lib.router(e.target.dataset.url);
      }
      // 위시리스트 버튼을 클릭한 경우
      if (e.target.id === "nav-wish-list") {
        if (e.target.checked === undefined || e.target.checked === "false") {
          lib.dom.renderMany(home_data.picks); // 전체 아이템 => 하트표시 아이템 렌더링
          e.target.checked = "true";
          home_data.checked = true;
        } else {
          lib.dom.renderMany(home_data.items); // 하트표시 아이템 => 전체 아이템 렌더링
          e.target.checked = "false";
          home_data.checked = false;
        }
      }
    });

    //  영화 검색기능 구현
    doms.search.addEventListener("keyup", function(e) {
      components.search.updateData({ inputString: e.target.value });
      console.log(components.search.getData());

      // ENTER 키 누르면 검색시작 (영화 타이틀 중에 검색창 키워드 string을 부분적으로 포함하는 모든 영화들을 서치함)
      if (e.keyCode === 13) {
        var searchedMovies = home_data.items.filter(function(item) {
          var movieTitle = item.getData().title.toLowerCase();
          var searchTitle = components.search
            .getData()
            .inputString.toLowerCase();
          return movieTitle.includes(searchTitle);
        });
        components.search.updateData({ inputString: "" }); // 입력 컴포넌트 초기화
        console.log(components.search.getData().inputString);

        // 검색된 영화로만 새로운 리스트를 만들어 리렌더링함
        lib.dom.renderMany(searchedMovies);
      }
    });

    //  이벤트 위임을 사용하여 ul 요소에만 핸들러를 붙여줌
    doms.list.addEventListener("click", function(e) {
      console.log("list clicked !");

      // 하트 또는 아이템 사이에 비어 있는 공간을 클릭하지 않은 경우
      if (e.target.id !== "list" && e.target.id !== "item-pick") {
        lib.router(`/about/${e.target.id}`);
      }

      //  문제점 2: about 페이지로 갔다가 돌아오면 home_data.picks 가 초기화 되므로 하트 표시를 기억하지 못함 (로컬스토리지에 저장했다가 읽어와서 하면 됨)

      // 하트 클릭한 경우
      if (e.target.id === "item-pick") {
        home_data.items.forEach(function(item) {
          // pick 또는 unpick 하려는 아이템을 찾음
          if (item.getData().id === parseInt(e.target.parentElement.id)) {
            // pick 이므로  home_data.picks 배열 끝에 pick 한 아이템을 추가함
            if (item.getData().pick === "../resources/undo-pick.png") {
              item.updateData({ pick: "../resources/pick.jpg" });
              home_data.picks.push(item);
            } else {
              item.updateData({ pick: "../resources/undo-pick.png" });
              // undo pick 이므로 home_data.picks 배열에서 unpick 한 아이템을 제거함
              home_data.picks = home_data.picks.filter(function(pick) {
                return (
                  pick.getData().id !== parseInt(e.target.parentElement.id)
                );
              });
            }
          }
        });

        // 위시리스트 버튼이 클릭된 상태에서 하트를 클릭한 경우 하트 표시된 아이템만 리렌더링함
        // 위시리스트 버튼이 클릭되지 않은 상태에서 하트를 클릭한 경우 전체 아이템을 리렌더링함
        if (home_data.checked === true) {
          lib.dom.renderMany(home_data.picks);
        } else {
          lib.dom.renderMany(home_data.items);
        }

        // pick 아이템 확인용 출력
        console.log("====== pick items ========");
        home_data.picks.forEach(function(item) {
          console.log(item.getData().title);
        });
      }
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
