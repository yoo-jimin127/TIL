# 15장. JUnit 들여다보기
JUnit은 자바 프레임워크 중 가장 유명하다.   
일반적인 프레임워크와 동일하게 _개념은 단순하며 정의는 정밀하고 구현은 우아하다._   
JUnit 프레임워크의 코드를 들여다보자.   

## ✅ JUnit 프레임워크
JUnit의 저자는 많으나, 시작은 켄트 백과 에릭 감마 두 사람이 시작하였다.   
> 아틀란타 행 비행기를 타고 가다가 JUnit이 만들어졌다고 한다..   

살펴볼 모듈은 `ComparisonCompactor`로, 문자열 비교 오류를 파악할 때 유용한 코드이다.   
- `ComparisonCompactor` : 두 문자열을 받아 차이를 반환
    - ex) `ABCDE`와 `ABXDE`를 받아 `<...B[X]D...>`를 반환   

<details>
<summary><b>💻 예제 15-1. ComparisonCompactorTest.java </b></summary>

```java
// 예제 15-1. ComparisonCompactorTest.java
package junit.tests.framework;

import junit.framework.ComparisonCompactor;
import junit.framework.TestCase;

public class ComparisonCompactorTest extends TestCase {
  public void testMessage() {
    String failure= new ComparisonCompactor(0, "b", "c").compact("a");
    assertTrue("a expected:<[b]> but was:<[c]>".equals(failure));
  }

  public void testStartSame() {
    String failure= new ComparisonCompactor(1, "ba", "bc").compact(null);
    assertEquals("expected:<b[a]> but was:<b[c]>", failure);
  }

  public void testEndSame() {
    String failure= new ComparisonCompactor(1, "ab", "cb").compact(null);
    assertEquals("expected:<[a]b> but was:<[c]b>", failure);
  }

  public void testSame() {
    String failure= new ComparisonCompactor(1, "ab", "ab").compact(null);
    assertEquals("expected:<ab> but was:<ab>", failure);
  }

  public void testNoContextStartAndEndSame() {
    String failure= new ComparisonCompactor(0, "abc", "adc").compact(null);
    assertEquals("expected:<...[b]...> but was:<...[d]...>", failure);
  }

  public void testStartAndEndContext() {
    String failure= new ComparisonCompactor(1, "abc", "adc").compact(null);
    assertEquals("expected:<a[b]c> but was:<a[d]c>", failure);
  }

  public void testStartAndEndContextWithEllipses() {
    String failure=
      new ComparisonCompactor(1, "abcde", "abfde").compact(null);
    assertEquals("expected:<...b[c]d...> but was:<...b[f]d...>", failure);
  }

  public void testComparisonErrorStartSameComplete() {
    String failure= new ComparisonCompactor(2, "ab", "abc").compact(null);
    assertEquals("expected:<ab[]> but was:<ab[c]>", failure);
  }

  public void testComparisonErrorEndSameComplete() {
    String failure= new ComparisonCompactor(0, "bc", "abc").compact(null);
    assertEquals("expected:<[]...> but was:<[a]...>", failure);
  }

  public void testComparisonErrorEndSameCompleteContext() {
    String failure= new ComparisonCompactor(2, "bc", "abc").compact(null);
    assertEquals("expected:<[]bc> but was:<[a]bc>", failure);
  }

  public void testComparisonErrorOverlapingMatches() {
    String failure= new ComparisonCompactor(0, "abc", "abbc").compact(null);
    assertEquals("expected:<...[]...> but was:<...[b]...>", failure);
  }

  public void testComparisonErrorOverlapingMatchesContext() {
    String failure= new ComparisonCompactor(2, "abc", "abbc").compact(null);
    assertEquals("expected:<ab[]c> but was:<ab[b]c>", failure);
  }

  public void testComparisonErrorOverlapingMatches2() {
    String failure= new ComparisonCompactor(0, "abcdde",
"abcde").compact(null);
    assertEquals("expected:<...[d]...> but was:<...[]...>", failure);
  }

  public void testComparisonErrorOverlapingMatches2Context() {
    String failure=
      new ComparisonCompactor(2, "abcdde", "abcde").compact(null);
    assertEquals("expected:<...cd[d]e> but was:<...cd[]e>", failure);
  }

  public void testComparisonErrorWithActualNull() {
    String failure= new ComparisonCompactor(0, "a", null).compact(null);
    assertEquals("expected:<a> but was:<null>", failure);
  }

  public void testComparisonErrorWithActualNullContext() {
    String failure= new ComparisonCompactor(2, "a", null).compact(null);
    assertEquals("expected:<a> but was:<null>", failure);
  }

  public void testComparisonErrorWithExpectedNull() {
    String failure= new ComparisonCompactor(0, null, "a").compact(null);
    assertEquals("expected:<null> but was:<a>", failure);
  }

  public void testComparisonErrorWithExpectedNullContext() {
    String failure= new ComparisonCompactor(2, null, "a").compact(null);
    assertEquals("expected:<null> but was:<a>", failure);
  }

  public void testBug609972() {
    String failure= new ComparisonCompactor(10, "S&P500", "0").compact(null);
    assertEquals("expected:<[S&P50]0> but was:<[]0>", failure);
  }
}
```
</details>

