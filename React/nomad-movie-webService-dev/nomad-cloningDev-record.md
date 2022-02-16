### 노마드코더 클론코딩 개발 일지

- `setToDos((currentArray) => [toDo, ...currentArray]);` : toDo의 내용과 currentArray의 내용을 합쳐 하나의 배열에 담아 setToDos에 넘기는 과정
```js
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault(); // form의 자동 새로고침 기능(vanilla JS)을 막는 작업
    if (toDo === "") return; // if todo empty -> 작동하지 않도록
    setToDo(""); // 입력된 경우 input 태그 내부의 값을 지워줌
    setToDos((currentArray) => [toDo, ...currentArray]);
  };
  console.log(toDos);
```

- 수정하는 함수를 사용할 때 
    - 값을 함수 내부의 인자로 넣어 보낼 수 있음 ex) `setToDo("")`
    - 함수의 인자로 함수를 보내는 방법
        - 함수를 보낼 때 react.s는 함수의 첫번째 인자로 현재 state를 보냄
        - 현재 state를 계산하거나 새로운 state를 만드는데 사용할 수 있음 ex) ``setToDos((currentArray) => [toDo, ...currentArray]);`

- `map()` 함수 : array의 element를 바꾸고 싶을 때 배열 내부의 모든 item에 대해 함수를 실행하고자 할 때 map()을 사용
    - ex) [1, 2, 3, 4, 5, 6].map() : 6개의 요소에 대해 map 내부의 함수를 모두 실행시키는 역할
    - 새로운 배열을 리턴
    - map은 함수의 첫번째 인자로 현재의 item을 가져올 수 있음
    - ex) `['there', 'are', 'you', how', 'hello'].map((item) => item.toUpperCase())` : 배열 내부의 모든 요소를 대문자로 변형함

- warning: 같은 component의 list를 rendering할 때 key라는 prop을 넣어주어야 함.
```js
<ul>
  {toDos.map((item, index) => <li key={index}>{item}</li>)}
</ul>
```
- item과 index를 넣어 key에 대해 넣어줄 prop까지 넘겨줌으로써 위의 warning 해결