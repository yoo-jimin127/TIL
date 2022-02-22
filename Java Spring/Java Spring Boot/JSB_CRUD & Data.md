## 4주차 학습 내용

------

### CRUD란?
웹 서비스
    - 사용자가 원하는 자원의 관리
    - 자원의 제공, 제작, 갱신 등
    - 부수적인 기능은 서비스 별로 다르게 만들어짐

Create : 생성
Read : 조회
Update : 갱신
Delete : 삭제

-----
### CRUD와 RESTful
1. Client Server Architecture
    - 서버와 클라이언트의 분리
    - 서로의 변화가 서로에게 영향을 주지 않는 형태를 취해야 함

2. Statelessness
    - 상태를 저장하지 않음
    - 원하는 기능을 위한 상태는 Client가 가지고 있어야 함

3. Cachability
    - 캐시 가능성
    - 자원의 캐싱이 가능한지의 여부를 항상 표기해줘야 함

4. Layered System
    - 계층 구조
    - 클라이언트는 서버에 도달하기까지의 과정을 알 필요 없음

5. Uniformed Interface
    - 일관된 인터페이스

6. Code on Demand (Optional)
    - 일시적 기능의 확장
    - 사용 가능한 코드를 응답으로 보내 사용자의 기능을 일시적으로 확장시킬 수 있음

------

### Spring Stereotypes
- Component란?
    - ComponentScan을 이용해 사용할 Bean의 범위를 정해줄 수 있음   
        - 함수 단위 : `@Bean`, 클래스 단위 : `@Component`
   
    - Controller
        - RequestMapping와 함께 사용
        - MVC의 'Controller' 역할을 함을 알림
    - Repository
        - Data Access Object와 같이 실제 데이터 근원과 소통하는 부분임을 알림
    - Service
        - 비즈니스 로직이 구현된 부분임을 알림
    - 모든 Bean에 Component를 사용해도 작동하기는 함