// 01. 객체 생성
let example_object = {
    'name' : '유프론트',
    'age' : 23,
};

let counter = {
    num : 0,
    increase : function () {
        this.num++;
    }
};

// 02. 객체 리터럴에 의한 객체 생성
let person_obj = {
    name: 'lee',
    sayHello: function () {
        console.log(`Hello! My name is ${this.name}.`);
    }
};

console.log(typeof person_obj); // object
console.log(person_obj); // { name: 'lee', sayHello: [Function: sayHello] }

let empty_object = {}; // 빈 객체 생성
console.log(typeof empty_object); // object

// 03. 식별자 네이밍 규칙을 준수하는 프로퍼티 키의 선언
let property_object1 = {
    firstName: 'Yoo', // 식별자 네이밍 규칙 준수
    'last-name': 'jimin', // 식별자 네이밍 규칙 준수 X
};

// 03-1. 식별자 네이밍 규칙을 준수하지 않는 프로퍼티 키의 선언
let property_object2 = {
    firstName: 'Yoo',
    // last-name: 'jimin', // SyntaxError : Unexpected topen -
};

// 04. 메서드

let circle = {
    radius: 5,
    getDiameter: function () {
        return 2 * this.radius; // this → circle
    }
};

console.log(`circle : ${circle.getDiameter()}`); // 10
console.log(`프로퍼티 접근 - 마침표 표기(정상 작동) : ${circle.radius}`); // 5
console.log(`프로퍼티 접근 - 대괄호 표기(정상 작동) : ${circle['radius']}`); // 5
// console.log(`프로퍼티 접근 - 대괄호 표기(오류) : ${circle[radius]}`); // ReferenceError - 따옴표로 감싸줘야 함
// console.log(`프로퍼티 접근(오류) : ${radius}`); // ReferenceError - radius 프로퍼티를 찾지 못함
// console.log(`객체에 존재하지 않는 프로퍼티 : ${tiger}`); // undefined 반환

// 05. 프로퍼티 값 갱신 / 동적 생성 / 삭제
let person = {
    name: 'Yoo',
};

// 객체에 해당 프로퍼티 존재 O → 프로퍼티의 값 갱신
person.name = 'Kim';
console.log(person['name']); // {name: "Kim"}

// 객체에 해당 프로퍼티 존재 X → 프로퍼티 생성
person.age = 23;
console.log(person); // {name: "Kim", age: 23}

// 프로퍼티 삭제
delete person.age; // 존재하는 프로퍼티의 경우 삭제 O
delete person.address; // 존재하지 않는 프로퍼티의 경우 삭제 X → 에러 발생 X

console.log(person); // {name: "Kim"}


