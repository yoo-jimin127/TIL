# 6장. 객체와 자료 구조
변수 설정 시 private로 정의하는 이유가 있다.    
남들이 변수에 의존하지 않게 만들고 싶어서다.    
또는 변수 타입이나 구현을 맘대로 바꾸고 싶어서다.    

그렇다면 왜 수많은 프로그래머가 조회(get)함수와 설정(set)함수를 당연하게 공개(public)해 비공개 변수를 외부에 노출할까?    

## ✅ 자료 추상화
```js
//6-1 코드 (구체적인 Point 클래스)
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
```

```js
//6-2코드 (추상적인 Point 클래스)
class Point {
    getX() {throw new Error('getX() must be implement.');};
    getY() {throw new Error('getY() must be implement.');};
    setCartesian(x, y) {throw new Error('setCartesian() must be implement.');};
    getR() {throw new Error('getR() must be implement.');};
    getTheta() {throw new Error('getTheta() must be implement.');};
    setPolar(r, theta) {throw new Error('setPolar() must be implement.');};
}
```
위의 6-1 코드와 6-2 코드의 두 클래스 모두 2차원 점을 표현한다.        
하나는 구현을 외부로 노출시키고, 다른 클래스는 구현을 완전히 숨긴다.

### ▶️ 예제 6-2
6-2의 코드는 자료 구조의 이상적인 모습을 띄고 있다.    
클래스 메서드가 접근 정책을 강제하며, 좌표를 읽을 때에는 각 값을 개별적으로 읽어야 한다.    
하지만 좌표를 설정하는 경우에는 두 값을 한꺼번에 설정해야 한다.    

### ▶️ 예제 6-1
6-1은 직교 좌표계를 사용하는 것을 알 수 있으며, 개별적으로 좌표값을 읽고 설정할 수 있다.    
즉, ***구현을 노출*** 시킨다.    

변수를 private으로 선언하더라도 각 값마다 조회(get), 설정(set)을 하는 함수를 제공하면 외부로 노출하는 셈이다.    

### ▶️ 예제 6-1과 예제 6-2를 통한 고찰
변수 사이에 함수라는 게층을 넣는다고 구현이 저절로 감춰지지 않고, 구현을 감추려면 추상화가 필요하다.     

최소한 추상 인터페이스를 제공하여 사용자가 구현을 모른 채 자료의 핵심을 조작할 수 있어야 진정한 클래스이다.    

```js
//6-3 코드 (구체적인 Vehicle 클래스)
class Vehicle {
    getFuelTankCapacityInGallons() {throw new Error('getFuelTankCapacityInGallons() must be implement.');};
    getGallonsOfGasoline() {throw new Error('getGallonOfGasoline() must be implement.');};
}
```

```js
//6-4 코드 (추상적인 Vehicle 클래스)
class Vehicle {
    getPercentFuelRemaining() {throw new Error('getPercentFuelRemaining() must be implement.');};
}
```
6-1과 6-2를 비교하면 6-2가, 6-3과 6-4를 비교하면 6-4가 더욱 이상적인 코드이다.    

### ▶️ Why?
자세하게 공개하는 것보다는 추상적인 개념으로 표현하는 것이 더 좋다. 단순히 인터페이스의 조회/설정 함수만으로 추상화가 일어나는 것이 아니기 때문이다.

**아무 생각 없이 getter/setter 함수를 추가하는 것이 가장 나쁘다.**

## ✅ 자료/객체 비대칭

### ▶️ 객체
추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개
### ▶️ 자료 구조
자료를 그대로 공개하고 별다른 함수는 제공하지 않음    
→ 두 정의는 본질적으로 상반되며 정반대이다.

