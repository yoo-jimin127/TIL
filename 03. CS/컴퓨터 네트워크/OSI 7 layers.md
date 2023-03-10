## OSI 7 계층
네트워크 프로토콜 디자인과 통신을 계층으로 나누어 설명하기 위해 개발된 모델 <br>

<p align="center"><img src="https://user-images.githubusercontent.com/66112716/158007750-885db3a9-6df4-46c0-bc12-f496dce7e9d9.png" width="500" height="350">
<img src="https://user-images.githubusercontent.com/66112716/158007790-1ed8ac3e-2e5c-4376-b938-2efe15cc8935.png" width="600" height="350"><p>

[자료 출처 1](https://security-nanglam.tistory.com/229) [자료 출처 2](https://velog.io/@dyllis/OSI-7%EA%B3%84%EC%B8%B5-%EC%A0%95%EB%A6%AC)

### 1계층 : 물리 계층
- 하드웨어 전송 기술로 이루어진 계층 <br>
- 물리적 선로로 전송하기 위해 전기적 신호인 비트 형태로 데이터를 전송
- 동축 케이블, 광섬유, 모뎀 등

### 2계층 : 데이터 링크 계층
- Point to Point 간의 신뢰성 있는 전송을 보장하기 위한 계층
- 네트워크 계층에서 붙인 IP 헤더에서 IP 주소를 읽어 해드웨어 주소인 MAC 주소를 구함
- 네트워크의 부하 방지를 위한 흐름 제어 
- 스위치, 브릿지 등

### 3계층 : 네트워크 계층
- 수신자의 ip 주소를 읽어 라우터가 경로를 결정함
- 노드를 거칠 때 마다 라우팅 해주는 역할
- 라우팅 알고리즘을 사용해 경로를 결정한 뒤 포워딩을 수행
- IP, ICMP, IGMP, OSPF 등

### 4계층 : 전송 계층
- 송신자와 수신자 간 논리적 연결을 수행
- End to End 사이 연결을 관리
- 에러 탐지 및 재전송을 통해 오류 복구 및 흐름 제어 기능 수행
- TCP, UDP

### 5계층 : 세션 계층
- 송신자와 수신자 간 통신을 위한 동기화 신호를 주고받음
- 양 끝단의 응용 프로세스가 통신을 관리하기 위한 방법을 제공
- 통신 방식인 단순, 반이중, 전이중 방식 결정
- SSH, RPC, TLS

### 6계층 : 표현 계층
- 애플리케이션에서 전송한 메시지에 대해 코드화 수행
- 메시지 압축을 통한 데이터량 감소
- JPEC, MPEC, XDR, GIF, ASCII

### 7 계층 : 응용 계층
- 사용자들이 사용하는 프로그램이 존재
- 데이터 송수신을 위한 메시지 생성
- HTTP, FTP, DNS, SMTP