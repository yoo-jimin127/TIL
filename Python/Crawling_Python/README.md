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

    **오류 해결**
    - 데이터 파싱 중 
    ```
    Traceback (most recent call last):
    File "C:\Users\UserK\Documents\GitHub\Study-1\Python\Crawling_Python\codelion.py", line 9, in <module>
        file.write(response.text)
    UnicodeEncodeError: 'cp949' codec can't encode character '\xeb' in position 564: illegal multibyte sequence
    ```
    해당 오류 발생 [해결방법](https://ddolcat.tistory.com/749) ```file = open("daum.html", "w", encoding='utf-8')```
        - sol. 인코딩 방식을 file open시 추가, encoding='cp949'시 정상 처리 X -> encoding='utf-8' 정상 처리 O

- 실시간 검색어가 가지고 있는 속성 : ```<a>```태그이며 ```link_favorsch```의 클래스 내에 존재함

    **오류 해결**
    - ```https://www.daum.net/```을 url으로 크롤링한 결과 daum.html에 meta태그와 script태그만 크롤링됨
        - f12로 확인해보니 해당 페이지를 구성하는 태그가 그것뿐이었던 것. <br> 
        -> ```https://news.daum.net/```을 url으로 파싱하니 제대로 크롤링된 것 확인
    - ```AttributeError: 'NoneType' object has no attribute 'findAll'``` 
        - 해당 오류가 발생하는 이유는 크게 3가지의 경우
            1.http요청에 대한응답 결과가 없거나
            2.내용이 잘못되었거나
            3.요청이 잘못된 경우
        - ```soup.response.findAll("a")``` -> ```soup.findAll("a")``` 해결
            - 이미 응답 값이 bs4 모듈에 맞춰 soup에 저장되어있던 상태. 다시 response를 받으려니 꼬였던 것.

- ```from datetime import datetime``` 모듈의 기능을 통해 ```print(datetime.today())``` 오늘의 날짜 출력
    - ```datetime.today().strftime("%Y년 %m월 %d일의 뉴스입니다.\n")```의 형태로 날짜를 출력하는 부분 strftime() 사용하여 저장할 수 있음
- ```results = soup.findAll("a", "link_txt")``` : a 태그인 동시에 link_txt 클래스에 해당하는 것들을 가져옴
- ```result.get_text()``` get_text() 함수를 통해 html상 태그 그대로 출력되었던 것을 text 형식으로 바꾸어 출력할 수 있음

### 파일로 출력하기
- ```open(fimename, mode)``` 내장 함수 : ex) ```open("rankresult.txt", "w")```
    - r : read mode
    - w : write mode - 원래 파일의 내용을 최근 내용이 모두 덮어쓰게 됨
    - a : append mode - 기존 파일의 새로운 내용 덧붙임, 이어붙임
    - 모드 변경을 통해 파일의 내용을 새로고침할지 덮어쓰기할지 정할 수 있음
- ```search_rank_file.write(str(rank) + "번째 기사 : " + result.get_text() + "\n")``` : rank 변수는 순위를 저장하는 정수형이므로 문자열과 함께 사용 어려움
    - sol. str() 형변환 함수를 사용함으로써 + 연산으로 붙여넣기 할 수 있도록 함
    - **오류 해결** : rankresult.txt 파일에 저장된 한글이 깨지는 현상 -> 파일 오픈 시 encoding type 추가 : ```open("rankresult.txt", "w", encoding="utf-8")```
- 크롤링을 막아둔 사이트 ex) 네이버
    - ```headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36'}```
        - 로봇이 아님을 증명하여 ```request.get()```호출 시 url, headers=headers 로 param을 함께 넘겨줌
        