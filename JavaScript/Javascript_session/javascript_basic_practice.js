// // ###### 03. 데이터 타입 ######

// // 문자열 : 작은따옴표, 큰따옴표, 백틱 표기 모두 가능
// let string;
// let name = '지민';
// string = '작은 따옴표의 문자열';
// string = "큰 따옴표의 문자열";
// string = `백틱 표기의 문자열`;
// let newString = `이름은 ${name} 이다.`;
// console.log(newString);

// // 심벌 타입 : 변경 불가능한 원시 타입의 값
//     // 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용
// let key = Symbol('key'); 
// console.log(typeof key); // symbol

// let obj = {}; // 객체 생성
// obj[key] = 'value';
// console.log(obj[key]); // value

// // ###### 04. 연산자 ######

// // 이항 산술 연산자
// 5 + 2; // 7 : 덧셈 
// 5 - 2; // 3 : 뺄셈
// 5 * 2; // 10 : 곱셈
// 5 / 2; // 2.5 : 나눗셈
// 5 % 2; // 1 : 나머지

// // 단항 산술 연산자
// let x = 1;
// x++; // x = x + 1 : 증가
// x--; // x = x - 1 : 감소
// +x; // 아무런 효과 X, 음수 -> 양수의 반전 X
// -x; // 양수 -> 음수, 음수 -> 양수
// console.log(x);

// // 문자열 연결 연산자
// '1' + 2; // 12
// 1 + '2'; // 12

// 1 + 2; // 3

// 1 + true; // 2 : true - 1
// 1 + false; // 1 : false - 0
// 1 + null; // 1 : null - 0

// // ###### 05. 제어문 ######
// {
//     var foo = 10;
// }

// let num = 2;
// let kind;

// if (num > 0) {
//     kind = "양수";
// } else if (num < 0) {
//     kind = "음수";
// } else {
//     kind = "0";
// }

// // ###### 06. 형변환 ######
// const falsy1 = null;
// Number(falsy1); // 0;

// const falsy2 = '';
// Number(falsy2); // 0;

// const falsy3 = false;
// Number(falsy3); // 0;

// const truthy1 = [];
// Number(truthy1); // 0;

// const truthy2 = true;
// Number(truthy2); // 1;

// const truthy3 = {};
// Number({}); // NaN;

// String(123); //”123"
// String(123.456); //”123.456"

// Boolean(100); //true
// Boolean("1"); //true
// Boolean(true); //true
// Boolean(Object); //true
// Boolean([]); //true
// Boolean(0); //false
// Boolean(NaN); //false
// Boolean(null); //false
// Boolean(undefined); //false
// Boolean( ); //false

// const numb1 = 0;
// Boolean(numb1); // false
// !!numb1; // false
// !numb1; // true



// // 변수에 값을 저장하는 방법
// var userId = 1;
// var userName = "yoo";

// // 객체 or 배열을 사용한 변수의 저장
// var user = { id : 1, name : 'yoo'};

// var users = [
//     { id : 1, name : 'yoo'},
//     { id : 1, name : 'kim'},
// ]

// // ###### 3. 데이터 타입 ######

// // 배열 생성 (빈 배열)
// // let arr = []; 

// // arr[0] = 'zero';
// // arr[1] = 'one';
// // arr[2] = 'two';

// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i]);
// // }    

// // 배열 생성 (초기 값 할당)
// // let arr = ['zero', 'one', 'two']; 

// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i]);
// // }

// // 배열 생성 (배열 크기 지정)
// // 쉼표 개수만큼 크기가 지정됨
// // let arr = [,,,]; 

// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i]);
// // }
        
// // 값이 할당되지 않아서 undefined 3번 출력

// // 배열 생성 (빈 배열)
// // let arr = new Array(); 

// // arr[0] = 'zero';
// // arr[1] = 'one';
// // arr[2] = 'two';

// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i]);
// // }     

// // 배열 생성 (초기 값 할당)
// // let arr = new Array('zero', 'one', 'two'); 

// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i]);
// // }     

// // 배열 생성 (배열 크기 지정)
// // 원소가 1개이고 숫자인 경우 배열 크기로 사용됨
// // let arr = new Array(3); 
        
// // for (let i = 0; i < arr.length; i++) {
// //     console.log(arr[i]);
// // }
        
// // 값이 할당되지 않아서 undefined 3번 출력   

// const fruits = ['apple', 'banana', 'kiwi', 'melon'];

// console.log(fruits.length);

// // 배열의 원소 개수만큼 반복 (배열의 모든 인덱스에 방문)
// for (let i = 0; i < fruits.length; i++) {
//     console.log(fruits[i]);
// }


console.log('첫 출력');