위 15-1의 테스트 케이스로 `ComparisonCompactor` 모듈에 대한 코드 커버리지 분석 수행 시 100%가 나온다.   
&nbsp;&nbsp; → 테스트 케이스가 모든 행, 모든 if문, 모든 for문을 실행한다는 의미   
<br>

다음으로 15-2 예제 코드를 통해 `ComparisonCompactor` 코드를 살펴보자.   
<details>
<summary><b>💻 예제 15-2. ComparisonCompactor.java(원본) </b></summary>

```java
// 예제 15-2. ComparisonCompactor.java(원본)
package junit.framework;

public class ComparisonCompactor {

  private static final String ELLIPSIS = "...";
  private static final String DELTA_END = "]";
  private static final String DELTA_START = "[";

  private int fContextLength;
  private String fExpected;
  private String fActual;
  private int fPrefix;
  private int fSuffix;

  public ComparisonCompactor(int contextLength,
                             String expected,
                             String actual) {
    fContextLength = contextLength;
    fExpected = expected;
    fActual = actual;
  }

  public String compact(String message) {
    if (fExpected == null || fActual == null || areStringsEqual())
      return Assert.format(message, fExpected, fActual);

    findCommonPrefix();
    findCommonSuffix();
    String expected = compactString(fExpected);
    String actual = compactString(fActual);
    return Assert.format(message, expected, actual);
  }

  private String compactString(String source) {
    String result = DELTA_START +
        source.substring(fPrefix, source.length() -
            fSuffix + 1) + DELTA_END;
    if (fPrefix > 0)
      result = computeCommonPrefix() + result;
    if (fSuffix > 0)
      result = result + computeCommonSuffix();
    return result;
  }

  private void findCommonPrefix() {
    fPrefix = 0;
    int end = Math.min(fExpected.length(), fActual.length());
    for (; fPrefix < end; fPrefix++) {
      if (fExpected.charAt(fPrefix) != fActual.charAt(fPrefix))
        break;
    }
  }

  private void findCommonSuffix() {
    int expectedSuffix = fExpected.length() - 1;
    int actualSuffix = fActual.length() - 1;
    for (;
         actualSuffix >= fPrefix && expectedSuffix >= fPrefix;
         actualSuffix--, expectedSuffix--) {
      if (fExpected.charAt(expectedSuffix) != fActual.charAt(actualSuffix))
        break;
    }
    fSuffix = fExpected.length() - expectedSuffix;
  }

  private String computeCommonPrefix() {
    return (fPrefix > fContextLength ? ELLIPSIS : "") +
        fExpected.substring(Math.max(0, fPrefix - fContextLength),
            fPrefix);
  }

  private String computeCommonSuffix() {
    int end = Math.min(fExpected.length() - fSuffix + 1 + fContextLength,
        fExpected.length());
    return fExpected.substring(fExpected.length() - fSuffix + 1, end) +
        (fExpected.length() - fSuffix + 1 < fExpected.length() -
            fContextLength ? ELLIPSIS : "");
  }

  private boolean areStringsEqual() {
    return fExpected.equals(fActual);
  }
}
```
</details>

- `예제 15-2` 분석
    - 코드가 잘 분리되어 있다.
    - 표현력이 적절하다.
    - 구조가 단순하다.
    - 긴 표현식 몇 개와 이상한 `+1` 등이 눈에 띈다.
    - `예제 15-3`과 같이 짰을 수도 있었기에, `예제 15-2`는 상당히 훌륭한 모듈이다.

<details>
<summary><b>💻 예제 15-3. ComparisonCompactor.java(디팩터링 결과) </b></summary>

