import React, {useState, useReducer} from 'react'

export default function state_useReducer() {
  // ------ useState() code ------
  //   const initialCount = 0;
  //   const [count, setCount] = useState(initialCount);
  // return (
  //   <div>
  //     Count : {count}
  //     <button onClick={() => setCount(initialCount)}>Reset</button>
  //     <button onClick={() => setCount(prev => prev -1)}>Minus</button>
  //     <button onClick={() => setCount(prev => prev + 1)}>Plus</button>
  //   </div>
  // )

  //  ------ useReducer() code ------
  function reducer(state, action) {
    switch(action.type) {
      case 'reset':
        return initialState;
      case 'increment':
        return {count: state.count + 1};
      case 'decrement':
        return {count: state.count -1};
      default:
        throw new Error();
    }
  }

  const initialState = {count: 0};
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>Reset</button>
      <button onClick={() => dispatch({type: 'increment'})}>Plus</button>
      <button onClick={() => dispatch({type: 'decrement'})}>Minus</button>
    </div>
  )
}
