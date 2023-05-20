# CH02. 렌더링 전략
**렌더링 전략** : 웹 페이지 or 웹 어플리케이션을 웹 브라우저에 제공하는 방법   
- 정적으로 생성한 페이지 제공에 유리 : ex) `Gatsby`
- 서버 사이드 렌더링 페이지 제공에 유리 : 다른 프레임워크들   
→ `Next.js`: 새로운 수준으로 방법 제공   
    - 어떤 페이지를 **빌드 시점**에 **정적**으로 생성 & 어떤 페이지를 **실행 시점**에 **동적**으로 제공할지 쉽게 정할 수 있음    
    - 애플리케이션의 특정 페이지에 대한 요청이 있을 경우 페이지를 다시 생성할 수 있음   
    - 반드시 클라이언트에서 렌더링해야 할 컴포넌트 지정 가능    

## ▶️ 서버 사이드 렌더링 (SSR)
**SSR** : 웹 페이지를 제공하는 가장 흔한 방법   
ex) PHP, 루비, 파이썬 등의 언어 : HTML 페이지를 웹 브라우저로 전송하기 전에 서버에서 전부 렌더링   
&nbsp;&nbsp;&nbsp;&nbsp; → 해당 페이지의 모든 자바스크립트 코드가 적재 → 동적으로 페이지 내용 렌더링   
<br />

`Next.js` : 각 요청에 따라 서버에서 HTML 페이지를 동적으로 렌더링 & 웹 브라우저로 전송 가능   
- 서버에서 렌더링한 페이지에 스크립트 코드를 집어넣어 추후 웹 페이지의 동적 처리 가능 → **하이드레이션**(hydration)    
    - 리액트에서의 하이드레이션 
        - 서버 측에서 생성한 HTML 페이지에 클라이언트 측에서 실행하는 JS 코드를 추가해 애플리케이션 상태를 관리하고 렌더링하는 기법
        - HTML 페이지를 구성하는 각각의 DOM 객체에 필요한 자바스크립트 코드를 추가해 클라이언트가 동적으로 렌더링할 수 있는 것 의미
        - 서버 측에서 렌더링한 DOM과 클라이언트가 렌더링한 DOM이 한데 섞여 SPA처럼 보인다는 점에서 **하이드레이션**
<br />

- ex) 블로그 사이트를 만들어 어떤 사람이 작성한 모든 글을 한 페이지에 렌더링 → SSR 적용에 최적화된 상황    
&nbsp;&nbsp;&nbsp;&nbsp; → 사용자 : 페이지 접근     
&nbsp;&nbsp;&nbsp;&nbsp; → 서버 : 페이지를 렌더링해 결과로 생성한 HTML 페이지를 클라이언트로 전송    
&nbsp;&nbsp;&nbsp;&nbsp; → 브라우저 : 페이지에서 요청한 모든 스크립트 다운로드 & DOM 위에 각 스크립트 코드 하이드레이션    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 페이지의 새로 고침 없이 사용자와 웹 페이지 간 상호작용 가능   
리액트의 하이드레이션 : 웹 앱은 **싱글 페이지 어플리케이션**(SPA)처럼 작동 가능   
→ CSR과 SSR의 장점 모두 O    
<br />

### ⭐️ SSR 사용 시 주요 이점
### ✔️ 더 안전한 웹 애플리케이션
페이지를 서버에서 렌더링하는 것 === 쿠키 관리, 주요 API, 데이터 검증 등의 작업을 서버에서 처리한다는 의미      
중요한 데이터를 클라이언트에 노출할 필요가 없기에 안전      
<br />

### ✔️ 더 뛰어난 웹 사이트 호환성
클라이언트 환경이 JS를 이용 X or 오래된 브라우저 사용 시에도 웹 페이지 제공 가능     
<br />

### ✔️ 더 뛰어난 SEO
클라이언트에서 서버가 렌더링한 HTML 콘텐츠를 받으므로 봇, 웹 크롤러 같은 검색 엔진 웹 문서 수집기가 페이지를 렌더링 할 필요 X   
웹 애플리케이션의 SEO 점수 ↑   
SSR이 최적의 렌더링 전략이 아닌 경우도 존재     
&nbsp;&nbsp;&nbsp;&nbsp; SSR 사용 시 클라이언트가 요청할 때마다 페이지를 다시 렌더링할 수 있는 서버 필요      
&nbsp;&nbsp;&nbsp;&nbsp; CSR or SSG 방식 생성 → 정적 HTML 파일을 vercel or netlify와 같은 클라우드 서비스에 배포 & 클라이언트에 제공 가능    
&nbsp;&nbsp;&nbsp;&nbsp; 웹 앱을 서버에 배포할 경우, SSR App이 더 많은 자원 소모 & 부하 유발 & 유지보수 비용 증가    
<br />

