## chapter 3

------

### HTTP란? : HTTP 요청 / 응답의 형식
- OSI 7 계층 모델 
    - 응용 계층 : HTTP, SMTP, FTP 등 주고받을 데이터를 어떤 규칙을 가지고 작성하느냐 
    - 표현 계층 
    - 세션 계층 
    - 전송 계층 
    - 네트워크 계층 
    - 데이터 링크 계층 
    - 물리 계층

- TCP/IP 계층 모델 
    - 응용 계층 
    - 전송 계층 
    - 인터넷 계층 
    - 네트워크 접근 계층

- HTTP : HyperText Transfer Protocol (hypertext 통신 규약)
    - 응용 계층에 정의된 통신 규약
    - 서버와 클라이언트 간에 메시지를 전달하는 형식을 정의한 규약

- REST : REpresentational State Transfer (상태에 대한 표현을 전송하는 규약)
    - REST와 HTTP와는 다름
    
- HTTP 요청
```
GET /index.html HTTP 1.1    // Request Line : Method, Path, Version

HOST: www.example.com   // Request Headers : HTTP 요청에 대한 부수적인 데이터
Cache-Control: max-age=0    
Connection: Keep-Alive
Content-Length: 133
Accept-Language: en-us
                        // Request Body : HTTP 요청에 관한 실제 데이터

```
- HTTP 응답
```
HTTP /1.1 200 OK    // Status Line : 요청 처리에 대한 상태 표시줄
Cache-Control: max-age=604800   // Responce Headers: HTTP 응답에 대한 부수적인 데이터
Expires: Sun, 23 Jan 2022 05:05:42 GMT
Content-Tyoe: text/html
<HTML 문서>     // Response Body : 응답 데이터
```
- HTTP 요청과 응답의 형식 자체는 매우 비슷함.
- URL : Uniform Resource Locator : 인터넷 상의 자원의 위치를 나타내는 문자열

- Media Type : 인터넷 상에서 주고받는 데이터의 형식
- Content Type : HTTP의 응답 데이터의 Media Type을 알려주는 헤더

- JSON : Javascript Object Notation
    - 데이터를 주고 받을 때 흔히 사용되는 형태
    - 속성 - 값 형태와 배열을 활용함
(일반적인 데이터를 표현한 객체(VO)는 JSON 형태로 주고받음)
```json
{
    "name": "yoo-jimin",
    "age" : 23,
    "occupation": "developer",
    "projects": [
        "Likelion",
        "GDSC"
    ]
}
```

------

### Controller와 RestController
- Spring MVC 패턴
    - Model : 서비스 데이터 자체
    - View : 사용자가 확인하는 데이터의 표현
    - Controller : 사용자의 입출력을 다루는 부분

``
1. 외부 요청 발생
2. 요청 경로 확인을 위해 전달
3. Controller로 전달
4. Model 조작
5. 갱신된 데이터 전달
6. 응답 전달
7. 응답을 Client로 전송
    7-1. 데이터 전송 or
    7-2. 데이터를 포함한 View 제작
8. 사용자에게 View 제공
``
