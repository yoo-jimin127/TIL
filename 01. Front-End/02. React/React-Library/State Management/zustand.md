# Justand
- 리액트의 컴포넌트를 통해 작은 HTML 조각(편의 상)들을 모아 개발한 뒤 페이지에서 붙이는 형식  
  - 단점 : 컴포넌트간 변수(state) 공유가 어려움      
  → props, context API, Redux 등을 가져다 쓰는 방법     

## install
`npm install zustand`   

## usage
### Basis
```js
import create from 'zustand';

// store 내부의 모든 변수를 가져다가 사용할 수 있음
const useStore = create((set) => ({
  count: 0, // state 보관
  setCountUp() {
    set((state) => ({count : state.count + 1}))
  }
}))

function App() {
  const {count, setCountUp} = useStore();
  return (
    <div className="App">
      <p>구독자 {count}</p>
      <button onClick={() => setCountUp()}>증가</button>
    </div>
  );
}

function Card() {
  return (
    <div className="App">
      <p>구독자 {count}</p>
    </div>
  );
}
```

### set state function
```js
  <button onClick={() => { useStore.setState({count : count + 1 })}}>+1 버튼</button>
```
다음과 같이 전역 상태를 공유할 수 있으나, 모든 컴포넌트에서 `count`를 변수할 경우 버그 발생률이 높아질 수 있음.   
state 변경 함수를 `create()` 함수 내부에 만드는 방식이 보다 좋음.   

```js
// store 내부의 모든 변수를 가져다가 사용할 수 있음
const useStore = create((set) => ({
  count: 0, // state 보관
  setCountUp() {
    set((state) => ({count : state.count + 1}))
  }
}))

function App() {
  const {count, setCountUp} = useStore();
  return (
    <div className="App">
      <p>구독자 {count}</p>
      <button onClick={() => setCountUp()}>증가</button>
    </div>
  );
}
```

### ajax request function
```js
import create from 'zustand';

// store 내부의 모든 변수를 가져다가 사용할 수 있음
const useStore = create((set) => ({
  count: 0, // state 보관
  setCountUp() {
    set((state) => ({count : state.count + 1}))
  },
  async ajaxRequest() {
    const response = await fetch('https://example.com/api');
    console.log(await response.json());
  }
}))

function App() {
  const {count, setCountUp} = useStore();
  return (
    <div className="App">
      <p>구독자 {count}</p>
      <button onClick={() => setCountUp();}>증가</button>
    </div>
  );
}

function Card() {
  return (
    <div className="App">
      <p>구독자 {count}</p>
    </div>
  );
}
```

### debugging
```js
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
  count: 0,
  setCountUp() {
    set((state) => ({count : state.count + 1}))
  }
  }))
);
```

### state size control
```js
import { create } from 'zustand';

const useStore1 = create((set) => ({
  count: 0,
  setCountUp() {
    set((state) => ({count : state.count + 1}))
  }
}))

const useStore2 = create((set) => ({
  count2: 0,
  setCountUp2() {
    set((state) => ({count2 : state.count2 + 1}))
  }
}))
```
- `persist`를 사용한 storage 내부 저장
  - 새로고침 시 데이터 유지를 위한 `recoil-persist` 파생 라이브러리 사용 or 별도의 로직을 사용하였으나, `persist`를 통해 간단히 사용 가능   
```js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useFishStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addFish: (0 => set({ fishes: get().fishes + 1 })),
    }),
    {
      name: 'food-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
```