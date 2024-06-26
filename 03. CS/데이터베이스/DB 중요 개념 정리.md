# DB 중요 개념 정리

## ✅ 데이터베이스란?
- 여러 사람의 공유 목적으로 체계화해 통합, 관리되는 데이터의 집합
- 데이터 베이스를 사용하기 이전 : 파일 시스템을 이용해 관리     
    → 데이터 종속성, 중복성, 무결성의 문제 발생     

## ✅ 데이터베이스의 특징
### 1️⃣ 독립성(Data Independence) 
- **논리적 독립성** : 응용 프로그램과 데이터베이스 간의 독립
    - 데이터의 논리적 구조를 변경시켜도 응용 프로그램의 **논리적 구조는 변경되지 않음**

- **물리적 독립성** : 응용 프로그램과 물리적 장치(ex. 보조기억장치 etc.)간의 독립
    - 데이터베이스 시스템의 성능 향상을 위한 새로운 디스크의 도입에도 응용 프로그램에 영향이 없음
    - 데이터의 **물리적 구조**만을 변경
    - 데이터베이스의 사이즈 변경 시 관련된 응용 프로그램의 수정이 필요 없음

- cf) **종속성**(Data Dependency) : 응용 프로그램의 구조가 데이터의 구조에 영향을 받음

### 2️⃣ 무결성 (Data Integrity)
- 데이터의 삽입, 삭제, 갱신 등의 연산 후에도 데이터 베이스에 저장되어있는 데이터가 **정해진 제약조건을 항상 만족**해야 함
- 여러 경로를 통해 잘못된 데이터가 발생하는 경우를 방지하기 위한 목적
- 데이터의 유효성 검사

### 3️⃣ 일관성 (Data Consistency)
- 데이터베이스에 저장되어있는 데이터와 특정 질의에 대한 응답이 변함 없이 일정해야 하는 조건
- 관련있는 정보를 논리적인 구조로 관리하는 체계
- 데이터 변경 시 나머지 데이터와 일치하지 않는 **불일치성의 배제**를 위한 목적
- 유효한 데이터에 대한 데이터베이스의 자체 규칙을 위반하는 데이터는 사용할 수 없다고 명시
    - ex) 성별 column에는 'Male', 'Female', 'Unknown'만 들어갈 수 있음
- 일치하지 않는 데이터를 도입하려는 특정 트랜잭션이 발생할 경우, 전체 트랜잭션이 롤백되고 오류가 사용자에게 반환됨

### 4️⃣ 보안성 (Data Security)
- 데이터로의 접근 권한이 있는 사용자들만 접근할 수 있도록 설정

### 5️⃣ 중복성 (Data Redundancy)
- 같은 데이터의 중복 저장
- 데이터의 수정, 삭제가 필요할 경우 연결되어있는 모든 데이터를 수정 및 삭제해줘야 하는 문제점 존재
- **데이터의 통합 관리**를 통해 데이터의 중복을 최소화할 것

## ✅ 데이터베이스 시스템의 목적
### 1️⃣ 기존 파일 시스템 사용 시
- 데이터의 중복 및 비일관성의 문제
- 데이터의 접근 및 검색의 비효율성
- 무결성 문제
- 보안 문제

### 2️⃣ 데이터베이스 시스템 사용 시
- DBMS를 사용한 요구 처리
- SQL을 사용한 데이터로의 접근

- 👍 **Good**
    - 데이터의 중복 최소화
    - 데이터의 일관성
    - 데이터의 물리적, 논리적 독립성
    - 데이터의 무결성 문제 해결
    - 데이터의 보안 문제 해결
    - 데이터의 통합 관리 및 실시간 처리 가능
    - 저장된 자료의 공동 이용 가능

- 👎 **Bad**
    - 전산화 비용의 증가
    - 대용량 디스크로의 집중적인 Access로 인한 Overhead 발생

## ✅ 인덱스(Index)
- Index == 색인
    - 데이터 == 책의 내용
    - 데이터가 저장된 레코드 주소 == 인덱스 목록에 있는 페이지 번호

- DBMS(DataBase Management System)은 **항상 정렬된 상태 유지**
    - 탐색에 효율적
    - 값의 추가, 삭제, 수정 비효율적

