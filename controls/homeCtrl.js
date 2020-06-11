import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";

// router 모듈 함수형 프로그래밍 적용하기
//  컨트롤러 좀 더 정리하기 (init 함수 필요한지 생각해보기 )
// filter map 함수 사용하기
// 데이터 유효성 검사하기
//  에러 처리하기
var home = (function() {
  "use strict";

  // 필요없을지도 모른다
  // params를 곧바로 getData 메서드에 주입할 수도 있다
  function init(params) {
    var data = { params };
    return data;
  }

  // fetch data from server, REST API, localStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    var proxy = "http://192.168.0.6:8080/";
    // var proxy = "http://121.150.100.193:8080/";
    var BASE_URL = "https://yts.lt/api/v2/";
    var LIST_MOVIES_URL = `${proxy + BASE_URL}list_movies.json`;
    console.log(LIST_MOVIES_URL);

    // var server_data = await lib.server.transfer(LIST_MOVIES_URL);
    lib.server
      .transfer(LIST_MOVIES_URL)
      .then(function(res) {
        return res.json();
      })
      .then(function(sdata) {
        console.log(sdata.data.movies[0]);
        var itemTemplateAll = "";

        var movies = sdata.data.movies;
        var items = movies.map(function(movie) {
          var item = components.item();
          item.updateData({ title: movie.title, rating: movie.rating });
          itemTemplateAll += item.getTemplate();
          return item;
        });

        console.log(itemTemplateAll);

        var d = lib.utils.getDom("list");
        d.innerHTML = itemTemplateAll;

        // data 만들어서 getTemplateAll 부터 나머지함수 실행하기
        // params는  control 함수내에서 전역변수에 저장했다가 업데이트(리랜더링)시 사용하기
        // init에 있는 초기 데이터는 각 컴포넌트 초기값으로 옮기기
        // 처음 로딩시에는 data를 빈 객체로 넘겨주고 업데이트 시에는 업데이트에 관련된 데이터만 넘겨주기
        // data 객체의 속성으로 각 컴포넌트 이름을 설정하여 해당 컴포넌트에 관련된 데이터만 넘겨주기
        // 가령 nav 데이터라면 data.nav에 업데이트할 데이터를 설정하고 bindData(data.nav) 이렇게 넘겨주기
        // 위와 같이 하면 해당 컴포넌트에 필요한 데이터가 업데이트 되었는지 알 수 있다
        // 각 컴포넌트는 즉시실행함수로 만들어졌기 때문에 내부 지역변수(템플릿 초기값)은 메모리에 남아서 계속 업데이트된다(클로저)
        // 리렌더링은 함수(update)로 만들어서 사용하자

        //  동기 비동기 업데이트 다른 문제
        //  리스트인 경우 컴포넌트 업데이트 문제
        //  특정 리스트를 어떻게 업데이트할 것인가(현재 구분할수 없음) => 각 리스트에 id 값을 넣어주고 클릭시 id값으로 변경하면 됨
        //  updateData 대신에 updateTemplate을 해서 업데이트하고 바로 템플릿을 가져와야 하는가
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
    console.log(data);
    var template = {};
    var home = pages.home.getTemplate();
    var nav = components.nav.getTemplate();

    var item1 = components.item(); // 클로저 (item 컴포넌트는 각각이 서로 다른 실행환경을 가지고 각각 다르게 업데이트되어야 하므로 즉시실행함수가 아니라 클로저함수로 만들어야함)
    var item2 = components.item();
    item1.updateData({ title: "두리안" });
    item2.updateData({ title: "사과" });
    var item1tem = item1.getTemplate();
    var item2tem = item2.getTemplate();
    var item = "";
    item += item1tem;
    item += item2tem;

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
      // console.log(lib.utils.checkTypeOfData([1, 2, 3, 4]));
      // testDeepCopy();

      // console.log(lib.utils.generateUUID4());
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
