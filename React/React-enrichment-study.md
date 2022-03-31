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

### Ref로 DOM 다루기
- DOM과 Element : 브라우저가 불러온 웹 페이지 - Document
- `useRef` 훅을 사용해 DOM에 대해 처리를 즉각적으로 할 수 있도록 함

- useRef 훅을 사용하기 이전
```js
React.useEffect(() => {
    document.getElementById("input").focus();
}, []
return (
<>
<input id="input" />
</>
)
```

- useRef를 사용한 코드
```js
const App = () => {
    const inputRef = React.useRef();
    React.useEffect(() => {
        inputRef.current.focus();
    }, [])
    return (
    <>
    <input ref={inputRef} />
    </>
    
}
```
- `Ref명.current.FUNCTION()`으로 접근

- vanilla JS : document.get~ / document.query...
- React : useRef / ref

### form 다루기
- 기본적 form : label, input, form
- onSubmit : `event.preventDefault()`
- event.target.elements : `console.dir(element)`

- uncontrolled vs controlled
- `if (phoneNumber.startsWith(0))` : `startsWith()` 함수를 사용해 문자열의 시작 값을 기준으로 판별할 수 있음

```js
const handleChange = (event) => {
    setPhoneNumber(event.target.value);
    
    if (phoneNumber.startsWith(0)) {
        setMessage("Phone Number is valid");
    } else {
        setMessage("Phone Number should starts with 0");
    }
}
```
- 위와 같이 state를 설정한 뒤
```js
<button 
    type="submit" 
    disabled = {phoneNumber.length === 0 || message !== "Phone Number is valid"}>
    Submit
</button>
```
- 다음과 같이 disabled를 설정해줄 경우 phoneNumber의 길이가 0을 초과해도 버튼이 abled해지지 않음
    - 이유 : sync가 맞지 않기 때문, 두 state간 시차가 존재

```js
const handleChange = (event) => {
    if (event.target.value.startsWith(0)) {
        setMessage("Phone Number is valid");
    } else {
        setMessage("Phone Number should starts with 0");

    setPhoneNumber(event.target.value);
}
```
- 위와 같이 코드를 수정하여 반영되도록 함

- 유효하지 않은 값의 입력 자체를 허용하지 않고자 할 때
```js
<input 
    id="phone" 
    name="phone" 
    onChange={handleChange}
    value={phoneNumber}
/>
```
- input의 value 값에 state를 넣어줌으로써 controlled하게 관리함

- validation 체크 : `onChange` 에서 다룸
- controlled : input의 value를 직접 관리

### Error 다루기
- javascript의 에러로 애플리케이션 전체가 정상적으로 렌더링되지 않는 경우를 대비해 `ErrorBoundary` 사용
```js
class ErrorBoundary extends React.Component {
    state = { error : null };
    static getDerivedStateFromError(error) {
        return {error}
    }          
    
    render() {
        const {error} = this.state;
        if (error) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}
```
- ErrorBoundary를 사용해 돌려줄 폴백 UI를 명시해준 뒤
```js
const Child = () => {
    throw new Error("Something wrong ...");
    return <p>Child ... </p>

const App = () => {
    return (
        <>
            <p>App ... </p>
            <ErrorBoundary fallback={<p> Error occured ... </p>}>
                <Child />
            </ErrorBoundary>
        </>
    )
}
```
- `ErrorBoundary`로 감싸준 뒤 fallback 메시지 전달
- 에러가 발생할 경우 상태값을 처리하는 로직을 class component에서 제공하기에 React.Component 상속

- Error Boundary : Catch Error 해서 보여줌
- Fallback : Error가 발생했을 때 보여줄 컴포넌트

### Key와 Rerendering
- key - value : key는 value를 특정하는 이름
- DB, Dictionary, Json, Object ...
- `<button onClick={() => handleDoneClick(todo)}>Done</button>` : onClick에 인자를 추가해 넘김
```js
const handleDoneClick = (todo) => {
    setItems((items) => items.filter((item) => item !== todo));
}
```

