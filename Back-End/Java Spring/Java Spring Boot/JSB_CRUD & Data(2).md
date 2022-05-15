## 5주차 학습 내용

-----

### Mybatis 사용해보기
데이터베이스를 사용하는 이유 : Java 클래스를 통해 데이터를 다룸 (POJO) <br>
    - java 코드로 작성한 List, Hashmap 등은 Memory에 저장됨
    - 여러 서버 프로세스가 같은 기능을 하며 Data를 공유해야 함
    - 외부의 Database에 Data를 저장함

Mybatis 
    - Java 함수를 SQL 선언문과 연결지어 사용 (JPA와 가장 큰 차이점) <br>
    - Java 클래스를 이용해 SQL 결과를 받거나 SQL 선언문에서 사용할 인자를 전달함
    - SQL 상 하나의 ROW의 형태를 Java Class로 만들어 Dto로 만듦

### ORM
관계형 데이터베이스의 한계 : 관계형 데이터베이스에서 사용하는 자료의 형태가 객체 지향 관점에서 맞지 않아 생기는 간극 <br>
    - Object Relational Mapping : 관계형 데이터를 객체로 표현하는 프로그래밍 기법

### JPA 활용하기
[실습코드](https://github.com/yoo-jimin127/Java_Spring_Boot_Course/tree/main/5%EC%A3%BC%EC%B0%A8%20%EC%8B%A4%EC%8A%B5%EC%BD%94%EB%93%9C/jpa/jpa)