### 리액트 기초 사항
- React JS : HTML을 페이지에 직접 작성하지 않음
    - javascript 코드 사용
    - ex) `const VAR_NAME = React.createElement("span");` : HTML요소를 만들어주는 함수, createElement() 내부에는 실제로 생성하고자 하는 HTML 태그의 이름을 정확히 명시해주어야 함
        - `React.createElement(HTML태그, props가 포함된 object, content)`의 매개인자를 넘겨 HTML 요소를 생성함
    - React JS : 어플리케이션이 interactive 할 수 있도록 만들어주는 라이브러리
    - React DOM : 모든 React element들을 HTML body에 둘 수 있도록 해주는 라이브러리 또는 패키지 - `ReactDOM.render()` : 다음과 같이 react element를 html로 만들어 배치
- 적절하지 않은 방식
```html
    <body><div id="root"></div></body>
    
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script>
        const root = document.getElementById("root");
        const span = React.createElement("span", {id: "first-span", style: {color : "red"} }, "This is first span");
        ReactDOM.render(span, root);
    </script>
```
- div 태그 내부에 span 태그와 button 태그를 넣고자 할 때
```html
    <script>
        const root = document.getElementById("root");
        const span = React.createElement("span", null, "This is first span");
        const btn = React.createElement("button", null, "click me");
        const div = React.createElement("div", null, [span, btn]);
        ReactDOM.render(div, root);
    </script>
```

- property로 event에 대한 함수를 등록하고자 할 때
```js
const btn = React.createElement("button", {
    onClick: () => console.log("button clicked"),
    }, "click me");
```
- React : interactive한 event를 처리하는 것을 목적으로 함. -> event listener를 `onMouseEnter()`, `onClick()`과 같이 on을 붙여 등록함


### JSX
- javascript의 확장 문법
- Babel을 사용하여 JSX로 작성된 코드를 브라우저가 이해할 수 있도록 변경함
```jsx
const Btn = (
    <button id="clickBtn" 
    style={{
        backgroundColor="tomato",
        }} 
        onClick={() => console.log("button clicked")}
    >
        Click me
        </button>
    );
```
- 위 arrow function을 만드는 방식은
```jsx
function Btn() { 
    return (
        <button id="clickBtn" onClick ={...}></button>
    );
}
```
함수를 지정해 return 해주는 것과 같은 역할을 함

- JSX 문법으로 생성한 html 요소에 타 html 요소를 넣고자 할 때
    1. HTML 요소를 함수화 시킴 `arrow function` 사용 ex) `const Btn = () => ();`
        - **컴포넌트의 첫 글자는 항상 대문자여야 함**
            - 소문자인 경우 react랑 JSX가 해당 컴포넌트를 HTML 태그명이라고 판단 ex) `<Button /> !=== <button />`
        ```jsx
        const Container = () => (<div><Title /> <Btn /></div>);
        ReactDOM.render(<Container />, root);
        ```
        - 위와 같은 방식(`<Title />`, `<Container />`)으로 코드를 작성해주면 해당 태그에 위에서 선언한 함수가 그대로 호출되는 효과를 가져옴 (컴포넌트 활용의 효율성)

### CRA
- Create-React-App 의 작업 포인트 : 분할 & 정복
- `npm i prop-types`통해 proptypes 설치 -> `import PropTypes from "prop-types";`를 통해 proptypes import
```js
Button.PropTypes = {
    text: PropTypes.string.isRequired,
};
```
- 위와 같이 text prop의 타입을 지정해줄 수 있음

### CRA에서의 css 모듈
- `style.css`로 지정할 경우 페이지의 모든 것들에 적용됨
- CRA의 작업 포인트 : 분할 & 정복
    - 컴포넌트의 이름을 따름 or 안따름 상관 없이 css 모듈 파일을 생성 `xxx.module.css`
        - css 모듈을 사용하는 파일에서 import 해주면 상관 없음. 하지만 가급적 컴포넌트의 이름과 동일하게 적용하여 구별을 용이하게 하자.
    - `Button.module.css`
    ```css
    .btn {
        color: white;
        background-color: tomato;
    }
    ```
    - index.js에 `import styles from "./Button.module.css";` 스타일시트 파일 import
    ```js
        function Button ({text}) {
        return <button className={styles.btn}>{text}</button>;
    }
    ```   
- create-react-app이 해당 CSS 코드를 javascript 오브젝트로 변환시켜줌
- 해당 javascript 오브젝트는 btn을 그 내부에 가지고 있는 것 -> 무작위적인 랜덤 클래스를 가지고 있음
- style이 모듈러가 되는 것
- 컴포넌트를 독립적으로 사용해 그에 해당하는 독립적인 css 모듈
- **같은 class 이름을 사용**한다고 해도 **HTML내에서는 랜덤 방식으로 사용**하기에 문제 X

### Effects
- state를 변경할 때 모든 코드들은 다시 실행됨
- 특정 코드들이 첫번째 component render에서만 실행되도록 하고 싶은 경우
    - state의 변화가 일어나는 경우에도 해당 코드가 다시 실행되지 않도록 하는 방법 : `useEffect()` 사용
- `useEffect()`함수: useEffect(한번만 실행시키고자 하는 코드, 변화를 감지할 대상-dependencies)
    - 두번째 인자가 변화할 때 첫번째 인자에 넘긴 코드를 실행시킴
        - 두번째 인자에 담기는 요소 : useState() 사용 시 객체를 담을 배열 속 첫번째 인자 ex) `const [keyword, setKeyword] = React.useState(0)`
    - [참고 코드](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_accessibility)

- useEffect() 함수가 컴포넌트의 첫번째 render 시점에 함수를 호출함
    - 코드가 한번만 실행될 수 있도록 보호함

- 코드의 특정 부분만이 변화하였을 때 원하는 코드들을 실행할 수 있는 방법
    
```js
  useEffect(() => {
    console.log("run only once.");
  }, []);
  useEffect(() => {
    console.log("run only 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("run only 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("run 'keyword' & 'counter' changes.");
  }, [keyword, counter]);
```
- useState() & useEffect() 함수를 사용해 특정 코드의 상태가 변경될 때마다 특정 코드만을 실행하도록 분기할 수 있음

### cleanup function
1번 방법.
```js
function Content() {
  useEffect(() => {
    console.log("Created");
    return () => console.log("Destroyed");
  }, []);
  return (
    <h1>Content when showing is True</h1>
  )
}
```
- 컴포넌트가 create & destroy 되었을 때 이를 필터링해주는 작업 -> return ()을 통해 생성과 소멸에 다른 결과를 보낼 수 있음

- 위의 코드와 동일한 작업을 수행하는 코드 (비추)
2번 방법.
```js
function Content() {
  function CreateFunc() {
    console.log("Created");
    return DestroyFunc;
  }
  function DestroyFunc() {
    console.log("Destroyed");
  }
  useEffect(CreateFunc, []);
  return (
    <h1>Content when showing is True</h1>
  )
}
```
3번 방법.
```js
  useEffect(function () {
    console.log("Created");
    return function () {
      console.log("Destroyed");
    }
```