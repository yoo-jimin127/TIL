interface PersonInterface {
    name: string;
    age: number;
}

function hello1(person: PersonInterface): void {
    console.log(`Hello! This is ${person.name}!`);
}

// 인터페이스 생성
const person1: PersonInterface = {
    name: 'jimin',
    age: 23,
};

hello1(person1);

// Interface Optional 1
interface PersonInterface_Option {
    name: string;
    age?: number;
}

function hello2(person: PersonInterface_Option) {
    console.log(`Hello! This is ${person.name}!`)
}

const person2: PersonInterface_Option = {name: 'jimin', age: 23};
const person3: PersonInterface_Option = {name: 'front'};

hello2(person2);
hello2(person3);

// Interface Optional 2
interface PersonInterface_Option2 {
    name: string;
    age?: number;
    [index: string]: any;
}

function hello3(person: PersonInterface_Option2) {
    console.log(`Hello! This is ${person.name}!`);
}

const person4 :PersonInterface_Option2 = {
    name:'likelion',
    part: 'front',
};

hello3(person4);

// Interface Extends
interface IPerson2 {
    name: string;
    age?: number;
}

interface IKorean extends IPerson2 {
    city: string;
}

const koreanObj :IKorean = {
    name: '유지민',
    city: 'incheon',
}

// Interface class
// 인터페이스 : 컴파일 시 사라짐 - 타입
interface IPerson1 {
    name: string;
    age?: number;
    hello(): void;
}

// 구현체 (Interface를 implements)
class Person implements IPerson1 {
    name: string;
    age?: number | undefined;

    constructor(name: string) {
        this.name = name;
    }

    hello(): void {
        console.log(`Hello! This is ${this.name}`);
    }
}

const person7 = new Person('front');
const person8:IPerson1 = new Person('likelion');
person7.hello();