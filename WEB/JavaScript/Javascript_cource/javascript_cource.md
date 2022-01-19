# 인프런 javascript

------

### 숫자와 문자
```
    Math.pow(3,2);
    9
    Math.round(10.6);
    11
    Math.ceil(10.2);
    11
    Math.floor(10.2);
    10
    Math.sqrt(9);
    3
    Math.random();
    0.5146421035654631
```

- ```alert('egoing\'s coding everyday');``` : escape (따옴표를 문자열에 추가해주기 위해 \ 사용 )
- ```typeof 1 -> "number"``` : 숫자 , ```typeof "1" -> "string"``` : 문자열

문자와 문자를 더할떄는 ```alert("coding"+" everybody");```, 결과 : coding everybody
문자의 길이를 구할때는 문자 뒤에 .length 를 붙여 ```alert("coding everybody".length);```, 결과 : 16