# GDSC Soongsil Cloud & AWS 특강 (우수연 멘토님)

### 클라우드의 발자취
- 물리적 하드웨어(코로케이션)
- 가상화 (클라우드 서비스) : 물리적인 하드웨어를 논리적(소프트웨어)으로 변경
- 서버리스 (완전 자동화) : 사용자가 서버에 대해 관여할 필요 없이 돌아가는 (사용자에게 서버가 노출되지 않는) 프로그램 (실제로는 서버가 존재)
- 클라우드가 시작되며 가상화 환경을 근간으로 자동업체가 생겨나게 됨

### 가상화
- 물리적 하드웨어를 논리적으로 변경하는 작업
    - 논리적으로 하드웨어를 격리하기 위해 등장

- 가상화를 위해 도입된 두가지 개념
1. 가상머신 : hypervisor(물리적인 하드웨어 리소스를 전체적으로 다루는)
2. 컨테이너 : OS를 통해 container를 각각 별도로 다루는 방법 (by container engine)

### AWS
- private cloud & public cloud (대부분의 차이)
- Amazon Web Service

### Region과 Availability Zone
- Region : 전 세계에서 데이터 센터를 클러스터링하는 물리적 위치 
- Availability Zone : 가용역역, 논리적 데이터 센터의 각 그룹

### VPC : AWS 계정 전용 가상 네트워크
- virtual private cloud
- 물리적 데이터 구성은 AWS가 자동적으로 해줌
- 사용자 : 클라우드 환경에서의 네트워크를 구성해주어야 함
- [보안을 위한 네트워크 특강](https://youtu.be/bZZiWNFSPJk)