SSR 사용 시 **페이지에 대한 요청 처리 시간 ↑**   
&nbsp;&nbsp;&nbsp;&nbsp; 페이지가 외부 API 또는 데이터 소스에 접근해야할 경우, 해당 페이지를 렌더링할 때마다 API나 데이터 소스 재요청     
&nbsp;&nbsp;&nbsp;&nbsp; ✔️ 서버에서 렌더링한 페이지 간의 이동 : 클라이언트에서 렌더링한 페이지 or 정적으로 생성한 페이지 간의 이동보다 느림     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → `Next.js` : 네비게이션 성능 향상 기능 제공    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : `Next.js` - 기본적으로 빌드 시점에 **정적으로 페이지 생성**   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 페이지에서 외부 API 호출 or 데이터베이스에 접근하는 등 동적 작업 필요 시 : 해당 함수를 페이지에서 `export`   
```js
function IndexPage() {
    return <div>This is the index page</div>;
}

export default IndexPage;
```
- 위 페이지 : 페이지의 외부 API 호출 X, 데이터 소스에 접근 X, 각 요청에 대한 내용 : 항상 같은 문자열   

```js
export async function getServerSideProps() {
    const userRequest = await fetch('fttps://example.com/api/user');
    const userData = await userRequest.json();

    return {
        props: {
            user: userData,
        },
    };
}

function IndexPage(props) {
    return <div>Welcome, {props.user.name}!</div>;
}

export default IndexPage;
```
- Next.js의 `getServerSideProps` 예약 함수 사용   
    - 페이지에 대한 요청이 들어오면 서버가 REST API를 호출해 필요한 사용자 정보를 가져옴

1. 비동기 함수 `getServerSideProps` export     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; → 빌드 과정에서 `Next.js` : 해당 함수를 export하는 모든 페이지를 찾아 서버가 페이지 요청을 처리할 때    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `getServerSideProps` 함수를 호출하도록 함     
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 해당 함수 내의 코드는 항상 서버에서만 실행   
<br />

2. `getServerSideProps` 함수 : props라는 속성값을 갖는 객체 반환   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `Next.js` : 이 props를 컴포넌트로 전달해 서버와 클라이언트 모두가 props에 접근 & 사용 가능   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; fetch API : Next.js를 통해 서버에서 실행됨 → fetch APi를 별도의 폴리필로 끼워넣을 필요 X
<br />

3. `IndexPage` 함수를 수정해 props를 인자로 받음   
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 해당 props는 `getServerSideProps` 함수에서 반환한 props의 모든 내용을 가짐   
<br />

> ⚠️ **SSR의 주의점**   
> 브라우저 전용 API를 사용해야 하는 컴포넌트가 있을 경우   
> 해당 컴포넌트를 반드시 **브라우저에서 렌더링하도록 명시적인 지정**이 필요    
> Next.js : 서버에서 페이지 렌더링 → `window`, `document`와 같은 객체 or API 제공 X   
> → CSR 필요   

## ▶️ 클라이언트 사이드 렌더링 (CSR)
표준 리액트 앱 : JS 번들을 클라이언트로 전송 → 렌더링 시작   
- CRA 사용의 예
    - 웹 앱이 렌더링을 시작하기 전에 웹 브라우저 화면이 비어있는 현상    
&nbsp;&nbsp;&nbsp;&nbsp; → 서버가 웹 애플리케이션이 필요로 하는 스크립트와 스타일만 포함된 기본 HTML 마크업만 전송하므로    
&nbsp;&nbsp;&nbsp;&nbsp; : 실제 렌더링 - 클라이언트로 전송한 웹 애플리케이션에서 이루어짐    
<br />

- **CRA로 생성한 HTML 마크업 구조**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta
        name="description"
        content="Web site created using create-react-app"
    />
    <link rel="apple-touch-icon"
        href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
</head>
<body>
    <noscript>
        You need enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>
