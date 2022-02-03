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