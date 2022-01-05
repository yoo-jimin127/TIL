from googletrans import Translator

translator = Translator() #googletrans 내부의 번역기능을 사용할 수 있게 됨 (1. 번역기 생성)

# sentence = "안녕하세요 코드라이언입니다."
sentence = input("언어를 감지할 문장을 입력해주세요 : ")
lang = input("번역을 원하는 언어를 입력해주세요 : ")

# print(detected)
# print(detected.lang)

result = translator.translate(sentence, lang)
# print(result)
detected = translator.detect(sentence) # 언어 감지 뒤의 내용을 출력해주는 작업

print("==========출력결과==========")
print(detected.lang,":", sentence) #입력값의 언어, 문장
print(result.dest,":", result.text) #번역을 원했던 언어, 번역된 결과값