### ▶️ DBMS의 인덱스 자료구조
- `B-Tree` : 컬럼 값의 변형 없이 원래의 값을 이용해 인덱싱 하는 방법(일반적으로 사용되는 방법)
    - 한 노드 당 자식 노드가 2개 이상 가능
    - key 값을 이용해 데이터 찾음
    - 데이터 검색 속도가 일정함
    - 균형 트리
    - 브랜치 노드에 key, data를 담을 수 있음
<img width="605" src="https://user-images.githubusercontent.com/66112716/200322592-d7125ccd-ccd5-4bec-a32f-9df34101d902.png">

- `Hash` : 컬럼의 값으로 해시 값을 계산해 인덱싱
    - 매우 빠른 검색 속도
    - 값을 변형해 인덱싱하기에 값의 일부만으로 검색할 때에는 사용할 수 없음
    - `B-Tree`보다 `Hash`가 효율적일 것 같으나 `SELECT`의 질의 조건에 부등호(< , >)도 포함됨    
        → hash에서 등호(=) 연산이 아닌 부등호(< , >) 연산의 경우 문제 발생    
<img width="527" src="https://user-images.githubusercontent.com/66112716/200322616-0a0f350b-a2d5-46df-8c48-c4e9407a307b.png">

## ✅ 데이터 베이스 언어
### 1️⃣ DDL(Data Definition Language) - 데이터 정의어
- 데이터베이스 객체의 구조를 정의하는 언어
    - 데이터베이스 객체 : ex) table, view, index...

|명령어|기능|
|--|--|
|CREATE|테이블 생성|
|ALTER|테이블의 구조 수정|
|DROP|테이블 삭제|
|RENAME|테이블의 이름 변경|
|TRUNCATE|테이블의 초기화|

### 2️⃣ DML(Data Manipulation Language) - 데이터 조작어
- 데이터베이스의 내부 데이터를 관리하기 위한 언어
- 데이터베이스 테이블의 레코드의 CRUD를 관리하는 언어 (create, read, update, delete)

|명령어|기능|
|--|--|
|SELECT|데이터베이스 내에서 데이터 검색|
|INSERT|테이블에 데이터 추가|
|UPDATE|테이블 내에 존재하는 데이터 수정|
|DELETE|테이블에서 데이터 삭제|

### 3️⃣ DCL(Data Control Language) - 데이터 제어어
- 데이터베이스 및 구조에 대한 접근 권한을 제어하는 언어 (권한 부여 or 박탈)
- 데이터 관리 목적으로 보안, 무결성, 회복, 병행 제어 등을 정의할 때 사용
- 트랜잭션의 명시 및 조작이 가능한 언어

|명령어|기능|
|--|--|
|GRANT|권한 정의 시 사용|
|REVOKE|권한 삭제 시 사용|

### 4️⃣ TCL(Transaction Control Language) - 트랜잭션 제어어
- DCL과 비슷한 맥락이나, 데이터 제어 언어가 아닌 트랜잭션을 제어하는 언어
- 논리적인 작업 단위를 묶어 DML 명령문으로 수행된 결과를 트랜잭션 별로 제어

|명령어|기능|
|--|--|
|COMMIT|모든 작업을 정상적으로 처리|
|ROLLBACK|모든 작업을 다시 돌려 놓음|
|SAVEPOINT|Commit 전, 특정 시점까지만 반영 or Rollback|

## ✅ 트랜잭션(Transaction)
- 데이터베이스의 상태를 변화시키기 위해 수행되는 작업의 논리적 단위
- 데이터베이스 작업의 완전성을 보장해주기 위한 수단
- 모두 완벽하게 처리되거나 처리하지 못할 경우 원상태로 복구해 작업의 일부만이 적용되는 현상을 방지하기 위한 기능

### ▶️ 트랜잭션의 특성 - ACID
- `Atomicity` (원자성) : 트랜잭션 중간에 어떤 문제가 발생하였을 때 아래의 상황에 따라 작업 내용의 반영 여부가 달라짐
    - 모두 성공할 경우 : 모두 반영됨
    - 하나라도 실패한 경우 : 모두 반영되지 않음
