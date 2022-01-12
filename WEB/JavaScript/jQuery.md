# jQuery 문법

------

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

------

### MBTI 기반 동물 테스트 구현 중 jQuery 학습 내용
