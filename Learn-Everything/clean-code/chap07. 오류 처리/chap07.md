# 7장. 오류 처리
오류 처리는 프로그램에 반드시 필요한 요소 중 하나일 뿐이다.    
오류 처리는 입력이 이상하거나 디바이스가 실패할지도 모르는 예외 상황을 위해 존재한다.    
**깨끗한 코드**와 **오류 처리**는 확실히 연관성이 있다.    
상당수 코드 기반은 전적으로 오류 처리 코드에 좌우된다.    

**오류 처리 코드로 인해 프로그램 논리를 이해하기 어려워진다면 깨끗한 코드라 부르기 어렵다.**    

## ✅ 오류 코드보다 예외를 사용하라
예외를 지원하지 않는 언어는 오류의 처리 및 보고의 방법이 제한적이었다.    
- 오류 플래그의 설정
- 호출자에게 오류 코드를 반환하는 방법

```js
// 7-1 예제 : 오류 코드 반환
class DeviceController {
    // ...
    sendShutDown() {
        const handle = getHandle(DEV1);
        // 디바이스 상태를 점검한다.
        if (handle != DeviceHandle.INVALID) {
            // 레코드 필드에 디바이스 상태를 저장한다.
            retrieveDeviceRecord(handle);
            // 디바이스가 일시정지 상태가 아니라면 종료한다.
            if (record.getStatus() != DEVICE_SUSPENDED) {
                pauseDevice(handle);
                clearDeviceWorkQueue(handle);
                closeDevice(handle);
            } else {
                console.log("Device suspended. Unable to shut down");
            }
        } else {
            console.log("Invalid handle for : " + DEV1.toString());
        }
    }
    // ...
}
```
7-1 예제 코드의 문제 : 호출자 코드가 복잡해진다.    
→ 함수를 호출한 즉시 오류를 확인해야 하기 때문 : 이 단계를 잊어버리기 쉬움.      
**오류가 발생하면 예외를 던지는 편이 낫다.**     
  → 호출자 코드가 더 깔끔해진다.    

```js
// 7-2 예제 : 예외 사용
class DeviceController {
    // ...
    sendShutDown() {
        try {
            tryToShutDown();
        } catch(e) {
            console.log(e);
        }
    }

    tryToShutDown() {
        const handle = getHandle(DEV1);
        const record = retrieveDeviceRecord(handle);

        pauseDevice(handle);
        clearDeviceWorkQueue(handle);
        closeDevice(handle);
    }

    getHandle(id) {
        throw new Error("Invalid handle for: " + id.toString());
        // ...
    }
    // ...
}
```
코드가 깔끔해진 동시에 코드의 품질이 향상되었다.    
→ 디바이스 종료 알고리즘과 오류 처리 알고리즘을 분리했기 때문    

## ✅ Try-Catch-Finally 문부터 작성하라
예외에서 프로그램 내부에 **범위를 정의한다**는 사실은 매우 흥미롭다.    
`try`-`catch`-`finally`문에서 `try`블록에 들어가는 코드를 실행하면 어느 시점에서든 실행이 중단된 후 `catch`블록으로 넘어갈 수 있다.    

- `try`블록 : 트랜잭션과 어떤 면에서 유사하다.    
    - `try` 블록에서 무슨 일이 생기든 `catch`블록은 **프로그램 상태를 일관성 있게 유지해야 한다.**
- 예외가 발생할 코드를 짤 경우 `try-catch-finally`문으로 시작하는 편이 낫다.

```js
function retrieveSectionShouldThrowOnInvalidFileName() {
    sectionStore.retrieveSection("invalid - file");
}
```

- 단위 테스트에 맞춰 구현한 코드
```js
function retrieveSection(sectionName) {
    // 실제로 구현할 때까지 비어있는 더미를 반환한다.
    return new [];
}
```

코드가 예외를 던지지 않아 단위 테스트는 실패한다.    
예외를 던지는 코드로 변경해 잘못된 파일 접근을 시도하도록 하자.     
```js
// 7-3 예제 : 예외를 던지는 코드
function retriveSection(sectionName) {
    try {
        const stream = new FileInputStream(sectionName);
    } catch (e) {
        throw new Error("retrieval error", e);
    }
    return new [];
}
```

- catch 블록에서 예외 유형을 좁힌 리팩토링 버전
```js
// 7-3 리팩토링 코드
function retrieveSection(sectionName) {
    try {
        const stream = new FileInputStream(sectionName);
        stream.close();
    } catch (e) {
        throw new Error("retrieval error", e);
    }
    return new [];
}
```
- `try-catch` 구조로 범위를 정했으므로 TDD를 사용해 **나머지 논리**를 추가한다.
    - FileInputStream 생성하는 코드와 close 호출문 사이에 넣어 오류와 예외가 전혀 발생하지 않는다고 가정한다.

- 권장 : **강제로 예외를 일으키는 테스트 케이스를 작성한 후 테스트를 통과하게 코드를 작성하는 방법**
    - `try`블록의 트랜잭션 범위부터 구현하게 되어 **범위 내에서 트랜잭션의 본질을 유지**하기 쉬워진다.

## ✅ 미확인 예외를 사용하라
예전, 확인된 예외를 멋진 아이디어라고 생각했다.    
하지만 지금은 **안정적인 소프트웨어를 제작하는 요소**로 **확인된 예외가 반드시 필요하지 않다**는 사실이 분명해졌다.    
→ 확인된 오류가 **치르는 비용에 상응하는 이익을 제공**하는지 따져봐야 한다.
    - 확인된 예외 : OCP(Open Closed Principle) 위반
        - 메서드에서 확인된 예외를 던졌을 때, `catch` 블록이 세 단계 위에 있을 경우 그 사이 메서드 모두가 선언부에 해당 예외를 정의해야 함    
        → 하위 단계에서 코드를 변경하면 상위 단계 메서드 선언부 전부를 고쳐야 한다는 의미     

