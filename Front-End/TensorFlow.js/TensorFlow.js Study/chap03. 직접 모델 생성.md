### how to do Supervised learning?
1. 과거의 데이터 준비 (과거의 데이터를 통해 원인과 결과의 관계를 파악)
    - 원인 : 독립변수
    - 결과 : 종속변수
2. 모델의 모양 만들기
3. 데이터로 모델을 학습 (FIT)
4. 모델 이용

### Tensorflow로 모델 생성
1. 과거의 데이터 준비
- javascript 데이터를 tensor로 변환
```js
var 온도 = [20,21,22,23];
var 판매량 = [40,42,44,46];

var 원인 = tf.tensor(온도);
var 결과 = tf.tensor(판매량);
```

2. 모델의 모양 만들기
- 모델에 입력할 값의 개수와 모델이 출력할 값의 개수를 지정
    - 모델을 사용할 사용자의 조작 방법을 디자인
```js
// var X = tf.input({shape: [원인_열_개수]});
var X = tf.input({shape: [1]});
// var Y = tf.layers.dense({units: 결과_열_개수 }).apply(X);
var Y = tf.layers.dense({units: 1 }).apply(X);
var model = tf.model({inputs: X, outputs: Y });

// 모델을 실제로 만드는 컴파일 과정
var compileParam = {optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
model.compile(compileParam);
```

3. 데이터로 모델을 학습 (FIT)
    - 현재까지 만든 모델은 입력과 출력이 한개 뿐이라는 단순 모양만이 정의된 상태 (ex 빈 깡통 🥛)
    - FIT 단계 : 가지고 있는 데이터를 모델에 적용하는 단계

- 첫번째 인자 : 원인 데이터
- 두번째 인자 : 결과 데이터
    - 원인과 결과를 `fit()` 함수에 전달하면 해당 함수가 모델을 데이터에 맞게 fitting 함
- 세번째 인자 : 에포크 값 - 원인과 결과에 따라 몇번의 학습을 진행할지 결정하는 값
    - 에포크 값을 늘릴 수록 학습의 정확도를 높일 수 있으나 성능 측면에서의 저하가 발생할 수 있음
        - 적당한 값을 예측

- 결과 예측 함수 : `predict()`
- 결과 출력 함수 : `print()`
```js
var fitParam = {epochs:100}
model.fit(원인,결과,fitParam).then(function(result) {
    // 4. 모델 이용
    var 다음주온도 = [15,16,17,18,19];
    var 다음주원인 = tf.tensor(다음주온도, [다음주온도.length, 1]);
    var 다음주결과 = model.predict(다음주원인);
    다음주결과.print();
});
```

- 전체 소스코드
```js
var 온도 = [20,21,22,23];
var 판매량 = [40,42,44,46];
var 원인 = tf.tensor(온도);
var 결과 = tf.tensor(판매량);

// var X = tf.input({shape: [원인_열_개수]});
var X = tf.input({shape: [1]});
// var Y = tf.layers.dense({units: 결과_열_개수 }).apply(X);
var Y = tf.layers.dense({units: 1 }).apply(X);
var model = tf.model({inputs: X, outputs: Y });

// 모델을 실제로 만드는 컴파일 과정
var compileParam = {optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError}
model.compile(compileParam);

var fitParam = {epochs:100}
model.fit(원인,결과,fitParam).then(function(result) {
    // 4. 모델 이용
    var 다음주온도 = [15,16,17,18,19];
    var 다음주원인 = tf.tensor(다음주온도, [다음주온도.length, 1]);
    var 다음주결과 = model.predict(다음주원인);
    다음주결과.print();
});
```

### TensorFlow js 라이브러리 설치
[기본 설치 방법](https://www.tensorflow.org/js/tutorials/setup?hl=ko)  
