### 리액트 기초 사항
- React JS : HTML을 페이지에 직접 작성하지 않음
    - javascript 코드 사용
    - ex) `const VAR_NAME = React.createElement("span");` : HTML요소를 만들어주는 함수, createElement() 내부에는 실제로 생성하고자 하는 HTML 태그의 이름을 정확히 명시해주어야 함
    - React JS : 어플리케이션이 interactive 할 수 있도록 만들어주는 라이브러리
    - React DOM : 모든 React element들을 HTML body에 둘 수 있도록 해주는 라이브러리 또는 패키지 - `ReactDOM.render()` : 다음과 같이 react element를 html로 만들어 배치
- 적절하지 않은 방식
```
    <body><div id="root"></div></body>
    
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script>
        const root = document.getElementById("root");
        const span = React.createElement("span", {id: "first-span", style: {color : "red"} }, "This is first span");
        ReactDOM.render(span, root);
    </script>
```