# 리액트 심화 학습 필기안

### 라이브러리 vs 프레임워크
- 라이브러리 : 개발 편의를 위한 도구의 모음
- 프레임워크 : 기반 구조까지 잡혀있음

### DOM 다루기 Element 생성
- Document Object Model : 문서를 **논리 트리**로 표현
- 순서 JS : 특정 라이브러리나 프레임워크를 사용하지 않는 그 자체의 자바스크립트
- CDN : Content Delivery Network : 웹에서 사용되는 다양한 컨텐츠를 저장해 제공하는 시스템

- CodeSandBox : 빠르게 라이브러리/프레임워크를 사용한 코드를 확인할 때 사용할 도구
- Vanilla js DOM : W3Schools / createElement
- CDN : unpkg
- React / React-dom : element 생성 / appendChild 

### JSX와 Babel
- JSX : 문자도 html도 아닌 Javascript의 확장 문법
    - ex) `const element = <h1>Hello world</h1>;`
- Babel : JavaScript Compiler
    - babel에서 컴파일할 script 코드를 작성하기 위한 방법 : `<script type="text/babel">`
```js
const titleClassName = "title";
const text = "Hello world";
const customH1 = <h1 className={titleClassName}>{text}</h1>
//const customH1 = <h1 className={titleClassName} childeren={text} />;
```
```js
const props = {className : titleClassName, children: text}
const customH1h = <h1 {...props} />
```
`const customH1h = <h1 className={props.className} children={props.children} />` 과 같은 작업 수행
- `{...props}` : 객체 자체를 넣어줌, 요소를 분해하여 넣어주는 spread 연산자

- JSX : React.createElement 표현식
- Babel : Javascript Compiler
- JSX 다루기 : spread 연산자

### 멀티 element 생성하기
- children에 새로운 element를 주입시키는 방법
- `React.Fragment` : 부모로서 감싸주는 역할만 함
```js
const element = <React.Fragment
    children={[
        <h1>Hi</h1>,
        <h3>Bye</h3>,
        <h5>Children</h5>
    ]}
/>
```
- React.Fragment를 추가해주지 않아도 JSX는 Fragment로 인식
```js
const element = <>
    children={[
        <h1>Hi</h1>,
        <h3>Bye</h3>,
        <h5>Children</h5>
    ]}
</>
```
- 멀티 element : `Fragment` -> `React.Fragment` or `<> </>`

### Element 찍어내기
```js
const Paint = ({ title, description }) => (
    <>
    <h1>{title}</h1>
    <h3>{description}</h3>
    </>
);
```
- jsx에 props로 받아지도록 전달
- JSX 기반의 element를 생성하는 방법

- Function : 재사용 가능한 element
- Custom Element : Upper Case
- Children 제한 : 없음

### JS와 JSX 섞어쓰기
```js
const Text = ({ text }) => {
    // text가 대문자로 시작할 경우 h1, 소문자로 시작할 경우 h3
    if (text.charAt(0) === text.charAt(0).toUpperCase()) {
        return <h1>{text}</h1>
    } else {
        return <h3>{text}</h3>
    
                // return (
    //     <>
    //         <h1>{text}</h1>
    //         <h3>{text}</h3>
    //     </>
    // );
};
```
- interpolation : 여러 언어를 섞어 사용하는 것 (JSX와 JS)


### 리액트의 리렌더링
- 바닐라 JS : 변경으로 인해 Element를 다시 그림
- React : 변경된 부분만 다시 그림

- JS `setInterval(random, 1000);` : 1000ms를 간격으로 계속 첫번째 인자 호출
- React : 내부 텍스트만 변경됨, 변경 사항이 있을 때 **변경 내용만을 변경**
    - 여러개의 element가 있을 경우 JS와 같은 방법 : 다른 element에 영향을 줄 수 있음
- reflow, repaint 감소를 통한 렌더링 최적화

- React 엘리먼트 : 불변객체(immutable object) - **비교 알고리즘**
    - 엘리먼트의 타입이 다른 경우 : 두 엘리먼트의 속성(props)을 확인해 동일한 내용 유지, 다른 내용 변경
        - 이전 엘리먼트 버린 뒤 새로 그림
    - 엘리먼트의 타입이 같은 경우 : key 우선적 비교, props 비교해 변경사항 반영

- 리액트의 엘리먼트 : 불변 객체
- 변경 사항 반영 : 리엑트의 일
- 리액트의 비교 : reconciliation
- virtual DOM : 비교 시 활용

### 이벤트 핸들링
- vanilla JS : `addEventListener` : `on{event}` - onclick, onmouseout, onfocus ... : lower case
- React : `on{Event}` - onClick, onMouseOut, onFocus, onBlur ... - camel case

- 기본 문장 : `on click`
- 카멜 케이스 : `onClick`
- 파스칼 케이스 : `OnClick`
- 케밥 케이스 : `on-click`
- 스네이크 케이스 : `on_click`

- 이전의 object에서 달라진 부분만 update해주는 방법 : Object.assign
```js
function setState(newState) {
    Object.assign(state, newState);
}
```
- `Object.assign` : 객체 내용 복사
- 전역 변수 : `ReactDOM.render`