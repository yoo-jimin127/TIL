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
