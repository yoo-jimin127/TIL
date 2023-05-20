# CH01. Next.js 알아보기

## ▶️ Next.js
- 리액트를 위해 만든 오픈소스 자바스크립트 웹 프레임워크 (확장성 ↑, 성능 ↑)
- `하이브리드 렌더링`, `라우트 프리페칭(pre-fetching)`, `자동 이미지 최적화`, `국제화` 등의 기능 제공
- SSR (Server Side Rendering) : 서버 사이드 렌더링
- SSG (Static Site Generation) : 정적 사이트 생성
- ISR (Incremental Static Regeneration) : 증분 정적 재생성
<br />

- React : 메타 엔지니어 개발
- 메타의 PHP, Hack Developer → XHP를 통해 프론트엔드 부분에서 `재사용할 수 있는 컴포넌트` 제작    
<br />

- **React 단점**
    - _클라이언트 사이드_ 에서만 작동
    - 웹 브라우저에서만 실행되기에 _검색 엔진 최적화(SEO)의 효과를 거의 볼 수 없음_    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 첫 화면에 웹 애플리케이션을 제대로 표시하기 위해 실행 초기의 성능 부담 ↑   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 1. 브라우저가 전체 웹 앱 번들 다운로드   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 2. 해당 내용을 분석 & 코드 실행해 결과를 얻어야 함    
→ 웹 애플리케이션을 서버에서 미리 렌더링해두는 방법 연구   
: 서버 사이드 렌더링 사용이 가능하다면, 리액트 앱을 순수한 HTML 페이지로 미리 렌더링한 후,    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 브라우저가 이를 다운로드해 **즉각 화면에 표시**    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;& 클라이언트에서 JS 번들을 다 받으면 `USER` ↔️ `WEB APP` 상호작용 가능      
<br />

- vercel : Next.js 제작   

|**`Next.js` 제공 기능**|
|---------------------|
|코드 분할|
|서버 사이드 렌더링|
|파일 기반 라우팅|
|경로 기반 프리페칭|
|정적 사이트 생성|
|증분 정적 콘텐츠 생성|
|타입스크립트에 대한 기본 지원|
|자동 폴리필 적용|
|이미지 최적화|
|웹 애플리케이션의 국제화 지원|
|성능 분석|   

## ▶️ Next.js와 비슷한 프레임워크
- `Gatsby`
    - Next.js 대신 사용할 수 있는 프레임워크
    - 정적 웹 사이트 제작에 최적화 (Next.js와 달리 Gatsby는 정적 사이트 생성만 지원)
    - 모든 페이지를 _빌드 시점에 미리 렌더링해 정적 콘텐츠 형태로 만듦_ : 어떤 콘텐츠 전송 네트워크(CDN)로도 제공 가능
    - 단점 : 동적 서버 사이드 렌더링 지원 X → 데이터에 따라 동적으로 변하는 복잡한 웹 사이트 제작 불가능
<br />

- `Razzle`
    - SSR 가능한 JS 애플리케이션 제작 가능
    - CRA 도구를 쉽게 사용 && 서버와 클라이언트의 복잡한 애플리케이션 설정 추상화 가능
    - 사용할 프레임워크 관련 지식이 없어도 됨 (Next.js와의 차이점)
    - React, Vue, Angular, Elm, Reason-React 등 어떤 프레임워크든 사용 가능
<br />

- `Nuxt.js`
    - Vue를 사용한 웹 애플리케이션 개발에서 리액트의 Next.js에 해당하는 것
    - SSR, SSG, PWA(Progressive Web App) 등의 기능 제공 (성능, SEO, 개발 속도 등 별다른 차이 X)
    - Next.js에 비해 많은 설정 필요 (레이아웃, 전역 플러그인, 컴포넌트, 라우트 등 지정 가능)
    - 기저 라이브러리가 무엇이냐는 점
        - `Next.js` : React 기반
        - `Nuxt.js` : Vue 기반
<br />

- `Angular Universal`
    - 서버에서 JS 코드 실행 & 렌더링 기능 제공
    - SSG, SSR 지원 (`Next.js`, `Nuxt.js`와의 차이점 : 구글에서 개발)

