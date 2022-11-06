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
- 여러개의 화면을 가지고 있는 UI 화면 구성

### 페이징 구현
- 페이지 구현 : 현재 페이지의 인덱스 정보 - 변수를 통해 인덱싱
- 공유되는 자원 : 전역 변수보다 객체로 관리하는 것이 효율성 좋음
    - ex) 여러 함수에 의해 공유되는 값

### 템플릿 렌더링
- 동일한 형태에서 세부적인 차이를 가지는 템플릿을 찍어내는 렌더링 방식
```js
    let template = `
        <div>
        <h1>Hacker News</h1>
            <ul>
                {{__news_feed__}}
            </ul>
            <div>
                <a href="#/page/{{__prev_page__}}">이전 페이지</a>
                <a href="#/page/{{__next_page__}}">다음 페이지</a>
            </div>
        </div>
    `;

    template = template.replace('{{__news_feed__}}', newsList.join('')); // template replace - news list content
    template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1); // prev page 
    template = template.replace('{{__next_page__}}', store.currentPage + 1); // next page
    
    container.innerHTML = template; 
```
- DOM API 사용하는 것보다 명확한 구조의 확인 가능
- 코드의 분리를 통해 복잡도 감소

- 템플릿 한계점 : 마킹된 값의 개수만큼 replace 필요
    - 마킹된 데이터와 복잡도 비례
    - `handlebars` 라이브러리 등 템플릿 라이브러리 제공

### tailwind.css
- class로 접근하는 방법
    - ex) margin : m 축약 표기(x axis : mx, y axis : my), padding : p 축약 표기(padding-top: pt, padding-bottom: pb)

```js
    /** comment function */
    function makeComment(comments, called = 0) {
        const commentString = []; //comment array

        for (let i = 0; i < comments.length; i++) {
            commentString.push(`
                <div style="padding-left: ${called * 40}px;" class="mt-4">
                    <div class="text-gray-400">
                        <i class="fa fa-sort-up mr-2"></i>
                        <strong>${comments[i].user}</strong> ${comments[i].time_ago}
                    </div>
                    <p class="text-gray-700">${comments[i].content}</p>
                </div>
            `);
            
            // 대댓글 처리
            if (comments[i].comments.length > 0) {
                commentString.push(makeComment(comments[i].comments, called + 1));
            }
        }

        return commentString.join('');
    }
```
- 함수 인자 접근을 통한 차등 스타일링 적용

### 상태를 통한 방문 페이지 표시
- 접근 1 : 글 별 id를 통해 방문한 데이터 구조 생성 후 저장하는 방법
- 접근 2 : 속성 추가를 통한 뉴스 피드 수정 (의존성 down, 효율적)
```js
    // 최초 접근의 경우
    if (newsFeed.length === 0) {
        newsFeed = store.feeds = getData('GET', URL_ADDR, false);
    }
```

### Typescript migration
- `primitive type` & `object type`

- `type alias` : 타입 별칭을 통한 타입 지정
- `interface` : 인터페이스를 통한 타입 지정

- **type guard**
```js
function updateView(html) {
    if (container != null) {
        container.innerHTML = html;
    } else {
        console.log('최상위 컨테이너가 없어 UI를 진행하지 못합니다.');
    }
}
```

### 함수 규격 작성
- type alias 사용을 통한 중복 제거 
    - type alias의 intersection 기능 사용
```ts
type NewsFeed = {
    id: number;
    comments_count: number;
    url: string;
    user: string;
    time_ago: string;
    points: number;
    title : string;
    read?: boolean;
}

type NewsDetail = {
    id: number;
    time_ago: string;
    title: string;
    url: string;
    user: string;
    content: string;
    comments: [];
}
```
- 위 코드를 아래 News 타입과의 인터섹션을 통해 간소화
```ts
type News = {
    id: number;
    time_ago: string;
    title: string;
    url: string;
    user: string;
    content: string;
}

type NewsFeed = {
    comments_count: number;
    points: number;
    read?: boolean;
}

type NewsDetail = {
    comments: [];
}
```

### REST Client
- `generic`을 사용해 데이터의 타입을 일반화하는 문법
```ts
/** ajax 데이터 요청 함수 */
function getData(method: string='GET', url: string, async: boolean=false): NewsFeed[] | NewsDetail {
    ajax.open(method, url, async); // 동기 or 비동기 방식으로 서버 요청 값 처리
    ajax.send(); // 데이터를 가져오는 작업

    return JSON.parse(ajax.response);
}
```
- 입력의 케이스가 n개일 때 출력의 케이스 역시 n으로 처리해줄 수 있는 방법
```ts
/** ajax 데이터 요청 함수 */
function getData<AjaxResponse>(method: string='GET', url: string, async: boolean=false): AjaxResponse {
    ajax.open(method, url, async); // 동기 or 비동기 방식으로 서버 요청 값 처리
    ajax.send(); // 데이터를 가져오는 작업

    return JSON.parse(ajax.response);
}
```

