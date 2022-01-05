# python으로 메일 전송

------

### google 보안 수준 변경 및 google IMAP 사용
- google 보안 수준과 gmail의 IMAP를 변경해줌

### SMTP
- simple mail transfer protocol
- EMAIL SERVER to EMAIL SERVER : SMTP
- EMAIL SERVER to EMAIL CLIENT : IMAP
- EMAIL CLIENT to EMAIL SERVER : SMTP
- SMTP 서버를 이용해 우리가 원하는 곳으로 메일 보낼 수 있음

- SMTP도 주소를 가짐
- ex)
    - Address: smtp.gmail.com
    - Port: 465

- smtplib : 파이썬에 내장된 코드
1. SMTP 메일 서버를 연결
2. SMTP 메일 서버에 로그인
3. SMTP 메일 서버로 메일을 보냄

- ```smtplib.SMTP(SMTP_SERVER, SMTP_PORT)``` : 서버에 연결해주는 함수 SMTP(addr, port)
    - SMTP_PORT = 465 # gmail에서 지정한 smtp 포트 번호
    - 연결 정보를 리턴해줌
    - ssl을 포함하여 메일 서버에 연결해야함. 보안문제.
    - ```SMTP_SSL()```으로 변경해 사용 -> ```<smtplib.SMTP_SSL object at 0x0000018C798AFEE0>```

- SMTP 객체를 가지고 로그인 : ```smtp.login(EMAIL_ADDR, PASSWORD)```
- SMTP를 사용해 메일을 전송: ```smtp.send_message("CONTENT")```
- ```smtp.quit()``` : 서버와의 연결 끊어줌

### MIME
- 전자우편을 위한 인터넷 표준 포맷
- ```email.message``` 모듈의 ```.EmailMessage``` 기능을 사용
1. 이메일을 만듦 : ```message = EmailMessage()```
2. 이메일에 내용을 담음 : ```message.set_content("내용")```
3. 발신자, 수신자 설정 : MIME의 HEADER에 담음
    - 본문: header가 아닌 content에 해당하는 내용이기에 set_content()로 설정할 수 있음
    - header: subject, from, to의 내용이 담김
        ```
        message["Subject"] = "이것은 제목입니다."
        message["From"] = "###@gmail.com"
        message["TO"] = "###@gmail.com"
        ```

- ```smtp.send_message()```의 재료 - **smtp는 MIME 형식의 메시지만 읽을 수 있음**

### 메일에 사진 첨부
- 파일을 읽어올 때 ```open()``` 함수를 사용하였음. 이를 사용하여 사진을 읽어올 것임.
    - rb : read binary
    - wb : write binary
    - ab : append binary
```
image = open("codelion.png", "rb")
image.read()
```
- binary 형태로 출력됨
- close() 없이 file을 open하고 읽는 방법
```
with open("codelion.png", "rb") as image :
    image_file = image.read()
```

- ```add_attachment()``` : multipart/mixed 타입의 메일 (text가 아닌 다른 format의 데이터도 포함되어있는 경우)
    - cf) plain_attachment
    1. image 
    2. maintype : image, video ...
    3. subtype : png 등
    - ```message.add_attachment(image_file, maintype='image', subtype='png')```의 경우 항상 png로 저장되어야함
    - 이미지의 확장자가 변경되어도 알아서 확장자를 파악해 넣어줄 수 있도록 : ```import imghdr``` - 파이썬 내장 모듈
    ```
    image_type = imghdr.what('codelion', image_file)
    message.add_attachment(image_file, maintype='image', subtype=image_type)
    ```

### 유효성 검사하기
- 이메일을 보내고자 하는 주소가 정말 이메일 주소가 맞는지 확인 : **정규표현식**
- **정규표현식**
    - ```^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9]+/.[a-zA-Z]{2,3}$```
        - ^ : 정규표현식의 시작
        - $ : 정규표현식의 끝
        - ```[a-zA-Z0-9.+_-]``` : a부터 z까지, A부터 Z까지, 0부터 9까지,.,+,_,- 가 있음을 의미
        - ```+``` : 이메일의 앞에 있는 조건이 1회 이상 반복됨을 의미
        - ```@``` : 그 뒤에 @가 붙음
        - ```[a-zA-Z0-9]``` : a부터 z까지, A부터 Z까지, 0부터 9까지
        - ```+``` : 1회 이상 반복됨
        - ```\.``` : 원래의 .은 개행문자를 제외한 모든 문자를 의미하지만, ```\.```으로 사용함으로써 일반 문자로써의 점을 의미
        - ```[a-zA-Z]``` : a부터 z까지, A부터 Z까지
        - ```{2,3}``` : 앞의 조건이 최소 2회부터 최대 3번까지 반복됨

- ```import re``` : 정규표현식 검사 (regular expression)
```
reg = "^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$"
print(re.match(reg, "codelion.example@gmail.com"))       -> <re.Match object; span=(0, 26), match='codelion.example@gmail.com'>
print(re.match(reg, "codelionexamplegmailcom"))     -> None
```
- 이메일의 유효성을 체크한 뒤 유효할 경우 메일을 전송
