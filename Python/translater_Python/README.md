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