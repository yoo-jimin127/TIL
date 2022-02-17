## 노마드코더 클론코딩 개발 일지

### to do list
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
        - 함수를 보낼 때 react.js는 함수의 첫번째 인자로 현재 state를 보냄
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

### 영화 웹 서비스
```js
  useEffect(() => {
    fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year")
    .then((response) => response.json())
    .then((json) => {
      setMovies(json.data.movies);
      setLoading(false);
    });
  }, []); 
```
- `.then()`보다 async-await를 사용해 보다 보편적으로 사용하는 추세 (보다 효율적인 코드 작성 가능)

```js
const getMovies = async() => {
    const response = await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    )
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false)
  };
  
  useEffect(() => {
    getMovies();
  }, []);
```
- 개선된 코드
```js
const getMovies = async() => {
    const json = await (
      await fetch(
      `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    )
    ).json();
    setMovies(json.data.movies);
    setLoading(false)
  };
```
- 한번에 보다 효율적으로 작성할 수 있음 (request와 json을 한번에)

- `function Movie({title, medium_cover_image, summary, genres}) ` 해당 인자를 Movie 컴포넌트에 넘겨줌으로써 App.js로부터 인자들을 받아옴
  - movie 컴포넌트는 해당 props를 모두 부모 컴포넌트로부터 받아옴

- key는 react.js에서만 map 안에서 컴포넌트들을 렌더링할 때 사용
``js
{movies.map((movie) => (
  <Movie 
     key={movie.id}
     title={movie.title}
     mediumCoverImage={movie.medium_cover_image}
     summary={movie.summary}
     genres={movie.genres}
   />
))}
```
- `function Movie({title, mediumCoverImage, summary, genres})` : App.js에서 넘겨주는 props의 키워드와 동일한 키워드로 컴포넌트에서 받아와야함

- proptypes의 지정
```js
Movie.propTypes = {
    mediumCoverImage : PropTypes.string,
    title : PropTypes.string.isRequired,
    summary : PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string).isRequired,
}
```
- 배열의 경우 arrayOf(배열 인자의 proptypes)

### React router
- 페이지 전화을 위한 작업
- `npm install react-router-dom`
- App.js에서 router를 렌더링하여 보여줄 것
```js
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
```
- react-router-dom : 컴포넌트들의 모음집
- `BrowserRouter` : 라우터에는 Hash 라우터와 Browser 라우터가 존재함
- `Router` : 최상단에 렌더링해준 뒤 그 내부에 유저에게 보여주고 싶은 컴포넌트들을 렌더링함 ( by. 유저가 위치한 url에 따라)
- `Routes` : 라우터를 찾는 역할, 라우터는 URL을 의미, 한번에 하나의 Route만 렌더링하기 위해 사용(여러개의 라우터를 렌더링할 수 있음)
- Router에서 다른 Router로 이동하고 싶을 때 사용하는 방법: `Link` 사용
- `Link` : 브라우저의 새로고침 없이도 유저를 다른 페이지로 이동시켜주는 컴포넌트

