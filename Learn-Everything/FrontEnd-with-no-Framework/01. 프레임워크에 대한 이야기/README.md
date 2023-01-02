# 1장. 프레임워크에 대한 이야기
프레임워크 없이 프론트엔드 애플리케이션을 개발하는 방법에 대해 배워야 하는 이유 : 때로 프레임워크 없이 작업을 수행하기 충분하지 않기 때문    

## ✅ 프레임워크란?
- 프레임워크 : 무언가를 만들 수 있는 지지 구조    
    → 소프트웨어 프레임워크의 일반적인 개념과 일치     
    - ex) 앵귤러 : 서비스, 구성요소, 파이프와 같은 기본 요소를 사용해 애플리케이션을 빌드하는데 필요한 구조 제공     
- 실제 애플리케이션 스택은 다른 요소를 포함함
    → loadash를 사용해 배열 or 객체를 조작하거나 Moment.js를 사용해 날짜를 파싱하기도 함     
    → JS 커뮤니티 : 이를 **라이브러리**로 칭함    

### ▶️ 프레임워크 vs 라이브러리
- 프레임워크 : 코드 호출
- 코드 : 라이브러리 호출
<img width="487" alt="스크린샷 2023-01-02 오후 11 30 05" src="https://user-images.githubusercontent.com/66112716/210245056-8a341337-9b42-4aec-8e02-bbfd99204a77.png">

- 앵귤러 Service 예제
```js
// 1-1
import { Injectable } from '@angular/core';
import { HtpClient } from '@angular/common/http';

const URL = 'http://example.api.com/';

@Injectable({ 
    providedIn: 'root',
})
export class PeopleService { 
    constructor (private http: HttpClient){ }
    list() {
        return this.http.get(URL);
    }
}
```

- 앵귤러 Component 예제
```js
// 1-2
import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';

@Component ({
    selector: 'people-list',
    templateUrl: './people-list.component.html'
})

export class PeopleListComponent implements OnInit {
    constructor(private peopleService: PeopleService){ }

    ngOnInit() { 
        this.loadList();
    }

    loadList(): void { 
        this.peopleService.getHeroes()
            .subscribe (people => this.people = people);
    }
}
```

- Moment.js 예제
```js
// 1-3
import moment 'moment';

const DATE_FORMAT = 'DD/MM/YYYY';

export const formatDate = date => {
    return moment(date).format(DATE_FORMAT);
}
```

앵귤러는 프레임워크이고, Moment.js는 라이브러리    
- `Angular`(프레임워크) : 개발자 코드로 채울 수 있는 구조와 표준 작업에 도움이 되는 유틸리티 세트
- `Moment.js`(라이브러리) : 애플리케이션 코드를 어떻게 구성해야 하는지에 대해 특별한 형식을 요구하지 않음, 가져와 사용하기만 하면 됨
    - 공개 API를 존중하는 한 계속 사용 가능

## ✅ 프레임워크 방식
앞서 본 것과 같이 Moment.js는 개발자가 어떻게 코드에 통합하는지 강요하지 않음    
앵귤러는 매우 독선적임    

### ▶️ 언어
- 앵귤러 : Typescript가 표준
    - 유형 검사, 어노테이션 등 원본 언어에서 존재하지 않는 기능 제공
    - 앵귤러로 코드 작성 시 : 트랜스파일러 필요

### ▶️ 의존성 주입
- 요소가 앵귤러 애플리케이션에서 통신하도록 하기 위해 **의존성 주입 메커니즘**을 사용해 요소를 주입해야 함
- 이전 AngularJS : 서비스 로케이터 패턴을 기반으로 하는 의존성 주입 메커니즘 존재

- AngularJS의 의존성 주입
```js
// 1-4
const peopleListComponent = peopleService => {
    // 실제 코드
};

angular.component('people-list', [
    'peopleService',
    peopleListComponent
]);
```

### ▶️ 옵저버블
- 앵귤러 : 옵저버블을 사용한 반응형 프로그래밍용 라이브러리 `RxJS`를 기반으로 설계됨
    - HTTP 요청이 Promise처럼 설계되는 다른 FE 프레임워크들과 다름
        - Promise : 비동기 작업의 최종 완료 및 실패를 나타내는 표준 방법
    - `RxJS` 사용 시 옵저버블 → 프라미스, 프라미스 → 옵저버블로 쉽게 변환 가능
- 앵귤러 프로젝트에서 프라미스 기반 라이브러리를 통합해야 하는 경우 추가 작업 요구

- 옵저버블을 사용하지 않은 앵귤러 서비스
```js
// 1-5
import axios from 'axios';
const URL = 'http://example.api.com/';

export default {
    list() {
        return axios.get(URL);
    }
}
```

- 옵저버블을 사용하지 않는 앵귤러 구성 요소
```js
// 1-6
import people from 'people.js';

export class PeopleList {
    load() {
        people
            .list()
            .then(people => {
                this.people = people
        });
    }
}
```
> 프로젝트에 적합한 도구인지 평가하기 위해 팀이 선택한 프레임워크의 방식을 분석하는 것이 매우 중요하다.

### ▶️ 리액트에 대해 이야기해보자
- 리액트 홈페이지 : '사용자 인터페이스 구축을 위한 JS **라이브러리**'라고 명시
    - 리액트의 주요 제약 사항 : **선언적 패러다임의 사용**
    - DOM을 직접 조작하는 대신 **구성 요소의 상태를 수정**
        → 리액트가 대신 DOM을 수정해줌    
    → 위 방법 : 대부분의 리액트 생태계 라이브러리에서 통용됨    

- 리액트 Pose 애니메이션 예제
```js
// 1-7
import React, { Component } from 'react';
import posed from 'react-pose';

const Box = posed.div({
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    transition: {
        ease: 'linier',
        duration: 500
    }
});
```