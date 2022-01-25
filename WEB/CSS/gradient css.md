## CSS 학습 220125

ex) Netflix loading page - 우측: 이미지, 좌측: black 그라데이션

**How to?**
- 모든 HTML의 `<body>` 태그에는 기본적으로 `margin: 8px`의 마진이 존재함
    - 이를 제거하여 원하는 배경 이미지를 화면에 채우기 위해 `body { margin : 0; }`을 사용하자
- section에 background img url을 주었는데 화면이 나타나지 않음?
    - sol. 해당 이미지를 얼마나 띄워야하는지 모른다. 즉 width 또는 height를 지정해주어 그 범위를 지정해주자.
        - px, vw, vh, em, rem ... (아래 설명)

- 해당 사이트의 구조 : 
https://assets.nflxext.com/ffe/siteui/vlv3/9737377e-a430-4d13-ad6c-874c54837c49/945eec79-6856-4d95-b4c6-83ff5292f33d/KR-ko-20220111-popsignuptwoweeks-perspective_alpha_website_large.jpg
- 위 이미지가 우 -> 좌의 방향으로 linear-gradient 되어있음

- 두가지의 섹션으로 나누어 생각해보자.
    - background img가 전체적인 body의 section을 차지 sol. `<section></section>`
    - 좌로부터 nn%의 비율로 black color linear gradient가 좌 -> 우의 방향으로 그라데이션 됨 `section:before` - section의 전에, 즉 section의 앞에, section의 윗 화면에
- 즉 배경 이미지 위에 그라데이션이 덧씌워지는 것이라 볼 수 있음

```
section:before {
    content: '';
    background: linear-gradient(to right, black, transparent);
    position: absolute;
    left: 0;
    height: 100%;
    width: 50%;
}
```
[linear-gradient 속성 및 옵션](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient())

### CSS 사이즈 단위
- `px` : 가장 기본적으로 사용되는 단위, 픽셀단위라는 고정 값에 따라 정해지므로 화면의 크기 및 확대와 같이 사용자가 임의로 정의할 수 없는 고정된 값
- `em` : 부모 요소를 기준으로 자식 요소의 크기를 정하는 단위 ex) 부모 요소 : 15px -> 자식 요소 1.5em : 15px * 1.5 
- `rem` : root em - em의 기준을 최상단(root) 기준으로 맞춤 -> 최상위 태그 html에 정의된 사이즈 기준
- `vh/vw` : vertical height, vertical width : 뷰포트(화면의 높이, 넓이)에 비례 -> 반응형 페이지에서 유용
    - 1vh : 실제 높이 값의 1/100
    - 눈에 보이는 디스플레이의 일정 비율 차지하도록 만들 수 있음 : 데스크탑 & 모바일에서 동시에 운영되는 사이트 제작 시 유용