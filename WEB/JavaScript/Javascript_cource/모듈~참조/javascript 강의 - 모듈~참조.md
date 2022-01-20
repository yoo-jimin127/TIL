# 인프런 javascript 

------

### 모듈
- 코드의 재활용성을 높이고, 유지보수를 쉽게 할 수 있는 기법
- **코드를 여러개의 파일로 분리**하는 방법으로써 실행
- ```<script type="text/javascript" src="greeting.js"></script>``` : `<script>` 태그 내부에 src 속성 값이 들어감

- Node.js 에서의 모듈의 노드 (서버에서 사용되는 js)
- ```node.circle.js```(로드 될 대상)
```
var PI = Math.PI;
exports.area = function (r) {
    return PI * r * r;
};

exports.circumference = function (r) {
    return 2 * PI * r;
};

exports.circumference = function (r) {
    return 2 * PI * r;
};
```

- ```node.demo.js```(로드의 주체)
```
var circle = require('./node.circle.js');
console.log('The area of a circle of radius 4 is ' + circle.area(4));
```
- 로드 될 대상으로부터 로드의 주체가 모듈을 불러와 활용할 수 있음

- 라이브러리 : jquery ```$(%id_name tag).text('str');```