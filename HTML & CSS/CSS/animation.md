## CSS animation 속성 : 
- 용도 - css 파일에서 태그의 동적 애니메이션을 주고자 할 때

- `animation-name` : 애니메이션의 중간 상태를 지정하기 위해 이름 정의, 중간 상태 _ `@keyframes` 규칙 사용하여 기술
- `animation-duration` : 한 싸이클의 애니메이션이 얼마에 걸쳐 일어날지 지정 (초 단위 ex> 2s) - 지속성 관련
- `animation-delay` : 엘리먼트가 로드된 뒤 언제 애니메이션이 시작될지 시작 지점을 지정
- `animation-direction` : 애니메이션이 종료되고 다시 시작될 때 순방향, 역방향으로 진행할지에 대해 정하는 속성
- `animation-iteration-count` : 애니메이션이 몇번 반복되도록 할지 지정 - `infinite` 속성을 지정할 경우 무한히 반복할 수 있음
- `animation-play-state` : 애니메이션 멈춤 또는 다시 시작을 정의하는 속성
- `animation-timing-function` : 중간 상태들의 전환을 어떤 시간 간격으로 진행할지 지정
- `animation-fill-mode` : 애니메이션 시작되기 전이나 끝나고 난 뒤 어떤 값이 적용될지 지정하는 속성

```
/* 단일 속성 */ 
    .object { animation-name: 1s; 
    animation-duration: 2s; 
    animation-delay: 1s; 
    animation-direction: alternate; 
    animation-iteration-count: 3; 
    animation-play-state: paused; 
    animation-timing-function: 1s; 
    animation-fill-mode: both; 
    } 
    /* 속기형 */ 
    animation: name | duration | timing-function | delay | iteration-count | direction | fill-mode | play-state> [,...];
```

출처: https://webclub.tistory.com/621 [Web Club]