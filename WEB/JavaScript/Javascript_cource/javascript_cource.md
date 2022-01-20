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

- 문자와 문자를 더할떄는 ```alert("coding"+" everybody");```, 결과 : coding everybody
- 문자의 길이를 구할때는 문자 뒤에 .length 를 붙여 ```alert("coding everybody".length);```, 결과 : 16
- 연산을 진행할 때 숫자 + 숫자와 문자 + 문자의 결과가 다름을 인지
- ```STR.indexOf(searchValue[,startIndex])``` : 해당 문자열이 있는지 확인하기 위한 작업

### 변수
- ````var a = 1```에서 var을 지울 수 있음 -> 하지만 왜 삭제하는 것인지 인지하고 지울 것


### 비교
- 연산자 : 값에 대해 작업을 컴퓨터에게 지시하기 위한 기호
- ```==``` : equal operator - 데이터가 같으면 true
- ```===``` : strict equal operator - 데이터와 데이터형 모두 같아야  true
```
alert(1==2)             //false
alert(1==1)             //true
alert("one"=="two")     //false 
alert("one"=="one")     //true

alert(1=='1');              //true
alert(1==='1');             //false
```
[== 와 ===](https://dorey.github.io/JavaScript-Equality-Table/)
```
alert(null == undefined);       //true
alert(null === undefined);      //false
alert(true == 1);               //true
alert(true === 1);              //false
alert(true == '1');             //true
alert(true === '1');            //false
 
alert(0 === -0);                //true          // 0의 양수, 음수 값 존재 X -> true 리턴
alert(NaN === NaN);             //false         // 계산할 수 없는 값이기에 false 리턴
```
- 부정을 의미하는 '!' -> ```alert("one"!="two");    //true``` 