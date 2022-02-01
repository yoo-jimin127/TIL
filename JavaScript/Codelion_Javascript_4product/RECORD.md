본 기록은 codelion의 javascript 수강과 관련된 내용입니다.

------


### JavaScript
- C, JAVA보다 직관적인 문법
- Front end, Back end, Data Base에서도 사용할 수 있음, 활용 범위 넓음
- 오픈소스 다량 존재

### javascript
- 1) HTML, 2) JS 파일으로 작성할 수 있음
- HTML : body 태그가 끝나는 지점 위에 ```<script> </script>``` 태그 내에 작성
- JS : ```<script src='myScript.js'></script>``` 태그를 사용해 javascript 파일이 있는 위치를 src에 연결해줌
- ```document.write();``` : () 안의 내용이 브라우저 화면에 표시되는 기능

### 세미콜론과 주석
- 세미콜론 : 명령어를 구별하는 구분자 역할
    - js : 유연한 언어, 세미콜론이 없는 경우에도 줄바꿈이 있다면 구분해 실행, 한 줄에 코드를 작성할 경우 정상 작동 X
- 주석 : 컴퓨터가 읽을 수 없는 글 ```//``` double dash로 사용(단일주석), ```/* @@@ */``` (다중주석)
    - 1. 코드 설명을 적어줄 때
    - 2. 코드를 실행시키고 싶지 않을 때

### 데이터 상자 만들기
- 변수 : ```var 변수명 = 값;```의 형태로 값 할당
    - ES6 : ```let 변수명 = 값;```, ```const 변수명 = 값;```
    - 자료형
        - 문자열 자료형(string) : ```"val"``` or ```'val'```
        - 숫자형 자료형(int, float)
        - bool 자료형 : ```true```, ```false```
        - ```typeof 변수명``` : typeof 명령어 사용 시 해당 변수에 할당된 값의 자료형을 확인할 수 있음

------

### 로또 번호 추첨기능 구현
- ```Math.random();``` : 0 이상 ~ 1 미만 실수(float)로 임의의 수 생성
    - ```Math.random() * 45 + 1;``` : 1 이상 46 미만 실수 생성
    - float 자료형 -> int 자료형 : ```parseInt(Math.random() * 45 + 1);``` : 1 이상 45 이하 정수

- 기능 명세 : 1 ~ 45 사이의 6개 정수 난수 생성

- 배열 : 하나의 변수 안에 여러 값을 넣어둠 ```var lotto = [1, 2, 3, 4, 5, 6];```
    - index 접근 : 인덱스는 0번째 번지부터 ex) ```lotto[0]```
    - ```.push();``` : 배열의 맨 마지막 값에 () 안의 것을 추가

- 반복 : for 방법 & while 방법
    - ```for (시작; 끝; 증가) { 반복하려는 코드 }```

- 조건문 : ```if (조건) { 참일 경우 }```
    - ```.indexOf(값)``` : 값이 있으면 위치 인덱스 리턴, 없으면 -1 리턴
    - 중복 방지 시 , 중복되는 값이 있는 경우 6개의 공을 모두 뽑지 못함 -> sol. ```while```을 사용해 개수를 채워줌
        - ```while (조건) { 반복하려는 코드 }``` : ```.length``` - 배열의 길이

- 오름차순 정렬 : ```.sort()``` 사용
    - ```배열.sort()``` 시 ex) var lotto = [1, 23, 15, 33, 2, 5] 일 경우 1, 15, 2, 23, 33, 5 의 결과가 출력됨
        - why? : 단순 sort() : 사전 순 정렬, 1 ~ 9의 앞자리수 순서대로 정렬 진행
        - sol. ```.sort((a, b) => a - b)``` : 익명함수를 사용하여 숫자를 오름차순으로 정렬 가능
            - 내림차순 : ```.sort((a, b) => b - a)```

------

### 자기소개서 글자수 계산기
- DOM : Document Object Model - 웹 화면의 HTML 코드에 쉽게 접근할 수 있도록 하는 코드
- ```document``` : DOM의 진입점 역할 -> ```document.getElementById('idname');``` : 특정 아이디값으로 태그를 불러올 수 있음
    - ```document.getElementById('idname').value;``` : 태그 안의 값만 가져옴
    - ```document.getElementById('idname).innerHTML``` : 태그 안의 값만 가져옴