</body>
</html>
```
1. 빌드 과정 동안 `create-react-app`은 컴파일한 JS & CSS 파일을 HTML 페이지에서 불러오도록 만듦   
2. `root` div 요소에 전체 애플리케이션 렌더링   
3. Vercel, Netlify, Google Cloud, AWS 등 호스팅 서비스 제공자에 배포   
4. 해당 URL로 접근하면 브라우저가 HTML 마크업을 받아 화면에 렌더링   
5. CRA가 빌드 과정 동안 주입한 `script`, `link` 태그의 JS 번들 & CSS 파일을 다운로드   
6. 브라우저가 이를 통해 전체 애플리케이션 렌더링   
&nbsp;&nbsp;&nbsp;&nbsp; → 사용자 : 애플리케이션과 상호 작용 가능   

### ⭐️ CSR 사용 시 주요 이점
### ✔️ 네이티브 애플리케이션처럼 느껴지는 웹 애플리케이션
전체 자바스크립트 번들을 다운로드 한다 === 웹 애플리케이션이 **렌더링할 모든 페이지가 이미 브라우저에 다운로드** 되어있다는 의미    
- 다른 페이지로 이동 시   
    - 서버에서 ~~그 페이지에 해당하는 새로운 콘텐츠 다운로드~~ ❌   
    - 페이지의 콘텐츠를 **새로운 것으로 바꿈** ⭕️   
→ 콘텐츠를 바꾸기 위해 페이지의 새로고침 필요 X
<br />

### ✔️ 쉬운 페이지 전환  
클라이언트의 네비게이션 : 브라우저 화면의 새로 고침 없이 다른 페이지로의 이동 가능   
페이지 간 전환에 효과 부여 용이(애니메이션 방해 요소 X)    
<br />

### ✔️ 지연된 로딩(lazy loading)과 성능
CSR 사용 → **최소로 필요한 HTML 마크업만 렌더링**   
사용자가 버튼 클릭 시 보이는 모달 : 실제 HTML 페이지에서는 HTML 마크업으로 존재 X   
→ 버튼을 클릭해야만 리액트가 **동적으로 생성**   
<br />

### ✔️ 서버 부하 감소    
전체 렌더링 과정 : 브라우저에서 발생   
→ 서버의 역할 : 간단한 HTML 페이지 클라이언트에 전송하는 것    
: AWS Lamda, Firebase 등 **서버리스** 환경에서 웹 앱 제공 가능   
<br />

네트워크 속도가 느린 환경 : 전체 JS 코드와 CSS 파일을 받는 것에만 수 초 소요   
SEO에 영향 : 검색 엔진 봇들이 웹 앱의 페이지를 수집해도 **해당 페이지는 빈 것으로 보임**   
→ 낮은 성능 점수에 영향   
<br />

Next.js : 특정 페이지 내의 모든 리액트 컴포넌트를 **서버에서 렌더링** or **빌드 시점에 미리 렌더링**   
※ Node.js 런타임이 `window`, `document`와 같은 브라우저 전용 API, `canvas`와 같은 HTML 요소 제공 X   
&nbsp;&nbsp;&nbsp;&nbsp; → Next.js : 브라우저에 특정 컴포넌트를 렌더링하도록 지정하는 방식으로 처리    
<br />

### ✔️ React.useEffect 훅
최근 리액트 : **함수형 컴포넌트** 사용 강조   
→ `componentDidMount` 대신 `React.useEffect` 훅을 사용해도 같은 기능 구현 가능  
<br />

: 함수형 컴포넌트 내에서 DOM 조작 & 데이터 불러오기 등의 사이드 이펙트 기능 구현 시   
&nbsp;&nbsp;&nbsp;&nbsp; → `useEffect` 함수로 컴포넌트가 마운트된 후 해당 기능을 실행하도록 제작 가능   
→ Next.js가 `useEffect`를 리액트 하이드레이션 이후 브라우저에서 실행하도록 만들어야 함   
: 특정 작업을 **반드시 클라이언트에서 실행하도록** 강제할 수 있음   
```js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

function Highlight({ code, language = 'js' }) {
  const { asPath } = useRouter();

  // 문제 발생 코드
    // hljs.registerLanguage('javascript', javascript);
    // hljs.initHighlighting();

  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlighting();
  }, [asPath]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/highlight.css" />
      </Head>
      <pre>
        <code className={language}>{code}</code>
      </pre>
    </>
  );
}

