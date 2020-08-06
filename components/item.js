import lib from "../lib/index.js";

// item 컴포넌트는 각각이 서로 다른 렉시컬 실행환경을 가져야 하므로 즉시실행함수로 한번만 실행하면 하나의 실행환경만 가지게 됨
// 여러개의 서로 다른 실행환경을 가지려면 item 을 클로저로 만들어서 실행환경을 만들고 싶을때마다 함수를 실행해야 함
// 쉽게 말해서 아래 함수가 실행될때마다(리턴할때마다) 메모리에 서로 다른 실행환경이 만들어지고 각각의 실행환경들은 메모리 변수에 서로 다른 값들을 가지게 된다
// 즉 각각의 item 은 메모리에 서로 다른 값들을 저장하고 서로 다르게 업데이트가 가능하다
var item = function() {
  "use strict";

  var item_data = {
    id: 0,
    title: "item",
    rating: "0",
    cover: "../resources/default-movie.png"
  };

  //  아이템을 클릭했을때 image를 클릭하느냐 li 배경을 클릭하느냐 title을 클릭하느냐에 따라 e.target이 달라져서 그냥 모든 요소에 같은 id값을 삽입했음
  function getTemplate() {
    return `<li id=${item_data.id} class="item-card">   
                  <img id=${item_data.id} src="${item_data.cover}" class="item-cover"/>
                  <h5 id=${item_data.id}>${item_data.title} (${item_data.rating})</h5>  
                </li>`;
  }

  // not functional => change obj inside function
  function updateData(updateObj) {
    lib.dom.updateObj(item_data, updateObj);
  }
  return {
    getTemplate,
    updateData
  };
};

export default item;
