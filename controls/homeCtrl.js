import pages from "../pages/index.js";
import components from "../components/index.js";
import lib from "../lib/index.js";
import item from "../components/item.js";

import emptyHeartUrl from "../resources/undo-pick.png";
import fullHeartUrl from "../resources/pick.png";

// 데이터 유효성 검사하기
//  에러 처리하기
// todo : 로그아웃 하거나 브라우저 종료할때 로컬 스토리지 비워야 함

var home = (function() {
  "use strict";

  // 리액트의 state와 같은 역할
  // 현재 페이지에서 사용할 임시 데이터들을 저장하고 사용함 (전역변수)
  var home_data = {};

  // 헬퍼 함수 (중복되는 코드 정리)
  function _renderMoviesByWishListBtnState(btnState) {
    // 변수만 인자로 넣어주면 됨
    if (btnState === true) {
      // 위시리스트 버튼이 클릭되어 있는 경우 위시리스트만 렌더링함
      lib.dom.updateAndRenderMany(
        components.item,
        home_data.wishList,
        home_data.domIDs.list
      );
    } else {
      // 위시리스트 버튼이 클릭되지 않은 경우 전체 무비리스트 렌더링함
      lib.dom.updateAndRenderMany(
        components.item,
        home_data.movies,
        home_data.domIDs.list
      );
    }
  }

  function init(params) {
    var data = { params };

    /****************** 자주 사용하는 상수 선언 ****************/
    //home_data.domIDs.modal
    home_data.domIDs = {
      // 현재 페이지에서 사용할 DOM 객체의 ID 모음
      root: "root",
      nav: "nav",
      search: "search",
      list: "list",
      modal: "modal",
      modalFrame: "modal-frame",
      modalDelete: "modal-delete",
      modalClose: "modal-close",
      wishList: "nav-wish-list",
      pick: "item-pick",
      delete: "item-delete"
    };

    // 브라우저가 종료될때만 스토리지가 자동으로 비어지도록 session storage로 변경함
    // local storage는 브라우저를 종료해도 남아있어서 사용하기 애매함
    // 로그아웃 하기전에 세션 스토리지 비워야 함
    home_data.sessionStorageIDs = {
      // 현재 페이지에서 사용할 로컬 스토리지의 ID 모음
      movies: "movies",
      wishList: "wishList",
      wishButton: "wishButton",
      wishBtnString: "wishBtnString",
      scrollPosition: "scrollPosition"
    };

    home_data.server = {
      // 현재 페이지에서 사용할 API 관련 상수 모음
      numOfMovies: 15,
      baseUrl: "https://yts.mx/api/v2/" // 기본 API 주소
    };

    home_data.heartIconUrls = {
      // 현재 페이지에서 사용할 하트 아이콘 리소스 주소
      empty: emptyHeartUrl,
      full: fullHeartUrl
    };

    home_data.btnStrings = {
      // 현재 페이지에서 사용할 버튼 텍스트 상수
      wishBtnClicked: "Total items",
      wishBtnUndo: "Picked items"
    };

    // home_data.modal = {
    //   show: "show",
    //   hidden: "hidden",
    //   auto: "auto"
    // };

    /****************** 자주 사용하는 변수 선언 ****************/

    home_data.params = params; // 비동기 업데이트시 params를 사용하기 위함
    home_data.clickedMovieID = -1;
    home_data.movies =
      JSON.parse(sessionStorage.getItem(home_data.sessionStorageIDs.movies)) ||
      []; // Movies 데이터 배열
    home_data.wishList =
      JSON.parse(
        sessionStorage.getItem(home_data.sessionStorageIDs.wishList)
      ) || []; // 위시리스트 데이터 배열
    home_data.checked =
      JSON.parse(
        sessionStorage.getItem(home_data.sessionStorageIDs.wishButton)
      ) || false; // 위시리스트 버튼 클릭여부 판단
    home_data.wishBtnString =
      JSON.parse(
        sessionStorage.getItem(home_data.sessionStorageIDs.wishBtnString)
      ) || home_data.btnStrings.wishBtnUndo; // 현재 위시리스트 버튼 텍스트
    home_data.scrollPosition =
      JSON.parse(
        sessionStorage.getItem(home_data.sessionStorageIDs.scrollPosition)
      ) || 0;

    return data;
  }

  // fetch data from server, REST API, sessionStorage, URL parameters, URL querystring (Model)
  function getData(initData) {
    // var proxy =
    //   "http://ec2-13-125-247-196.ap-northeast-2.compute.amazonaws.com:8081/"; // 포트포워딩 설정

    // Movies 데이터를 가져오기 위한 URL 생성
    var LIST_MOVIES_URL = `${home_data.server.baseUrl}list_movies.json?limit=${home_data.server.numOfMovies}`;
    console.log(LIST_MOVIES_URL);

    // 캐쉬사용 (서버에서 데이터를 한번만 가져옴)
    // 만약 클라이언트에서 데이터 변경이 일어나면 로컬스토리지에 일단 변경된 데이터를 저장해둠
    // 사용자가 로그아웃하기 전에 로컬스토리지에 마지막으로 변경된 데이터를 서버에 업데이트함
    // 이렇게 하면 서버에 여러번 접속함으로 인한 사용자 불편함을 해소하고 오프라인에서도 사용가능함
    // 그러나 DB에서 실시간으로 데이터를 바로 바로 가져와서 렌더링해야 하는 경우 아래 코드처럼 짜면 안된다.
    if (home_data.movies.length === 0) {
      lib.server.transfer(LIST_MOVIES_URL).then(function(res) {
        console.table(res); // 응답값을 테이블로 보여줌

        // API 에서 받은 값 중에서 필요한 값만 추출해서 사용하고 내가 필요한 속성은 따로 추가하여 사용함
        // 여기서 pick은 API에서 추출한 속성이 아니라 내가 필요해서 추가한 속성임
        console.log(res.data.data.movies.length);
        home_data.movies = res.data.data.movies.map(function(movie) {
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
            pick: home_data.heartIconUrls.empty
          };
        });

        // 서로 다른 페이지에서 movies 데이터를 공유하기 위하여 로컬스토리지에 저장함
        // 전역변수 값이 변경되면 로컬 스토리지에 업데이트함 (movies 값 변경됨)
        sessionStorage.setItem(
          home_data.sessionStorageIDs.movies,
          JSON.stringify(home_data.movies)
        );
        lib.dom.updateAndRenderMany(
          components.item,
          home_data.movies,
          home_data.domIDs.list
        );
      });
    }
    // 위시리스트 버튼 표시, 위시리스트 버튼 텍스트 설정
    components.nav.updateData({
      wishBtnDisplay: true,
      wishBtnString: home_data.wishBtnString
    });

    console.log("after fetch ...");
    return initData;
  }

  // render to root element and to parent element (View)
  function renderAll(data) {
    var doms = {};
    doms[home_data.domIDs.root] = lib.dom.render(
      home_data.domIDs.root,
      pages.home.getTemplate()
    ); // 다른 컴포넌트가 렌더링되기 전에 root DOM 객체에 페이지가 우선적으로 렌더링되어야 함
    doms[home_data.domIDs.nav] = lib.dom.render(
      home_data.domIDs.nav,
      components.nav.getTemplate()
    );
    // 검색창 렌더링
    doms[home_data.domIDs.search] = lib.dom.render(
      home_data.domIDs.search,
      components.search.getTemplate()
    );
    // 무비 리스트 렌더링
    doms[home_data.domIDs.list] = lib.dom.render(
      home_data.domIDs.list,
      components.loading.getTemplate()
    );
    // 모달창 렌더링
    doms[home_data.domIDs.modal] = lib.dom.render(
      home_data.domIDs.modal,
      components.modal.getTemplate()
    );

    // 서버에서 한번 접속한 다음에는 로컬스토리지에서 읽어온 데이티로 렌더링함
    if (home_data.movies.length !== 0) {
      console.log(home_data.scrollPosition);
      _renderMoviesByWishListBtnState(home_data.checked);
      window.scroll(
        home_data.scrollPosition.xpos,
        home_data.scrollPosition.ypos
      );
    }
    return doms;
  }

  // dictate all of handlers for page (Controller)
  //  초기렌더링시 페이지 DOM 객체에 모든 핸들러를 연결해줌 (이벤트 위임을 사용하여 이벤트를 캡쳐함)
  // 페이지에 모든 핸들러가 연결되므로 컴포넌트 업데이트시 핸들러를 연결해주지 않아도 되서 편함
  // 이벤트 핸들러 패턴 : 전역변수 변경시 로컬스토리지 업데이트 => 필요한 컴포넌트 업데이트 및 리렌더링
  function attachHandler(doms) {
    console.log("homepage handler attached !");

    // 네비게이션 바를 클릭한 경우
    doms.nav.addEventListener("click", function(e) {
      var routingUrl = e.target.dataset.url;
      var movieId = sessionStorage.getItem("movie_id");
      // home, about 등의 네비게이션 버튼을 클릭한 경우
      if (routingUrl) {
        // 만약 이전에 상세 페이지에 한번이라도 들어왔다면 about 버튼 클릭시 최근 상세페이지로 이동하도록 navigation url을 변경함
        // 물론 모든 페이지들이 클로저라서 상세페이지에 한번이라도 들어왔다면 메모리에 저장된 데이터로 최근 상세페이지를 보여주지만
        // 만약에 홈페이지를 새로고침하게 되면 최근 상세페이지 데이터들이 사라지므로 about 버튼으로 다시 들어가면 초기화되었음
        if (routingUrl === "/about" && movieId) {
          routingUrl = `/about/${movieId}`;
        }
        lib.dom.saveScrollPosition(home_data.sessionStorageIDs.scrollPosition);
        lib.router(routingUrl);
      }

      // 위시리스트 버튼을 클릭한 경우
      // 모든 업데이트는 3단계로 진행됨 (데이터 state 변경 -> 로컬스토리지 저장 -> UI 변경)
      if (e.target.id === home_data.domIDs.wishList) {
        if (home_data.checked === false) {
          lib.utils.setState(home_data, "checked", true);
          lib.utils.setState(
            home_data,
            "wishBtnString",
            home_data.btnStrings.wishBtnClicked
          );
          // home_data.checked = true;
          // home_data.wishBtnString = home_data.btnStrings.wishBtnClicked; // 버튼텍스트 변경
        } else {
          lib.utils.setState(home_data, "checked", false);
          lib.utils.setState(
            home_data,
            "wishBtnString",
            home_data.btnStrings.wishBtnUndo
          );
          // home_data.checked = false;
          // home_data.wishBtnString = home_data.btnStrings.wishBtnUndo; // 버튼텍스트 변경
        }
        // 전역변수 값이 변경되면 로컬 스토리지에 업데이트함 (checked, wishBtnString 값 변경됨)
        sessionStorage.setItem(
          home_data.sessionStorageIDs.wishButton,
          JSON.stringify(home_data.checked)
        );
        sessionStorage.setItem(
          home_data.sessionStorageIDs.wishBtnString,
          JSON.stringify(home_data.wishBtnString)
        );

        // 변경된 버튼텍스트로 컴포넌트를 리렌더링함
        lib.dom.updateAndRenderSingle(
          components.nav,
          { wishBtnString: home_data.wishBtnString },
          home_data.domIDs.nav
        );

        // 위시리스트 버튼 상태에 따라 전체 아이템 디스플레이 또는 위시리스트 디스플레이
        // 이것도 사실 세션 스토리지에 전체무비 HTML 스트링이나 위시리스트 HTML 스트링으로 저장해서 캐싱하고 있었으면 곧바로 렌더링만 해주면 됨
        // 그래도 어차피 전체 다 렌더링해주는건 같음
        _renderMoviesByWishListBtnState(home_data.checked);
      }
    });

    //  영화 검색기능 구현
    doms.search.addEventListener("keyup", function(e) {
      components.search.updateData({ inputString: e.target.value }); // 사용자가 입력한 키워드로 컴포넌트 업데이트
      console.log(components.search.getData());

      // ENTER 키 누르면 검색시작 (영화 타이틀 중에 검색창 키워드를 부분적으로 포함하는 모든 영화들을 검색함)
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
        lib.dom.updateAndRenderMany(
          components.item,
          searchedMovies,
          home_data.domIDs.list
        );
      }
    });

    //  이벤트 위임을 사용하여 ul 요소에만 핸들러를 붙여줌
    doms.list.addEventListener("click", function(e) {
      console.log("list clicked !");

      // 하트 또는 삭제버튼 또는 아이템 사이에 비어 있는 공간을 클릭하지 않은 경우 (즉, 상세페이지를 보기 위하여 영화 커버를 클릭한 경우)
      if (
        e.target.id !== home_data.domIDs.list &&
        e.target.id !== home_data.domIDs.pick &&
        e.target.id !== home_data.domIDs.delete
      ) {
        lib.dom.saveScrollPosition(home_data.sessionStorageIDs.scrollPosition);

        lib.router(`/about/${e.target.id}`);
      }

      //아이템 삭제 버튼을 클릭한 경우
      if (e.target.id === home_data.domIDs.delete) {
        var titleOfMovie = e.target.parentElement.querySelector("h5").innerHTML;
        // 모달창 삭제 버튼을 클릭할때 이전에 무슨 영화를 삭제하려고 하는지 기억하기 위함
        lib.utils.setState(
          home_data,
          "clickedMovieID",
          e.target.parentElement.id
        );
        console.log("movie id to delete: ", home_data.clickedMovieID);
        // home_data.clickedMovieID = e.target.parentElement.id;

        console.log(titleOfMovie);

        // 모달창 바디섹션 풋터섹션 변경
        lib.dom.updateAndRenderSingle(
          components.modal,
          {
            bodyString: `Are you sure to delete this movie? <br/> ${titleOfMovie} `,
            footerBtnString: "Delete"
          },
          home_data.domIDs.modal
        );
        lib.dom.showModal(doms.modal);
      }

      // 찜하기(하트)를 클릭한 경우
      if (e.target.id === home_data.domIDs.pick) {
        var changedMovies = home_data.movies.map(function(movie) {
          // 위시리스트에 추가하려는 아이템을 찾음
          if (movie.id === parseInt(e.target.parentElement.id)) {
            if (movie.pick === home_data.heartIconUrls.empty) {
              // e.target 이 이미지이므로 해당 이미지의 소스 주소만 변경해주면 될듯
              e.target.src = home_data.heartIconUrls.full;
              movie.pick = home_data.heartIconUrls.full; // pick 이므로 색칠한 하트 모양으로 리소스 주소를 변경함
              home_data.wishList.push(movie); // pick 이므로  home_data.wishList 배열 끝에 pick 한 아이템을 추가함
            } else {
              e.target.src = home_data.heartIconUrls.empty;
              movie.pick = home_data.heartIconUrls.empty; // undo pick 이므로 빈 하트 모양으로 리소스 주소를 변경함
              home_data.wishList = home_data.wishList.filter(function(movie) {
                return movie.id !== parseInt(e.target.parentElement.id);
              }); // undo pick 이므로 home_data.wishList 배열에서 unpick 한 아이템을 제거함
            }
          }
          return movie;
        });

        lib.utils.setState(home_data, "movies", changedMovies);

        // 전역변수 값이 변경되면 로컬 스토리지에 업데이트함 (wishList 값 변경됨)
        sessionStorage.setItem(
          home_data.sessionStorageIDs.wishList,
          JSON.stringify(home_data.wishList)
        );

        // movies 중 특정 movie 의 속성(pick)이 변경되었기 때문에 다시 로컬스토리에 업데이트 해줘야함 (movies 값 변경됨)
        sessionStorage.setItem(
          home_data.sessionStorageIDs.movies,
          JSON.stringify(home_data.movies)
        );

        // 하트 클릭 하나에 전체 리스트의 렌더링을 모두 해주는건 성능 낭비 (하트 리소스 주소만 변경해주고 끝내기)
        // _renderMoviesByWishListBtnState(home_data.checked);

        // 위시리스트 아이템 확인용 출력
        console.log("====== picked items ========");
        home_data.wishList.forEach(function(movie) {
          console.log(movie.title);
        });
      }
    });

    // 모달창에서 클릭이 일어난 경우
    doms.modal.addEventListener("click", function(e) {
      console.log("modal clicked ! ...");

      // 모달창 close 버튼 클릭한 경우
      if (e.target.id === home_data.domIDs.modalClose) {
        lib.dom.hideModal(doms.modal);
      }
      // 모달창 delete 버튼 클릭한 경우
      if (e.target.id === home_data.domIDs.modalDelete) {
        // 삭제한 영화를 다시 추가할수는 없으니까 위시리스트까지 삭제해도 될듯
        // 무비삭제  전체 리스트 + 위시리스트 모두 해당 무비 삭제
        var changedMovies = home_data.movies.filter(function(movie) {
          return movie.id !== parseInt(home_data.clickedMovieID);
        });
        var changedWishList = home_data.wishList.filter(function(movie) {
          return movie.id !== parseInt(home_data.clickedMovieID);
        });

        lib.utils.setState(home_data, "movies", changedMovies);
        lib.utils.setState(home_data, "wishList", changedWishList);
        lib.utils.setState(home_data, "clickedMovieID", -1);

        // home_data.clickedMovieID = -1;
        // 전역변수 movies, wishLIst 값이 변경되었으므로 로컬스토리지 업데이트함
        sessionStorage.setItem(
          home_data.sessionStorageIDs.movies,
          JSON.stringify(home_data.movies)
        );
        sessionStorage.setItem(
          home_data.sessionStorageIDs.wishList,
          JSON.stringify(home_data.wishList)
        );
        lib.dom.hideModal(doms.modal);

        // 위시리스트 버튼 상태에 따라 전체 아이템 디스플레이 또는 위시리스트 디스플레이
        _renderMoviesByWishListBtnState(home_data.checked);
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
