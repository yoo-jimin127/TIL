import React from 'react'

export default function List() {
//     const numbers = [1, 2, 3, 4, 5];
//   return (
//     <ul>
//         {numbers.map(item => (
//         <li key={item.toString()}>{item}</li>
//         ))}
//     </ul>
//   )

    const todos = [
        {id : 1 , text: 'Drint water'},
        {id : 2 , text: 'Wash car'},
        {id : 3 , text: 'Listen lecture'},
        {id : 4 , text: 'Go camping'},
        {id : 5 , text: 'Go picnic'}
    ];

    const Item = (props) => {
        return <li>{props.text}</li>;
    }

    const todoList = todos.map((todo) => <Item key={todo.id} {...todo} />)

    return (
        <>{todoList}</>
    )
}
