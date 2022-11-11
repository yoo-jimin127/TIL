## 2장. 의미 있는 이름

### ✅ 의도를 분명하게 밝혀라
- **의도가 분명하게 이름을 지어라.**

- 변수, 함수, 클래스 이름을 명시할 때 고려할 점
    - 존재 이유?
    - 수행 기능?
    - 사용 방법?

- 따로 주석이 필요하다면 의도를 분명히 드러난 것이 아님
- 의도가 드러나는 이름을 사용하면 코드의 이해와 변경이 쉬워짐
    - `const d; // 경과 시간(단위: 날짜)` ❌
        - 측정하려는 값과 단위를 표현하는 이름이 필요함
```js
    const elapsedTimeInDays;
    const daysSinceCreation;
    const daysSinceModification;
    const fileAgeInDays;
```
    - 위와 같이 의도가 들어나는 이름은 코드의 이해 및 변경이 쉬워짐

```js
function getThem() {
	const list1 = [];
  for (let i = 0; i < theList.length; i++) {
    if (theList[i] === 4) {
      list1.push(theList[i]);
    }
  }
	return list1;
}
```
- 코드의 함축성으로 인해 코드가 하는 일의 짐작이 어려움
1. theList에 무엇이 들었는가
2. theList에서 0번째 값이 어째서 중요한가?
3. 값 4는 무슨 의미인가?
4. 함수가 반환하는 리스트 list1를 어떻게 사용하는가
→ 위 코드에서는 이 정보들이 드러나지 않는다.

- 개선 코드
```js
function getFlaggedCells() {
	const flaggedCells = [];
  for (let i = 0; i < gameBoard.length; i++) {
		const cell = gameBoard[i];
    if (cell[STATUS_VALUE] === FLAGGED) {
      flaggedCells.push(gameBoard[i]);
    }
  }
	return flaggedCells;
}
```
```js
function getFlaggedCells() {
	const flaggedCells = new CellList();
  for (let i = 0; i < gameBoard.length; i++) {
		const cell = gameBoard[i];
    if (cell.isFlagged()) {
      flaggedCells.add(gameBoard[i]);
    }
  }
	return flaggedCells;
}
```

### ✅ 그릇된 정보를 피하라
- 널리 쓰이는 으미가 있는 단어를 다른 의미로 사용하지 말 것
    - 빗변(hypotenuse)을 hp로 축약 → 유닉스 플랫폼 hp와 혼동의 여지가 있음
- list와 같이 프로그래머에게 특수한 의미를 지니는 단어를 함부로 사용하지 말 것

- if 여러 계정을 그룹으로 묶는 경우, 실제 List가 아닌 경우 `accountList` ❌
    - `accountGroup`, `bunchOfAccounts` ... `accounts`

- 이름으로 그릇된 정보를 제공하는 최악의 예) 소문자 L or 대문자 O 변수
    - ex)
    ```js
	@@ -27,22 +81,24 @@
    ```

### ✅ 의미 있게 구분하라
- 컴파일러 또는 인터프리터만 통과하려는 생각으로 코드를 구현할 경우 프로그래머 스스로 문제를 일으킬 수 있음
- 연속된 숫자를 덧붙이는 것은 지양할 것
    - ex) a1, a2, ... aN : 의도가 드러나지 않는 네이밍
```js
// ❌
let foo = (a1, b1) => {
    for (let i = 0; i < a1.length; i++) {
        a1[i] = b1[i];
        console.log(a1[i]);
    }
}
// ⭕️
let updateArray = (sourceArray, destinationArray) => {
    for (let i = 0; i < sourceArray.length; i++) {
        sourceArray[i] = destinationArray[i];
        console.log(sourceArray[i]);
    }
}
```
- 연속된 숫자의 덧붙임 및 불용어 추가 x
    - 불용어 : 의미가 불분명하거나 중복되는 단어 ex) `nameString`, `ageVariable`
	@@ -53,6 +109,8 @@
    - 읽는 사람이 차이를 알도록 이름을 지을 것.

