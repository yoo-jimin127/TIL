### Redux
- Redux : React 사용 시 사용하는 상태 관리 라이브러리
    1. props 문법 대체
        - state 보관 파일 ex) `store.js`
    2. 상태 관리


ex) index.js
```javascript
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';

    const weight = 100;

    function reducer(state = weight, action){
        return state
    }

    let store = createStore(reducer)

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
```
위와 같이 state를 마음대로 보관할 수 있음

component 파일에서 store에 있던 state를 사용하기 위해서는
ex) App.js
```javascript
import './App.css';
import { useSelector } from 'react-redux';

function App() {
    const STATE_NAME = useSelector( (state) = > state );

    return (
        <div className="App>
            <p> state value : { STATE_NAME }</p>
        </div>
    );
}

export default App;
```

- component간 state 수정 방법을 생성해둠 (`if` 사용) -> component는 수정 요청만을 사용함 -> 버그 수정 시 용이
ex) index.js
```javascript
    import { Provider } from 'react-redux';
    import { createStore } from 'redux';

    const weight = 100;

    function reducer(state = weight, action){
        if (action.type === '증가'){
            state++;
            return state
        } else if (action.type === '감소'){
            state--;
            return state
        } else {
            return state
        }
    }
```

- 컴포넌트에서 수정 요청을 하기 위해서는 dispatch 사용
ex) App.js
```javascript
import './App.css';
import { useSelector } from 'react-redux';

function App() {
    const STATE_NAME = useSelector( (state) = > state );

    return (
        <div className="App>
            <p> state value : { STATE_NAME }</p>
            <button onClick={()=>{ dispatch({type : '증가'}) }}>더하기</button>
        </div>
    );
}

export default App;
```
<그 외 상태 관리 라이브러리>
- MobX
- Overmind.js
- Recoil
