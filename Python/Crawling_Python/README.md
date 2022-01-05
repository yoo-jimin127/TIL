# 코드라이언 - 파이썬 심화 과정

------

### 크롤링
- crawler가 정보를 긁어와 제공

### 블록 조립 키트
- ```pip install requests```모듈을 사용하여 코드 작성
- ```construct_machine(brown_block, green_block)``` : 해당 함수가 어떤 것을 사용해야 하는지
- 모듈: 함수들을 모아놓은 파일
- ```requests```모듈
    - requests 모듈에서
    - get 함수를 꺼내 (get 함수: 응답값을 반환 - ```return 응답 값```)
    - 요청을 보내줌
- import를 사용해 requests 모듈을 사용함
- ```requests.get(url)``` 자체로 사용 : **요청을 보내는 기능**
- put, get, post, delete의 기능도 요청을 보내는 기능을 하나, requests의 경우 get을 사용
- 요청 & 응답 : client (요청을 하는 존재) & server (응답을 하는 존재)

- get 함수 : ```requests.get(url, param=None, **kwargs)```의 방식으로 사용할 수 있음
    - return value : ```requests.response```
- ```<Response [200]>``` : 성공적으로 응답이 온 상황
- ```print(response.text)``` : response 안의 text를 html 형식으로 받아 출력함
    - response : request 안의 응답값을 채워줌

### BeautifulSoup
- bs4 모듈의 기능 ```from bs4 import BeautifulSoup```
- ```print(BeautifulSoup(response.text, 'html.parser'))```와 ```print(response.text)```의 값이 같아보이나 다름
    - 각 값의 type을 찍어보면 
    ``` <class 'str'>
        <class 'bs4.BeautifulSoup'>
    ```
    으로 나옴
    - ```BeautifulSoup(response.text, 'html.parser')```은 문자열 type이었던 response.text를 다른 형식으로 변환해준 것(BeautifulSoup 의 형식에 맞추어 저장한 것)

- ```BeautifulSoup (데이터, 파싱방법)``` : 데이터를 어떠한 형식으로 가져올 것인지
    - 데이터: html, xml이 올 수 있음 (ex> response.text)
    - 파싱: 문서 or 데이터를 유의미하게 가공하는 과정 - parser (파이썬 기본 내장 : html.parser)
    ```BeautifulSoup(response.text, 'html.parser')```
    - 모든 span 태그를 찾아 출력하는 부분 : findAll을 사용함 ```print(soup.findAll('span'))```