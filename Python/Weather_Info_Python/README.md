# 날씨 정보 받아오기

------

### API
- API : Application Programming Interface
- API 링크 만들기
    - API call : 문자열 안에 변수 집어넣기 - ```f-string``` : 파이썬에 f-string을 사용할 경우 문자열 안에 원하는 변수 넣을 수 있음
        - ```api = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={apikey}"```
        - 변수 사용을 원할 경우 중괄호{} 사용
        - 해당 링크는 API 요청을 보낼 API 서버 url
        - ? 뒤의 정보 : API 제공을 위해 필요한 값들
- 원하는 결과값을 text형태로 받기 위해서는 ```result = requests.get(api)``` 이후 ```result.text``` 처리 해주기
- ```print(type(result.text))``` : type은 str값을 가짐
    - json 모듈을 사용하여 이를 분류해 저장함
- json : javascript object notation - 문자 기반의 데이터 포맷 (데이터를 주고 받을 때 사용하는 포맷)
    - ```data = json.loads(result.text)``` : json 타입으로 변환하는 과정
```
print(type(result.text))    -> str
print(type(data))    -> dictionary
```