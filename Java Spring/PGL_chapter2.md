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