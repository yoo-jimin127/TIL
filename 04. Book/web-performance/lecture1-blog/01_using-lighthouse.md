# 프론트엔드 성능 최적화 가이드

## 1. 블로그 서비스 최적화

### 이미지 사이즈 최적화

서비스에 적절한 이미지 사이즈 선정

### 코드 분할

- 코드 분할 기법
- SPA 특성 상 모든 리액트 코드가 하나의 JS 파일로 번들링되어 로드됨
    
    → 첫 페이지 진입 시 당장 사용하지 않는 코드가 다소 포함되어 있음
    
    → 코드 분할 : 당장은 필요 없는 코드를 떼어내고, 해당 코드를 필요한 시점에 따로 로드
    

### 텍스트 압축

- HTML, CSS, JS → 다운로드 전에 서버에서 미리 압축 가능
- 원래 사이즈보다 더 작은 사이즈로 다운 O → 웹 페이지 로드 속도 ⬆️

### 병목 코드 최적화

- 특정 JS코드 때문에 서비스가 너무 느리게 다운로드/실행 되는 경우
    
    → 서비스를 느리게 만드는 코드 : 병목코드
    

### 성능 분석 툴

1. 크롬 개발자 도구
2. 크롬 개발자 도구 - Network 패널
    - 모든 네트워크 트래픽 상세히 알려줌
3. 크롬 개발자 도구 - Performance 패널
    - Performance 패널 : 웹 페이지 로드 시 실행되는 모든 작업 보여줌
    - Network 패널에서의 리소스가 로드되는 타이밍 + 브라우저의 메인 스레드에서 실행되는 JS를 차트 형태로 확인 O
    - 어떤 JS 코드가 느린지 확인 가능
4. 크롬 개발자 도구 - Lighthouse 패널
    - 웹 사이트 점수의 성능 점수 측정, 개선 가이드 확인 가능
5. webpack-bundle-analyzer
    - webpack을 통해 번들링된 파일이 어떤 코드, 라이브러리를 담고 있는지 보여줌
    - 불필요한 코드가 어떤 것인지
    - 번들 파일에서 어느 정도의 비중 차지하고 있는지 확인 가능

### 코드 분석

```js
function Article(props) {
  const createdTime = new Date(props.createdTime)
  return (
    <div className={'Article'}>
      <div className={'Article__summary'}>
        <div className={'Article__summary__title'}>{props.title}</div>
        <div className={'Article__summary__desc'}>{removeSpecialCharacter(props.content)}</div>
        <div className={'Article__summary__etc'}>
          {createdTime.getFullYear() +
            '.' +
            zeroPad(createdTime.getMonth() + 1, 2) +
            '.' +
            zeroPad(createdTime.getDate(), 2)}
        </div>
      </div>
      <div className={'Article__thumbnail'}>
        <img src={props.image + getParametersForUnsplash({width: 1200, height: 1200, quality: 80, format: 'jpg'})} alt="thumbnail" />
      </div>
    </div>
  )
}
```

목록 페이지에서 블로그 글 나열 시 하나의 블로그 글 렌더링하는 컴포넌트 

- `removeSpecialCharacter` : 매개변수로 넘어온 문자열에서 일부 특수 문자 제거하는 함수
- `getParametersForUnsplash` : Unsplash 이미지 사이트에서 이미지 가져오는 데 필요한 옵션 설정 함수

```jsx
function ViewPage(props) {
  const { id } = useParams()
  const [article, setArticle] = useState(false)

  // 게시글 가져오기
  const getArticle = useCallback(id => {
    axios.get('http://localhost:3001/articles/' + id).then(success => {
      setArticle(success.data)
    })
  }, [])

  useEffect(() => {
    getArticle(id)
  }, [getArticle, id])

  return article ? (
    <BasicTemplates>
      <div className={'ViewPage'}>
        <h1 className={'ViewPage__title'}>{article.title}</h1>
        <img className={'ViewPage__image'} src={article.image} alt="thumnail" />
        <div className={'ViewPage__content'}>
          <ReactMarkdown source={article.content} renderers={{ code: CodeBlock }} />
        </div>
      </div>
    </BasicTemplates>
  ) : (
    <h1>loading...</h1>
  )
}
```

