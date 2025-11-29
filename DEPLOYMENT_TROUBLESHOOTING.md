# 리다이렉트 문제 해결 가이드

## 문제: 리다이렉트가 작동하지 않음

### 확인 사항

1. **`.htaccess` 파일 위치 확인**
   - 파일이 `/www/.htaccess`에 있어야 합니다 (루트 디렉토리)
   - `/www/myportfolio/.htaccess`가 아닙니다!

2. **`.htaccess` 파일 내용 확인**
   - `public/.htaccess.root.works` 또는 `public/.htaccess.root.final-simple` 파일 내용 사용

3. **파일 권한 확인**
   - `.htaccess` 파일 권한: 644 또는 755

4. **카페24 서버 설정 확인**
   - 카페24 관리자 페이지에서 `.htaccess` 사용이 허용되어 있는지 확인
   - `mod_rewrite` 모듈이 활성화되어 있는지 확인

## 해결 방법

### 방법 1: .htaccess 파일 재업로드

1. `public/.htaccess.root.final-simple` 파일 내용 복사
2. 카페24 서버의 `/www/.htaccess` 파일로 업로드 (덮어쓰기)
3. 파일 권한을 644로 설정

### 방법 2: 직접 테스트

브라우저 개발자 도구에서 확인:
1. Network 탭 열기
2. `https://jjw0144.mycafe24.com/devlog/write` 접근
3. 301 또는 302 리다이렉트 응답이 있는지 확인

### 방법 3: .htaccess 파일 테스트

`.htaccess` 파일에 다음 내용 추가하여 테스트:

```apache
# 테스트용 - 모든 요청을 로그에 기록
RewriteEngine On
RewriteLog /tmp/rewrite.log
RewriteLogLevel 3
```

## 최종 확인

다음 URL로 접근했을 때:
- `https://jjw0144.mycafe24.com/devlog/write`
- 자동으로 `https://jjw0144.mycafe24.com/myportfolio/devlog/write`로 리다이렉트되어야 합니다.

## 대안: 카페24 고객센터 문의

`.htaccess` 파일이 전혀 작동하지 않는다면:
1. 카페24 고객센터에 문의
2. `mod_rewrite` 모듈 활성화 요청
3. `.htaccess` 파일 사용 권한 확인

