## 3장. 함수
- 프로그래밍 초창기의 시스템 = 루틴 + 하위 루틴
- 포트란 & PL/1 시기의 시스템 = 프로그램 + 하위 프로그램 + 함수
→ 현재 : **함수**만 살아남음
- 가장 기본적인 단위 : **함수**

- 함수 코드 보기(좋지 않은 예)
```js
// ❌
function testableHtml(pageData, includeSuiteSetup){
    try{
    	const wikiPage = pageData.getWikiPage();
        const buffer = StringBuffer();
        if (pageData.hasAttribute("Test")){
            if (includeSuiteSetup){
            	    const suiteSetup = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_SETUP_NAME, wikiPage);
                if (suiteSetup != null){
                    pagePath = suiteSetup.getPageCrawler().getFullPath(suiteSetup);
                    pagePathName = PathParser.render(pagePath);
                    buffer.append("!include -setup .");
                    buffer.append(pagePathName);
                    buffer.append("\n");
                }
            }
            const setup = PageCralwerImpl.getInheritedPage("Setup", wikiPage);
            if (setup != null){
            	const setupPath = wikiPage.getPageCrawler().getFullPath(setup);
                const setupPathName = PathParser.render(setupPath);
                buffer.append("!include -setup .");
                buffer.append(setupPathName);
                buffer.append("\n");
            }
        }
        buffer.append(pageData.getContent())
        if (pageData.hasAttribute("Test")){
            const teardown = PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
            if (teardown != NULL){
            	const tearDownPath = wikiPage.getPageCralwer().getFullPath(teardown);
                const tearDownPathName = PathParser.render(tearDownPath);
                buffer.append("\n");
                buffer.append("!include -teardown .");
                buffer.append(tearDownPathName);
                buffer.append("\n");
            }
            if (includeSuiteSetup)
            	const suiteTeardown = PageCrawlerImpl.getInheritedPage(SuiteResponder.SUITE_TEARDOWN_NAME, wikiPage);
            if (suiteTeardown != NULL){
            	const pagePath = suiteTeardown.getPageCrawler().getFullPath(suiteTeardown);
                const pagePathName = PathParser.render(pagePath);
                buffer.append("!include -teardown .");
                buffer.append(pagePathName);
                buffer.append("\n");
            }
        }
    }
    pageData.setContent(String(buffer));
    return pageData.getHtml();
    }
```
- 위 함수가 좋지 않은 이유
   - 너무 다양한 추상화 수준
   - 너무 긴 코드

- 1차로 개선된 코드
```js
// 위 코드 리팩터링 버전
function renderPageWithSetupsAndTeardowns(pageData, isSuite){
    try{
    	const isTestPage = pageData.hasAttribute("Test");
        if (isTestPage){
            const testPage = pageData.getWikiPage();
            const newPageContent = StringBuffer();
            includeSetupPages(testPage, newPageContent, isSuite);
            newPageContent.append(pageData.getContent());
            includeTeardownpages(testPage, newPageContent, isSuite);
            pageData.setContent(str(newPageContent));
        }
    }
    return pageData.getHTML();
}
```
- 보다 쉽게 코드를 이해할 수 있게 됨
- check point
   - 함수가 읽기 쉽고 이해하기 쉬운 이유는 무엇인가?
   - 의도를 분명히 표현하는 함수를 어떻게 구현할 수 있는가?
   - 어떤 속성을 부여해야 처음 일는 사람이 프로그램 내부를 직관적으로 파악할 수 있는가?

### ✅ 작게 만들어라
- 함수를 만드는 첫째 규칙 : **작게!**
- 둘째 규칙 : **더 작게!**
- 각 함수가 **이야기 하나를 표현**할 수 있도록 명백하게 구성할 것
```js
// 리-리팩토링한 코드
function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
    try{
    	if (isTestPage(pageData))
            includeSetupAndTeardownPages(pageData, isSuite);
    }
    return pageData.getHtml();
}
```
### ✅ 블록과 들여쓰기
- if문, else문, while문 등에 들어가는 블록은 한 줄이어야 한다는 의미
- 효과
   - 함수가 작아짐
   - 블록 안에서 호출하는 함수를 적절히 지을 경우, 코드의 이해가 쉬워짐
   → 중첩 구조가 생길만큼 함수가 커져서는 안된다는 뜻
   → 함수에서의 들여쓰기 수준은 1단 또는 2단을 넘어서면 안됨

