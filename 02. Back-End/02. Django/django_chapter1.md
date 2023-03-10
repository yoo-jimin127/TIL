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

    - pip : python package management system
    ```
    $ pip install PACKAGE   # 패키지 설치 
    $ pip search PACKAGE    # 패키지 검색
    $ pip install PACKAGE==1.0.5    # 특정 버전 지정하여 설치
    $ pip uninstall PACKAGE     # 패키지 제거
    $ pip freeze    # 현재 설치된 패키지와 버전 목록
    ```

### Web Service
- World Wide Web : hyperlink를 사용해 비순차적으로 자원 사용
- ```URL``` : 정보 자원이 어디 있는지 나타내는 표식
- ```HTTP``` : 정보자원으로 접근하고 통신하게 해 주는 약속(프로토콜을 사용)
    - ```GET``` : 갖다달라는 요청 (http 요청)
    - ```POST``` : 처리해달라는 요청 (http 요청)
- ```HTML``` : 응답으로서의 정보 자원 자체, 다른 정보 자원과 연결 매개체

- server : 데이터 통신, 데이터 처리
- Web browser : HTTP 통신, HTML 보기 좋은 형식으로 보이기
- Web service : HTML과 URL을 미리 준비해놓고, 사용자 요청에 대한 응답을 보낼 수 있는 프로그램
- Web Framework : 정형화 - 정형화 되어있는 웹 개발을 효율적으로 하기 위해 미리 만들어 놓은 웹 개발의 기능단위, 설계 단위의 집합
    - 라이브러리와 다른 점 : 라이브러리 - 도구의 모음
    - Framework : 명확한 목적을 달성하기 위해 이미 설계까지 만들어진 구조/뼈대

### MVC, MTV
- MVC, MTV 패턴 (**디자인 패턴**)
    - Model : DB와 상호작용하는 부분
    - View : 사용자들 눈에 보이는 부분 (사용자 인터페이스 담당 뷰뷴)
    - Controller : 내부 동작의 논리를 담당하는 부분

    - Model : DB와 상호작용하는 부분
    - Template : 사용자들 눈에 보이는 부분 (사용자 인터페이스 담당 뷰뷴)
    - View : 내부 동작의 논리를 담당하는 부분

### Django 가상 환경
- 가상환경 생성 : ```python -m venv myvenv```
- 가상환경 실행 : ```source myvenv/Scripts/activate```
- 가상환경 끄기 : ```deactivate```

- 장고 설치 : ```pip install django```
- 장고 프로젝트 생성 : ```django-admin startproject myproject```
- 장고 서버 켜기 : ```python manage.py runserver``` 
- appication 생성 : ```python manage.py startapp dashboard```

### Django 내용
- ```__init__.py``` : 패키지임을 알려주기 위한 파일, 패키지를 초기화해주는 역할, 약속된 이름
- ```settings.py``` : 
    - BASE_DIR : 프로젝트의 기본 위치, ROOT PATH
    - SECRET_KEY : 암호 생성 시(해시 생성 시) 만들어주는 문자열
    - DEBUG : 서버를 개발자 모드로 열 것인지, 배포 모드로 열 것인지에 대한 설정 (배포 시 False 로 설정해 넣을 것)
    - INSTALLED_APPS : 본 프로젝트에 생성되어있는 앱
    - DATABASES : 디폴트로 사용하게 될 데이터베이스에 대한 정보 (기본 설정 : sqlite)
- ```urls.py``` : 각종 URL을 등록하고 관리하는 파일, 다른 URL에 대한 요청이 들어왔을 경우 그에 대한 로직을 정리하는 파일, 즉 URL 관리 파일 ex) ```www.codelion.net/classroom``` 
- ```manage.py``` : 
    1. 서버 켜기 : ```python manage.py runserver```
    2. application 만들기 : ```python manage.py startapp dashboard``` 
        - 등록 : settings.py에 ```INSTALLED_APPS = [ 'application_name', ]``` 추가 or ```INSTALLED_APPS = [ ''application.apps.ApplicationConfig', ]```
    3. database 초기화 및 변경사항 반영 : ```python manage.py migrate```
    4. 관리자 계정 만들기 : ```python manage.py createsuperuser```

- 브라우저 상에 보이는 화면 : app 내에 templates 폴더를 생성하여 그 내부에 html 파일 생성
- 요청이 들어온 경우 브라우저에 해당 화면을 보여줄 수 있도록 하는 작업 : view 단에 작성한 함수
```
def home(request):  # 요청이 들어왔을 때
    return render(request, 'index.html')    # 그 요청에 index.html의 파일을 함께 rendering 해줌
```
    - 논리를 담당하는 함수를 만들었을 때, 해당 함수가 언제 실행될지를 urls.py에 정의해줌
    - 어떤 url에 요청이 들어왔을 때, views.py에 만들어진 함수를 언제 실행할지에 대해 명시

- ```    path('', myapp.views.home),``` : 아무런 주소없이 요청을 보냈을 경우 myapp의 views.py에 있는 파일의 home 함수를 실행시키도록 함. name=''은 별칭과 같은 순서

**<생성 순서>**
1. templates 폴더에 html 파일을 생성함
2. views.py에 해당 html 파일을 띄우기 위한 함수를 작성함
3. urls.py에 해당 view의 내용을 띄워주기 위해 url을 추가함