- **대규모 시스템에서의 호출 방식**
    - 최상위 함수 : 아래 함수 호출
    - 아래 함수 : 그 아래 함수 호출    
    → 단계를 내려갈수록 호출하는 함수 수는 늘어남    
- **확인된 오류를 던질 경우**
    - 함수는 선언부에 `throws`절을 추가해야 함
    - 변경하는 함수를 호출하는 함수 모두가    
        1. `catch` 블록에서 새로운 예외를 처리하거나    
        2. 선언부에 `throw`절을 추가해야 함    
        → 최하위 단계에서 최상위 단계까지 연쇄적인 수정이 일어남을 의미    
→ `throws` 경로에 위치하는 모든 함수가 최하위 함수에서 던지는 예외를 알아야 하므로 **캡슐화가 깨진다.**    
→ 오류를 원거리에서 처리하기 위해 예외를 사용한다는 사실을 감안할 경우, **확인된 예외가 캡슐화를 깨버리는 현상**이 발생할 수 있다.     

- 확인된 예외가 유용한 경우도 존재
    - ex) 아주 중요한 라이브러리를 작성할 때

## ✅ 예외에 의미를 제공하라
예외를 던질 때에는 전후 상황을 충분히 덧붙일 것.    
   → 오류의 발생 원인과 위치를 찾기 쉬워진다.    
**오류 메시지에 정보**를 담아 **예외와 함께 던진다.**    
    - 실패한 연산 이름과 실패 유형도 언급
    - 애플리케이션이 로깅 기능을 사용할 때 `catch`블록에서 오류를 기록하도록 충분한 정보를 넘겨준다.    

## ✅ 호출자를 고려해 예외 클래스를 정의하라
오류를 분류하는 방법은 수없이 많다.    
    - 오류가 발생한 위치로 분류
    - 오류가 발생한 컴포넌트로 분류
    - 유형으로 분류 ex) `디바이스 실패`, `네트워크 실패`, `프로그래밍 오류`
애플리케이션에서 오류를 정의할 때 프로그래머에게 가장 중요한 관심사 : **오류를 잡아내는 방법**

- 오류를 형편없이 분류한 사례
    - 외부 라이브러리를 호출하는 `try-catch-finally`문을 포함한 코드
    - 외부 라이브러리가 던질 예외를 모두 잡아내는 코드.
```js
// 7-4 예제
const port = new ACMEPort(12);

try {
    port.open();
} catch (e) {
    reportPortError(e);
    console.log("Device response exception", e);
} catch (e) {
    reportPortError(e);
    console.log("Unlock exception", e);
} catch (e) {
    reportPortError(e);
    console.log("Device response exception", e);
} finally {
    // ...
}
```
- 위 코드 : 중복이 심하지만 그리 놀랍지 않다.
- 대다수 상황에서 오류를 처리하는 방식은 (오류를 일으킨 원인과 무관하게) 비교정 일정하다.    
    1. 오류를 기록한다.    
    2. 프로그램을 계속 수행해도 좋은지 확인한다.    
    
- 위의 경우 예외에 대응하는 방식이 예외 유형과 무관하게 거의 동일하다.

```js
// 7-4 예제 리팩토링 코드
// 호출하는 라이브러리 API를 감싸 예외 유형 하나를 반환하는 방식
const port = new LocalPort(12);
try {
    port.open();
} catch (e) {
    reportError(e);
    console.log(e.getMessage(), e);
} finally {
    // ...
}
```
- 위 `LocalPort` 클래스는 단순히 `ACMEPort` 클래스가 던지는 예외를 잡아 변환하는 감싸기(wrapper)클래스의 역할만을 수행한다.

```java
// 7-4 예제 확장 ver. (java)
public class LocalPort {
    private ACMEPort innerPort;

    public LocalPort(int portNumber) {
        innerPort = new ACMEPort(portNumber);
    }

    public void open() {
        try {
            innerPort.open();
        } catch (DeviceResponseException e) {
            throw new PortDeviceFailure(e);
        } catch (ATM1212UnlickedException e) {
            throw new PortDeviceFailure(e);
        } catch (GMXError e) {
            throw new PortDeviceFailure(e);
        }
    }
}
```
- `LocalPort` 클래스와 같이 `ACMEPort`를 감싸는 클래스는 유용하다.
<br/>

- **외부 API를 사용**할 때 : **감싸기 기법**이 최선
    - 외부 API를 감싸면 외부 라이브러리와 프로그램 사이의 의존성이 크게 줄어든다.
    - 추후 다른 라이브러리로 갈아타도 비용이 적다.
    - 감싸기 클래스에서 외부 API를 호출하는 대신 테스트 코드를 넣어주는 방법으로 프로그램 테스트하는 것도 쉬워진다.
    - 특정 업체가 API를 설계한 방식에 발목 잡히지 않는다.
        - 프로그램이 사용하기 편리한 API를 정의하면 된다.
<br/>

- 예외 클래스가 하나만 있어도 충분한 코드가 많다.
    - ex) 예외 클래스에 포함된 정보로 오류를 구분해도 괜찮은 경우
- 한 예외는 잡아내고 다른 에외는 무시해도 괜찮은 경우 : 여러 예외 클래스를 사용