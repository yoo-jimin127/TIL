import smtplib
from email.message import EmailMessage
import imghdr
import re

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465 # gmail에서 지정한 smtp 포트 번호

def sendEmail(addr) :
    # 정규표현식
    reg = "^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$"
    if bool(re.match(reg, addr)): # 정규표현식에 이메일이 부합하는 경우
        smtp.send_message(message)
        print("정상적으로 메일이 발송되었습니다.")
    else : # 정규표현식에 이메일이 부합하지 않는 경우
        print("유효한 이메일 주소가 아닙니다.")


message = EmailMessage()  # email message를 사용하는 message 변수
message.set_content("코드라이언 수업중입니다.")

message["Subject"] = "이것은 제목입니다."
message["From"] = "dbwlals9936@gmail.com"
message["TO"] = "dbwlals9936@gmail.com"

# image = open("codelion.png", "rb")
# image.read()

with open("codelion.png", "rb") as image :
    image_file = image.read()

image_type = imghdr.what('codelion', image_file)
# print(image_type)
message.add_attachment(image_file, maintype='image', subtype=image_type)


smtp = smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) 
smtp.login("dbwlals9936@gmail.com", "########")
sendEmail("dbwlals9936@gmail.com")
smtp.quit()



