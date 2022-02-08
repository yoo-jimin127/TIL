### props
- props : 부모 컴포넌트로부터 자식 컴포넌트에 데이터를 보낼 수 있게 해주는 방법
- props에는 렌더링 시 넣어준 요소들 모두를 첫번째 인자에 저장해둠 (object)
```js
function Btn(props) {
            return <button style={{
                backgroundColor: "tomato",
                color: "white",
                padding: "10px 20px",
                border: 0,
                borderRadius: 10,
            }}>{props.setText}</button>;
        };
        
        function App() {
            return (
                <div>
                    <Btn setText="Save Changes" />
                    <Btn setText="Continue" />
                </div>
            );
        }
```
- 위 코드가 실행될 경우, props라는 object 내부에 setText가 담겨있음

```js
function Btn({setText}) {
            return <button style={{
                backgroundColor: "tomato",
                color: "white",
                padding: "10px 20px",
                border: 0,
                borderRadius: 10,
            }}>{setText}</button>;
        };
        
        function App() {
            return (
                <div>
                    <Btn setText="Save Changes" />
                    <Btn setText="Continue" />
                </div>
            );
        }
```
- 위와 같이 props 객체 안에서 꺼내줄 수 있음 (달라진 점 : Btn함수의 인자를 props에서 {setText}로 바꾸어줌)
    - 추가적으로 인자를 더해주고자 할 때 ex) 첫번째로 렌더링한 <Btn />에만 setValue인자를 넣어주었다면, 두번째 렌더링되는 <Btn />의 props 객체는 `{setText: "Continue", setValue: undefined}`가 됨

```js
 function App() {
            const [value, ,setValue] = React.useState("Save Changes");
            const changeValue = () => {
                setValue("Reverse Changes");
            };
            return (
                <div>
                    <Btn setText="Save Changes" onClick={changeValue} />
                    <Btn setText="Continue" />
                </div>
            );
        }
```
- 위의 changeValue() 함수 및 onClick은 이벤트 리스너가 아닌 **하나의 prop** -> 컴포넌트의 정의부에 들어간다면 그것은 이벤트 리스너 맞음
    - 커스터마이징한 컴포넌트에 넣는 모든 것은 HTML태그에 반영되지 않음, 컴포넌트를 정의하는 부분에서 prop을 받아 반영해줘야 완성

### props memo
- 컴포넌트가 리렌더링되는 것을 원하지 않을 떄 이를 명시해주는 것
- props가 변경되지 않는 한 리렌더링을 막도록 하는 것
- `const MemorizedBtn = React.memo(Btn);` : React.memo(COMPONENT_NAME)으로 메모라이징
- 렌더링 시 Memorized component의 변수명으로 렌더링할 경우 props의 변화가 없는 컴포넌트는 리렌더링되지 않음

### PropTypes
- `<script src="https://unpkg.com/prop-types@15.7.2/prop-types.js"></script>`
- 해당 컴포넌트가 어떤 prop을 받는지 검사하는 기능을 제공
```js
Btn.propTypes = {
    setText: PropTypes.string,
    fontSize: PropTypes.number.isRequired,
    }
```
- 렌더링 시 타입의 변화가 생길 경우 이를 에러없이 React.js가 잘 처리함 (필요한 경우에 대해 에러를 띄우지 않는 상황)
    - 잘못된 type의 인자를 넘길 경우 이에 대해 에러를 띄워줄 수 있는 방법 : `propTypes`

- javascript에서 prop가 입력되지 않은 경우 해당 prop의 default value를 지정해줄 수 있음
    - ex) `function Btn({setText, fontSize = 14}) {` : 컴포넌트를 지정할 때 fontSize의 default 값을 지정해주고 있는 코드

- prop을 전달할 때의 키워드와 받을 때의 키워드는 동일해야함