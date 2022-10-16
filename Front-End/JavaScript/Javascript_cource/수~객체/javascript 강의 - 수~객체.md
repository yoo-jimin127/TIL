# 인프런 javascript

------

### 숫자와 문자
```javascript
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
- ```var a = 1```에서 var을 지울 수 있음 -> 하지만 왜 삭제하는 것인지 인지하고 지울 것


### 비교
- 연산자 : 값에 대해 작업을 컴퓨터에게 지시하기 위한 기호
- ```==``` : equal operator - 데이터가 같으면 true
- ```===``` : strict equal operator - 데이터와 데이터형 모두 같아야  true
```javascript
alert(1==2)             //false
alert(1==1)             //true
alert("one"=="two")     //false 
alert("one"=="one")     //true

alert(1=='1');              //true
alert(1==='1');             //false
```
[== 와 ===](https://dorey.github.io/JavaScript-Equality-Table/)
```javascript
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

### 조건문
- ```prompt('프롬프트 창에 넣고자 하는 내용');``` : 입력을 받을 수 있는 창이 뜨게 됨
- ```alert(prompt('프롬프트 창에 넣고자 하는 내용'));``` : 입력으로 받은 값이 창에 뜸
- 논리 연산자
    - ```&&``` : AND 논리 연산
    - ```||``` : OR 논리 연산
- false로 간주하는 데이터형
    - ```if (!'')``` : 빈 문자열
    - ```if (!undefined)``` : undefined
    - ```if (!a)``` : 값이 할당되지 않은 변수
    - ```if (!null)``` : null
    - ```if (!NaN)``` : NaN

#### 반복문
- ```document.write("Coding Everybody <br />");```
- while문 : 변수의 선언, while문, 변수의 갱신 -> 3 과정의 시간이 소요될 뿐더러 번거로움
- for문 : 초기화, 반복 조건, 갱신 -> 1 문장으로 간결한 작성 가능
- 반복문의 제어 : break, continue를 사용하여 반복문 제어 가능
    - ```break``` : 반복문의 종료
    - ```continue``` : 그 순간에만 반복을 종료시키고 다시 반복

### 함수
- 하나의 로직을 재실행할 수 있도록 하는 것으로 코드의 재사용성을 높여줌
```javascript
function 함수명([인자...[,인자]]) {
    코드내용
    return 반환값
}
```
- 함수 : 재활용성, 유지보수, 가독성의 장점
- 출력 : 여러 개의 return 이 있더라도, 최초의 return 값을 리턴한 뒤 함수 호출이 종료됨
- ex) ```function func1() { return 1; return 2; return 3; return 4;}    // 1 ```

- 함수의 정의 부분을 변수에 넣을 수 있음
```javascript
var numbering = function (){
    i = 0;
    while(i < 10){
        document.write(i);
        i += 1;
    }   
}
numbering();
```
- 익명함수 생성
```javascript
(function () {
    i = 0;
    while(i < 10) {
        document.write(i);
        i+=1;
    }
})();
```

### 배열
- 연관되어있는 데이터를 모아 통으로 관리하기 위해 사용하는 데이터 타입
- 가변적으로 계속 바뀌어 배열의 원소에 접근하도록 하고자 할 때
    ```javascript
    for (var i = 0; i < members.length; i++) {
        document.write(members[i].toUpperCase() + "<br />");
    }
    ```
    - .length를 통해 배열의 크기를 알아내 조작할 것

**<배열 조작>**
- 배열의 끝지점에 원소 추가 : ```li.push('f');``` - 배열의 맨 끝 원소로 push() 내부의 요소가 추가됨
- 배열을 합쳐 하나의 배열로 만들기 ex) ```var li = ['a','b','c']; li.concat(['d','e'])``` -> ```li      //['a','b','c','d','e']```
- 배열의 시작지점에 원소 추가 : ```li.unshift('z');```
- 배열의 특정 구간을 추출하거나, 특정 구간에 특정 배열 추가 : ```li.splice(1, 0, 'd');      // 1번째 인덱스로부터 0개 앞의 데이터까지의 내용을 뒤의 내용으로 채움```
    - ```arr.splice(startIndex, howmany, element1, element2, ...)``` : startIndex, howmany 필수
    - 값을 삭제하는 작업 + 삭제한 값을 리턴하는 작업 [splice docs](https://opentutorials.org/course/50/110)
- 배열의 첫번째 원소 제거 : ```li.shift();``` - return된 값을 제거
- 배열의 가장 마지막 원소 제거 : ```li.pop();``` - return된 값을 제거
- 배열의 요소를 정렬 : ```li.sort();``` - original data가 사전순으로 정렬
- 배열의 요소를 역순으로 정렬 : ```li.reverse();```
- [다양한 기준으로 배열을 정렬하는 방법](https://opentutorials.org/course/50/109)

### 객체
- 인덱스로 문자를 사용하고 싶은 경우 사용하는 배열 (배열: 식별자 == 숫자)
- ex 1) ```var grades = {'egoing' : 10, 'k8805' : 6, 'sorialgi' : 80};``` : 중괄호로 감싸 문자를 식별자로 값을 저장함
- ex 2)
    ```javascript
    var grades = {};
    grades['egoing'] : 10;
    grades['k8805'] : 6;
    grades['sorialgi'] : 80;
    ```
- ex 3) 
    ```javascript
    var grades = new Object();
    grades['egoing'] : 10;
    grades['k8805'] : 6;
    grades['sorialgi'] : 80;
    ```
- ```grades['k8805']``` == ```grades['k88' + '05']``` == ```grades.k8805``` != ```grades.'k88' + '05'```

- 배열의 각 요소들은 순서를 가지고 있음
```javascript
var grades = {'egoing': 10, 'k8805': 6, 'sorialgi': 80};
for(key in grades) {
    document.write("<li>key : "+key+" value : "+grades[key]+"</li>");
}
```
- 배열의 값에서도 위와 같은 방법으로 접근 가능 (for in문)
```javascript
for (var name in arr) {
    console.log(arr[name]);
}
```
- , 를 통해 여러개의 값을 출력할 수 있게 됨, 하나의 객체 안에 data로 list와 function을 가지고 있음 **객체 지향 프로그래밍**
```javascript
var grades = {
    'list': {'egoing': 10, 'k8805': 6, 'sorialgi': 80},
    'show' : function(){
        for(var name in this.list){
            document.write(name+':'+this.list[name]+"<br />");
        }
    }
};
grades.show();
```
