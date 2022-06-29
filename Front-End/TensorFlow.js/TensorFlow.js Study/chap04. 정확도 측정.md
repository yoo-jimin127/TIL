### 정확도 측정
- 정확도 측정을 위해 `fit()`의 세번째 인자인 에포크 부분을 변경
```js
// 3. 데이터로 모델을 학습
var fitParam = {
    epochs: 100,
    callbacks: {
        onEpochEnd:
            function(epoch, logs) {
                console.log('epoch', epoch, logs);
            }
    }
} // loss 추가 예제

model.fit(원인, 결과, fitParam).then(function (result) {
    
    // 4. 모델 사용 
    // 4.1 기존의 데이터를 이용
    var 예측한결과 = model.predict(원인);
    예측한결과.print()
});  
```