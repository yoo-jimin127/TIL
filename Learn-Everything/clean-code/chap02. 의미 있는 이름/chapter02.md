## 의미 있는 이름

### ✅ 의도를 분명하게 밝혀라
- 변수, 함수, 클래스 이름을 명시할 때
    - 존재 이유?
    - 수행 기능?
    - 사용 방법?
    - 따로 주석이 필요하다면 의도를 분명히 드러난 것이 아님.
    - 의도가 드러나는 이름을 사용하면 코드의 이해와 변경이 쉬워짐.
        - `const d; // 경과 시간(단위: 날짜)` ❌
        - ```js
            const elapsedTimeInDays;
            const daysSinceCreation;
            const daysSinceModification;
            const fileAgeInDays;
        ```

### ✅ 그릇된 정보를 피하라
- if 여러 계정을 그룹으로 묶는 경우, 실제 List가 아닌 경우 `accountList` ❌
    - `accountGroup`, `bunchOfAccounts` ... `accounts`
- 이름으로 그릇된 정보를 제공하는 최악의 예) 소문자 L or 대문자 O 변수
    - ex)
    ```js
    const a = 1;
    if (O === 1) a = O1;
    else 1 = 01;
    ```

### ✅ 의미 있게 구분하라
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
        - `moneyAmount` vs `money`
        - `customerInfo` vs `customer`
        - `accountData` vs `account`
        - `theMessage` vs `message`
    - 읽는 사람이 차이를 알도록 이름을 지을 것.

### ✅ 발음하기 쉬운 이름을 사용하라
```js
// ❌
const yyyymmdd = new Date();

// ⭕️
const currentDate = new Date();
```

### ✅ 검색하기 쉬운 이름을 사용하라
- **이름 길이는 범위 크기에 비례해야 함**
    - 이름을 의미있게 지으면 함수가 길어짐
    - 검색의 효율성 증가

```js
// ❌
for (let j = 0; j < 34; j++) {
    s += (t[j]*4)/5;
}

// ⭕️
let realDayPerIdealDay = 4;
const WORK_DAYS_PER_WEEK = 5;
let sum = 0;
for (let j = 0; j < NUMBER_OF_TASKS; j++) {
    let realTaskDays = taskEstimate[j] * realDaysPerIdealDay;
    let realTaskWeeks = (realTaskDays / WORK_DAYS_PER_WEEK);
    sum += realTaskWeeks;
}
```
- `sum` 변수 : 최소한의 검색을 가능하도록 함
- 이름을 의미있게 지을 경우 → 함수가 길어짐 → 검색의 용이성 ↑

### ✅ 인코딩을 피하라
- ❌ 리스트
    - 헝가리식 표기법 ex) `phoneNumber phoneString;`
    - 멤버 변수 접두어    
        - ex)
        ```js
        // ❌
        class Part {
            constructor(m_dsc) {
                this.m_dsc = m_dsc;
            }
            function setName(name) {
                m_dsc = name;
            }
        }

        // ⭕️
        class Part {
            constructor(description) {
                description;
            }
            function setDescription(description) {
                this.description = description;
            }
        }
        ```
    - 인터페이스 클래스와 구현 클래스
        - 인터페이스 클래스 이름과 구현 클래스 이름 중 하나를 인코딩해야 하는 경우 ? 구현 클래스 이름
        - `ShapeFactoryImp` & `CShapeFactory` >> `IShapeFactory`

### ✅ 자신의 기억력을 자랑하지 마라
- 문자 하나만 사용하는 변수 이름은 가급적 피할 것
    - 예외) 반복 횟수를 세는 변수 i, j, k ⭕️ (l은 ❌)

- 클래스 이름 : 클래스 및 객체의 이름은 **명사** 또는 **명사구**가 적합
    - ex) 좋은 예 ⭕️ : `Customer`, `WikiPage`, `Account`, `AddressParser`
    - ex) 나쁜 예 ❌ : `Manager`, `Processor`, `Data`, `Info`

- 메서드 이름 : 메서드 이름은 **동사** 또는 **동사구**가 적합
    - ex)
    ```js
    name = employee.getName();
    customer.setName('mike');
    if (paycheck.isPosted()) ...
    ```
    - 생성자의 중복 정의가 필요한 경우 : 정정 팩토리 메서드 사용

### ✅ 기발한 이름은 피하라
- 구어체 혹은 속어를 이름으로 사용하지 말 것
    - 재미난 이름보다 명료한 이름 선택
        - ex) `whack()` 대신 `kill()`, `eatMyShort()` 대신 `abort()`

### ✅ 한 개념에 한 단어를 사용하라
- 추상적인 개념 하나에 단어 하나를 선택해 이를 고수할 것

### ✅ 말장난을 하지 마라
- 일관성을 고려해 기능적으로 다른 요소를 하나의 명칭으로 통일하지 말 것
    - ex) 기존 값 두 개를 더하는 메서드 `add()`
        - if) 집합에 값 하나를 추가하는 메서드를 추가한다면? -> `insert()` 또는 `append()`가 적합
- 코드를 이해하기 쉽게 작성

### ✅ 해법 영역에서 가져온 이름을 사용하라
- 기술 개념에는 **기술 이름**을 선택할 것

### ✅ 문제 영역에서 가져온 이름을 사용하라
- 적절한 프로그래머 용어가 없을 경우 **문제 영역**에서 이름을 가져올 것

### ✅ 의미 있는 맥락을 추가하라
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
    }
    ```

### ✅ 불필요한 맥락을 없애라
- 일반적으로 짧은 이름이 긴 이름보다 좋음 **의미가 분명한 경우에 한해**
