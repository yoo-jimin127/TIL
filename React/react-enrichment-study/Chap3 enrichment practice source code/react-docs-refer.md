# 리액트 학습 필기안 Chapter 3

### 공식 문서로 Hook 살펴보기
- class의 단점을 보완하며 라이프 사이클 등과 관련된 함수의 재사용을 가능하게 함
- 기존 class : 함께 변경되는 상호 관련 코드는 분리되지만, 이와 연관 없는 코드들은 단일 메서드로 결합 - **복잡한 컴포넌트 이해의 어려움**

- Hook 사용 규칙
    -  Hook은 그냥 Javascript 함수이지만 두가지 규칙을 준수해야 함
        **1. 최상위에서만 hook을 호출할 것 (반복문, 조건문, 중첩 함수 내에서 hook 실행 X)**
        **2. React Functional Component & custom hook 내에서만 hook을 호출할 것(일반 javascript 함수에서는 hook 호출 X)**

- state hook
    - 이전에는 class component에서만 state를 사용할 수 있었음
    - `this.setState`는 병합
    - `useState()`는 대체

- Using effect hook
    - 데이터 가져오기, 구독 설정하기, 수동으로 리액트 컴포넌트의 DOM을 수정하는 것 : side effect
    - componentDidMount + componentDidUpdate
    - `useEffect(() => {});`
    - 구독과 정리
    - componentDidMount & componentWillUnmount
    - useEffect 하나에서 처리

- Effect가 업데이트 시마다 실행되는 이유  
    - class 메서드가 관련 없는 로직들은 모아놓고, 관련 있는 로직들은 여러개의 메서드로 나누어 놓는 경우가 있었음
    - `componentDidMount` / `componentDidUpdate` / `componentWillUnmount`
    - 이에 대한 해결책으로 표현을 하나로 합치고, 버그를 방지하기 위해 Effect가 업데이트 시마다 실행됨

- Effect를 건너뛰어 성능 최적화 하기
    - 특정 state 변경에만 반응하도록
    ```js
    componentDidUpdate(prevProps, prevState) {
        ...
    }
    ```
    - dependency array

- useEffect : 데이터 fetch, 구독, DOM 수정
- clean up : 구독과 구독 해지를 한 공간에서
- dependency array : 필요한 변경 시에만 effect 실행

- `useRef()` 유의사항 
    - `useRef` - 내용 변경 시 그것을 알려주지 않음
    - `.current` 프로퍼티의 변경이 리렌더링을 발생시키지 않음
    - React가 DOM 노드에 Ref를 attach or detach할 때 특정 코드를 실행하고자 할 때는 `callback Ref` 사용

- `useReducer()` 활용
    - useState를 활용한 코드
```js
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);
return (
  <div>
    Count : {count}
    <button onClick={() => setCount(initialCount)}>Reset</button>
    <button onClick={() => setCount(prev => prev -1)}>Minus</button>
    <button onClick={() => setCount(prev => prev + 1)}>Plus</button>
  </div>
)
```
    - useReducer를 활용한 코드
```js
function reducer(state, action) {
    switch(action.type) {
      case 'reset':
        return initialState;
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count -1};
      default:
        throw new Error();
    }
  }

  const initialState = {count: 0};
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
      <button onClick={() => dispatch({type: 'increment'})}>Plus</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Minus</button>
    </div>
  )
```

- custom hooks
    - 컴포넌트들에 중복되는 hook 로직을 묶어 재사용하도록 함
    - hook에서 hook으로 정보 전달 가능

- `useState` : 이전 값을 인자로 / 초기화 지연(함수)
- `useEffect` : 의존성 배열, 안주거나 / [] / [a, b]
- `useLayoutEffect` : useEffect와 유사 모든 DOM 변경 후 브라우저가 화면을 그리기 이전 시점에 동기적으로 수행됨
- `useReducer` : useState 대체 state / reducer / action
- `useCallback & useMemo` : memorization
- `useRef` : current라는 상자. 내용의 변경은 알려주지 않음. 콜백 ref 사용

### Composition
- typeof : type chack
- 확장성 : 다양한 상황을 품을 수 있음

### HOC
- Higher Order Component
    - 고차 컴포넌트는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수
- 컴포넌트 로직을 재사용하기 위한 기술
- React API의 일부가 아님, 리액트 구성적 특성에서 나오는 패턴
- ref는 전달되지 않음
- HOC : 함수를 받아 함수를 리턴