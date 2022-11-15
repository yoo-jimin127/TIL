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