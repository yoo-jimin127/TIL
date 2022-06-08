### ✅ SASS
- CSS in JS : emotion & styled-components
- Preprocessing : SASS - CSS를 생성해주는 프로그램 (CSS 전처리기)

- SASS : CSS 확장하는 전처리기
  - Nesting / Mixins / Inheritance ...

- 설치 : `$ npm install sass`

- **SCSS와 SASS**
  - SCSS
```scss
  SCSS SYNTAX
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```
  - SASS
```scss
  SASS SYNTAX
  $font-stack: Helvetica, sans-serif
  $primary-color: #333

  body
    font: 100% $font-stack
    color: $primary-color
```
위 코드 실행 결과로 css 파일이 생성됨  
```css
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

### ✅ Nesting in SASS
- CSS에서의 nesting
```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```
- SASS에서의 nesting
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

### ✅ Module SASS
<p align="center"><img src="https://user-images.githubusercontent.com/66112716/172513574-ceb85226-4afe-4997-a76d-2614ef93e472.png"><p>

- foundation 폴더 내부 scss 파일을 모듈화시켜둔 뒤,  
Example.scss에서 `@use 'foundation/base';`와 같이 불러와 사용하는 방법  
- 하나의 scss 파일만 연결해도 내부 모듈을 그대로 불러 사용할 수 있는 효과

```scss
.inverse {
    background-color: base.$primary-color;
    color: white;
}
```
- 모듈의 값을 가져와 사용할 수 있음 (확장성 ↑)

### ✅ Mixins SASS
```scss
SCSS SYNTAX
@mixin theme($theme: DarkGray) {
  background: $theme;
  box-shadow: 0 0 1px rgba($theme, .25);
  color: #fff;
}

.info {
  @include theme;
}
.alert {
  @include theme($theme: DarkRed);
}
.success {
  @include theme($theme: DarkGreen);
}
```
- `@mixin`과 `@include` 사용을 통해 반복적인 스타일링 중첩을 방지할 수 있음

### ✅ Extends & Inheritance
```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}

// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}

.message {
  @extend %message-shared;
}

.success {
  @extend %message-shared;
  border-color: green;
}

.error {
  @extend %message-shared;
  border-color: red;
}

.warning {
  @extend %message-shared;
  border-color: yellow;
}
```
- `%` 사용으로 상속할 스타일 템플릿 생성, `@extend`로 상속받아 사용할 스타일을 명시해줄 수 있음

### ✅ Syntax in SASS
- `@if` controls whether or not a block is evaluated.
- `@each` evaluates a block for each element in a list or each pair in a map.
- `@for` evaluates a block a certain number of times.
- `@while` evaluates a block until a certain condition is met.
```scss
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```

### ✅ `@function` in SASS
```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
``` 
- `@function` , `@return` 사용을 통해 스타일 요소를 함수로 접근할 수 있음
- css - 공통적으로 스타일을 적용해주는 방법 : 전역적 또는 반복적인 선언

### ✅ Error in SASS
```scss
@mixin reflexive-position($property, $value) {
  @if $property != left and $property != right {
    @error "Property #{$property} must be either left or right.";
  }

  $left-value: if($property == right, initial, $value);
  $right-value: if($property == right, $value, initial);

  left: $left-value;
  right: $right-value;
  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include reflexive-position(top, 12px);
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Error: Property top must be either left or right.
}
```
- css에서도 `@error` 사용을 통해 css 상에서 발생하는 에러를 띄워줄 수 있음

### ✅ Interpolation in SASS
```scss
@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.gray {
  @include prefix(filter, grayscale(50%), moz webkit);
}
```
- 동적으로 속성 생성 가능, vendor prefix 기능 사용 가능
```scss
@mixin inline-animation($duration) {
  $name: inline-#{unique-id()};

  @keyframes #{$name} {
    @content;
  }

  animation-name: $name;
  animation-duration: $duration;
  animation-iteration-count: infinite;
}

.pulse {
  @include inline-animation(2s) {
    from { background-color: yellow }
    to { background-color: red }
  }
}
```
- duration 주입을 통해 애니메이션을 넣는 효과 (다양한 처리 가능)
- `#{}`을 통해 값 주입 

### ✅ SASS Summary
- Variables : `$abc: ###;` / `$abc`
- Nesting : `a { b { c {} } }`
- Modules : `_abc.scss` / `@use 'abc';` `abc.###`
- Mixins : `@mixin abc($type: x) {}` / `@include abc;` `@include abc(z);`
- Extend/Inheritance: `%abc{}` / `@extend %abc`
- Operators: `+` `-` `*` `/` `%` ...

- 전처리기 : css의 확장
- Sass / Scss : css와 보다 유사한 SCSS
- syntax : 언어와 같이 자체 syntax 있음
- interpolation : `#{}` 값 주입 (마치 `${}`)
- values / functions : 프로그래밍 언어와 같은 문법