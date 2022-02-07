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