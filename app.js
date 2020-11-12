// Parcel 로 빌드된 dist 폴더만 netlify 나 호스팅 앱에 업로드하면 됨

console.time("rendertime");
import controls from "./controls/index.js";
import lib from "./lib/index.js";

window.routes = {
  "/": function(params) {
    controls.home.control(params);
  },
  "/about/:id": function(params) {
    controls.about.control(params);
  },
  "/contact": function(params) {
    controls.contact.control(params);
  },
  "/product/:id": function(params) {
    controls.product.control(params);
  },
  otherwise() {
    controls.notfound.control();
  }
};

// 사용자가 마지막에 본 페이지를 기억해뒀다가 새로고침시 해당 페이지로 이동함 (서버 사이드 렌더링 없이 새로고침했을때 현재 페이지를 로딩해줌)
// 즉, 서버 사이드 렌더링 없이 사용자가 현재 보고 있던 페이지를 세션 스토리지에 저장했다가 새로고침하면 현재 페이지를 보여줌
const path = sessionStorage.getItem("currentUrl") || "/";
lib.router(path);
console.log("app !!!");

// 뒤로가기나 앞으로가기 버튼 클릭했을때
// navigate forwards or backwards from url history
window.addEventListener("popstate", function(e) {
  console.log("popstate: ", window.location.pathname);
  console.log("state: ", e.state);
  if ("state" in window.history && window.history.state !== null) {
    console.log(window.history.length);
    // popstate 하면서 length가 감소해야 하는데 라우팅 하면서 내부에 push state가 있어서 다시 length를 증가시킴
    // 그래서 뒤로가기하면 두번 클릭해야 이전 페이지로 이동하게 됨

    // window 객체에 popped 라는 프로퍼티를 true로 변경해서 popstate가 일어났다는걸 router에 알리고
    // router에서는 popped가 true인 경우 즉, 뒤로가기를 한 경우에는 push state를 동작시키지 않도록 함
    // 이렇게 하면 popstate가 일어난 경우에는 다시 pushstate를 하지 않음
    window.popped = true;
    lib.router(window.location.pathname);

    // 제대로 동작은 하지만 새로고침해버림
    // window.location = e.state;
  }
});
console.timeEnd("rendertime");

// function testDeepCopy() {
//   var target = {};
//   var source = {
//     name: "sylee",
//     age: 36,
//     fruit: {
//       name: "apple",
//       price: { dallar: "$ 30", krw: "32000 won" }
//     },
//     school: undefined,
//     list: [
//       { item: "banana", delicious: true },
//       { item: "orange", delicious: false },
//       [1, { inside: 80 }]
//     ]
//   };
//   lib.utils.deepCopyObj(target, source);
//   // 객체의 속성이 배열이고 해당 배열의 요소가 배열인 경우
//   // 배열 자체는 깊은 복사를 하지만 내부에 객체가 있으면 얕은복사가 된다
//   target.list[2][1].inside = "computer";
//   console.log(source.list[2][1].inside, target.list[2][1].inside);
//   // 객체의 속성이 배열이고 해당 배열의 요소가 객체인 경우
//   // 객체는 깊은복사가 된다
//   source.list[1].item = "book";
//   console.log(source.list[1].item, target.list[1].item);
//   // 객체의 속성이 객체이고 해당 객체 내부에 객체가 있는 경우
//   // 재귀함수에 의해 깊은복사가 된다
//   target.fruit.price.krw = "700원";
//   console.log(source.fruit.price.krw, target.fruit.price.krw);
//   return target;
// }

// 로컬스토리지 초기화 하기 전에 마지막 업데이트 사항을 서버에 저장하기
// 브라우저 종료전 로컬스토리지 전부 초기화 하기
// 문제는 새로고침할때도 초기화하는데 새로고침할때는 초기화하길 원하지 않음
// 아니면 그냥 로그아웃 하기전에만 초기화해야하겠음

// window.onunload = function(e) {
//   localStorage.clear();

//   return "Please click 'Stay on this Page' and we will give you candy";
// };
