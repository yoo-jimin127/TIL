## browser가 Javascript를 읽는 방법

### script를 <head>에 포함
1. Parsing HTML before `<script>` tag
2. blocked : `<script> ~ </script>`
    - fetching JS
    - executing JS
3. Parsing HTML after control Javascript
4. page is ready
- 단점: script의 크기에 따라 로딩이 길어질 수 있음

### script를 <body>에 포함 - body 태그의 끝부분
1. Parsing HTML
2. Page is ready
3. fetching JS
4. executing JS
- 장점: 사용자에게 js를 받기 이전에도 페이지를 띄워줄 수 있음
- 단점: javascript에 의존적인 페이지인 경우 페이지를 받은 뒤에도 사용자가 javascript의 로딩을 기다려야함

### head + async 속성
- ex) head 태그 내부에 `<script asyn src='main.js'></script>`
- async : bool 형식의 속성 값 - default value : true
1. Parsing HTML과 feching JS를 **병렬적으로 실행**
2. fetching JS가 끝나면 그 때 blocked 상태로 전환
    - executing JS
3. Parsing HTML
4. Page is ready
- 장점: 병렬 실행을 통해 다운로드 시간 절약 가능
- 단점: HTML이 parsing되기 이전에 JS가 실행되므로 query selector와 같은 이유로 DOM요소의 조작이 필요할 때, 해당하는 HTML이 준비되어 있지 않다면 위험할 수 있음
- 단점: HTML parsing 도중 언제든 JS 실행이 이루어질 수 있음 - 따라서 로딩 시간은 여전히 길 수 있음

### head + defer 속성
- ex) head 태그 내부에 `<script defer src='main.js'></script>`
1. parsing HTML과 병렬적으로 fetching JS
2. Page is ready
3. executing JS
- 다운로드를 미리 끝내놓은 뒤 parsing HTML을 마무리
- 바로 이어서 JS를 실행
- 가장 효율적인 방법

### async & defer 비교
- async : 정의된 JS 순서와 상관없이 다운로드가 먼저 이루어진 파일을 실행함
    - 순서에 의존적인 파일이라면 선실행이 요구되는 파일이 실행되지 않은 채 후실행 파일이 실행되어 오류 발생할 수 있음
- defer : 정의한 JS 순서대로 다운로드된 뒤 순서대로 실행되기에 문제 없음
    - 원하는대로 script 실행될 수 있음

### 'use strict';
- vanilla JS 실행 가장 윗 라인에 사용해주면 좋음
- javascript : 유연하기에 위험 (빠른 시간 내에 만들어짐)
- 'use strict';를 선언해줄 경우 ECMAScript 5 문법에 의해 선언되지 않은 변수의 값 할당 등에 대한 오류 검출이 잘 이루어지게 됨
- javascript 엔진이 더 효율적이고 빠르게 돌아갈 수 있음
