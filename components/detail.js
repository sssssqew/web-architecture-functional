import lib from "../lib/index.js";

// item 컴포넌트는 각각이 서로 다른 렉시컬 실행환경을 가져야 하므로 즉시실행함수로 한번만 실행하면 하나의 실행환경만 가지게 됨
// 여러개의 서로 다른 실행환경을 가지려면 item 을 클로저로 만들어서 실행환경을 만들고 싶을때마다 함수를 실행해야 함
// 쉽게 말해서 아래 함수가 실행될때마다(리턴할때마다) 메모리에 서로 다른 실행환경이 만들어지고 각각의 실행환경들은 메모리 변수에 서로 다른 값들을 가지게 된다
// 즉 각각의 item 은 메모리에 서로 다른 값들을 저장하고 서로 다르게 업데이트가 가능하다
var detail = (function() {
  "use strict";

  var detail_data = {
    id: 0,
    title: "detail",
    rating: "0",
    cover: "../resources/default-movie.png",
    summary: "",
    genres: "",
    trailer: "",
    torrentUrl: ""
  };

  //  아이템을 클릭했을때 image를 클릭하느냐 li 배경을 클릭하느냐 title을 클릭하느냐에 따라 e.target이 달라져서 그냥 모든 요소에 같은 id값을 삽입했음
  //  css 는 폴더 하나 만들고 컴포넌트마다 css 분리해서 관리하고 인라인 스타일 대신 class 선언해서 스타일링하기
  //  home 으로 되돌아갈때 뒤로가기 버튼을 누르면 popState 되면서 여전히 이전에 데이티가 저장되어 있지만
  // home 버튼을 누르면 새로고침 하는거라서 클로저에 저장된 데이터가 지워져서 /about 페이지 버튼을 누르면 초기값으로 렌더링된다
  // 추후 home 버튼은 클릭시 window state pop 해서 이전 주소로 돌아가도록 하자
  function getTemplate() {
    return `<div id=${detail_data.id} class="detail-card">
                  <div class="detail-main">
                    <div>
                      <img src="${detail_data.cover}" class="detail-cover"/>
                      <h4 class="detail-title">${detail_data.title} (${
      detail_data.rating
    }) </h4>
                      
                       <a href="${
                         detail_data.trailer
                           ? `https://www.youtube.com/watch?v=${detail_data.trailer}`
                           : ""
                       }" target="_blank" class="detail-trailer">${
      detail_data.trailer ? "Click to see trailer" : "No trailer"
    }</a>
                    </div>

                    <div class="detail-summary">
                      ${detail_data.summary} <br/>
                      <a href="/" class="detail-home"> ◀️ Home</a>
                      <a href="${
                        detail_data.torrentUrl ? detail_data.torrentUrl : ""
                      }" class="detail-torrent">${
      detail_data.torrentUrl ? " ☺️ Click to download torrent" : "No Torrent :("
    }</a>
                    </div>
                  </div>

                  <div class="detail-genres">
                    #${detail_data.genres}
                  </div>
                </div>`;
  }

  // not functional => change obj inside function
  function updateData(updateObj) {
    lib.dom.updateObj(detail_data, updateObj);
  }
  function getData() {
    return detail_data;
  }
  return {
    getTemplate,
    updateData,
    getData
  };
})();

export default detail;
