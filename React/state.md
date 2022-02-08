### STATE
- state : 데이터가 저장되는 곳
- 변수에 접근하기 위해 `{VARIABLE_NAME}`의 방법으로 변수를 감싸주면 됨
ex)
```javascript
const Container = () => ( <div>
    <h3>Total clicks: {counter}</h3>
    <button onClick={countUp}>Click me</button>
    </div>
    );
```
- 컴포넌트 전체를 리렌더링하지만, HTML코드에서는 숫자만 변화하는 코드

### useState() 함수
- `const data = React.useState(0);` : useState() 함수를 사용하면 배열이 생성됨, 첫번째 인자 : 초기값, 두번쨰 인자 : 초기 값을 바꾸는 함수
- 배열을 보다 간단하게 접근할 수 있는 방법
```javascript
const food = ["tomato", "potato"];
const [myFavFood, mySecondFevFood] = food;
myFavFood;    //tomato      const myFavFood = food[0]과 같음
mySecondFavFood;    //potato        const mySecondFavFood = food[1]과 같음
``` 
- `const [counter, modifier] = React.useState(0);` : 이를 통해 초기값과 초기값을 바꾸는 함수에 쉽게 접근할 수 있음
    - modifier(useState 호출을 통해 생성되는 두번째 배열에 담기는 함수) : 값을 하나 받음 (해당 값으로 업데이트 및 리렌더링을 진행)
```javascript
function App() {
    const [counter, setCounter] = React.useState(0);
    const onClick = () => {
        setCounter(counter+1);
    };
    return (
        <div>
            <h3>Total clicks: {counter}</h3>
            <button onClick={onClick}>Click Me</button>
        </div>
    );
}
```
- useState() 함수의 두번째 인자(상태변환함수)를 사용해 값을 업데이트 해줄 수 있음 - update & rerendering
- modifier 함수를 사용해 state를 바꿀 때 **컴포넌트 전체가 재생성됨 (with 새로운 값)** - 코드가 재실행됨
    - state가 바뀌면 리렌더링됨, 하지만 위의 방법은 좋지 않음, counter가 다른 곳에서도 변경될 수 있음
    - `setCounter((current) => current + 1);` : 해당 방법을 사용할 수 있음

- **unit converter**
    - label을 통해 input 옆에 메시지를 써줄 수 있음
```html
<div>
    <h1>Super Converter</h1>
    <label for="minutes">Minutes</label>
    <input id="minutes" placeholder="Minutes" type="number"/>
    <label for="hours">Hours</label>
    <input id="hours" placeholder="Hours"  type="number" />
</div>
```
    - for : javascript word

- 함수를 만들어 minutes의 값을 업데이트 시켜줌
```javascript
 function App() {
const [minutes, setMinutes] = React.useState(0);
const onChange = (event) => {
    setMinutes(event.target.value);
};
return (
    <div>
        <h1>Super Converter</h1>
        <label for="minutes">Minutes</label>
        <input 
            value={minutes}
            id="minutes" 
            placeholder="Minutes" 
            type="number"
            onChange={onChange}
        />
        <h4>You want to convert {minutes}</h4>
```

- 여러개의 state를 사용해 각기 다른 default값을 설정해준 뒤 여러개의 props를 전달할 수 있음
```javascript
const [amount, setAmount] = React.useState(0);
const [flipped, setFlipped] = React.useState(false
const onChange = (event) => {   //minutes에 입력값이 주어진 경우 반영해주는 작업
    setAmount(event.target.value);
};
const reset = () => {      // 값의 초기화
    setAmount(0);
};
const onFlip = () => {      //disabled의 여부를 바꾸어주는 작업
    reset();
    setFlipped((current) => !current);   // 현재 state를 바탕으로 부정명제
};
```

- state 변수인 flipped의 값을 **삼항연산자**로 변경해주는 작업
```javascript
<input 
    value={flipped ? amount : Math.round(amount/60)} 
    id="hours" 
    placeholder="Hours"  
    type="number"
    disabled={flipped === false}
    onChange={onChange}
    />
```
- 태그 내부의 value를 상황에 따라 수정해줄 수 있음 (삼항연산자) : `<button onClick={onInvert}>{inverted ? "Turn Back" : "Invert"}</button>`

- 여러개의 컴포넌트를 조건에 맞추어 렌더링해주는 방법
```js
function App() {
            const [index, setIndex] = React.useState("xx");   // set default value

            const onSelect = (event) => {   // event listener
                setIndex(event.target.value);
            };

            return (
                <div>
                    <h1>Unit Converter</h1>
                    <select value={index} onChange={onSelect}>
                        <option value="xx">Select your units</option>
                        <option value="0">Minutes & Hours</option>
                        <option value="1">Km & Miles</option>
                    </select>
                    <hr />
                    {index === "xx" ? "Please select your unit" : null }
                    {index === "0" ? <MinutesToHours /> : null }
                    {index === "1" ? <KmToMiles /> : null}
                </div>
            );
        }
        ReactDOM.render(<App />, root);
```
    - select 태그 내부에서 선택되는 옵션에 따라 다른 컴포넌트가 렌더링될 수 있도록 상태 생성(index & setIndex)
    - onSelect 함수를 통해 상태를 화면에서 입력받은 값으로 리렌더링해줌
    - 삼항 연산자를 사용해 조건(index의 value)에 맞추어 렌더링하는 컴포넌트를 다르게 설정함
`{index === "0" ? <MinutesToHours /> : null }`
    - 결론적으로 `ReactDOM.render()`함수의 호출은 최상위 컴포넌트를(본 코드에서의 <App />) 렌더링해줌