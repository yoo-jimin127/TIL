## React Native 스터디 내용

![image](https://user-images.githubusercontent.com/66112716/160275056-bcdea83f-0578-4e06-8083-eaaa2fbfba18.png)
(사진 출처 : nomadcoders.co)
- React Native : 인터페이스, React Component와 운영체제 사이에 존재
- React Native에는 브라우저가 존재하지 않음, ios와 안드로이드로의 bridge가 존재

![image](https://user-images.githubusercontent.com/66112716/160275653-a1b15281-3173-41a5-8e15-f7aa7feaab00.png)
(사진 출처 : nomadcoders.co)
- javascript부분의 코드만을 작성해줌
- ios & 안드로이드 : event를 듣는 역할
- 이벤트 발생 시 ios & 안드로이드 - bridge를 통해 javascript에 메시지 전달
- javascript 상에서 코드를 실행시킬 경우, React Native는 native 운영체제에 메시지 전송

![image](https://user-images.githubusercontent.com/66112716/160275845-abccd7ab-143a-444e-9c9d-cf57ff84fb37.png)
(사진 출처 : nomadcoders.co)

### React Native 알아보기
1. React Native != 웹사이트
    - HTML이 아니므로 div 사용 X, **웹 사이트가 아님**
2. View : container
    - div 대신 view 사용, 따라서 항상 view를 import 해주어야 함 `<View> </View>`
3. react native 내에 있는 모든 text는 text component에 들어가있어야 함 `<Text> </Text>`
4. view의 style : 웹의 react.js에서 할 수 있는 것과 유사
    - `StyleSheet.create` : object 생성 시 사용

- AsyncStorage : React Native를 위한 local storage -> 현재는 다른 곳에서 다운 받아 사용해야함