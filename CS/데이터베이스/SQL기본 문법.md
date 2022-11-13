# SQL 문법 정리

## ✅ SQL이란?
- Structured Query Language(구조적 질의 언어)
- 관계형 데이터베이스 시스템(RDBMS)에서 자료의 관리 및 처리 목적으로 설계된 언어

## ✅ 데이터베이스 언어 종류
- [데이터베이스 언어 및 개념 자세히 살펴보기](https://github.com/gdsc-ssu/cs-study/pull/10)
- ▶️ **DDL(Data Definition Language) : 데이터 정의어**
   - 각 릴레이션의 정의를 위해 사용되는 언어 (`CREATE`, `ALTER`, `DROP`, `RENAME`, `TRUNCATE` ...)

- ▶️ **DML(Data Manipulation Language) : 데이터 조작어**
   - 데이터의 추가/수정/삭제 등 데이터 관리를 위한 언어 (`SELECT`, `INSERT`, `UPDATE`, `DELETE` ...)

- ▶️ **DCL(Data Control Language) : 데이터 제어어**
   - 사용자 관리 및 사용자별 릴레이션 또는 데이터로의 관리 및 접근 권한을 제어하는 언어 (`GRANT`, `REVOKE` ...)
   
- ▶️ **TCL(Transaction Control Language) : 트랜잭션 제어어**
   - 트랜잭션을 제어하는 언어 (`COMMIT`, `ROLLBACK`, `SAVEPOINT` ...)
 
## ✅ SQL 문법 특성
1. **대소문자의 구별 X**
	- 단, 서버 환경 또는 DBMS 종류에 따라 데이터베이스 및 필드명의 대소문자를 구분하는 경우도 존재함
1. **SQL 명령문**은 반드시 **세미콜론(`;`)**으로 끝낼 것
1. **고유 값**의 경우 **따옴표(`' '`)**로 감쌀 것
1. SQL에서의 객체 표현은 **백틱**으로 감쌀 것
   - ex) ``SELECT `COST`, `TYPE` FROM `INVOICE`;``
1. 한 줄 주석은 문장 앞 `--`를 붙여 사용
1. 여러 줄 주석은 `/* */`을 붙여 사용
   - ex) `/* SELECT * FROM EMP WHERE EMPID=(SELECT * FROM WHERE NAME="GDSC"); */`

## ✅ SQL 문법
### ▶️ CREATE
- **CREATE : 데이터베이스 생성**
	- `CREATE DATABASE` : 새로운 데이터베이스 생성
 ```sql
 CREATE DATABASE 데이터베이스명
 ```
 
 
## 📌 참고 자료
- [문법 특성 참고 자료](https://edu.goorm.io/learn/lecture/15413/%ED%95%9C-%EB%88%88%EC%97%90-%EB%81%9D%EB%82%B4%EB%8A%94-sql/lesson/767683/sql%EC%9D%B4%EB%9E%80)
- [문법 참고 자료](http://www.tcpschool.com/mysql/mysql_basic_syntax)