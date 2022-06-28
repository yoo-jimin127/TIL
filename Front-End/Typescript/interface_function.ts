interface PersonInterface_Function {
    name: string;
    age: number;
    hello(): void;
}

const person5: PersonInterface_Function = {
    name: 'front',
    age: 10,
    hello: function() :void {
        console.log(`hello! This is ${this.name}!`);
    }
}

const person6: PersonInterface_Function = {
    name: 'front2',
    age: 10,
    hello() :void {
        console.log(`hello! This is ${this.name}!`);
    }
}

interface HelloPerson {
    (name: string, age?: number): void;
}

const helloPerson: HelloPerson = function(name: string, age?:number) {
    console.log(`Hello! This is ${name}!`)
}

helloPerson('jimin', 39);
helloPerson('front');

person5.hello();
person6.hello();