## ▶️ 리액트에서 Next.js로
- 단일 Next.js 애플리케이션에서 별도의 설정 파일을 만들지 않아도 특정 페이지에 SSR, SSG 적용 지정 가능   
- 각 페이지에서 특정 함수를 `export`하면 Next.js에서 나머지 작업 처리
- `React` : 자바스크립트 라이브러리
- `Next.js` : 프레임워크 - 클라이언트 & 서버에서 실행할 수 있는 코드
    - 서버 사이드 렌더링 페이지 & 정적으로 생성된 페이지 모두 `Node.js`에서 실행
        - ⭐️ `fetch`, `window`, `document` 등 웹 브라우저에서 제공하는 전역 객체 접근 X
        - ⭐️ `canvas` 등의 HTML 요소 접근 X
    - `fs`, `child_process` 등 Node.js에서만 사용할 수 있는 라이브러리 & API 사용 시,   
        - 각 요청 별 데이터를 클라이언트로 보내기 전에 서버 사이드 코드 실행 or 페이지 생성 시점에 해당 코드 처리하는 방식 지원    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 각 페이지가 어떤 렌더링 방식을 사용하느냐에 따라 결정
- 클라이언트 사이드 앱 생성 시에도 CRA 대신 Next.js 사용 가능

## ▶️ Next.js 시작하기
- Node.js & npm으로 실행 가능
- CNA : `create-next-app`

```cmd
// Next.js App 생성
$ npx create-next-app <app-name>

// npm 패키지로 덮어씌우기
$ npx create-next-app <app-name> --use-npm

// 사용하고자 하는 보일러플레이트 코드를 지정하는 옵션
// ex) Next.js 앱을 도커 환경에서 실행하는 예시
$ npx create-next-app <app-name> --example with-docker
```

- Next.js 기본 구조
```
- README.md
- next.config.js
- node_modules/
- package-lock.json
- package.json
- pages/
    - _app.js
    - api/
        - hello.js
    - index.js
- public/
    - favicon.ico
    - vercel.svg
- styles/
    - Home.module.css
    - globals.css
```
- `Next.js`에서의 네비게이션 : **`pages/` 디렉터리** (필수 디렉터리 ✔️)
    - ⭐️ `pages/` 디렉터리 내부 모든 JS 파일 : `public page`가 됨
    - `pages/` 디렉터리의 `index.js` 파일을 복사해 `about.js`로 변경    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → `http://localhost:3000/about` 주소 접근 시 똑같은 페이지 확인 가능    
- **`public/` 디렉터리** (필수 디렉터리 ✔️)
    - 웹 사이트의 모든 퍼블릭 페이지 & 정적 콘텐츠
    - ex) 이미지 파일, 컴파일된 CSS 스타일시트, 컴파일된 자바스크립트 파일, 폰트 등
- **`styles/` 디렉터리** (선택 디렉터리)
    - 웹 애플리케이션에서 사용하는 스타일시트를 해당 디렉터리에 둘 수 있음
    - Next.js 프로젝트에 `styles/` 디렉터리가 꼭 필요한 것 X
<br />

