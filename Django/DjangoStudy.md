# Codelion Django 수강

### Django
- Python 기반 웹 프레임워크
- 사용법이 정형화 되어있는 웹 프레임워크

### Ptthon for Django
- 자료형, 예외처리, 클래스와 객체, 모듈, 패키지, 라이브러리

- Dictionary
    - 탐색의 기준, 키워드 = key (중복, 변하면 안됨)
    - 탐색의 기준에 대응되는, 찾고자 하는 값 = value
    - 키워드와 찾고자 하는 값을 대응시키는 자료형
    - key를 통해 value를 찾음

- 예외처리
    - python 오류 : 문법 에러(파싱 에러) & 예외
        - 파싱 에러 : 실행 자체에 영향을 주는 오류 ex)```SyntaxError```
        - 예외 : 프로그램 실행 자체를 멈추지는 않는 오류 ex)```ZeroDivisionError```
    ```
    try :
        # 일단 시도해 볼 것
        # 오류가 생길 여지가 있는 코드
    except 발생 오류 :
        # 발생 오류가 발생했을 경우 실행할 코드
    ```
    ```try ... except ... finally``` : 프로그램을 멈춤 없이 실행시킬 수 있음
    - [파이썬 예외 관련 자료](https://docs.python.org/ko/3/tutorial/errors.html)

- 객체와 클래스
    - 세상의 모든 것을 프로그래밍 하고자 함 -> 세상에 있는 모든 다른 대상들을 파악 -> 모든 대상은 상태와 동작으로 구분 가능
    - ```상태 : 변수, 동작 : 함수```로 프로그래밍 
    - 상태와 동작(변수와 함수)를 한번에 여러개 실행할 수 있는 방법 == 객체 지향 프로그래밍
    - 변수와 함수로 틀(클래스)를 만들고 객체를 만들어내는 과정

- 모듈, 패키지, 라이브러리
    - 모듈 : 파이썬으로 정의된 파일 (서로 다른 모듈의 내용을 가져다 쓰고 싶은 경우 : ```import``` 사용)
    - 패키지 : ```import package_name/module_name```
    - 라이브러리 : 미리 준비된 모듈 및 패키지 ex) python standard lib, python package index lib
    