### ✅ 한 가지만 해라!
**함수는 한 가지를 해야 한다. 그 한 가지를 잘 해야한다. 그 한가지만을 해야 한다.**
- meaning of **한가지** (by. 리-리팩토링 코드)
   - 페이지가 테스트 페이지인지 판단
   - 그렇다면 설정 페이지와 해제 페이지를 넣음
   - 페이지를 html으로 렌더링
- 지정된 함수 이름 아래에서 추상화 수준이 하나
- 함수를 만드는 이유: **큰 개념을(함수 이름을) 다음 추상화 수준에서 여러 단계로 나눠 수행하기 위함**
- 의미 있는 이름으로 다른 함수를 추출할 수 있다면 **그 함수는 여러 작업을 하고 있음**
<br />
- **함수 내 섹션**
   - if) 여러가지 섹션으로 나눠지는가?
   → 한 함수에서 여러 작업을 한다는 증거
   → 한 가지 작업만 하는 함수 : 세션으로 나누기 어려움

### ✅ 함수 당 추상화 수준은 하나로!
- 함수가 확실히 '한 가지' 작업만 하기 위해 **함수 내 모든 문장의 추상화 수준이 동일**해야 함
- 위에서 아래로 코드 읽기 : **내려가기** 규칙
   - 코드 : 위 → 아래로 이야기처럼 읽혀야 좋음
   - 한 함수 다음 → 추상화 수준이 한 단계 낮은 함수가 옴
   → 아래로 프로그램을 읽어갈 수록, 함수 추상화 수준이 한 번에 한 단계씩 낮아짐

### ✅ Switch문
- switch문 : 작게 만들기 어려움
   - switch문 : N가지 처리
   - switch문을 저차원 클래스에 숨기고 절대 바복하지 않는 방법 O → 다형성 이용
```js
function calculatePay(e){
    const etype = e.type
    switch (etype){
    case "COMMISSIONED":
        return calculateCommissionedPay(e);
    case "HOURLY":
        return calculateHourlyPay(e);
    case "SALARIED":
        return calculateSalariedPay(e);
    default:
        console.log(InvalidEmployeeType(e.type));
    }
}
```
- 위 코드가 좋지 않은 이유
   - 긴 함수
   - '한 가지' 작업만을 수행하지 않음
   - SRP 위반 (Single Responsibility Principle)
   - OCP 위반 (Open Closed Principle)
      - 새 직원 유형 추가할 때마다 코드 변경
   - 위 함수와 구조가 동일함 함수가 무한정 존재할 수 있음
      <br />
- 리팩토링한 코드
```js
class Employee(){
    isPayday(){
    	//pass
    }
    calculatePay(){
	    //pass
    }
    deliveryPay(pay){
	    //pass
    }
}
class EmployeeFactory(){
    makeEmployee(r){
    	//pass
    }
}
class EmployeeFactoryImpl(EmployeeFactory){
    makeEmployee(r){
        switch (r.type){
    	case "COMMISIONED":
            return CommisionedEmployee(r);
        case "HOURLY":
            return HourlyEmployee(r);
        case "SALARIED":
            return SalariedEmployee(r);
        default:
            console.log(InvalidEmployeeType(r.type));
        }
    }
}
```

### ✅ 서술적인 이름을 사용하라!
- 길고 서술적인 이름이 짧고 어려운 이름보다 좋음
- 길고 서술적인 이름이 길고 서술적인 주석보다 좋음
<br />
- 함수 이름을 정하는 규칙
   - 여러 단어가 쉽게 읽히는 명명법 사용
   - 여러 단어를 사용해 함수 기능을 잘 표현하는 이름 선택
   - 일관성있게 이름을 붙일 것
- 모듈 내의 함수 이름 : 같은 문구, 명사, 동사 사용할 것
   - ex) `includeSetupAndTeardownPages`, `includeSetupPages`, ...
   
### ✅ 함수 인수
함수에서 이상적인 이수 개수 : 0개(무항) > 1개(단항) > 2개(이항) > ...
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 3개 이상 : 피하는 것이 좋음
- 인수는 개념을 이해하기 어렵게 만듦
- 테스트 관점 : 갖가지 인수 조합으로 함수 검증해야 함, 더욱 어려움
- 출력 인수는 입력 인수보다 더 어려움
- 최선 : 입력 인수가 없는 경우, 차선 : 입력 인수가 1개 뿐인 경우

