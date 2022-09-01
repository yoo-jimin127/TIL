## Hacker News client app 구현 과정 archiving
- 목표 : 
    1. parcel-bundler를 사용해 순수 javascript로 웹앱 구현
    2. 프레임워크 & 라이브러리의 사용을 최소화하여 개발하는 능력 함양

- `dist` : `paecel FILE_NAME`으로 웹앱을 실행하였을 때 생성되는 폴더
    - ex) app.js -> app.c32xxxx.js로 변환해 다른 파일로 브라우저 상에서 로딩되도록 작업

- html 내 데이터를 불러오기 위해 `document.getElementById`로 html 조작
- `ajax` : 네트워크 너머의 데이터를 가져오는 도구
    - `const ajax = new XMLHttpRequest();` : 객체와 서버 간 상호작용을 위해 사용
        - XHR 사용을 통해 페이지의 새로고침 없이 url에서 데이터 get 가능
        - ajax 프로그래밍에 자주 사용

    - `ajax.open('GET', 'https://api.hnpwa.com/v0/news/1.json', false);`
        - `ajax.open(method, url, async, user(option), psw(option))` : 요청 내용 구체화
            - method (필수) : 요청 방식 `get` or `post`
            - url (필수) : 불러올 파일 주소
            - async (필수) : true(비동기), false(동기)
                - 서버 요청 : true(비동기)로 보낼 것
                    - 비동기로 서버 요청 전송 시 javascript에서 서버 응답을 기다리지 않고 작업 수행 후 서버 응답이 준비될 경우 응답 처리 수행 
    
    - `ajax.send();` : 데이터를 가져오는 작업
    - `ajax.response` : ajax로부터 불러온 데이터가 저장된 위치

- javascript 상에서 html 코드 추가 : `document.getElementById('root').innerHTML`
    - ex) 
    ```js
            document.getElementById('root').innerHTML = 
        `<ul>
            <li>${newsFeed[0].title}</li>
            <li>${newsFeed[1].title}</li>
            <li>${newsFeed[2].title}</li>
        </ul>`;
    ```

    - 코드 수정 :
    ```js
        const ul = document.createElement('ul');
        for (let i = 0; i < 10; i++) {
            const li = document.createElement('li');
            li.innerHTML = newsFeed[i].title;
            ul.appendChild(li);
        }
        document.getElementById('root').appendChild(ul);
    ```

### 여러개의 페이지를 가진 웹앱
- SPA : 현재 액티브한 화면을 전환을 통해 페이지로 보여주는 원리
- 이벤트 : 코드 상으로 특정 코드의 실행을 확정할 수 없는 경우, 특정 조건에 따라 실행되는 처리
    - **브라우저가 제공**하는 이벤트 시스템
    - `#` : 앵커 태그에 디폴트로 넣어둔 북마크(#)
        - `hashchange`이벤트 : 링크 또는 타이틀의 클릭 처리를 바탕으로 ajax 통신 & id 값 get
    - `location`객체 : 브라우저가 제공하는 주소와 관련된 다양한 정보를 제공하는 객체

## 문자열로 ui 구성
- HTML으로 만들어진 ui는 파악이 어렵다는 단점 존재
    - DOM API를 사용해 ui의 구조가 잘 드러나지 않는 문제점 해결법 : DOM API 사용을 최소화하자
```js
for (let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    div.innerHTML = 
    `
    <li>
        <a href="#${newsFeed[i].id}">
            ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
    </li>
    `
    ul.appendChild(div.children[0]); // children : array, idx 0 children call
    // ul.appendChild(div.firstElementChild);
}
```
- DOM API 사용을 최소화하여 직관적인 ui 구조를 구현 -> 코드 직관성을 높이기

### 라우터를 통한 화면 처리
- 라우터 : 화면 중계기
