# 번역 프로그램

------

#### googletrans 
- 언어감지 : 해당 문장의 언어 감지
- 번역 : 특정 언어를 파악해 다른 언어로 변경
- ```from googletrans import Translator``` : googletrans 모듈의 Translator기능 사용

1. 번역기 만듦 : ```Translator()```
2. 언어 감지를 원하는 문장 설정 : sentence 생성
3. 언어 감지 : ```translator.detect(sentence)```
    - googletrans에서 제공해주는 detect() 함수 사용

**오류 해결**
- ```detected = translator.detect(sentence) # 언어 감지 뒤의 내용을 출력해주는 작업```의 코드 실행 결과
    ```AttributeError: 'NoneType' object has no attribute 'group'```오류 발생
- **sol.** ```pip install googletrans==4.0.0-rc1```으로 모듈 재설치하여 해결
    -[googletrans 모듈의 4.0.0 버전을 다운로드 참고 자료](https://pearlluck.tistory.com/372)
- ```Detected(lang=ko, confidence=None)```으로 detect 언어감지, 신뢰도 나옴

1. 번역기를 만듦
2. 번역을 원하는 문장을 설정함
3. 번역을 원하는 언어를 설정함
4. 번역
- ```Translator()``` : 번역기 생성
- ```translate(text, dest, src)``` : 번역 - text를 dest의 언어로 src(text의 언어)를
    - src는 생략 가능 (옵션에 해당)
    - dest에 해당하는 값은 각 국가의 키워드로 넣어줘야함 ex) ko, en

```
result = translator.translate(sentence, 'en')
print(result)
```
- ```Translated(src=ko, dest=en, text=Hi Code Ryan., pronunciation=None, extra_data="{'confiden...")```와 같은 결과가 나옴
    - 언어 감지를 한 뒤 출력해줌
    - pronunciation : 발음 (영어의 경우 별도 발음 필요 없으므로 None)