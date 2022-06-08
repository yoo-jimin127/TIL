### ✅ CSS in JS

#### styled-components 🎨
- Automatic critical CSS
- No class name bugs
- Easier deletion of CSS
- Simple dynamic styling
- Painless maintenance
- Automatic vendor prefixing

#### CSS in JS에서 마주하는 문제점(using React.js)
- Global Namespace : 글로벌 변수를 지양해야하는 JS와 대치
- Dependencies : css간의 의존 관리
- Dead Code Elimination : 사용하지 않는 css의 인지 어려움
- Minification : 클래스 이름 최소화
- Sharing Constants : JS의 코드와 값을 공유하고자 하는 경우
- Mon-deterministic Resolution : css 파일 로드 타이밍 이슈
- Isolation : 격리

### ✅ styled-components intallaion
`$ npm install --save styled-components`

### ✅ styled-components 사용하기
- **Adapting based on props** : props를 주어 다른 스타일 적용 가능
    ex)  
```js
background: ${props => props.primary ? "palevioletred" : "white"};
color: ${props => props.primary ? "white" : "palevioletred"};
```
```js
<Button>Normal</Button>
<Button primary>Primary</Button>
```

- **Extending Styles** : 스타일간의 상속 & 확장 가능
```js
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;
```
- 괄호를 사용해 스타일 컴포넌트를 주입해주면 기존의 스타일에서 확장해 사용 가능
```js
<Button as="a" href="#">Link with Button styles</Button>
<TomatoButton as="a" href="#">Link with Tomato Button styles</TomatoButton>
```
- `as="a"`를 통해 원하는 태그로 사용할 수 있음
    - `as={ReversedButton}`와 같이 커스텀한 컴포넌트도 as에 포함될 수 있음
    ```js
    const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />
    ```
    - props를 사용해 접근 가능

- **Attaching additional props**
    - overriding .attrs : 이미 주어진 props 조작 가능
        - `type: "text"`로 되어있는 요소를 `styled(스타일드컴포넌트).attrs`로 받아와 속성 조정 가능
    ```js
    const Input = styled.input.attrs(props => ({
      type: "text",
      size: props.size || "1em",
    }))`
      border: 2px solid palevioletred;
      margin: ${props => props.size};
      padding: ${props => props.size};
    `;

    // Input's attrs will be applied first, and then this attrs obj
    const PasswordInput = styled(Input).attrs({
      type: "password",
    })`
      // similarly, border will override Input's border
      border: 2px solid aqua;
    `;
    ```

- **Theme 사용**
    - `import styled, { ThemeProvider } from 'styled-components` : 테마 사용

### ✅ Caution
- 권장 작성법
```js
const StyledWrapper = styled.div`
  /* ... */
`;

const Wrapper = ({ message }) => {
  return <StyledWrapper>{message}</StyledWrapper>;
};
```

- 지양 작성법
```js
const Wrapper = ({ message }) => {
  // WARNING: THIS IS VERY VERY BAD AND SLOW, DO NOT DO THIS!!!
  const StyledWrapper = styled.div`
    /* ... */
  `;

  return <StyledWrapper>{message}</StyledWrapper>;
};
```

- **가상 셀렉터**
    - `&` : 자기 자신, `&:hover` - 자기 자신에 hover 상태를 취했을 때
      - `&:hover {color: red; // <Thing> when hovered}`

    - `& ~ &` : ~ 결합자는 형제, 즉 첫번째 요소를 뒤따르며 같은 부모를 공유하는 두번째 요소를 선택해 스타일 적용 (일반 형제 결합자)
        - `& ~ & {background: tomato; // <Thing> as a sibling of <Thing>, but maybe not directly next to it}`

    - `& + &` : 자기 자신의 바로 옆에 있는 요소에 해당 스타일 적용 (인접 형제 결합자)
        - `& + & {background: lime; // <Thing> next to <Thing>}`

    - `&.something` : 나 자신에서 something이라는 className을 가진 요소에 해당 스타일 적용
        - `&.something {background: orange; // <Thing> tagged with an additional CSS class ".something"}`

    - `.something-else &` : something-else라는 클래스명을 가진 태그 내부의 자신(&)에게 해당 스타일 적용
        - `.something-else & {border: 1px solid; // <Thing> inside another element labeled ".something-else"}`

- **GlobalStyle**
    ```js
    const GlobalStyle = createGlobalStyle`
        button {
            background-color: pink;
        }
    `;
    ```
    - `<GlobalStyle />`을 통해 전체적으로 공통된 스타일을 적용할 부분을 선택

### ✅ Styled-components
- Automatic critical CSS : 자동 style injects & 코드 스플릿
- No class name bugs : unique / overlap X / misspellings
- Easier deletion of CSS : tied to a specific component
- Simple dynamic styling : props / global theme
- Painless maintenance : styling affecting your component
- Automatic vendor prefixing : current standard only 

### ✅ Styled-components Summary
- CSS in JS : CSS의 문제점을 해소
- 해결책 : 스타일을 style 태그로 분리
- 사용법(Template literals) : styled.{element}``
- styled(스타일드컴포넌트) : 상속
- `&` : 가상 엘리먼트 / 가상 선택자
- Global Style : 전역 스타일
- attrs : props addition
- keyframes / ThemeProvider : Animation / Theme