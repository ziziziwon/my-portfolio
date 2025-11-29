# Firebase 설정 가이드

방명록 기능을 Firebase Firestore에 저장하기 위한 설정 가이드입니다.

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 및 설정 완료

## 2. Firestore 데이터베이스 생성

1. Firebase Console에서 "Firestore Database" 선택
2. "데이터베이스 만들기" 클릭
3. "테스트 모드에서 시작" 선택 (개발 중) 또는 "프로덕션 모드에서 시작" 선택
4. 위치 선택 (asia-northeast3 - 서울 권장)

## 3. Firestore 보안 규칙 설정

Firebase Console > Firestore Database > 규칙 탭에서 다음 규칙을 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 방명록 컬렉션
    match /guestbook/{messageId} {
      // 모든 사용자가 읽을 수 있음
      allow read: if true;
      // 모든 사용자가 작성할 수 있음
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'avatar', 'date', 'createdAt'])
        && request.resource.data.name is string
        && request.resource.data.message is string
        && request.resource.data.avatar is string
        && request.resource.data.date is string
        && request.resource.data.createdAt is timestamp;
      // 삭제는 모든 사용자가 가능 (클라이언트에서 관리자 비밀번호로 보호)
      // 추후 Firebase Authentication을 추가하여 서버 측에서도 보호 가능
      allow delete: if true;
    }
    
    // DevLog 컬렉션
    match /devlogs/{logId} {
      // 모든 사용자가 읽을 수 있음
      allow read: if true;
      // 모든 사용자가 작성할 수 있음 (관리자 비밀번호로 보호)
      allow create: if request.resource.data.keys().hasAll(['title', 'content', 'date', 'createdAt'])
        && request.resource.data.title is string
        && request.resource.data.content is string
        && request.resource.data.date is string
        && request.resource.data.createdAt is timestamp
        && (!request.resource.data.keys().hasAny(['image']) || request.resource.data.image == null || request.resource.data.image is string);
      // 삭제는 모든 사용자가 가능 (클라이언트에서 관리자 비밀번호로 보호)
      allow delete: if true;
    }
  }
}
```

**참고**: 프로덕션 환경에서는 인증을 추가하여 삭제 권한을 관리하는 것이 좋습니다.

## 4. 웹 앱 등록 및 설정 정보 가져오기

1. Firebase Console > 프로젝트 설정 > 일반 탭
2. "내 앱" 섹션에서 웹 아이콘(</>) 클릭
3. 앱 닉네임 입력 후 "앱 등록"
4. Firebase SDK 설정 정보 복사:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

## 5. 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일 생성
2. `.env.example` 파일을 참고하여 Firebase 설정 정보 입력:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 6. 초기 데이터 추가 (선택사항)

Firebase Console > Firestore Database에서 `guestbook` 컬렉션을 만들고, 초기 메시지를 추가할 수 있습니다:

```json
{
  "name": "friend",
  "message": "포폴 너무 귀엽고 감성 있다… 계속 응원할게!",
  "avatar": "😊",
  "date": "2025-01-XX",
  "createdAt": "2025-01-XXT00:00:00Z"
}
```

## 7. 배포 시 주의사항

- `.env` 파일은 절대 Git에 커밋하지 마세요 (`.gitignore`에 포함되어 있음)
- 배포 서버(Cafe24 등)에서 환경 변수를 설정해야 합니다
- Firestore 보안 규칙을 프로덕션에 맞게 수정하세요

## 문제 해결

### 방명록이 로드되지 않는 경우
- Firebase 설정 정보가 올바른지 확인
- Firestore 데이터베이스가 생성되었는지 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 메시지가 저장되지 않는 경우
- Firestore 보안 규칙 확인
- 네트워크 연결 확인
- 브라우저 콘솔에서 에러 메시지 확인