- **타입스크립트 지원**
    - `Next.js` : TS로 작성된 프레임워크 → 태생적으로 고품질 타입 정의 지원
    - 프로젝트 최상위 디렉터리 내에 `tsconfig.json`(타입스크립트 설정 파일) 생성 → `npm run dev`
    - Next.js가 바벨의 `@babel/plugin-transform-typescript` 사용해 설정 파일 관리
        - `@babel/plugin-transform-typescript` : **const enum** 지원 X
            - const enum 사용 시 `babel-plugin-const-enum` 추가 필요
        - `export =`, `import =` 구문 사용 X
            - 두 구문 모두 ECMAScript 코드로 컴파일 X
            - `babel-replacets-export-assignment` 설치 or `import x, {y} from 'same-package'` / `export default x` 등 올바른 ECMA 구문 사용 권장
        - 몇가지 TS 컴파일 옵션이 기본과 다름, [공식 바벨 문서](https://babeljs.io/docs/babel-plugin-transform-typescript#typescript-compiler-options) 확인 
    - 최상위 디렉터리에 `next-env.d.ts` 파일 생성 (수정 가능, 삭제 X)
<br />

- **바벨과 웹팩 설정 커스터마이징**
    - `Babel` : JS 트랜스컴파일러 - 최신 자바스크립트 코드를 하위 호환성을 보장하는 스크립트 코드로 변환하는 작업 담당
        - 하위 호완성 보장 → 어떤 웹 브라우저에서든 JS 코드 실행 O
        - ES6 or ESNext의 기능을 사용한 JS 코드 : 빌드 시점에 인터넷 익스플로러와 호환되는 코드로 변환 가능
        - ex)
        ```js
        // Node.js 실행 시 문법 오류 메시지 출력 → JS 엔진 : export default 키워드 모름
        export default function() {
            console.log("Hello, World!");
        }
        ```
        - 바벨 사용 시 :
        ```js
        // Node.js에서 문제 없이 실행되는 코드
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = _default;
        function _default() {
            console.log("Hello, World!");
        }
        ```
    - Next.js의 바벨 설정 커스터마이징 : 프로젝트 최상위 디렉터리에 `.babelrc` 파일 생성
        - `.babelrc`가 비어있으면 오류 발생 → 최소한의 내용 저장 필요   
        ```
        {
            "presets": ["next/babel"]
        }
        ```
        - Vercel 팀에서 Next.js 애플리케이션 빌드 & 개발할 때 사용 가능한 설정은 미리 저장해둔 바벨 설정 값  
    - 파이프라인 연산자
    ```js
    console.log(Math.random() * 10);
    // 파이프라인 연산자 사용 시 하기 코드로 변환 가능
    |> x => x * 10
    |> console.log;
    ```
    - Next.js에서의 파이프라인 연산자 사용
        1. 바벨 플러그인 설치
        ```cmd
        $ npm install --save-dev @babel/plugin-proposal-pipeline-operator @babel/core
        ```
        2. `.babelrc` 파일 수정
        ```
        {
            "presets": ["next/babel"],
            "plugins": [
                [
                    "@babel/plugin-proposal-pipeline-operator",
                    { "proposal": "fsharp" }
                ]
            ]
        }
        ```
    <br />
    
    - `Webpack` : 특정 라이브러리, 페이지, 기능에 대해 컴파일된 코드를 전부 포함하는 번들 생성
        - ex) 서로 다른 라이브러리에서 각각 한 개씩 세 개의 컴포넌트를 불러오는 페이지를 만들 경우,
            - 웹팩 : 클라이언트가 이를 받아 실행할 수 있는 **하나의 번들**로 합쳐줌
        - JS 파일, CSS, SVG 등 웹에서 사용하는 모든 자원에 대한 각기 다른 `컴파일 번들`, `최소화 작업`을 조율 & 처리하는 인프라
    <br />

    - ⭐️ **`Next.js` : '설정보다 관습'** - 애플리케이션 개발 과정에서 설정을 바꿀 일이 많지 않음
        - 적절한 코드 컨벤션을 따라 개발하는 경우 ↑
    - 애플리케이션 빌드 과정의 수정이 필요하다면 `next.config.js` 파일의 기본 값 변경으로도 충분
        - 프로젝트의 최상위 디렉터리에 만들고 객체를 export → 해당 내용이 Next.js의 기본 설정 값 덮어씀
        ```js
        module.exports = {
            // 변경할 설정값
        }
        ```
    <br />

    - 기본 웹팩 설정 변경 희망 시 : webpack 키에 새로운 속성값 지정  
        - ex) 웹팩 로더에 `my-custom-loader`라는 가상의 로더 추가 희망 시
        ```js
        module.exports = {
            webpack: (config, options) => {
                config.module.rules.push({
                    test: /\.js/.
                    use: [
                        options.defaultLoaders.babel,
                        // 해당 부분은 예시히므로, 실제 사용 시 애플리케이션 작동 X
                        {
                            loader: "my-custom-loader", // 사용할 로더 지정
                            options: loaderOptions, // 로더 옵션 지정
                        },
                    ],
                });
                return config;
            },
        }
        ```
        - 위와 같이 웹팩 설정 추가 시 추후 Next.js 기본 설정과 합쳐짐
            - 기본 설정 지우거나 직접 바꾸는 행위 : 바람직 X   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 기본 설정은 그대로 두고, 추가로 설정 값을 확장 or 덮어쓰는 것 권장    