```java
// 예제 15-3. ComparisonCompactor.java(디팩터링 결과)
package junit.framework;

public class ComparisonCompactor {
  private int ctxt;
  private String s1;
  private String s2;
  private int pfx;
  private int sfx;

  public ComparisonCompactor(int ctxt, String s1, String s2) {
    this.ctxt = ctxt;
    this.s1 = s1;
    this.s2 = s2;
  }

  public String compact(String msg) {
    if (s1 == null || s2 == null || s1.equals(s2))
      return Assert.format(msg, s1, s2);

    pfx = 0;
    for (; pfx < Math.min(s1.length(), s2.length()); pfx++) {
      if (s1.charAt(pfx) != s2.charAt(pfx))
        break;
    }
    int sfx1 = s1.length() - 1;
    int sfx2 = s2.length() - 1;
    for (; sfx2 >= pfx && sfx1 >= pfx; sfx2--, sfx1--) {
      if (s1.charAt(sfx1) != s2.charAt(sfx2))
        break;
    }
    sfx = s1.length() - sfx1;
    String cmp1 = compactString(s1);
    String cmp2 = compactString(s2);
    return Assert.format(msg, cmp1, cmp2);
  }

  private String compactString(String s) {
    String result =
      "[" + s.substring(pfx, s.length() - sfx + 1) + "]";
    if (pfx > 0)
      result = (pfx > ctxt ? "..." : "") +
        s1.substring(Math.max(0, pfx - ctxt), pfx) + result;
    if (sfx > 0) {
      int end = Math.min(s1.length() - sfx + 1 + ctxt, s1.length());
      result = result + (s1.substring(s1.length() - sfx + 1, end) +
        (s1.length() - sfx + 1 < s1.length() - ctxt ? "..." : ""));
    }
    return result;
  }
}
```
</details>

저자들은 모듈을 매우 좋은 상태로 남겨두었으나, [보이스카우트 규칙](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=nimbusob&logNo=161544641)에 따라   
우리는 처음 왔을 때보다 더 깨끗하게 해놓아야 한다.   
지금부터 `예제 15-3` 코드를 개선해보자.   

### 1️⃣ 멤버 변수 앞 접두어 `f` 제거
오늘날 사용하는 개발환경에서는 변수 이름에 범위를 명시할 필요가 없다.   
접두어 `f`는 중복되는 정보이므로 모두 제거하자.   
```java
  private int contextLength;
  private String expected;
  private String actual;
  private int prefix;
  private int suffix;
```

### 2️⃣ `compact` 함수 시작부 - 캡슐화되지 않은 조건문의 캡슐화
<details>
<summary><b>💻 이전 코드</b></summary>

```java
  public String compact(String message) {
    if (expected == null || actual == null || areStringsEqual())
      return Assert.format(message, expected, actual);

    findCommonPrefix();
    findCommonSuffix();
    String expected = compactString(this.expected);
    String actual = compactString(this.actual);
    return Assert.format(message, expected, actual);
  }
```
</details>

의도를 명확하게 표현하기 위해서는 _조건문을 캡슐화_ 해야 한다.   
조건문을 메서드로 뽑아내 적절한 이름을 붙인다.   

```java
public String compact (String message) {
    if (shouldNotCompact())
        return Assert.format(message, expected, actual);
    findCommonPrefix();
    findCommonSuffix();
    String expected = compactString(this.expected);
    String actual = compactString(this.actual);
    return Assert.format(message, expected, actual);
}

private boolean shouldNotCompact() {
    return expected == null || actual == null || areStringsEqual();
}
```
위 코드의 경우 `expected`라는 지역 변수가 있음에도,   
`compact` 함수 내에서 `this.expected`, `this.actual`을 사용하고 있다.   
<br>

`fExpected`에서 `f`를 빼버리는 바람에 생긴 결과다.   
함수에서 멤버 변수와 이름이 똑같은 변수를 사용하는 이유가 없다면 이를 변경한다.   

이름을 명확하게 붙인다.   
```java
String compactExpected = compactString(expected);
String compactActual = compactString(actual);
```

부정문은 긍정문보다 이해하기 어렵기에, 첫 문장 `if`를 긍정으로 만들어 조건문을 반전한다.   
```java
public String compact (String message) { 
    if (canBeCompacted()) {
        findCommonPrefix(); 
        findCommonSuffix();
        String compactExpected = compactString(expected); 
        String compactActual = compactString(actual);
        return Assert.format(message, compactExpected, compactActual); 
        } else {
            return Assert.format(message, expected, actual);
        }
}

private boolean canBeCompacted() {
    return expected != null & actual != null & !areStringsEqual();
}
```