- 삭제된 항목을 다시 불러오고자 할 때
```js
const handleRestoreClick = () => {
    setItems((items) => [...items, 
    todos.find((item) => !items.includes(item))
]);
}
```
- todos에는 있지만 items에는 없는 것을 다시 화면에 출력
- key값을 제대로 줄 경우 react의 재조정이 효율적으로 일어남 [React 재조정](https://ko.reactjs.org/docs/reconciliation.html)
    - 재사용 : key를 제대로 줘야 재사용 가능
    - 제대로 준다 : 중복 없음, 바뀌지 않음

### 상태 끌어올리기 (State lifting up)
- 형제 컴포넌트의 상태가 궁금할 경우 : 필요하면 부모로 lifting up
- props drilling : 과도한 lifting은 drilling을 야기
```js
const App = () => {
    const [id, setId] = React.useState("");
    
    const handleIdChange = (event) => {
        setId(event.target.value);
    
    const [pw, setPw] = React.useState("")
    const handlePwChange = (event) => {
        setPw(event.target.value) ;
    
    const handleLoginClick = () => 
    
    return (
        <>
            <Id id={id} handleIdChange={handleIdChange} />
            <br />
            <Password id={pw} handlePwChange={handlePwChange} />
            <button disabled={id.length === 0 || pw.length === 0} onClick={handleLoginClick}>LOGIN</button>
        </>
    )
}
```

### Data Fetch 해보기
```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```
- fetch 함수 내부에 받아올 값 or 리소스의 주소,
- `.then`을 사용하여 함수를 넣어주면 해당 값이 담김
- `json()`을 사용하여 json으로 사용

- fetch API : 네트워크 통신 도구
- 상황별 핸들링 : 로딩 / 데이터 / 에러

---

### CRA
- Node : 로컬에서 리액트 앱이 돌아갈 수 있도록 해주는 환경
    - npm(node package manager)도 자동으로 설치됨
    - npm이 설치되면 npx(node package runner)도 자동으로 설치됨

### JSX
- JSX : 리액트 앨리먼트를 생성하는 문법, javascript의 확장 문법
- **camelCase**를 사용해 JSX 사용
    - props는 camelCase를 사용할 것
- 태그는 자식을 포함할 수 있음
- Babel은 JSX를 `React.createElement()` 형식으로 불러옴

### Props
- component와 props
- 자신의 출력에 다른 컴포넌트를 참조할 수 있음

- 컴포넌트의 합성 : 여러개를 하나의 컴포넌트에 넣는 것
- 컴포넌트의 추출 : 유의미한 값들로 추출해 새로운 컴포넌트를 만드는 것(재사용성을 높이기 위한 방법 중 하나)

- props : 컴포넌트에 전달되는 단일 객체
- 순수함수처럼 동작 : props 자체를 수정해서는 안됨
- 컴포넌트 합성 : 여러 컴포넌트를 모음
- 컴포넌트 추출 : 여러 고셍서 사용되거나 복잡한 경우

### State와 Life cycle
- 컴포넌트 내의 상태 : 자신의 출력 값을 변경
- Class Component : State LifeCycle
- Functional Component : 훅으로 관리
- 유의사항 : 직접 수정 X, 비동기적일 수 있음

### 컴포넌트 생명주기
- `render()` : React.Component의 하위 class에서 반드시 정의해야 하는 메서드
- 컴포넌트 생명주기
    1. 마운트
        - `Constructor()`
        - `render()`
        - `componentDidMount()`

    2. 업데이트
        - `render()`
        - `componentDidUpdate()`

    3. 마운트 해제
        - `componentWillUnmount()`

- **state에 props를 복사해서는 안됨**
- constructor : state 초기화 및 메서드 바인딩
- componentDidMount : DOM 노드 초기화 및 데이터 fetch
- componentWillUnmount : 타이머 제거 및 요청 취소 및 구독 해제
- Functional Component : hook으로 대부분 구현 가능

### 이벤트
 - 합성 이벤트 : 인터페이스는 같지만 직접 대응되지 않음
 - Bubble / Capture : Capture > target > Bubble
 - return false : `e.preventDefault()` 해줘야 함