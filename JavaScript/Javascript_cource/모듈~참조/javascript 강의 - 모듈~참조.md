# 인프런 javascript + NomadCoder Vanilla JS 

------

### 모듈
- 코드의 재활용성을 높이고, 유지보수를 쉽게 할 수 있는 기법
- **코드를 여러개의 파일로 분리**하는 방법으로써 실행
- ```<script type="text/javascript" src="greeting.js"></script>``` : `<script>` 태그 내부에 src 속성 값이 들어감

- Node.js 에서의 모듈의 노드 (서버에서 사용되는 js)
- ```node.circle.js```(로드 될 대상)
```
var PI = Math.PI;
exports.area = function (r) {
    return PI * r * r;
};

exports.circumference = function (r) {
    return 2 * PI * r;
};

exports.circumference = function (r) {
    return 2 * PI * r;
};
```

- ```node.demo.js```(로드의 주체)
```
var circle = require('./node.circle.js');
console.log('The area of a circle of radius 4 is ' + circle.area(4));
```
- 로드 될 대상으로부터 로드의 주체가 모듈을 불러와 활용할 수 있음

- 라이브러리 : jquery ```$(%id_name tag).text('str');```

### 데이터 가져오기
- HTML의 element를 가져오기 위해서는 getElementById, getElementByClassName, querySelector 등을 사용해 가져올 수 있음
```const title = document.getElementByTagName("h1");``` 통해 태그 이름을 인자로 입력하여 해당 태그를 가지고 있는 값을 가져올 수 있음
- 가장 효과적으로 element를 가져올 수 있는 방법 : ```querySelector```, ```querySelectorAll``` - element를 css 방식으로 검색할 수 있음
    - ex) `<div class="hello"><h1>Grab me!</h1></div>` -> `const title = document.querySelector(".hello h1")`
    - ex) **유용 기능** `const title = document.querySelector("div.hello:first-child h1")` : 첫번째 자식을 가져올 수 있음
    - 여러개의 요소를 배열 형태로 가져오고 싶은 경우 : `querySelectorAll()`를 통해 같은 className, idName, tag를 가진 요소들을 가져올 수 있음

### 이벤트
- 모든 요소들이 javascript의 object
- javascript로 html의 css 요소들을 바꿀 수 있음 ex) `title.style.color = "blue";`
```
const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
    console.log("title was clicked!");
}

title.addEventListener("click", handleTitleClick);
```
- **주의** : addEventListener에서 function을 넘겨줄 때 ()를 포함하지 않음. 
    - why? : 해당 element가 click이 되었을 때 javascript가 함수를 실행하도록 하기 위해 함수만을 넘겨줌.
- 적용 가능한 event : [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript), [Web API](https://developer.mozilla.org/ko/docs/Web/API)
    - ex) `mouseenter`, `mouseleave`

- 이벤트 적용의 2가지 방식
    1. `title.onclick = handleTitleClick;` : onclick() 사용
    2. `title.addEventListener("click", hancleTitleClick);` : addEventListener() 사용
    - addEventListener()를 더 많이 사용 - why? : `removeEventListener()`를 통해 event listener를 지울 수 있는 장점이 있음

- window event 추가
    - ex) `window.addEventListener("resize", handleWindowResize);`
    ```
    function handleWindowResize() {
        document.body.style.backgroundcolor = "tomato";
    }
    ```
    - 태그를 resize할 수 없음, window는 resize 가능
    - `document.body`는 가능, 하지만 `document.div`, `document.h1` 등은 불가능(querySelector 등 사용) -> head, body, title 등의 중요한 태그들은 document를 통해 가져올 수 있음

    - ex) `window.addEventListener("copy", handleWindowCopy);` -> `function handleWidowCopy() { alert ("copier!"); }` : 내용 복사 기능 가능
    - ex) 네트워크 연결 상태를 확인하기 위한 event listener : `addEventListener("offline", FUNCTION_NAME)`, `addEventListener("online", FUNCTION_NAME)`

```
const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
    const currentColor = h1.style.color;
    let newColor;

    if (currentColor === "blue") {
        newColor = "tomato";
    } else {
        newColor = "blue";
    }
    h1.style.color = newColor;
}
h1.addEventListener("click", handleTitleClick);
```

### CSS
- css 요소는 css에서 style을 입히도록 함. -> javascript에서 이를 가져오기 위해서는
    - ex) `style.css` - `.active { color : tomato; }`
        - `app.js` - `function hendleTitleClick() { h1.className = "active"; }`

- level 1 : 순수 비교 연산자 사용
```
function handleTitleClick() {
    const clickedClass = "clicked";
    if (h1.className === clickedClass) {
        h1.className = "";
    } else {
        h1.className = clickedClass;
    }
}
h1.addEventListener("click", handleTitleClick);
```
- raw code를 줄여 에러 발생을 방지함

- level 2 : classList를 대상으로 contains() 함수 사용
- `if (h1.classList.contains(clickedClass)) {` : classList에서 () 내부의 클래스명이 포함되어있다면 이를 지워주는 방식
```
function handleTitleClick() {
    const clickedClass = "clicked";
    if (h1.classList(clickedClass)) {
        h1.classList.remove(clickedClass);
    } else {
        h1.classList.add(clickedClass);
    }
}
h1.addEventListener("click", handleTitleClick);
```

