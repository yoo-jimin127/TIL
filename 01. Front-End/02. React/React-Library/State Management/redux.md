
### ✅ Redux 중요 개념
- `Provider` / `store`
- `useDispatch` / `dispatch`
- `useSelector`
- 전역 상태 관리를 위한 툴
- 단 방향 데이터(상태) 흐름 : Flux
- 구성요소 : Store / Reducer / Action / Selector

- React 특징
    - One way data flow
        - multiple components issue
        - Lifting state up
        - Extract shared state from the component tree
    - Immutable
        - object / array
        - ...spread
    - Terminology
        - action {type, payload}
        - reducer (state, action) => newState
        - store (state lives) created by passing reducer
        - dispatching only way to update state(pass in an action object)
        - selectors extract specific pieces of information from a store state

- React Redux
    - Official for React
    - Performance Optimization
    - Community Support

<p align="center"><img src="https://user-images.githubusercontent.com/66112716/172749527-bfbdd69f-63c2-47c4-8bb4-f2b1d7a17389.png"></p>

[사진 출처](https://ko.redux.js.org/tutorials/essentials/part-1-overview-concepts)

### ✅ Redux 사용
- 설치 : `$ npm install @reduxjs/toolkit react-redux`
#### [Redux 예제 코드 바로가기](https://github.com/yoo-jimin127/FE_Dev_Library/tree/main/ch04.%20%EB%8D%B0%EC%9D%B4%ED%84%B0%20%EB%AA%A8%ED%82%B9%20%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/mocking-service-worker-app)

- store를 만들어줄 때 reducer 사용
```js
import {configureStore} from '@reduxjs/toolkit';

export default configureStore ({
    reducer: {},
})
```

- Provider
```js
import {Provider} from 'react-redux';
import store from "./app/store";

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

- 버튼 클릭에 따라 +1 / -1 을 수행하는 counterSlice.js
```js
import {createSlice} from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount : (state, action) => {
            state.value += action.payload;
        }
    }
})

export const { increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;
```

- 버튼 클릭 시 counter 기능을 수행할 수 있도록 `onClick` 이벤트에 `dispatch`를 추가
    - `useSelector` 사용을 통해 count 값을 받아옴 (리덕스의 상태 조회)
    - `useDispatch` 사용을 통해 만들어둔 액션 생성 함수를 발생 (액션 생성 함수 import)
```js
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount } from './counterSlice';

export default function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();

  return (
    <div>
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
        </div>
    </div>
  )
}
```

- `<Provider>`로 감싸져있는 공간은 트리로부터 완전 벗어나더라도 **state sharing**
    - 각각의 dependency의 문제 해결

- toolkit을 사용하지 않을 경우 `Connect API`를 사용해야 함

### ✅ Redux Hooks
- state를 조회하기 위한 `useSelector`
    - connect 함수를 이용하지 않고도 가능
- action을 발생시키기 위한 `useDispatch`
- `useAction`

### ✅ RTK Query
- data fetching
- caching tool

### ✅ axios + redux
- 현재 값을 axios fetching 하는 코드
    (위에서 구현한 프로그램에서 count 값을 받아와 +2 한 상태로 리턴하는 비동기 처리)  

-  `createAsyncThunk`를 사용한 액션 함수 추가
```js
import axios from "axios";

export const fetchIncrement = createAsyncThunk(
    "counter/fetchIncrement",
    async (value) => {
        const response = await axios.put("counter/increment", {value: value});
        return response.data;
    }
)
```
- `extraReducers` 추가
```js
extraReducers: {
    [fetchIncrement.fulfilled]: (state, action) => {
        state.value = action.payload;
    },
},
```
- `handlers.js`에서 값을 받아오는 로직 추가
```js
rest.put('http://localhost:3000/counter/increment', async(req, res, ctx) => {
    const {value} = req.body;    
    return res(
        ctx.json({
            value: value + 2,
        })
    );
}),
```

### ✅ Redux Summary
- 전역 상태 관리를 위한 툴
- 단 방향 데이터(상태) 흐름 : Flux
- 구성요소 : Store / Reducer / Action / Selector

- RTK(Redux toolkit) : Redux 라이브러리들 조합
    - 라이브러리들 : immer / saga / thunk / reselect
- Redux Dev Tools : chrome extension

- Hooks : `useSelector` / `useDispatch`
- API 통신 : 비동기 작업(RTK-Query)
- Redux-Thunk : Action으로 API 요청/결과 Store에 반영