#### ▶️ 많이 쓰는 단항 형식
- 함수에 인수 1개를 넘기는 이유
   1. **인수에 질문**을 던지는 경우 ex) `boolean fileExists("MyFile")`
   1. **인수로 뭔가를 변환해 결과를 반환**하는 경우 ex) `InputStream fileopen("MyFile")`
- 함수 이름을 지을 때 : 두 경우 분명히 구분
- 항상 일관적인 방식으로 두 형식 사용할 것
- **이벤트** : 유용한 단항 함수 형식 (입력 인수 O , 출력 인수 X)
- 프로그램 : 함수 호출을 이벤트로 해석, 입력 인수로 시스템 상태 변경
   - 이벤트라는 사실이 코드에 명확히 드러나야 함 → 이름 & 문맥을 주의해 선택
- 단항 함수 : 가급적 피할 것, 변환 함수에서 출력 인수를 사용하지 않을 것
- 입력 인수를 그대로 돌려주는 함수 → 변환 함수 형식을 따르는 것이 변환 형태를 유지할 수 있으므로 좋음

#### ▶️ 플래그 인수
가급적 플래그 인수는 사용하지 말자.
- 함수로 `bool`값을 넘기는 관례 → 함수가 한꺼번에 여러 가지를 처리한다고 공표하는 것
   - 부정적임
   
#### ▶️ 이항 함수
- 인수가 2개인 함수 : 인수가 1개인 함수보다 이해하기 어려움
- 이항 함수가 적절한 경우 : ex) 직교 좌표계 점 표시
- 이항 함수를 단한 함수로 바꾸도록 노력할 것

#### ▶️ 삼항 함수
- 인수가 3개인 함수 : 인수가 2개인 함수보다 이해하기 어려움
- `assertEquals(1.0, amount, .001)` : 그다지 음험하지 않은 삼항 함수

#### ▶️ 인수 객체
인수가 2~3개 필요할 경우 : 일부 독자적인 클래스 변수로 선언할 가능성을 짚어볼 것
```js
function makeCircle(x, y, radius){
    // pass
}
function makeCircle(center, radius){
    // pass
}
```
- x와 y를 묶음 → 이름을 붙여야 함 → 개념 표현

#### ▶️ 인수 목록
종종 인수 개수가 **가변적인** 함수도 필요
- 가변 인수를 취하는 모든 함수에 같은 원리 적용
- 가변 인수를 취하는 함수 : 단항, 이항, 삼항 함수로 취급 O
   - 이를 넘어서는 인수 사용 시 문제
   
#### ▶️ 동사와 키워드
함수의 의도 & 인수 순서 & 의도의 정확한 표현 → **좋은 함수 이름** 필수
- 단항 함수 : 함수와 인수가 동사/명사 쌍을 이뤄야 함
   - ex) `write(name)` → `writeField(name)`
- 함수 이름에 인수 이름을 넣는, 키워드 추가의 형식
   - ex) `assertEquals` → `assertExceptedEqualsActual(expected, actual)`
   - 인수의 순서를 기억할 필요가 없어짐
   
### ✅ 부수 효과를 일으키지 마라
- 부수 효과 : 함수에서 한가지를 하겠다고 약속한 뒤 클래스 변수를 수정하거나, 함수로 넘어온 인수 및 시스템 전역 변수를 수정하는 경우
- 많을 경우 **시간적 결함(temporal coupling)이나 순서 종속성(order deependency)초래**
```js
class UserValidator{
    constructor(cryptographer) {
        this.cryptographer = "";
    }
    checkPassword (userName, password){
    	const user = UserGateway.findByName(userName);
        if (user != User.NULL){
            const codedPhrase = user.getPhraseEncodedByPassword();
            const phrase = cryptographer.decrypt(codedPhrase, password);
            if ("Valid Password" == phrase){
            	Session.initialize();
                return True;
            }
        }
        return False;
    }
}
```
- 위 코드에서 불러오는 부수 효과
   - `Session.initialize()`의 호출
   - 본 함수의 역할 : `checkPassword` (암호 확인)
   → 시간적 결함 초래
   
