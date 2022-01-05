total_dictionary = {}

while True :
    question = input("질문을 입력해주세요 : ")
    if question == "q":
        break
    else :
        total_dictionary[question] = ""

for x in total_dictionary:
    print(x)
    answer = input("답변을 입력해주세요 : ")
    total_dictionary[x] = answer