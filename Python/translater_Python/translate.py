from googletrans import Translator

translator = Translator() #googletrans 내부의 번역기능을 사용할 수 있게 됨 (1. 번역기 생성)

sentence = "안녕하세요 코드라이언입니다."
detected = translator.detect(sentence) # 언어 감지 뒤의 내용을 출력해주는 작업

print(detected)