```js
//6-5 코드 (절차적인 도형 클래스)
class Square {
    constructor(topLeft, side) {
    this.topLeft = topLeft;
    this.side = side;
    }
}
class Rectangle {
    constructor(topLeft, height, width) {
        this.topLeft = topLeft;
        this.height = height;
        this.width = width;
    }
}
class Circle {
    constructor (center, radius) {
        this.center = center;
        this.radius = radius;
    }
}
class Geometry {
    constructor(PI) {
        this.PI = 3.141592653589793;
    }
    area(shape) {
        if(shape instanceof Square) {
            const s = shape;
            return s.side * s.side;
        } else if (shape instanceof Rectangle) {
            const r = shape;
            return r.height * r.width;
        } else if (shape instanceof Circle) {
            const c = shape;
            return PI * c.radius * c.radius;
        } else {
            throw new Error('No Such Shape Exception');
        }
    }
}
```
객체 지향 프로그래머가 6-5코드를 본다면 코웃음을 칠 수 있다. 클래스가 절차적이라고 비판하면 맞는 말이나, 그 비웃음이 100% 맞다고 하기는 어렵다.    

만약 `Geometry 클래스`에 둘레 길이를 구하는 `perimeter()`함수를 추가하고 싶을 경우, 도형 클래스는 아무 영향도 받지 않는다.    
도형 클래스에 의존하는 다른 클래스도 마찬가지이다.    

반면 새로운 도형을 추가하고 싶을 땐 `Geometry 클래스`에 속한 모든 함수를 고쳐야 한다.    

```js
//6-6 코드 (다형적인 도형 클래스)
class Square implements Shape {
    constructor(topLeft, side) {
        this.topLeft = topLeft;
        this.side = side;
    }
    area() {
        return this.side * this.side;
    }
}
class Rectangle implements Shape {
    constructor(topLeft, height, width) {
        this.topLeft = topLeft;
        this.height = height;
        this.width = width;
    }
    area() {
        return this.height * this.width;
    }
}
class Circle implements Shape {
    constructor(center, radius, PI) {
        this.center = center;
        this.radius = radius;
        this.PI =  3.141592653589793;
    }
    area() {
        return this.PI * this.radius * this.radius;
    }
}
```
예제 6-6는 객체 지향적인 도형 클래스이다. 
`area()`는 다형 메서드이며 `Geometry` 클래스는 필요 없다.   
따라서 새 도형을 추가해도 기존 함수에 아무런 영향을 미치지 않는다. 
하지만 새 함수를 추가하려면 도형 클래스 전부를 고쳐야한다.    

### ▶️ 절차적인 코드
- 기존 자료 구조를 변경하지 않으면서 새 함수를 추가하기 쉽다. 
- 새로운 자료 구조를 추가하려면 모든 함수를 고쳐야한다.

### ▶️ 객체 지향 코드
- 기존 함수를 변경하지 않으면서 새 클래스를 추가하기 쉽다.
- 새로운 함수를 추가하려면 모든 클래스를 고쳐야한다.

때로는 단순한 자료 구조와 절차적인 코드가 가장 적합한 상황도 존재한다.    

## ✅ [디미터 법칙](http://wikipedia.org/wiki/Law_of_Demeter)
> 디미터 법칙은 잘 알려진 **휴리스틱** 
> 모듈은 자신이 조작하는 객체의 내부는 몰라야 한다는 법칙
따라서 객체는 조회 함수로 내부 구조를 공개하면 안된다. 즉 **"클래스 C의 메서드 f는 다음과 같은 객체의 메서드만 호출해야 한다"** 고 주장한다.
- 클래스 C
- f가 생성한 객체
- f 인수가 넘어온 객체
- C 인스턴스 변수에 저장된 객체

