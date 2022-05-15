# 리액트 학습 필기안 Chapter 2
---

### CRA
- Node : 로컬에서 리액트 앱이 돌아갈 수 있도록 해주는 환경
    - npm(node package manager)도 자동으로 설치됨
    - npm이 설치되면 npx(node package runner)도 자동으로 설치됨

### JSX
- JSX : 리액트 앨리먼트를 생성하는 문법, javascript의 확장 문법
- **camelCase**를 사용해 JSX 사용
    - props는 camelCase를 사용할 것
- 태그는 자식을 포함할 수 있음
- Babel은 JSX를 `React.createElement()` 형식으로 불러옴

### Props
- component와 props
- 자신의 출력에 다른 컴포넌트를 참조할 수 있음

- 컴포넌트의 합성 : 여러개를 하나의 컴포넌트에 넣는 것
- 컴포넌트의 추출 : 유의미한 값들로 추출해 새로운 컴포넌트를 만드는 것(재사용성을 높이기 위한 방법 중 하나)

- props : 컴포넌트에 전달되는 단일 객체
- 순수함수처럼 동작 : props 자체를 수정해서는 안됨
- 컴포넌트 합성 : 여러 컴포넌트를 모음
- 컴포넌트 추출 : 여러 고셍서 사용되거나 복잡한 경우

### State와 Life cycle
- 컴포넌트 내의 상태 : 자신의 출력 값을 변경
- Class Component : State LifeCycle
- Functional Component : 훅으로 관리
- 유의사항 : 직접 수정 X, 비동기적일 수 있음

### 컴포넌트 생명주기
- `render()` : React.Component의 하위 class에서 반드시 정의해야 하는 메서드
- 컴포넌트 생명주기
    1. 마운트
        - `Constructor()`
        - `render()`
        - `componentDidMount()`

    2. 업데이트
        - `render()`
        - `componentDidUpdate()`

    3. 마운트 해제
        - `componentWillUnmount()`

- **state에 props를 복사해서는 안됨**
- constructor : state 초기화 및 메서드 바인딩
- componentDidMount : DOM 노드 초기화 및 데이터 fetch
- componentWillUnmount : 타이머 제거 및 요청 취소 및 구독 해제
- Functional Component : hook으로 대부분 구현 가능

### 이벤트
 - 합성 이벤트 : 인터페이스는 같지만 직접 대응되지 않음
 - Bubble / Capture : Capture > target > Bubble
 - return false : `e.preventDefault()` 해줘야 함

### 조건부 렌더링
- if : `if(condition){return A} else {return B}`
- && : `condition && A, falsy 주의`
- 삼항연산자 : `condition ? A : B`
- 아예 안그리고 싶은 경우 : `return null;`

### List
- map : 배열의 개별 요소를 순회
- default key : 안주면 react는 index를 사용함 (warning O)
- 고유성 : 형제 사이에서만 고유하면 됨
- key oprops : key는 props로 넘어가지 않음

### Form
- HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가짐, 따라서 React의 다른 DOM 엘리먼트와 다르게 동작
- Controlled component : input의 value를 state로 관리
- 다중 입력 : event.target.value
- Uncontrolled Component : form element 자체의 내부 상태 활용
- defaultValue, ref : 기본값 / value 확인