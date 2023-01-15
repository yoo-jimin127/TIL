# 2장. 렌더링
모든 웹 애플리케이션에서 가장 중요한 기능 중 하나 : **데이터의 표시**     
- 데이터 표시 : 요소를 화면 또는 다른 출력장치에 **렌더링 하는 것**을 의미
- W3C : 프로그래밍 방식으로 요소를 렌더링하는 방식을 **문서 객체 모델, DOM**으로 정의

## ✅ 문서 객체 모델 (DOM, Document Object Model)
- **DOM** : 웹 애플리케이션을 구성하는 요소를 조작할 수 있는 API
- 모든 HTML 페이지 : **트리**로 구성

- 간단한 HTML 테이블
```html
<!-- 2-1 -->
<html>
    <body>
        <table>
            <tr>
                <th>Framework</th>
                <th>Github stars</th>
            </tr>
            <tr>
                <th>Vue</th>
                <th>118917</th>
            </tr>
            <tr>
                <th>React</th>
                <th>115392</th>
            </tr>
        </table>
    </body>
</html>
- 테이블의 DOM 표현
```
![](https://user-images.githubusercontent.com/66112716/210324973-27ce8fcd-fad6-4cfc-85d6-97495479dd1f.png)
DOM은 HTML 요소로 정의된 트리를 관리하는 방법임을 확인    

- React 셀의 색상 변경
```js
// 2-2
const SELECTOR = 'tr:nth-child(3) > td'
const cell = document.querySelector(SELECTOR)
cell.style.background = 'red'
```
> `querySelector` : Node 메서드
> `Node` : HTML 트리에서 노드를 나타내는 기본 인터페이스

## ✅ 렌더링 성능 모니터링
웹 용 렌더링 엔진 설계 시 **가독성**, **유지 관리성**을 염두에 두어야 함     
- 렌더링 엔진에서 또 다른 중요한 요소 : **성능**

### ▶️ 크롬 개발자 도구
- FPS(Frames Per Second) : 렌더링 성능 모니터링에서 사용할 수 있는 기능 중 하나로 초당 프레임 수 추적 가능

<img width="594" alt="" src="https://user-images.githubusercontent.com/66112716/210329135-bbe5e7fc-4103-41e4-9964-718f5b54f65a.png">

- 크롬 개발자 도구 → cmd/ctrl + Shift + P : FPS 및 GPU 사용량 확인 가능

### ▶️ state.js
- 애플리케이션의 FPS를 모니터링할 수 있는 라이브러리 `state.js` 사용
    - 프레임 & 할당된 메가바이트의 메모리 렌더링에 필요한 밀리초 표시 가능
    - 어떤 웹 애플리케이션에도 쉽게 포함 가능

### ▶️ 사용자 정의 성능 위젯
- FPS를 보여주는 위젯 작성은 간단함
    1. `requestAnimationFrame 콜백`을 사용해 현재 렌더링 사이클과 다음 사이클 사이의 시간 추적     
    2. 콜백이 1초 내에 호출되는 횟수를 추적

- 사용자 정의 성능 모니터 위젯
    - FPS 계산 후 위젯에 숫자를 표시하거나 콘솔을 사용해 데이터를 출력할 수 있음
```js
// 2-3) 사용자 정의 성능 모니터 위젯
let panel
let start
let frames = 0

const create = () => { 
    const div = document.createElement('div') 

        div.style.position = 'fixed'
        div.style.left = '0px' 
        div.style.top = '0px' 
        div.style.width = '50px' 
        div.style.height = '50px' 
        div.style.backgroundColor = 'black'
        div.style.color = 'white'
        
        return div 
}

    const tick=() => { 
        frames++
        const now = window.performance.now() 
        if (now >= start + 1000) {
            panel.innerText = frames 
            frames = 0
            start = now
        }
        window.requestAnimationFrame(tick)
    }

    const init = (parent = document.body) =>{ 
        panel = create()
        window.requestAnimationFrame (() => { 
            start = window.performance.now() 
            parent.appendChild(panel)
            tick()
        }) 
    }

export default { 
    init
}
```

## ✅ 렌더링 함수
순수 함수로 요소를 렌더링함 == **DOM 요소가 애플리케이션의 상태에만 의존**한다는 것을 의미     

- 순수 함수 렌더링의 수학적 표현
$view = f(state)$     
- 순수 함수 사용 시 : 테스트 가능성, 구성 가능성의 장점 존재
    - 몇가지 문제점 역시 존재하며, 뒷부분에서 다루도록 함

### ▶️ TodoMVC
- TodoMVC : 다양한 프레임워크로 작성된 동일한 할일 리스트의 구현을 모아놓은 프로젝트
- [TodoMVC](http://todomvc.com)

- TodoMVC에서의 렌더링
    - 항목과 툴바의 렌더링
    - 이후, HTTP 요청, 이밴트 처리 등의 요소 추가

### ▶️ 순수 함수 렌더링
- [기본 TodoMVC 앱 구조](https://github.com/Apress/frameworkless-front-end-development/tree/master/Chapter02/01)
    - 위 코드를 동적으로 구성하기 위해
        - 필터링된 `todo 리스트`를 가진 UI
        - 완료되지 않은 `todo 수`를 가진 `span`
        - `selected 클래스`를 오른쪽에 추가한 필터 유형을 가진 `링크`

- 기본 컨트롤러
```js
// 2-6
import getTodos from './getTodos.js'
import view from './view.js'

const state = {
    todos: getTodos(),
    currentfilter: All
}

const main = document.querySelector('.todoapp')

window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain) 
})
```
간단한 **렌더링 엔진**은 [requestAnimationFrame](https://developer.mozilla.org/en-us/docs/Web/APl/window/requestAnimationframe)을 기반으로 함     
- 모든 DOM 조작 및 애니메이션은 이 DOM API를 기반으로 해야 함
    - 메인 스레드 차단 X
    - 다음 다시 그리기(repaint)가 이벤트 루프에서 스케줄링 되기 직전에 실행됨

- 정적 렌더링 스키마
![](https://user-images.githubusercontent.com/66112716/210338957-c408923e-9e46-41a9-8fbd-f52382f18007.png)

### ▶️ 코드 리뷰
예제 2-6에서의 렌더링 방식은 `requestAnimationFrame`과 가상 노드 조작 사용을 통해 충분한 성능 보장    
뷰 함수의 낮은 가독성    

- 예제 2-6의 문제점
    - **하나의 거대한 함수**
        - 여러 DOM 요소를 조작하는 함수가 단 하나뿐 → 로직을 복잡하게 만들기 쉬움
    - **동일한 작업을 수행하는 여러 방법**
        - 문자열을 통해 리스트 항목 생성
        - `todo count` 요소 : 기존 요소에 테스트를 추가하면 해결
        - 필터 : `classList` 관리

- 예제 