### type alias vs interface
- **`type alias`**
```ts
type Store = {
    currentPage: number;
    feeds: NewsFeed[];
}
```
- `=` 사용 (객체 유형을 대입하듯)

- **`interface`**
```ts
interface Store {
    currentPage: number;
    feeds: NewsFeed[];
}
```
- `=` 사용 X
- 어떤 유형의 설명을 보다 명확하고 명시적으로 할 수 있음 (& 대신 extends 를 사용해 보다 명확하게 이해 (글로써 표현))
    - 가독성 up
- 확장되는 형식의 표현 : interface 선호

- type alias와 interface의 가장 큰 차이점
    - intersection을 사용하는 부분 (타입의 결합 및 조합의 방식에서의 차이)
        - type alias : intersection 지원 O
        ```ts
        type NewsDetail News & = {
            comments: NewsContent[];
        }
        ```

        - interface : `extends` 사용해 intersection 지원
        ```ts
        interface NewsDetail extends News {
            comments: NewsContent[];
        }
        ```

- `readonly` 속성
    - 수정되어서 안되는 정보를 처리하기 위해 `readonly` 지시어를 사용해 코드에서 해당 정보를 수정할 수 없도록 조작

### 상속과 믹스인
- 공통 요소를 만들어둔 뒤 공통요소를 확장한 개별요소를 만드는 방식
    1. class 사용
        - class : 최초의 초기화 과정 필요, `constructor()`로 사용
        ```ts
        class Api {
            url: String;
        ajax: XMLHttpRequest;

            constructor(url: string) {
                this.url = url;
                this.ajax = new XMLHttpRequest();
            }
        }
        ```

        ```ts
        class Api {
            method: string;
            url: string;
            async: boolean;
            ajax: XMLHttpRequest;

            constructor(method: string, url: string, async: boolean) {
                this.method = method;
                this.url = url;
                this.async = async;

                this.ajax = new XMLHttpRequest();
            }

            getRequest<AjaxResponse>(): AjaxResponse {
                this.ajax.open(this.method, this.url, this.async);
                ajax.send();
            
                return JSON.parse(ajax.response);
            }
        }

        class NewsFeedApi extends Api {
            getData(): NewsFeed[] {
                return this.getRequest<NewsFeed[]>();
            }
        }

        class NewsDetailApi extends Api {
            getData(): NewsDetail {
                return this.getRequest<NewsDetail>();
            }
        }
        ```

        - class 사용 시 인스턴스 생성해주어야 함
        - `protected` : class에서 사용할 용도로 만든 속성과 메소드 등을 외부로 노출시키지 않는 지시어

    2. mixin 사용
        - class를 사용해 상속을 구현하지만, `extends`를 사용하지 않고 클래스를 함수 또는 단독 객체로 바라보며 필요한 경우마다 합성해 확장하는 기법
        - class의 독립성 증가
        - `extends` : 다중 상속 지원 X
        - mixin을 사용해 상위 클래스 n개를 상속받을 수 있음

### 뷰 클래스로 코드 구조 개선
1. 공통된 목적 추출
    - UI 업데이트 함수
    - UI 업데이트를 위한 보조적 작업 수행 함수
    - 라우터 함수
2. 클래스 생성 (camel-case 작성)

- `bind()` : 
    - 메소드가 호출되면 새로운 함수 생성
    - 받게되는 첫 인자의 value로는 this 키워드를 설정하고, 이어지는 인자들은 바인드된 함수의 인수에 제공됨
    ```ts
    class Router {
    routeTable: RouteInfo[];
    defaultRoute : RouteInfo | null;

    constructor() {
        window.addEventListener('hashchange', this.route.bind(this));

        this.routeTable= [];
        this.defaultRoute = null;
    }
    ...
    }
    ```

- 접근 제어
    - `protected`, `public` ... : 기본 값 public
    - 외부 접근
        - View 클래스 외부의 인스턴스 객체로 접근하는 경우
            1. 상속받은 자식 class 안에서 접근하는 경우
            2. 상속관계가 없는 바깥쪽에서 인스턴스 객체에 접근하는 경우
                - `private` 속성 접근자 : 자식에서도 접근하지 못하도록

                ```ts
                const router: Router = new Router();
                const newsFeedView = new NewsFeedView('root');
                const newsDetailView = new NewsDetailView('root');

                newsDetailView.container // 상속관계가 없는 바깥쪽에서 인스턴스 객체 접근 제어
                ```

- 코드 파일의 분리
    - src
        - core
            - api
            - router
            - view
        - page
            - pages...
        - types
            - index
        - app
        - config

    - 모듈 스펙 : `import` / `export`
        - `import` : 다른 파일에 있는 특정 class or 값을 가져오는 문법
        - `export` : 해당 파일을 import할 수 있도록 부여하는 권한 문법

### 전역 상태 관리
- `getter`와 `setter`