![디미터 법칙 예시](https://velog.velcdn.com/images/wansook0316/post/fb3a8083-6548-4b85-bf6c-e25cf7a18b4b/image.png)

하지만 객체에서 허용된 메서드가 반환되는 객체의 메소드는 호출하면 안된다.
다시 말해, 낯선 사람은 경계하고 친구랑만 놀라는 의미이다.    

```js
//6-7 코드
const outputDir = ctxt.getOptions().getStrachDir().getAbsolutePath();
```
예제 6-7은 `getOptions()`함수가 반환하는 객체의 `getScratchDir()` 함수를 호출한 후 `getScratchDir()` 함수가 반환하는 객체의 `getAbsolutePath()` 함수를 호출하므로 디미터 법칙을 어긴다.    

## ✅ 기차 충돌
예제 6-7 같은 경우에는 **기차 충돌**이라 하는데, 여러 객차가 한 줄로 이어진 기차처럼 보이기 때문이다.    
일반적으로 조잡하다 여겨지는 방식이므로 피하는게 좋다.    
```js
//6-7 코드를 아래와 같이 리팩터링 하는 것이 좋다.
const opts = ctxt.getOptions();
const scratchDir = opts.getScratchDir();
const outputDir = scratchDir.getAbsolutePath();
```

## ✅ 잡종 구조
위와 같은 특징으로 인해 절반은 객체, 절반은 자료 구조인 잡종 구조가 나온다.    

논리적으로는 객체지향적인 프로그램이 절차적인 프로그램 자료 구조 접근처럼 바뀔 수 있지만, 대부분 양쪽의 단점을 가져오는 경우가 대부분이다.    

## ✅ 구조체 감추기
만약 `ctxt`, `options`, `scratchDir`이 진짜 객체라면?     
위와 같이 줄줄이 묶어놓으면 안된다. 
**객체는 내부 구조를 감춰야 하므로**     
그렇다면 임시 디렉터리의 절대 경로는 어떻게 얻어야 좋을까?    

```js
//1번
ctxt.getAbsolutePathOfScratchDirectoryOption();
//2번
ctx.getScratchDirectoryOption().getAbsolutePath();
```
1번 방식. `ctxt` 객체에서 공개해야 하는 메서드가 많다.
2번 방식. `getScratchDirectoryOption()`이 객체가 아니라 자료 구조를 반환한다고 가정한다.    
*두 방법 다 지향하는 방법은 아니다.*    
→ 해답 : ctxt 객체에게 임시 파일을 생성하라고 시키면 된다.    

```js
//올바른 예시
const bos = ctxt.createScratchFileStream(classFileName);
```
위의 예시는 `ctxt` 내부 구조를 드러내지 않고, 모듈에서 해당 함수는 자신이 **몰라야 하는** 여러 객체를 탐색할 필요가 없다.     
따라서 디미터 법칙을 위반하지 않는다.    

## ✅ 자료 전달 객체
자료 구조체의 전형적인 형태 : 공개 변수만 있고 함수가 없는 클래스     
→ **자료 전달 객체(Data Transfer Object, DTO)** 라고 한다.    

DTO는 데이터베이스에서 저장된 가공되지 않은 정보를 어플리케이션 코드에서 사용할 객체로 변환하는 과정에서 가장 처음으로 사용하는 구조체이다.

```js
//주소를 담는 Address DTO 예시
class Address {
    street;
    streetExtra;
    city;
    state;
    zip;

    constructor(data) {
        this.street = data.street;
        this.streetExtra = data.streetExtra;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
    }
    getStreet() {
        return this.street;
    }
    getStreetExtra() {
        return this.streetExtra;
    }
    getCity() {
        return this.city;
    }
    getState() {
        return this.state;
    }
    
    getZip() {
        return this.zip;
    }
}
```

## ✅ 활성 레코드
활성 레코드는 DTO의 특수한 형태다.     
DTO와 마찬가지로 public 변수가 있거나 private 변수에 getter/setter 함수가 있는 자료구조 이지만, 대개 save나 find와 같은 탐색 함수도 제공한다.    

불행히도 활성 레코드에 비즈니스 규칙 메서드를 추가해서 자료 구조를 객체로 취급하는 개발자가 흔하다.     
이는 바람직하지 않다.     
잡종 구조를 발생시키기 때문이다.    

해결 방법은 활성 레코드는 자료 구조로 취급하고, 내부 자료(활성 레코드의 인스턴스)를 숨기는 객체는 따로 생성한다.    

## ✅ 결론
### ▶️ 객체
*동작을 공개하고 자료를 숨긴다.*
그래서 기존 동작을 변경하지 않으면서 새 객체 타입을 추가하기는 쉽지만, 기존 함수에 새 자료 구조를 추가하는 것은 어렵다.    

### ▶️ 자료 구조
*동작 없이 자료를 노출한다.*    
기존 자료 구조에 새 동작 추가는 쉽지만, 기존 함수에 새 자료 구조를 추가하기는 어렵다.    

- 시스템을 구현할 때, 새로운 자료 타입을 추가하는 유연성이 필요하면 객체가 적합하다.
- 새로운 동작을 추가하는 유연성을 필요하면 자료 구조 + 절차적인 코드가 더 적합하다.