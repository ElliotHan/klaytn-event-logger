# Klaytn Event Logger

비개발자들도 원클릭으로 쉽게 이벤트를 받아볼 수 있는 툴

## Installation

```
$ npm i
$ npm run local
```

위 명령어 입력 후 브라우저로 http://localhost:5555/ 접속

## 배포된 주소

@TODO 배포한 후 주소 써 넣기  
*Note: 현재 사내망에서만 접속 가능

## 사용 방법

1. Baobab, Cypress 중 원하는 네트워크 선택 후 start 버튼 클릭
2. 조회할 컨트랙트 주소 입력
3. solc로 컨트랙트 컴파일 후 나오는 JSON 파일 업로드 (JSON파일 내에 abi항목이 존재해야 함)
4. filtering 할 이벤트 이름 입력 (default: allEvents)
5. 조회할 블록 넘버 입력 (default: 0 ~ latest)
6. Get Event Logs! 버튼 클릭
7. 원본 event 파일이 필요할 경우 아래에 Download Raw Event Logs! 버튼 클릭
