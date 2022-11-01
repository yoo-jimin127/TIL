// ❌
const a1 = ['a', 'b', 'c', 'd']
const b1 = ['1', '2', '3', '4', '5', '6']

let foo = (a1, b1) => {
    for (let i = 0; i < a1.length; i++) {
        a1[i] = b1[i];
        console.log(a1[i]);
    }
}

foo(a1, b1);

// ⭕️
const oldArray = ['a', 'b', 'c', 'd']
const newArray = ['1', '2', '3', '4', '5', '6']

let copyChars = (sourceArray, destinationArray) => {
    for (let i = 0; i < sourceArray.length; i++) {
        sourceArray[i] = destinationArray[i];
        console.log(sourceArray[i]);
    }
}

copyChars(oldArray, newArray);