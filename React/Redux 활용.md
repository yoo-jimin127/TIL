### Redux
- Redux : React 사용 시 사용하는 상태 관리 라이브러리
    1. props 문법 대체
        - state 보관 파일 ex) `store.js`
    2. 상태 관리


ex) index.js
```
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
```
import './App.css';
import { useSelector } from 'react-redux';

function App() {
const STATE_NAME = useSelector( (state) = > state );
}
```