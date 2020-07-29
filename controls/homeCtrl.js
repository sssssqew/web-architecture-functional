import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

//  컨트롤러 좀 더 정리하기 (init 함수 필요한지 생각해보기 )
// filter map 함수 사용하기
// 데이터 유효성 검사하기
//  에러 처리하기

// 페이지 업데이트는 하지말고 컴포넌트만 업데이트 하자
//  초기렌더링시에 핸들러 다 연결해주는게 나을듯

var home = (function() {
  "use strict";

  function init(params) {
    var data = { params };
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
        var itemTemplateAll = "";

        var movies = sdata.data.movies;

        // 서로 다른 페이지에서 movies 데이터를 공유하기 위하여 로컬스토리지에 저장함
        localStorage.setItem("movies", JSON.stringify(movies));

        var items = movies.map(function(movie) {
          var item = components.item();
          item.updateData({
            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            cover: movie.medium_cover_image
          });
          itemTemplateAll += item.getTemplate();
          return item;
        });

        // dom 업데이트
        var d = lib.utils.getDom("list");
        d.innerHTML = itemTemplateAll;

        // 컴포넌트만 업데이트할 거면 컴포넌트 데이터 교체하고 템플릿 가져온 다음 페이지 특정 위치에 삽입해주면 됨
        // 컴포넌트(즉시실행함수)는 하나의 실행환경이다
        // 업데이트는 하나의 실행환경을 변경하는 것이다

        // data 만들어서 getTemplateAll 부터 나머지함수 실행하기
        // params는  control 함수내에서 전역변수에 저장했다가 업데이트(리랜더링)시 사용하기

        // 처음 로딩시에는 data를 빈 객체로 넘겨주고 업데이트 시에는 업데이트에 관련된 데이터만 넘겨주기
        // data 객체의 속성으로 각 컴포넌트 이름을 설정하여 해당 컴포넌트에 관련된 데이터만 넘겨주기
        // 가령 nav 데이터라면 data.nav에 업데이트할 데이터를 설정하고 bindData(data.nav) 이렇게 넘겨주기
        // 위와 같이 하면 해당 컴포넌트에 필요한 데이터가 업데이트 되었는지 알 수 있다
        // 각 컴포넌트는 즉시실행함수로 만들어졌기 때문에 내부 지역변수(템플릿 초기값)은 메모리에 남아서 계속 업데이트된다(클로저)
        // 리렌더링은 함수(update)로 만들어서 사용하자

        // 위의 말 무슨 말이냐면 초기 렌더링시에 5개 함수가 순차적으로 실행되는거처럼 업데이트할때도 그렇게 순차 실행되는 함수를 만들려면
        // params 를 다시 가져와야 하고 업데이트될 데이터를 data.item data.nav 이런식으로 넘겨줘고 초기 렌더링처럼 함수들을 순차 실행하자는 뜻
      });

    console.log("after fetch ...");
    return initData;
  }
  // set Data function needed
  function updateData(target, updateObj) {
    target.updateData(updateObj);
  }

  // bind data to template (View)
  function getTemplateAll(data) {
    var template = {};
    var home = pages.home.getTemplate();
    var nav = components.nav.getTemplate();
    var item = "Loading...";

    template = { home, nav, item };
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
      { id: "root", tem: template.home },
      { id: "list", tem: template.item },
      { id: "nav", tem: template.nav }
    ]; // root must be the first
    dom = renderToPage(domIDs);

    return dom;
  }

  // dictate all of handlers for page (Controller)
  function attachHandler(dom) {
    console.log("homepage handler attached !");

    dom.nav.addEventListener("click", function(e) {
      lib.router(e.target.dataset.url);
    });
    //  이벤트 위임을 사용하여 ul 요소에만 핸들러를 붙여줌
    dom.list.addEventListener("click", function(e) {
      console.log("list clicked !");
      lib.router(`/about/${e.target.id}`);
    });
  }

  function update(target, updateObj) {
    updateData(target, updateObj);
    getTemplateAll();
    render();
    attachHandler();
  }

  // pay attention to orders of methods
  function control(params) {
    var fns = [init, getData, getTemplateAll, render, attachHandler];
    var composedFunc = lib.utils.compose(fns);
    composedFunc(params);
  }
  return {
    control
  };
})();

export default home;
