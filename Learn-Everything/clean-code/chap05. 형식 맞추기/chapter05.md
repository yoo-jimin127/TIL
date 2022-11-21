## 5장. 형식 맞추기
프로그래머는 형식을 깔끔하게 맞춰 코드를 작성해야 한다.
코드 형식을 맞추기 위해 **간단한 규칙**을 정하고 모두가 그 규칙을 따라야 한다.

### ✅ 형식을 맞추는 목적
코드 형식은 **중요**하다.
**코드 형식**은 **의사소통**의 일환이며, 의사소통은 **전문 개발자의 일차적인 의무**다.
맨 처음 잡아놓은 구현 스타일과 가독성 수준은 **유지보수 용이성과 확장성**에 계속 영향을 미친다.

### ✅ 적절한 행 길이를 유지하라
자바의 파일 크기 : 클래스 크기와 밀접.
<img width="427" src="https://user-images.githubusercontent.com/66112716/202843818-40e3122e-4572-4eba-8eef-65014fc8218b.png">
- 상자를 관통하는 선 : 각 프로젝트에서의 최대 파일 길이와 최소 파일 길이    
→ 500줄이 넘지 않고 대부분 200줄 정도인 파일으로 커다란 시스템을 구축할 수 있음을 명시
- 일반적으로 **큰 파일보다 작은 파일이 이해하기 쉽다.**

#### ▶️ 신문 기사처럼 작성하라
독자는 위 → 아래로 기사를 읽는다.
- **최상단** : 기사를 몇 마디로 요약하는 표제
   - 독자 : 표제를 보고 기사를 읽을지 말지 결정
- **첫 문단** : 전체 기사 내용의 요약
   - 세세한 사실은 숨기고 커다란 그림을 보여줌
   - 읽으며 내려갈수록 날짜, 이름, 발언, 주장, 기타 세부사항이 나옴
   
소스파일 역시 신문 기사와 비슷하게 작성한다.
- **이름** : 간단하면서도 설명이 가능하게 지을 것
   - 이름만 보고도 올바른 모듈을 살펴보고 있는지 아닌지 판단할 정도로 신경써서 지을 것
- **소스파일 첫 부분** : 고차원 개념과 알고리즘 설명
   - 아래로 내려갈수록 의도를 세세하게 묘사할 것
- **마지막** : 가장 저차원 함수 & 세부 내역을 적을 것

>
💡 신문은 다양한 기사로 이뤄지며, 대다수 기사가 아주 짧다.
  어떤 기사는 조금 길지만, 한 면을 채우는 기사는 거의 없다.
  신문이 읽을 만한 이유는 여기에 있다.

#### ▶️ 개념은 빈 행으로 분리하라
대부분의 코드 : `왼쪽` → `오른쪽`, `위` → `아래` 방향으로 읽힌다.
- **각 행** : 수식 or 절
- **일련의 행 묶음** : 완결된 생각 하나를 표현
   - 생각 사이는 빈 행을 넣어 분리
```java
package fitnesse.wikitext.widgets;

import java.util.regex.*;

public class BoldWidget extends ParentWidget {
 // pass
};

public BoldWidget(Parent parent, String text) throws Exception {
 // pass
};

public String render() throws Exception {
 // pass
}
```
- 위 코드의 문제점
   - 패키지 선언부, import문, 각 함수 사이에 빈 행이 들어감
   - 간단한 규칙이나 코드의 세로 레이아웃에 심오한 영향을 미침
   - ✓ **빈 행** : 새로운 개념을 시작한다는 시각적 단서
   
```java
package fitnesse.wikitext.widgets;
import java.util.regex.*;
public class BoldWidget extends ParentWidget {
 // pass
};
public BoldWidget(Parent parent, String text) throws Exception {
 // pass
};
public String render() throws Exception {
 // pass
}
```
빈 행을 뺄 경우 코드의 가독성이 떨어져 암호처럼 보인다.
빈 행의 삽입 여부에 따라 **행 묶음의 분리**효과를 얻을 수 있다.
빈 행을 삽입하지 않을 경우, **코드 전체가 한 덩어리**로 보인다.

#### ▶️ 세로 밀집도
- 줄바꿈 : 개념 분리 의미
- 세로 밀집도 : 연관성 의미
   → 세로 밀집도 : 서로 밀접한 코드 행은 세로로 가까이 놓아야 한다는 뜻
   <br />
- 의미 없는 주석으로 두 인스턴스 변수를 떨어뜨려 놓은 예시 (5-3)
```js
class ReporterConfig {
  /**
  * 리포터 리스너의 클래스 이름
  */
  constructor(m_className, m_properties) {
    this.m_className = m_className;
    this.m_properties = [];
  }
  
  /**
  * 리포터 리스너의 속성
  */
  addProperty(property) {
    m_properties.append(property);
  }
}
```
- 5-3 예시 리팩토링 코드
   - 코드가 **한눈**에 들어옴
   - 변수 2개에 메서드가 1개인 클래스라는 사실이 드러남
```js
class ReporterConfig {
  constructor(m_className, m_properties) {
    this.m_className = m_className;
    this.m_properties = [];
  }
  
  addProperty(property) {
    m_properties.append(property);
  }
}
```

#### ▶️ 수직 거리
시스템이 무엇을 하는지 이해하고 싶은데, 
이 조각 저 조각이 어디에 있는지 찾고 기억하는데 시간과 노력이 소모된다.

**서로 밀접한 개념은 세로로 가까이 둬야 한다.**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 두 개념이 서로 다른 파일에 속할 경우 규칙이 통하지 않는다.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 타당한 근거가 없다면 서로 밀접한 개념은 한 파일에 속해야 마땅하다.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 위 이유가 java의 `protected` 변수를 피해야 하는 이유 중 하나