export default Highlight;
```
Next.js : 컴포넌트가 반환하는 HTML 마크업을 렌더링하고 `Highlight.js` 스크립트를 페이지에 끼워넣음   
해당 컴포넌트가 브라우저에 `마운트`되면 라이브러리 함수를 클라이언트에서 호출 & 실행하도록 함   
<br />

`React.useState`와 `React.useEffect`를 함께 사용해 특정 컴포넌트를 정확히 클라이언트에서만 렌더링하도록 지정 가능   
```js
import { useEffect, useState } from 'react';
import Highlight from '../components/Highlight';

function UseEffectPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div>
            {isClient &&
                (<Highlight
                 code={"console.log('Hello, world!)"}
                 language='js'
                />)
            }
        </div>
    );
}

export default UseEffectPage;
```

### ✔️ `process.browser` 변수
서버에서의 렌더링 시 브라우저 전용 API 문제를 다른 방법으로 해결 가능   
→ `process.browser` 값에 따라 스크립트와 컴포넌트를 조건별로 실행   
- `process.browser` : boolean 값 
    - 코드를 클라이언트에서 실행 : `true`
    - 코드를 서버에서 실행 : `false`
```js
function IndexPage() {
    const side = process.browser ? 'client' : 'server';

    return <div>You're currently on the {side}-side.</div>;
}

export default IndexPage;
```
- 코드 실행 결과
    1. 처음 : 브라우저에 "You're currently running on the `server`-side"
    2. 리액트 하이드레이션이 끝나면 : "You're currently running on the `client`-side"    
Vercel의 `process.browser`은 곧 중단될 예정 → `typeof window` 사용 가능      
```js
function IndexPage() {
    const side = typeof window === "undefined" ? 'server' : 'client';

    return <div>You're currently on the {side}-side.</div>;
}

export default IndexPage;
```
- `typeof window`가 **서버**에서 실행하면 `undefined`를, 그렇지 않으면 **클라이언트**에서 실행

### ✔️ 동적 컴포넌트 로딩
Next.js : 리액트가 제공하지 않는 기능을 내장 컴포넌트 & 유틸리티 함수 형태로 제공   
→ ex) `dynamic`   
```js
import dynamic from 'next/dynamic';
const Highlight = dynamic(
        () => import('../components/Highlight'), 
        { ssr: false }
    );

import styles from '../styles/Home.module.css';

function DynamicPage() {
  return (
    <div className={styles.main}>
      <Highlight code={`console.log('Hello, world! ')`} language="js" />
    </div>
  );
}

export default DynamicPage;
```
위 코드 실행 시 `Highlight` 컴포넌트를 **동적 임포트**(Dynamic Import)로 불러옴   
`ssr:false` 옵션으로 **클라이언트에서만 코드를 실행한다고 명시**   
→ Next.js : 해당 컴포넌트를 서버에서 렌더링 X   
→ 사용자는 리애트 하이드레이션이 끝날 때까지 기다려야 해당 컴포넌트 사용 가능   
<br />

CSR : 동적 웹 페이지를 만들 때 SSR보다 더 좋은 선택이 될 수 있음   
검색 엔진에 노출될 필요가 없는 페이지를 제작할 경우 : 웹의 JS를 먼저 다운로드 → 클라이언트에서 필요한 데이터를 직접 가져가도록   
→ 서버 부하 ↓, 애플리케이션 확장 용이성 ↑   

## ▶️ 정적 사이트 생성 (SSG)
SSG : 일부 또는 전체 페이지를 **빌드 시점에 미리 렌더링**   
※ 웹 앱 빌드 시 내용이 거의 변하지 않는 **정적 페이지 형태**로 만들어 제공하는 것이 더 좋음    
> Next.js : 빌드 과정에서 정적 페이지로 미리 렌더링해 HTML 마크업 형태로 제공    

### ⭐️ SSG 사용 시 주요 이점  
### ✔️ 쉬운 확장
정적 페이지 : 단순 HTML 파일 → CDN을 통해 파일 제공 or 캐시에 저장하기 용이   
직접 웹 서버에서 웹 애플리케이션을 제공하는 경우 → 정적 페이지(별도 연산 X) → 서버 부하 ↓   

### ✔️ 뛰어난 성능
빌드 시점에 HTML 페이지를 미리 렌더링 → 페이지 요청에도 클라이언트 or 서버의 처리 필요 X   
- 웹 서버 : 정적 파일 전송   
- 클라이언트 브라우저 : 파일을 받아 표시 (서버에 데이터 요구 X)   
각 요청 별로 발생할 수 있는 지연 시간 최소화   

### ✔️ 더 안전한 API 요청 
필요한 모든 정보가 빌드 시점에 미리 페이지로 렌더링 되어있기에   
**외부 API를 호출**하거나, **데이터베이스에 접근**하고나, **보호해야 할 데이터에 접근**할 일이 없음    
→ SSG : 높은 확장성과 뛰어난 성능을 보이는 프론트엔드 앱을 만들고 싶을 때 가장 좋은 방법   
<br />

- SSG의 문제점
    - 웹 페이지를 만들고 나면 다음 배포 전까지 내용이 변하지 않음   
    - `Gatsby`, `Jekyll` 등의 정적 사이트 생성기를 사용하는 경우, 
        - 일부분 수정을 위해 필요한 데이터를 가져오고 정적 페이지의 재생성 필요    
    → 정적 생성 페이지는 빌드 시점에 미리 렌더링되어 정적 자원처럼 제공되므로   
→ **sol.** : Next.js의 _증분 정적 재생성(ISR)_ 으로 **어느 정도의 주기로 정적 페이지를 다시 렌더링하고 해당 내용을 업데이트**할지 정함      
<br />

<details>
<summary>💻 getStaticProps 함수 SSG 예제</summary>

```js
import fetch from 'isomorphic-unfetch';
import Dashboard from './components/Dashboard';

