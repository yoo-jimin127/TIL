# 김민태의 프론트엔드 아카데미 - 제 1강 Javascript & Typescript

## (웹앱)프로그래밍 어떻게 배울 것인가?
- 프로그래밍 학습 도전에 실패하는 이유
    - 학습해야 할 방대한 사전 지식

- 시도 가능한 학습 전략
    - 일단 만들어보며 학습하기
    - 잘 정리된 순서대로 학습을 진행하기
    - 하이브리드 : 두 가지 모두 시도

## 빠르게 배워야 할 것, 나중에 배워야 할 것, 반복해 배워야 하는 것
- 기술의 세가지 유형
    - 변하지 않는 기술 : 높은 학습 비용
        - 네트워크
        - 운영체제
        - 컴퓨터 시스템 
        - 논리학
        - 대수학

    - 느리게 변하는 기술 : 중간 학습 비용
        - 프로그래밍 언어
        - 프로그래밍 패러다임
        - 자료구조
        - 보안
        - 알고리즘

    - 빠르게 변하는 기술 : 낮은 학습 비용
        - 프레임워크
        - 라이브러리
        - UI/UX
        - 디자인 패턴

- 4가지 프로그래밍 역량
    1. 일관성
    2. 유연성
    3. 확장성
    4. 독립성

## Javascript의 변천사
- 1995 LiveScript 탑재 & JScript 탑재
- 1997 EcmaScript 탑재 (통일)
- 2009 EcmaScript5.0 탑재
- ES2015 이상 버전으로 개발자 개발 -> ES5 버전으로 컴파일링해 브라우저 상에서 동작

## 웹앱의 구성요소
- 웹 앱의 필수 구성요소
    - HTML
    - CSS 
    - JavaScript

- 웹 앱이 실행됨 : 코드 파일이 브라우저에 전송되고, 브라우저가 해당 파일들을 물리적으로 띄우는 동작
    - 브라우저 : 웹 앱을 실행하는 요소
        - 실행 시간 : 런타임
        - 브라우저 : 웹앱에 런타임을 제공하는 요소
            - 브라우저가 아니더라도 javascript를 실행시키는 환경이 추가 (ex. node.js)

- CSR과 SSR
    - CSR (Client Side Rendering) : 
        - Javascript가 실행되며 필요한 HTML 요소를 그때그때 만드는 방법
        - 브라우저에서 실행되는 Javascript의 실행 결과로 UI를 주도적으로 만드는 방법
    - SSR (Server Side Rendering) :
        - 웹 서버 주도적으로 HTML을 만들어 브라우저에 전송하는 방법

- `<canvas>` 태그(그래픽 구현 영역 제공 ex. 2D, 3D) + api : 그래픽 시스템 구현

## 모던 Javascript와 개발 환경
- 모던의 기준점 : ES2015 버전 이후
- ES2015 : 모듈 스펙 제공 - file간 import / export 스펙 추가
    - 기존의 javascript 불러오는 방식 : `<script>` 태그로
    - javascript 외부의 파일을 불러오는 것이 어려웠던 ES2015 이하 버전
    - **브라우저 호환성** : npm을 통해 외부 Javascript 파일을 불러올 수 있게 됨
    - **번들러** : 브라우저 로딩 중 Javascript 파일에서 다른 Javascript 파일을 불러오는 것을 하나의 파일로 만들어주는 역할
        - 트랜스파일링 : 모던 js, 과거 js 상관 없이 변환하는 역할
        - **babel**
        - Typescript : 트랜스파일러의 한 종류

## Typescript vs Javascript
- Typescript
    - Javascript : Typescript의 Super Set
    - 유형(Type) 정의
```ts
    type Centimeter = number;

    let age = 10;
    let weight:number = 10;
    let height:Centimeter = 176;
```

```ts
type RainbowColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'navy' | 'purple';
let color:RainbowColor = 'orange';
```

## nodejs & npm
- Nodejs : 브라우저 상에서 nodejs를 사용해 javascript를 실행
- Npmjs : nodejs에서 제공하는 환경 (다양한 기능)
    - ex)
    ```js
    var colors = require('colors');

    console.log("Hello World".rainbow);
    ```
    - `npm install` 을 통해 특정 기능 소프트웨어를 사용할 수 있음