- 자동 형변환을 통해 문자열과 숫자를 함께 출력할 수 있음
    - ```document.getElementById('count').innerHTML = '(' + content.length + '/200)';```

- 함수 사용 : ```function 함수명() { 명령어 모음 };```
- 키보드 누를 때마다(이벤트) 글자 수를 세도록(이벤트핸들링) -> Event 추가, Event Handling
    - ```<textarea class="form-control" rows="3" id="introduce" onkeydown="counter()">안녕하세요 저는 유지민입니다.</textarea>```
        - 키보드가 눌리는 이벤트 : ```onkeydown="func()"```

- 200자를 넘길 경우 더 이상 입력되지 않고 잘리도록 -> ```.substring()```    ex) ```.substring(0, 200)``` : 0 이상, 200 미만

------

### javascript ver 미니 스타크래프트

### jquery
- ```document.getElementById('content').value;``` == ```$('#content').val();```
- jquery 장점
    1. 간결한 문법
    2. 편리한 API
    3. 크로스 브라우징
- ```$(선택자).행위;``` : [https://code.jquery.com/](https://code.jquery.com/)에서 minified code copy & paste
    - ```console.log($('#content').val());```통해 console 출력 가능

- jQuery 이벤트 처리
    - ```<button id="click">클릭</button>``` == ```$('#click').click(hello);```
    - **주의**. ```$('#click').click(logfunc);``` : 함수명만 입력, logfunc() X -> logfunc O

### 익명함수
- 이름이 없는 함수
- ```$('#click').click(function() { console.log('hello');})```와 같이 함수의 이름 없이 jQuery 명령어 내부에서 함수 기능 정의 및 호출

### fadeIn() 함수
- ```.fadeIn()```을 통해 이미지 또는 태그의 내용이 나타나도록 함.
    - option으로 duration, animation을 넣을 수 있음

### animate() 함수
- ```.animate(properties, [duration], [easing], [complete])```: fadeIn()으로 나타난 요소가 어떻게 동작할지를 정해줌
```
    $('#spit').animate({left: '+=250'});
```
    - css 속성을 추가해주어 animation을 추가해줌

### animation 없이 해당 요소의 css 속성을 넣어주고자 할 때
- ```fadeOut()```으로 보이지 않게 만든 요소의 css 속성을 바꿔주기 위해서 ```.css()``` 사용
- ex) ```$('#spit').css({left: '150px'});``` : left 값을 초기화해줌으로써 매번 같은 자리에서 발사되도록 함

### jquery를 사용해 태그 안의 text를 변경해주고자 할 때
- ```$('#hp').text('HP : ' + hp);``` : .text() 함수를 사용하여 text 내부의 값을 변경해줌 (자동 형변환 가능)

### callback 함수
```
    $('#spit').fadeOut(function() {
        hp = hp -1;
        $('#hp').text('HP : ' + hp); //침이 fadeOut된 다음 hp의 값이 업데이트될 수 있도록 생성한 익명함수

        if (hp == 0) { //hp 값이 0이 될 떄 bunker가 사라지도록 하는 작업
            $('#bunker').fadeOut();
        }
```
- 특정 동작 이후 수행되는 명령어를 선언하고자 할 때, 익명함수를 사용해 callback 함수를 구현할 수 있음

------

### 기념일 계산기

### 객체(Object)
- 여러 값을 담는 자료형
```
    var person = {
        name: 'namename',
        age: 23
    }
```
    - 키 : 속성 값
    - 호출: ```객체.키;```를 통해 해당 값을 가져옴

- 내장 객체 : ex) Date 객체
- Date 객체 사용 방법: ```var now = new Date();``` -> ```now.getMonth()```, ```now.getDate()``` 등
    - [Date 객체 사용 예제](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date)

- ```var day = Math.floor(timeDiff / (1000 * 60 * 60 * 24) + 1);``` 실수형의 데이터에서 소수점을 없애주는 작업 : Math 라이브러리의 floor 함수 사용