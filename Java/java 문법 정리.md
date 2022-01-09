### java 문법 정리

#### 인터페이스
- class 키워드 대신 interface 키워드를 사용해 정의
- 내부에는 추상 메소드 선언
- 클래스에서 인터페이스를 받아 완성할 때 implements 키워드 사용
- java는 다중 상속 지원 X, 인터페이스 사용하여 다중 상속과 비슷하게 코드 작성 가능

******

#### 익명 내부 클래스
- 이름이 없는 내부 클래스
- 한 번만 사용하고 버려지는 클래스에 사용

******

#### 제네릭스
- 데이터 형식의 안전성을 보장하는 데 사용
- string, integer, double, 사용자 정의 클래스형에 사용

```
    ArrayList strList = new ArrayList();
    strList.add("first");
    strList.add("second");
    strList.add(3);
```

```
    ArrayList<String> strList = new ArrayList<String>();
    strList.add("first");
    strList.add("second");
    strList.add(3);
```

### 상속과 컴포지션
