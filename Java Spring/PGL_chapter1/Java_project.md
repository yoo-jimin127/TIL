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

- Docker Application : 웹 어플리케ㅣ션 개발에 필요한 다양한 SW 설치 간소화


