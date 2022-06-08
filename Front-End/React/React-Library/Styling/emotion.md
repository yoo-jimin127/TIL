### ✅ Emotion
- 설치 방법 : `$ npm i @emotion/styled @emotion/react`

### ✅ Emotion 기능 살펴보기
```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const color = 'white'

export default function EmotionExample() {
    return (
        <div
        css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}
    >
      Hover to change color.
    </div>
    )
};
```
- css props를 전달해 emotion.js가 동작할 수 있도록 함
- `import styled from '@emotion/styled'` 사용을 통해 styled-components도 사용 가능

```jsx
const P = props => (
  <p
    css={{
      margin: 0,
      fontSize: 12,
      lineHeight: '1.5',
      fontFamily: 'Sans-Serif',
      color: 'black'
    }}
    {...props} // <- props contains the `className` prop
  />
)

const ArticleText = props => (
  <P
    css={{
      fontSize: 14,
      fontFamily: 'Georgia, serif',
      color: 'darkgray'
    }}
    {...props} // <- props contains the `className` prop
  />
)
```
- P를 덮어쓴 ArticleText에서는 ArticleText에서 정의한 스타일 요소가 덮어씌워짐
  - 나중에 추가한 style만 남을 수 있도록
- Composition 사용을 통해 확장 가능

- `FallBacks`를 주어 문제가 발생하였을 때 보여줄 기본 값을 나타냄

### ✅ Emotion Summary
- 리액트용 : `@emotion/react` 
- CRA : `/**@jsxImportSource @emotion/react */`
- css props : like style props
  - Object Styles: `css={{ fontSize: 12 }}`
  - String Styles: ``css={css`font-size: 12px`}``
- auto vendor-prefix / nested selectors / media queries
- SSR with zero configuration
- Styled Components
  - styled-components와 유사 + @ 기능 제공
- Composing Dynamic styles
- as props : `as a`로 사용할 경우 a 태그로써 작동
- Nesting Components

- react에 특화 : `@emotion/react`
- css props : jsx 대체
- styled components : styled-components + @
- composition : css 내부에서 css 사용

#### Nested Selector
- `&` 사용을 통해 명시적인 처리 가능 

#### Media Queries
```jsx
  <p
    css={css`
      font-size: 30px;
      @media (min-width: 420px) {
        font-size: 50px;
      }
    `}
  >
    Some text!
  </p>
```
- css prop을 사용해 미디어쿼리 적용 가능

#### Global Styling
```jsx
import { Global, css } from '@emotion/react'

render(
  <div>
    <Global
      styles={css`
        .some-class {
          color: hotpink !important;
        }
      `}
    />
    <Global
      styles={{
        '.some-class': {
          fontSize: 50,
          textAlign: 'center'
        }
      }}
    />
    <div className="some-class">This is hotpink now!</div>
  </div>
)
```
- global에는 `css`가 아닌 `styles` prop을 사용해주어야 함
- 별도의 createElement 없이 `{Global}` import

#### Keyframes
- `import { css, keyframes } from '@emotion/react'` - keyframes import 필요
```jsx
const bounce = keyframes`
from, 20%, 53%, 80%, to {
  transform: translate3d(0,0,0);
}
40%, 43% {
  transform: translate3d(0, -30px, 0);
}
70% {
  transform: translate3d(0, -15px, 0);
}
90% {
  transform: translate3d(0,-4px,0);
}
`
```
keyframes 지정 후  
```jsx
<div
  css={css`animation: ${bounce} 1s ease infinite;`}
>
  some bouncing text!
</div>
```
- anination 내부에 넣어주는 방식

#### Class Names
- `import { ClassNames } from '@emotion/react'` : ClassName import
```jsx
import { ClassNames } from '@emotion/react'

// this might be a component from npm that accepts a wrapperClassName prop
let SomeComponent = props => (
  <div className={props.wrapperClassName}>
    in the wrapper!
    <div className={props.className}>{props.children}</div>
  </div>
)

render(
  <ClassNames>
    {({ css, cx }) => (
      <SomeComponent
        wrapperClassName={css({ color: 'green' })}
        className={css`
          color: hotpink;
        `}
      >
        from children!!
      </SomeComponent>
    )}
  </ClassNames>
)
```
- className을 prop으로 전달받아 적용되는 클래스명에 따라 스타일 적용 가능