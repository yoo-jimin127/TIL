# PGL 프리코스 학습 정리 내용

------

## chapter 2

### Build Automation Tool
- JVM - JRE - JDK : java 언어로 작성된 코드를 기계어로 변형하는 작업(JDK)
- Java로 이뤄진 프로젝트는 `*.java` 파일에 정의된 Java Source 코드로 구성됨.
- javac : java compiler (소스코드를 기계어로 바꾸는 과정) - bytecode로 바꾸는 과정 매우 복잡

**[Build Automation Tool]**
- **Maven** : java를 위한 build automation tool (C#, RUBY에서도 사용 가능)
    - Project Object Model (POM)
         - xml 형태로 프젝트 정의
         - pom.xml을 분석해 프로젝트 빌드
    - spring boot는 `parent` 태그로 시작
    `<version>0.0.1-SNAPSHOT</version>` : major-minor-patch
        - major : 대규모 버전
        - minor : major 버전이 유지된 채로 minor 버전이 바뀌게 된다면 상하위 호환 가능
        - patch : 버그 수정 시 변경되는 버전 값
    - 의존성 관련 부분 : `<dependency>` 매우 중요
        ex) ```
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter</artifactId>
            </dependency>
            ```
- **Gradle** : java를 위한 build automation tool (C, C++, Javascript에서도 사용 가능)
    - build.gradle
        - groovy 언어로 프로젝트 정의
        - Sub-project 등을 포함시는 용도의 settings.gradle 포함
        - Kotlin 사용해 정의할 수 있음 (build.gradle.kts)
    ```
    dependencies {
	    implementation 'org.springframework.boot:spring-boot-starter-web'
	    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    }
    ```
    - 어느 시점에서 이 라이브러리가 필요한지에 대해 dependencies로 정의
    - gradle만의 빌드 과정을 정의하는 작업이 있다 (maven과의 차이점)

------

### Spring Boot 실행하기
- 일반적인 웹 서비스의 배포 구조
    - 사용자 브라우저에 주소를 보내면 물리적 컴퓨터(서버)에 주소의 내용을 띄워주는 역할
    - 사용자 브라우저와 물리적 컴퓨터 사이에는 컴퓨터의 통신 영역이 존재함
    - 도메인(보기 쉽게 만들어진 부분)을 통해 요청이 들어오면, APACHE, Web Server로 신호(IP주소, ex 189.206.151.236:80 - port 번호) 가 들어가게 됨
        - 포트 : 컴퓨터 내에서 요청을 받을 수 있는 프로세스를 나누기 위해 존재
    - 웹 서버 : 이미 만들어져 있는 페이지를 전달해줌, FileSystem(SSD)으로 파일을 돌려줌 or Web Application Server로 돌려줌
        - 주의 : Web Server와 Web Application Server는 다른 역할
            - 웹 서버 : HTTP 요청을 전달 or 파일의 재전송 <속도 빠름>
            - 웹 애플리케이션 서버 : 서비스를 제공하기 위한 기능을 갖추는 서버 <다양한 기능>
    - Web Application Server : `ex)Tomcat` Java Wep Application (WAR 파일) or Spring Boot
    - 서버의 구성은 다양한 방법으로 가능함
    - 서버 프로그램에 따라 구동 과정을 대체로 일관성을 가짐 (프레임워크에 따라 큰 차이 X)

- Java와 Jar
    - JAR : Java ARchive
        - Java로 작성 후 컴파일된 Java bytecode와 실행을 위해 필요한 다양한 자원을 배포를 위하여 모아놓은 파일의 형태
        - 다른 형태의 압축파일
    - 프로젝트 구조와 Jar 파일 구조는 네이밍을 제외하고 많은 부분에서 유사성을 가짐

    - `MANIFEST.MF`
        - Main-Class : program의 entry point, 시작점 = Main 함수
        - Start-Class : 시작하는 파일

    - Jar 파일은 'java -jar' 명령으로 실행할 수 있음(jar 파일을 서버로 가져가 실행할 수 있음)

- Web Application의 구조
    - presentation layer : 사용자와 직접적으로 맞닿는 부분 (눈에 보이는 UI부분, 사용자의 입력과 연결되는 부분)
    - logic layer : 요청을 처리하는 결정을 내리는 부분 (입력에 대한 요청 처리)
    - data later : 데이터를 저장하고 불러오는 부분 (데이터의 표현을 정의해준 뒤, 해당 데이터 처리 후 데이터의 표현을 반환해 저장함. 즉 입력한 데이터와는 다른 형태)

    - Spring Boot의 작은 구조
        1. dispatcher servlet : http를 통해 요청을 받아내는 역할
        2. controller : dispatcher servlet의 요청을 직접적으로 받는 역할
        3. service : controller가 보낸 요청을 받아 서비스를 제공하는 역할
        4. repository : 데이터를 불러와 돌려주는 역할
        5. view resolver : database에서 데이터를 가져와 어떻게 제공할 것인지를 정하는 역할
        6. database : Spring Boot의 **외부**에 존재 (데이터 저장)

- Hard ware -> Web Server -> Spring Boot
- NGINX : load balencing

------

### Spring IoC
- Java의 interface
    - 인터페이스를 잘 활용하면 서로 다른 구현체가 같은 목적을 위해 동작하도록 만들 수 있음
    - 사용하고자 하는 객체의 실제 자료형과 무관하게 동작하도록 만들 수 있음
    - 함수의 인자와 반환값은 interface를 사용함
    - inputStream의 구현체는 많지만 다 inputStream의 기능을 가지고 있음 -> inputStream을 필요로 하는 기능에는 구분없이 사용할 수 있음

- Spring IoC Container와 DI
    - **IoC : Inversion of Control - 제어 역전**
        spring framework : application framework
        제어 역전 : 개발자의 코드를 프레임워크가 사용하도록 제어가 역전되는 상태를 IoC라고 함
        Java Spring IoC Container : 개발자가 작성한 코드 + 설정 정보를 가져와 완전한 웹 서비스를 만듦
        개발자 작성 코드 + 설정 정보 = Bean
        Spring IoC Container에 여러개의 Bean이 들어있음

    - **DI : Dependency Injection - 의존성 주입**
        이미 존재하는 Bean을 필요한 시점에 다시 주입시켜 사용하는 것을 DI(의존성 주입)이라 함 

- Spring과 Spring Boot의 차이
    - annotation을 사용해 spring framework의 활용도가 높아짐
    
    - Spring : 개발자가 작성한 코드 + 설정 정보 (XML형태로 설정을 만듦) = Beans
        실행을 위해 Tomcat과 같은 프로그램이 필요함 (Java Web Application(WAR 파일))

    - Sprint Boot : - Spring : 개발자가 작성한 코드 + 설정 정보 (Spring Boot Starter에 정의되어있음) = Beans
        Tomcat과 같은 서버 프로그램이 내장되어 Jar의 형태로 실행이 가능함

