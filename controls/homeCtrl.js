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
    home_data.movies = JSON.parse(localStorage.getItem("movies")) || [];
    home_data.wishList = JSON.parse(localStorage.getItem("wishList")) || []; // 위시리스트 아이템 모음
    home_data.checked = JSON.parse(localStorage.getItem("wishButton")) || false; // 위시리스트 버튼 클릭여부 판단
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

    // 캐쉬사용 (서버에서 데이터를 한번만 가져옴)
    //이렇게 하면 변경된 부분이 서버에 반영이 안될것 같지만
    // 로컬스토리지에 변경된 데이터를 계속 팔로잉하고 있다가
    // 사용자가 로그아웃할때 하기전에 로컬스토리지에 마지막으로 변경된 데이터를 서버에 저장함
    // 이렇게 하면 서버에 여러번 접속함으로 인한 사용자 불편함으로 해소하고 오프라인에서도 사용가능함
    // 그러나 DB에서 실시간으로 데이터를 바로 바로 가져와서 렌더링해야 하는 경우 아래 코드처럼 짜면 안된다.
    if (home_data.movies.length === 0) {
      lib.server
        .transfer(LIST_MOVIES_URL)
        .then(function(res) {
          return res.json();
        })
        .then(function(sdata) {
          // API 에서 받은 값 중에서 필요한 값만 추출해서 사용하고 내가 필요한 속성은 따로 추가하여 사용함
          // 여기서 pick은 API에서 추출한 속성이 아니라 내가 필요해서 추가한 속성임
          console.log(sdata.data.movies.length);
          var emptyHeartIcon = "../resources/undo-pick.png";
          home_data.movies = sdata.data.movies.map(function(movie) {
            return {
              id: movie.id,
              title: movie.title,
              rating: movie.rating,
              year: movie.year,
              runtime: movie.runtime,
              cover: movie.medium_cover_image,
              summary: movie.summary,
              genres: movie.genres ? movie.genres.join(" #") : "",
              trailer: movie.yt_trailer_code,
              torrentUrl: movie.torrents[1] ? movie.torrents[1].url : "",
              pick: emptyHeartIcon
            };
          });

          // 서로 다른 페이지에서 movies 데이터를 공유하기 위하여 로컬스토리지에 저장함
          localStorage.setItem("movies", JSON.stringify(home_data.movies));
          lib.dom.renderMany(home_data.movies);

          // 컴포넌트만 업데이트할 거면 컴포넌트 데이터 교체하고 템플릿 가져온 다음 페이지 특정 위치에 삽입해주면 됨
          // 컴포넌트(즉시실행함수)는 하나의 실행환경이다
          // 업데이트는 하나의 실행환경(클로저)을 변경하는 것이다

          // params는  init 함수내에서 전역변수에 저장했다가 업데이트(리랜더링)시 사용하기
        });
    }

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

    //  // 서버에서 한번 읽어온 이후부터는 로컬스토리지에서 읽어온 데이티로 렌더링함
    if (home_data.movies.length !== 0) {
      if (home_data.checked === true) {
        lib.dom.renderMany(home_data.wishList); // 새로 렌더링할때 위시리스트 버튼이 이전에 클릭되어 있다면 위시리스트만 보여줌
      } else {
        lib.dom.renderMany(home_data.movies);
      }
    }
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
        if (home_data.checked === false) {
          lib.dom.renderMany(home_data.wishList); // 전체 아이템 => 하트표시 아이템 렌더링
          home_data.checked = true;
          localStorage.setItem("wishButton", home_data.checked);
        } else {
          lib.dom.renderMany(home_data.movies); // 하트표시 아이템 => 전체 아이템 렌더링
          home_data.checked = false;
          localStorage.setItem("wishButton", home_data.checked);
        }
      }
    });

    //  영화 검색기능 구현
    doms.search.addEventListener("keyup", function(e) {
      components.search.updateData({ inputString: e.target.value });
      console.log(components.search.getData());

      // ENTER 키 누르면 검색시작 (영화 타이틀 중에 검색창 키워드 string을 부분적으로 포함하는 모든 영화들을 서치함)
      if (e.keyCode === 13) {
        var searchedMovies = home_data.movies.filter(function(movie) {
          var movieTitle = movie.title.toLowerCase();
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

      // 하트 클릭한 경우
      if (e.target.id === "item-pick") {
        home_data.movies = home_data.movies.map(function(movie) {
          // pick 또는 unpick 하려는 아이템을 찾음
          if (movie.id === parseInt(e.target.parentElement.id)) {
            // pick 이므로  home_data.picks 배열 끝에 pick 한 아이템을 추가함
            if (movie.pick === "../resources/undo-pick.png") {
              movie.pick = "../resources/pick.jpg";
              home_data.wishList.push(movie);
              localStorage.setItem(
                "wishList",
                JSON.stringify(home_data.wishList)
              );
            } else {
              movie.pick = "../resources/undo-pick.png";
              // undo pick 이므로 home_data.picks 배열에서 unpick 한 아이템을 제거함
              home_data.wishList = home_data.wishList.filter(function(movie) {
                return movie.id !== parseInt(e.target.parentElement.id);
              });
              localStorage.setItem(
                "wishList",
                JSON.stringify(home_data.wishList)
              );
            }
          }
          return movie;
        });

        // movies 중 특정 movies의 속성이 변경되었기 때문에 다시 로컬스토리에 업데이트 해줘야함
        localStorage.setItem("movies", JSON.stringify(home_data.movies));

        // 위시리스트 버튼이 클릭된 상태에서 하트를 클릭한 경우 하트 표시된 아이템만 리렌더링함
        // 위시리스트 버튼이 클릭되지 않은 상태에서 하트를 클릭한 경우 전체 아이템을 리렌더링함
        if (home_data.checked === true) {
          lib.dom.renderMany(home_data.wishList);
        } else {
          lib.dom.renderMany(home_data.movies);
        }

        // pick 아이템 확인용 출력
        console.log("====== picked items ========");
        home_data.wishList.forEach(function(movie) {
          console.log(movie.title);
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
