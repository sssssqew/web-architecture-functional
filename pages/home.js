import lib from "../lib/index.js";

// 페이지에서는 데이터 업데이트를 하지 않음
// 페이지에서 데이터 업데이터가 발생하면 자식 컴포넌트들을 다시 렌더링해줘야 해서 번거롭기 때문임

//  페이지는 데이터를 변경하지 않을 것이므로 필요한 값은 string으로 템플릿 안에 직접 하드코딩함
//  데이터 변경이 필요하지 않다면 updateData 함수도 필요가 없음

var home = (function() {
  "use strict";

  function getTemplate() {
    return `<div class="home-page">
                  <div id="nav" class="home-nav"></div>
                  <div id="search"></div>
                  <ul id="list" class="home-list"></ul>         
                </div>`;
  }
  // function updateData(updateObj) {
  //   lib.dom.updateObj(home_data, updateObj);
  // }
  return {
    getTemplate
    // updateData
  };
})();

export default home;