### ✅ 발음하기 쉬운 이름을 사용하라
- 발음이 어려운 이름은 토론하기 어렵다
- `프로그래밍 == 사회활동` → 원활한 의사소통을 위해 **발음하기 쉬운 이름**을 사용할 것
```js
// ❌
const yyyymmdd = new Date();
	@@ -61,10 +119,27 @@ const yyyymmdd = new Date();
const currentDate = new Date();
```

```js
class DtaRcrd102 {
  constructor(genymdhms, modymdhms) {
    this.genymdhms = genymdhms;
    this.modymdhms = modymdhms;
  }
}
class Customer {
  constructor(generationTimestamp, modificationTimestamp) {
    this.generationTimestamp = generationTimestamp;
    this.modificationTimestamp = modificationTimestamp;
  }
}
```

### ✅ 검색하기 쉬운 이름을 사용하라
- 문자 하나를 사용하는 이름과 상수는 텍스트 코드에서 쉽게 눈에 띄지 않음
- **이름 길이는 범위 크기에 비례해야 함**
    - 이름을 의미있게 지으면 함수가 길어짐
    - 검색의 효율성 증가
- 변수 혹은 상수를 코드 여러 곳에서 사용할 경우 **검색하기 쉬운 이름**이 바람직함

```js
// ❌
	@@ -86,6 +161,21 @@ for (let j = 0; j < NUMBER_OF_TASKS; j++) {
- 이름을 의미있게 지을 경우 → 함수가 길어짐 → 검색의 용이성 ↑

### ✅ 인코딩을 피하라
- 문제 해결에 집중하는 개발자에게 인코딩은 불필요한 정신적 부담
- 인코딩한 이름은 거의 발음하기 어려우며 오타가 생기기 쉬움   

- **헝가리식 표기법**   
: 이름의 앞에 데이터 타입을 명시하는 것     
- 이름 길이가 제한된 옛날에는 이 규칙을 위반할 수밖에 없었음
    - ex) 포트란은 첫 글자로 유형을 표현, 초창기 베이식은 글자 하나에 숫자 하나만 허용
- 요즘의 ide는 컴파일 하지 않고도 타입 오류를 감지할 정도로 발전함
    - 이제는 헝가리식 표기법이나 기타 인코딩 방식이 방해 요소가 됨

- **멤버 변수 접두어**
- 멤버 변수에 m\_이라는 접두어를 붙일 필요 X
- 클래스와 함수는 접두어가 필요 없을 정도로 작아야 함
- 멤버 변수를 다른색상으로 표시하거나 눈에 띄게 보여주는 ide를 사용해야 함

- ❌ 리스트
    - 헝가리식 표기법 ex) `phoneNumber phoneString;`
    - 멤버 변수 접두어    
	@@ -99,7 +189,7 @@ for (let j = 0; j < NUMBER_OF_TASKS; j++) {
            setName(name) {
                m_dsc = name;
            }
        } // 예전에 작성한 방식
        // ⭕️
        class Part {
	@@ -109,12 +199,13 @@ for (let j = 0; j < NUMBER_OF_TASKS; j++) {
            setDescription(description) {
                this.description = description;
            }
        } // 이런 식으로 쓰는 것을 권장
        ```

- **인터페이스 클래스와 구현 클래스**
    - 인터페이스 클래스 이름과 구현 클래스 이름 중 하나를 인코딩해야 하는 경우 ? 
        - 구현 클래스 이름을 사용하는 것이 그나마 나음
    - `ShapeFactoryImp` & `CShapeFactory` >> `IShapeFactory`

