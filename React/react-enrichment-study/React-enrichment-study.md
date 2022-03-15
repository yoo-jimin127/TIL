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

### 컴포넌트 상태 다루기
- DOM : 논리 트리
- 컴포넌트 : 앨리먼트들의 집합
- 앨리먼트 : 컴포넌트의 구성 요소
- `useState` : 상태값을 관리해주는 훅

### 컴포넌트 사이드 이펙트 다루기
- 사이드 이펙트 == 부수효과
- `window.localStorage.setItem("keyword", event.target.value);` 사용으로 로컬 스토리지에 저장
- `const [keyword, setKeyword] = React.useState(window.localStorage.getItem("keyword"));` 사용으로 로컬 스토리지의 저장 값으로 state 설정
- `useState` : lazy initialize
- `useEffect` : dependency array
    - dependency array를 아무것도 주지 않을 경우 모든 변화에 반응

### 커스텀 훅 만들기
- `use{Name}` : 훅의 반복 - custom Hook 사용
```js
function useLocalStorage(itemName, value) {
    const [state, setState] = React.useState(() => {
        return window.localStorage.getItem(itemName) || value;
    })
    React.useEffect(() => {
        window.localStorage.setItem(itemName, state);
    }, [state])
    return [state, setState];
}
```
- `use{Name}` 형식으로 커스텀 훅을 생성한 뒤 인자로 값을 넣어줌 ex) 인자에 여러 값을 넣는 이유 : false와 같은 string이 아닌 값에 대한 처리
```js
const [keyword, setKeyword] = useLocalStorage("keyword");
const [typing, setTyping] = useLocalStorage("typing", false) ;
const [result, setResult] = useLocalStorage("result");
```

### hook flow 이해하기 (App - Child)
- `useState`로 만들어진 set 함수는 인자로 이전 값이 들어옴 -> prev로 들어온 값을 저장
```js
function handleClick() {
    setShow((prev) => !(prev));
}
```
- 첫번째 인자로 들어온 useState의 값을 바탕으로 set 함수를 설정
- render가 끝난 다음에 effect가 실행
- hook flow : hook들의 호출 타이밍
- useState : setState시 prev가 주입됨

- 부모가 다 그려짐 -> children이 그려짐 -> children 다 그려진 뒤 children의 useEffect까지 발생 -> App의 useEffect 도착
    - App의 useEffect를 넣어둔 경우 children의 렌더링 + useEffect 완료 된 뒤 App의 useEffect 실행

- useEffect : cleanUp - 이전에 생성한 side effect 생성해놓은 것 모두 지우고 다시 생성
![image](https://user-images.githubusercontent.com/66112716/158378388-510f8e20-333e-450c-ab4c-cb24ca2b58c4.png)

- useEffect : render가 끝난 뒤 실행
- update 시 : useEffect clean up / useEffect
- dependency array : 전달받은 값의 변화가 있는 경우에만

### React Element에 스타일 입히기
- class만 써줘도 됨 : 이미 존재하고 있음 -> className으로 써줄 것 (이미 reserving 되어있는 태그들은 class로도 읽혀지지만, 다른 태그 중 제대로 class의 식별이 이루어지지 않는 경우가 있음)
    - React는 html에서 이미 선점하고 있는 키워드의 사용을 지양함
- `console.log(JSON.stringify(props));` : string화 시켜줌
```js
function Button(props) {
    console.log(JSON.stringify(props));
    return <button {...props} />;
}
```
![image](https://user-images.githubusercontent.com/66112716/158411494-d0f01305-fe03-42f8-bf6c-9c5bb7566387.png)
- 위와 같이 작성 시 props 내부의 요소들이 버튼에 반영됨

- 잘못된 코드 예시
```js
function Button({props}) {
    console.log(JSON.stringify(props));
    return <button className="button" {...props} />;
}
```

- className, color, style, rest를 인자로 주어 스타일 지정
```js
function Button({ className= "", color, style, ...rest}) {
    return (
        <button 
        className={`button ${className} ${color}`}
        style={style} 
        {...rest} 
        />
    )
}
```
- 스타일의 우선순위
    - style props가 더 우세
    - className 후세

- className : 문자열
- style : 객체, 카멜케이스, className보다 먼저