- level 3 : toggle() 사용
- `toggle()`을 사용해 위 코드를 간소화시킬 수 있음
```
function handleTitleClick() {
    const clickedClass = "clicked";
    h1.classList.toggle("clicked");
}
h1.addEventListener("click", handleTitleClick);
```

### momentum
- HTML 자동 제공 기능
```
<input
    required
    maxlength="15"
    type="text" 
    placeholder="What is your name?" />
```

- function을 만든 뒤 하나의 argument를 받도록 js에 설정
- 모든 함수의 가장 첫번째 인자는 event에 대한 정보를 담아 전달해줌. (실행된 event 관련 정보)
    - ex) 주체, 대상, 호출 시간 등의 정보 : `preventDefault()` 함수를 통해 이를 불러올 수 있음
    - JS에서 이벤트의 내용을 채워줌
    - JS : 기본 동작으로 이동하는 것을 막는 행위를 허용함
```
function onLoginSubmit(event) {
    arg.preventDefualt();
    console.log(event);
}
```

- `loginForm.classList.add("hidden");` : classList에 add() 함수를 사용하여 클래스를 생성하도록 할 수 있음
- string만 포함된 변수는 대문자로 표기하고 string을 저장하고 싶을 때 사용. (하나의 변수 지정 관습)

- string과 변수를 합치는 2가지 방법
    1. `greeting.innerText = "Helllo " + username;` : + 기호를 사용해 연결해줌
    2. ```greeting.innerText = `Helllo ${username}`;``` : 백틱 기호를 사용해 연결해줌 (단, 변수를 표기할 때에는 `${변수명}`과 같은 방식으로 표기하는 규칙 적용)

### local storage
- local storage를 사용해 값을 저장할 수 있도록 함
- [local storage MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)
- key &value 만으로 저장, 삭제, 읽기 가능

### clock
- `setInterval()` : [주기적으로 함수를 실행하는 함수](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
    - `setInterval(sayHello, 5000);` : 기본 동작이 반복적으로 일어남 
    - 실행 중 다른 setInterval로 인해 함수가 호출되는 경우 기존에 실행되던 함수가 종료됨
- `setTimeout()` : [실행할 함수와 interval 간격을 입력해 실행하는 함수](https://developer.mozilla.org/ko/docs/Web/API/setTimeout)
    - `setTimeout(sayHello, 5000);` : 기본 동작이 한번만 일어남
    - 실행 중 다른 setTimeout으로 인해 함수가 호출되어도 기존에 실행되었던 함수에 영향을 주지 않음

- `padStart()` : [string을 일정한 포맷으로 설정해주는 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
    - cf) `padEnd()` : 끝부분에 추가

### javascript로 element 추가
```
const bgImage = document.createElement("img");
bgImage.src = `/img/${choosenImage}`;
document.body.appendChild(bgImage);
```
- `createElement()` 함수를 추가한 뒤, `<img>` 태그인 경우 해당 변수의 src에 이미지 경로를 넣어줌

- `const toDoInput = toDoForm.querySelector("input");` === `const toDoInput = document.querySelector("#todo-form input");`
```
    const li = document.createElement("li");
    const span = document.createElement("span");
    li.appendChild(span);
    span.innerText = newToDo;
```
- li 태그와 span 태그를 생성한 뒤, li 태그의 child로 span태그를 추가해주는 작업 (HTML을 JAVASCRIPT에서 자유자재로 생성할 수 있음)

```
const li = event.target.parentElement;
li.remove();
```
- event의 target은 선택된 요소의 property를 제공함. 이를 변수에 넣고 remove()해줄 경우 해당 element가 삭제될 수 있음 (삭제 기능 구현)

### todolist 요소를 local storage에 저장
- localstorage : 텍스트만 저장할 수 있음 (배열은 저장 불가능) -> 텍스트를 배열의 형태로 저장시켜주어야 함
- 배열에 값 넣는 방식 ex) `const array = [];` -> `array.push(element);`
- `JSON.stringify()` : [텍스트를 json 문자열로 변환시켜주는 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
- `JSON.parse()` : [JSON 문자열의 구문을 분석하고 그 결과에서 javascript 값 또는 객체를 생성하는 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
- `forEach()` : 해당 배열의 각각의 요소에 접근해줌
    - array의 item들에 대해 한 개의 function만 실행할 수 있도록 함
```
function printHi(item) {
    console.log("Hi ${item}");
}
```
==
- `ARRAY.forEach((item) => console.log("Hi ${item}));` : ARRAY의 각 item에 대해 실행
- 더욱 간결하게 코드를 작성할 수 있음 by using arrow function

### local storage에서 요소를 삭제하는 방법
- 객체 형식으로 text와 id를 주어 식별자 역할을 하자.
    - paintToDo() 에서 newToDo.text, newToDo.id 형식으로 주어 text형식으로 화면에 출력될 수 있도록 함
- `filter()` : [주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환하는 함수](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
    - true를 리턴하는 값만 새로운 배열에 저장됨

### 날씨 및 위치 정보
- `navigator.geolocation.getCurrentPosition();` : [현재 위치를 가져오기 위해 사용하는 함수](https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition)
- `fetch()` : [javascript에서 대신 요청을 보내는 것](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch) 