### ✅ 자신의 기억력을 자랑하지 마라
- 문자 하나만 사용하는 변수 이름은 가급적 피할 것
	@@ -131,6 +222,11 @@ for (let j = 0; j < NUMBER_OF_TASKS; j++) {
    customer.setName('mike');
    if (paycheck.isPosted()) ...
    ```
    ```js
    const fulcrumPoint = Complex.FromRealNumber(23.0);
    const fulcrumPoint = new Complex(23.0);
    //아래보다 위 코드가 더 좋다.
    ```
    - 생성자의 중복 정의가 필요한 경우 : 정적 팩토리 메서드 사용

### ✅ 기발한 이름은 피하라
	@@ -140,6 +236,7 @@ for (let j = 0; j < NUMBER_OF_TASKS; j++) {

### ✅ 한 개념에 한 단어를 사용하라
- 추상적인 개념 하나에 단어 하나를 선택해 이를 고수할 것
- 메서드 이름은 독자적이고 일관적이어야 함

### ✅ 말장난을 하지 마라
- 일관성을 고려해 기능적으로 다른 요소를 하나의 명칭으로 통일하지 말 것
	@@ -149,34 +246,92 @@ for (let j = 0; j < NUMBER_OF_TASKS; j++) {

### ✅ 해법 영역에서 가져온 이름을 사용하라
- 기술 개념에는 **기술 이름**을 선택할 것
- 코드를 읽는 사람은 프로그래머
    - 전산 용어, 알고리즘 이름, 패턴 이름, 수학 용어 등 ok
    - 프로그래머에게 익숙한 기술 및 개념은 사용해도 됨

### ✅ 문제 영역에서 가져온 이름을 사용하라
- 적절한 프로그래머 용어가 없을 경우 **문제 영역**에서 이름을 가져올 것

### ✅ 의미 있는 맥락을 추가하라
- 대다수의 이름 : 의미가 불분명함
    - 클래스, 이름, 이름 공간(namespace)에 넣어 맥락 부여
        - 모든 방법이 힘들 경우 마지막으로 접두어 추가 (최대한 지양)

- 주소의 일부를 표현하는 변수의 경우
    - ❌ `firstName`, `lastName`, `street`, `houseNumber`, `city`, `state` ...
    - ⭕️ `addrFirstName`, `addrLastName`, `addrStreet`, `addrHouseNumber`, `addrCity`, `addrState` ...

```js
function printGuessStatistics(candidate, count) {
    let number;
    let verb;
    let pluralModifier;
    if (count === 0) {
        number = 'no';
        verb = 'are';
        pluralModifier = 's';
    } else if (count === 1) {
        number = '1';
        verb = 'is';
        pluralModifier = '';
    } else {
        number = count.toString();
        verb = 'are';
        pluralModifier = 's';
    }
  const guessMessage = `There ${verb} ${number} ${candidate}, ${pluralModifier}`;
  console.log(guessMessage);
}
```
- 위 코드 : 함수가 길고, 세 변수를 함수 전반에서 사용 (맥락의 불분명함)
    - 클래스를 만든 뒤 세 변수를 클래스에 넣어 사용
    - 함수를 작은 조각으로 쪼갤 경우 함수의 사용처가 분명해짐

```js
class GuessStatisticsMessage {
    constructor(number, verb, pluralModifier) {
        this.number = number;
        this.verb = verb;
        this.pluralModifier = pluralModifier;
    }
  make(candidate, count) {
    this.createPluralDependentMessageParts(count);
    const tmp = `There ${this.verb} ${this.number} ${candidate} ${
      this.pluralModifier}`;
    return tmp;
  }
  createPluralDependentMessageParts(count) {
    if (count === 0) {
      this.thereAreNoLetters();
    } else if (count === 1) {
      this.thereIsOneLetter();
    } else {
      this.thereAreManyLetters(count);
    }
  }
  thereAreManyLetters(count) {
    this.number = String(count);
    this.verb = 'are';
    this.pluralModifier = 's';
  }
  thereIsOneLetter() {
    this.number = '1';
    this.verb = 'is';
    this.pluralModifier = '';
  }
  thereAreNoLetters() {
    this.number = 'no';
    this.verb = 'are';
    this.pluralModifier = 's';
  }
}
```

### ✅ 불필요한 맥락을 없애라
- 일반적으로 짧은 이름이 긴 이름보다 좋음 **의미가 분명한 경우에 한해**
- 이름에 불필요한 말을 추가하지 말 것

### 📌 참고 서적
- [Clean Code](http://www.yes24.com/Product/Goods/11681152)