### 3️⃣ `canBeCompacted` 함수 이름 변경
함수 이름이 이상하다.   
문자열을 압축하는 함수이지만, 실제로 `canBeCompacted`가 `false`이면 압축하지 않는다.   
따라서 `compact`라는 이름을 붙일 경우 오류 점검이라는 부가 단계가 숨겨진다.   
더하여 함수는 단순히 압축된 문자열이 아닌 _형식이 갖춰진 문자열_ 을 반환한다.   
<br>

따라서 `formatCompactedComparison`이라는 이름이 적합하다.   
새 이름에 인수를 고려할 경우 가독성이 훨씬 좋아진다.   
```java
public string formatCompactedComparison(String message) { ... }
```

### 4️⃣ 함수의 분리
`if`문 앞에서는 예상 문자열과 실제 문자열을 진짜로 압축한다.   
이 부분을 빼내어 `compactExpectedAndActual`이라는 메서드로 만든다.   
<br>

하지만 형식을 맞추는 작업은 `formatCompactedComparison`에게 전적으로 맡긴다.   
`compactExpectedAndActual`은 _압축_ 만을 수행한다.   
```java
private String compactExpected;
private String compactActual;

public String formatCompactedComparison(String message) {
    if (canBeCompacted()) {
        compactExpectedAndActual();
        return Assert.format(message, compactExpected, compactActual);
    } else {
        return Assert.format(message, expected, actual);
    }
}

private void compactExpectedAndActual () {
    findCommonPrefix();
    findCommonSuffix();
    compactExpected = compactString(expected);
    compactActual = compactString(actual);
}
```
위 코드에서 `compactExpected`와 `compactActual`이 멤버변수로 승격했음에 주의한다.   
새 함수에서 마지막 두 줄은 변수를 반환하지만, 첫째 줄과 둘째 줄은 반환 값이 없다.   
<br>

함수 사용 방식이 일관적이지 못하다.   
&nbsp;&nbsp; → `findCommonPrefix`와 `findCommonSuffix`를 변경해 접두어 값과 접미어 값을 반환한다.   
```java
private void compactexpectedAndActuall() {
    prefixIndex= findCommonPrefix();
    suffixIndex = findCommonSuffix();
    compactExpected = compactString(expected);
    compactActual = compactString(actual);
}

private int findCommonPrefix() {
    int prefixIndex = 0;
    int end = Math.min(expected. Length, actual.length());
    for (; prefixIndex < end; prefixIndex++) {
        if (expected.charAt(prefixindex) =! actual.charAt(pretixIndex))
            break;
    }
    return prefixIndex;
}

private int findCommonSuffix() { 
    int expectedSuffix = expected.length() - 1;
    int actualSuffix = actual.length() - 1; 
    for (; actualSuffix >= prefixIndex & expectedSuffix >= prefixIndex;
        actualSuffix--, expectedSuffix--) { 
        if (expected.charAt(expectedSuffix) != actual.charAt(actualSuffix))
            break;
    }
    return expected.length() - expectedSuffix;
}
```
멤버 변수 이름이 조금 더 정확하게 바뀌었다.   

### 5️⃣ 숨겨진 시간적인 결합(hidden temporal coupling) 수정 
`findCommonsuffix`는 `findcommonPrefix`가 `prefixIndex`를 계산한다는 사실에 의존한다.    
만약 `findCommonPrefix`와 `findCommonSuffix`를 잘못된 순서로 호출하면 무한 디버깅이 시작될 수 있다.    
그래서 시간 결합을 외부에 노출하고자 `findCommonSuffix`를 고쳐 `prefixIndex`를 인수로 넘기도록 수정한다.   
```java
private void compactExpectedAndActual() {
    prefixIndex = findCommonPrefix();
    suffixIndex = findCommonSuffix(prefixIndex);
    compactExpected = compactString(expected);
    compactActual = compactString(actual);
}

private int findCommonSuffix(int prefixIndex) {
    int expectedSuffix = expected.length() - 1;
    int actualSuffix = actual.length() - 1;
    for (; actualSuffix >= prefixIndex & expectedSuffix >= prefixIndex;
            actualSuffix-, expectedSuffix--) {
        if (expected. charAt (expectedSuffix) != actual.charAt(actualSuffix))
            break;
    }
    return expected.length() - expectedSuffix;
}
```