- `Consistency` (일관성) : 트랜잭션의 처리 결과는 항상 데이터의 일관성을 보장해야 함
- `Isolation` (고립성) : 둘 이상의 트랜잭션이 동시에 실행되고 있을 경우, 각 트랜잭션은 서로의 간섭 없이 독립적으로 수행됨
- `Durability` (지속성) : 트랜잭션이 정상적으로 종료된 뒤 영구적으로 데이터베이스 작업의 결과가 저장되어야 함

### ▶️ 트랜잭션의 5가지 상태
<img width="804" alt="스크린샷 2022-11-07 오후 10 16 29" src="https://user-images.githubusercontent.com/66112716/200320015-2e903048-44e0-423b-9908-2d5c0ee66ef8.png">

- `Active` : 트랜잭션이 **현재 진행 중**인 상태
- `Failed` : 트랜잭션이 실행되다가 **오류가 발생해 중단**된 상태
    - 트랜잭션이 더 이상 정상적으로 진행될 수 없는 상태
- `Aborted` : 트랜잭션이 비정상 종료되어 RollBack이 수행된 상태
    - 트랜잭션이 취소되어 트랜잭션 **실행 이전 데이터로 돌아간** 상태
- `Partially Committed` : 트랜잭션의 연산이 마지막까지 실행된 후 Commit되기 이전의 상태
    - 트랜잭션의 Commit 명령이 도착한 상태
    - 트랜잭션이 Commit되기 이전 sql문이 수행되고 Commit만 남은 상태
- `Commited` : 트랜잭션이 성공적으로 종료되어 Commit 연산을 실행한 후의 상태
    - 트랜잭션이 정상적으로 완료된 상태

### ▶️ 트랜잭션 vs Lock
- **트랜잭션** : 논리적인 작업 set 자체가 모두 반영되고나 아무 것도 적용되지 않아야 함을 보장하는 개념
- **Lock** : 여러 커넥션에서 동시에 동일한 자원을 요구할 때, 순서대로 한 시점에 하나의 커넥션만 변경할 수 있도록 하는 개념

## ✅ 교착상태 (DeadLock)
- 여러 개의 트랜잭션들이 실행하지 못하고 서로 **무한정으로 대기**하는 상태
- 데이터베이스 : 트랜잭션들의 동시성 제어를 위한 기법으로 Locking 사용
<img width="521" src="https://user-images.githubusercontent.com/66112716/200326788-78b7380f-fd03-4189-b763-e8737bb6908b.png">

### ▶️ 교착상태 발생의 필요충분 조건
- **상호배제** : 한 번에 한 개의 프로세스만 자원을 사용할 수 있어야 함
- **점유와 대기** : 프로세스가 한개의 자원을 점유하고 있고, 추가적으로 다른 프로세스의 자원을 점유하기 위해서는 대기해야 함
- **비선점** : 점유된 자원을 강제로 해제될 수 없고, 프로세스가 자원의 사용을 자발적으로 해제하기 전까지 그 자원을 얻을 수 없음
- **환형 대기** : 자원과 자원을 사용하기 위해 대기하는 프로세스들이 원형으로 구성되어 있어 자신에게 할당된 자원을 점유하여 앞 또는 뒤에 있는 프로세스의 자원을 요구해야 함

### ▶️ 교착상태 해결 방법
- **교착상태 예방** : 필요충분 조건 중 한가지를 제거하여 교착상태가 발생하지 않도록 사전에 방지하는 방법
    - 자원 요청을 제한해 교착상태를 예방
    - 자원 낭비가 가장 심한 방법
- **교착상태 회피** : 교착상태가 발생할 가능성을 배제하지 않고 교착상태의 발생 시 적절히 피하는 방법
- **교착상태 탐지** : 교착상태의 발생을 점검해 교착상태에 있는 프로세스와 자원을 발견하는 방법

## 📌 참고 자료
- [데이터베이스 언어 참고 자료](https://velog.io/@alicesykim95/DB-DDL-DML-DCL-TCL%EC%9D%B4%EB%9E%80)
- [데이터베이스 용어 참고 자료](https://velog.io/@soosungp33/CS-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B2%A0%EC%9D%B4%EC%8A%A4)
- [데이터베이스 개념 참고 자료](https://github.com/Seogeurim/CS-study/tree/main/contents/database)
- [교착상태 개념 참고 자료](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=ndb796&logNo=221243161017)