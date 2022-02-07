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
