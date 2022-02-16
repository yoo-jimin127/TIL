import {useState} from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault(); // form의 자동 새로고침 기능(vanilla JS)을 막는 작업
    if (toDo === "") {
      return; // if todo empty -> 작동하지 않도록
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo(""); // 입력된 경우 input 태그 내부의 값을 지워줌
  };

  return ( 
  <div>
    <h1>My To Dos [{toDos.length}]</h1>
    <form onSubmit={onSubmit}>
      <input 
      onChange={onChange} 
      value={toDo} 
      type="text" 
      placeholder="Write your TO DO ..." />
      <button>Submit request</button>
    </form>
    <hr />
    <ul>
      {toDos.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
  );
}

export default App;