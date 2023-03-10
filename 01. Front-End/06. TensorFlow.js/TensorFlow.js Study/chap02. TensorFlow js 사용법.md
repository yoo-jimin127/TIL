### TensorFlow JS 활용 방법
- mobilenet 예제 코드
```js
<!-- Load TensorFlow.js. This is required to use MobileNet. -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.1"> </script>
<!-- Load the MobileNet model. -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0"> </script>

<!-- Replace this with your image. Make sure CORS settings allow reading the image! -->
<img id="img" src="cat.jpg"></img>

<!-- Place your code in the script tag below. You can also use an external .js file -->
<script>
  // Notice there is no 'import' statement. 'mobilenet' and 'tf' is
  // available on the index-page because of the script tag above.

  const img = document.getElementById('img');

  // Load the model.
  mobilenet.load().then(model => {
    // Classify the image.
    model.classify(img).then(predictions => {
      console.log('Predictions: ');
      console.log(predictions);
    });
  });
</script>
```
- `<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.1"> </script>` : Tensorflow js 라이브러리의 로딩 코드 (공통적으로 필요)
- `<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@1.0.0"> </script>` : 사용하고자 하는 모델을 로드하는 코드
- `<img id="img" src="cat.jpg"></img>` : 식별하고자 하는 이미지 파일을 `<img>` 태그로 감싸 경로 지정  
```js
  mobilenet.load().then(model => { // load() : 로딩이 끝나면 then 내부의 함수를 호출하도록 약속된 함수
    // Classify the image.
    model.classify(img).then(predictions => { // model의 기능 중 분류 기능인 classify 함수를 넣어 이미지를 분류
      console.log('Predictions: ');
      console.log(predictions);
    });
  });
```
<p align="center"><img src="https://user-images.githubusercontent.com/66112716/176116638-8701d497-f22c-4436-a252-b99df15c5ba1.png"></p>
- 3개의 배열을 통해 이미지 분류 결과가 출력됨