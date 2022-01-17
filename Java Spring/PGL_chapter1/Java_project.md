# PGL 프리코스 학습 정리 내용

------

## chapter 1 

### java 프로젝트
- JVM : java virtual machine - Java Bytecode를 기계어로 컴퓨터에 전달해주는 가상머신 (bytecode만 있다면 모두 가능)
- JRE : java runtime environment - 실행하기 위한 환경 (JVM은 JRE 안에 포함되어있음, JVM이 사용하는 라이브러리 포함)
- JDK : java development kit - java 언어를 java bytecode로 만드는 과정 == compile 수행

- in JDK ...
    - JRE(JVM + lib ... ), java, javac

- java bytecode를 만드는데 꼭 java를 사용할 필요 X ex) kotlin, scalar ...

### code editor & IDE
- code editor : 프로그래밍 언어에 따라 문법 검증 및 편집 편의성 제공
- IDE : 사용하는 언어 및 프레임워크에 따라 다양한 기능 제공

### Docker Setting
- 컨테이너 개념을 활용한 가상화 기술의 일종
- 컨테이너 형태로 docker engine 위에 올라감 - **OS 위에 컨테이너를 올려 어플리케이션 활용**

- 가상화 기술 : ```HW -> Host OS -> Hypervisor -> (Guest OS, LIBRARY, Application)```
    - Docker 활용 ver. : ```HW -> Host OS -> (LIBRARY, Application)```
    - 이전의 가상화 방식보다 docker 활용해 훨씬 가볍게 가능

- Docker Application : 웹 어플리케이션 개발에 필요한 다양한 SW 설치 간소화

- 간단한 이미지 받아 사용 : ```docker run -d -p 80:80 docker/getting-started```
    - ```docker``` : Docker Daemon에 요청을 보냄
    - ```run``` : 컨테이너 실행
    - ```-d``` : Detached, 컨테이너를 background에서 실행하는 옵션
    - ```-p``` : Port, 컨테이너의 포트를 물리 서버의 포트와 연결
    - ```docker/getting-started``` : 컨테이너로 실행할 이미지의 이름

- ```127.0.0.1:80```에서 docker backend 구축

### Client - Server Model
- what is WEB ?
    - HTML, CSS, JS : internet 의 Cornerstone - 인터넷 브라우저가 사용하는 언어
    - HTML : 브라우저에 표시될 내용을 기술하는 언어
    - CSS : 표현되는 형식을 정의하는 언어
    - JS : 브라우저에 동작을 제공하는 언어
- http를 통해 서버간 통신

- Spring Boot : (Web) Application Framework
- Spring Boot : HTTP 요청 등을 받으면 요청에 따른 응답을 돌려주는 Web Application을 만드는 Framework