export async function getStaticProps() {
    const userReq = await fetch('/api/server');
    const userData = await userReq.json();

    const dashboardReq = await fetch('/api/dashboard');
    const dashboardData = await dashboardReq.json();

    return {
        props: {
            user: userData,
            data: dashboardData,
        },
        revalidate: 600 // 시간을 초 단위로 나타낸 값 10분
    };
}

function IndexPage(props) {
    return (
        <div>
            <Dashboard
                user={props.user}
                data={props.data}
            />
        </div>
    );
}

export default IndexPage;
```
</details>

- `Next.js`
    - 빌드 과정에서 페이지 렌더링 시 이 함수를 호출해 필요한 데이터 등을 가져옴   
    - 다음 빌드 시점까지 더 이상 호출 X   
    - 단점 : 콘텐츠를 바꾸려면 **전체 웹사이트를 새로 빌드**해야 함   
    - ✨ 전체 웹사이트를 새로 빌드하는 단점을 피하고자 `revalidate` 옵션 추가   
        - `getStaticProps` 함수가 반환하는 객체 내에 지정 가능   
        - 페이지에 대한 요청이 발생할 때 어느 정도의 주기로 새로 빌드해야 하는지 나타냄  
<br />

1. Next.js가 빌드 과정에서 페이지의 내용을 `getStaticProps` 함수가 반환한 객체의 값으로 채움(빌드를 거쳐 정적 페이지로 만들어짐)   
2. 처음 10분간 해당 페이지를 요청하는 모든 사용자가 **동일한 정적 페이지**를 제공받음   
3. 10분 후 해당 페이지에 대한 새로운 요청이 들어올 시 **Next.js가 해당 페이지를 서버에서 다시 렌더링** → `getStaticProps` 함수 재호출   
4. 렌더링한 페이지를 저장해 새로운 정적 페이지로 생성 → 이전에 만든 정적 페이지를 새로 만든 페이지로 덮어씌움   
5. 이후 10분 간 동일한 페이지에 대한 모든 요청에 대해 **새로 만든 정적 페이지** 제공  
<br />

Next.js는 ISR을 최대한 **지연시켜 처리**   
10분이 지난 후 페이지에 대한 새로운 요청이 없을 시 페이지를 새로 빌드 X   
아직 ISR의 페이지 재생성을 API 등으로 강제 시작하는 방법이 없음 → `revalidate` 값에 지정된 시간만큼 기다리는 방법   

> `Next.js`   
> 어떤 페이지를 **빌드 시점**에 정적 페이지로 만들지 (SSG)   
> **페이지 요청 시점**에 만들지 (SSR) 지정 가능   
> ✨ SSG + ISR : SSR + SSG를 함께 사용할 수 있는 효과   