- React-Markdown : 마크다운 포맷의 문자열을 마크다운 스타일에 맞게 렌더링

### Lighthouse 툴 이용한 페이지 검사

- Mode
    - Navigation : Lighthouse 기본값 → 초기 페이지 로딩 시 발생하는 성능 문제 분석
    - Timespan : 사용자가 정의한 시간 동안 발생한 성능 문제 분석
    - Snapshot : 현재 상태의 성능 문제 분석
- Categories
    - Performance : 웹 페이지의 로딩 과정에서 발생하는 성능 문제 분석
    - Accessibility : 서비스의 사용자 접근성 문제 분석
    - Best practices : 웹 사이트의 보안 측면과 웹 개발의 최신 표준에 중점을 두고 분석
    - SEO : 검색 엔진에서 얼마나 잘 크롤링되고 검색 결과에 표시되는지 분석
    - Progressive Web App : 서비스 워커와 오프라인 동작 등 PWA와 관련된 문제 분석

- Performance : Lighthouse가 측정안 이 웹페이지의 종합 성능 점수
    
    → 여섯가지 지표에 가중치 적용해 평균 낸 점수 : `Web Vitals`
    
- First Contentful Paint (FCP)
    - 페이지가 로드될 때 브라우저가 DOM 콘텐츠의 첫번째 부분 렌더링하는 데 걸리는 시간
    - FCP : 총점 계산 시 10%의 가중치

- Time to Interactive (TTI)
    - 사용자가 페이지와 상호 작용이 가능한 시점까지 걸리는 시간
        - 상호작용 : 클릭 또는 키보드 누름 같은 사용자 입력
        - 이 시점 전까지는 화면이 보여도 클릭 같은 입력이 동작하지 않음
    - TTI : 총점 계산 시 10%의 가중치

- Speed Index (SI)
    - 페이지 로드 중 콘텐츠가 시각적으로 표시되는 속도 나타내는 지표
    - SI : 총점 계산 시 10%의 가중치

- Total Blocking Time (TBT)
    - 페이지가 클릭, 키보드 입력 등의 사용자 입력에 응답하지 않도록 차단된 시간을 총합한 지표
    - 측정 : FCP와 TTI 사이의 시간 동안 일어남
        - 메인 스레드 독점해 다른 동작 방해하는 작업에 걸린 시간 총합
    - TBT : 총점 계산 시 30%의 가중치

- Largest Contentful Paint (LCP)
    - 페이지가 로드될 때 화면 내에 있는 가장 큰 이미지나 텍스트 요소가 렌더링되기까지 걸리는 시간
    - LCP : 총점 계산 시 25%의 가중치

- Cumulative Layout Shift (CLS)
    - 페이지 로드 과정에서 발생하는 예기치 못한 레이아웃 이동을 측정한 지표
    - 레이아웃 이동 : 화면상에서 요소의 위치, 크기가 순간적으로 변하는 현상
    - CLS : 총점 계산 시 15%의 가중치

- 웹 페이지의 문제점과 해결 방안, 문제를 해결함으로써 얻을 수 있는 이점
    - Opportunities : 페이지를 더 빨리 로드하는 데 잠재적으로 도움되는 제안 나열
    - Diagnostics : 로드 속도와 직접적 관계는 없으나, 성능과 관련된 기타 정보

- Emulated Desktop
    - CPU throttling : CPU 성능을 어느 정도 제한해 검사 진행했는지 나타냄
    - 1x : CPU 성능에 제한을 두지 않고 검사
        - Device : Mobile로 설정할 경우 : 4x
    
- Custom Throttling
    - Network throttling : 네트워크 속도 제한해 어느정도 고정된 네트워크 환경에서 성능을 측정함을 의미

→ Emulated Desktop, Custom Throttling으로 인해 Lighthouse 없이 페이지 로드하는 속도보다 Lighthouse 이용해 측정 시 페이지 로드 속도가 느림

→ Device : Mobile - 데스크톱보다 느리기에 더욱 제한
