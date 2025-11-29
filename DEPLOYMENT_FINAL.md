# 카페24 서버 최종 배포 가이드

## 파일 배포 위치

모든 파일은 `/www/myportfolio/` 디렉토리에 배포합니다.

## 리다이렉트 설정

`/devlog/write` 같은 경로로 접근했을 때 자동으로 `/myportfolio/devlog/write`로 리다이렉트하려면:

### 방법: 루트 디렉토리에 .htaccess 파일 업로드

1. **파일 준비**
   - `public/.htaccess.root.works` 파일의 내용을 복사

2. **카페24 서버에 업로드**
   - 카페24 서버의 **루트 디렉토리(`/www/`)**에 `.htaccess` 파일로 업로드
   - **주의**: `/www/myportfolio/`가 아닌 `/www/`에 업로드해야 합니다!

3. **파일 내용**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  
  # /devlog로 시작하는 모든 경로를 /myportfolio/devlog로 리다이렉트
  RewriteRule ^devlog(/.*)?$ /myportfolio/devlog$1 [R=301,L]
  
  # /portfolio로 시작하는 모든 경로를 /myportfolio/portfolio로 리다이렉트
  RewriteRule ^portfolio(/.*)?$ /myportfolio/portfolio$1 [R=301,L]
  
  # /guestbook으로 시작하는 모든 경로를 /myportfolio/guestbook로 리다이렉트
  RewriteRule ^guestbook(/.*)?$ /myportfolio/guestbook$1 [R=301,L]
  
  # /about으로 시작하는 모든 경로를 /myportfolio/about로 리다이렉트
  RewriteRule ^about(/.*)?$ /myportfolio/about$1 [R=301,L]
</IfModule>
```

## 최종 디렉토리 구조

```
/www/                          ← 루트 디렉토리
├── .htaccess                  ← 여기에 업로드! (리다이렉트 설정)
└── myportfolio/               ← 포트폴리오 파일들
    ├── index.html
    ├── assets/
    ├── images/
    ├── devlog/
    │   └── write/
    │       └── index.html     ← 리다이렉트 파일 (선택사항)
    └── ...
```

## 배포 순서

1. **포트폴리오 파일 배포**
   - `dist/` 폴더의 모든 내용을 `/www/myportfolio/`에 업로드

2. **리다이렉트 설정**
   - `public/.htaccess.root.works` 파일을 `/www/.htaccess`로 업로드

3. **작동 확인**
   - `https://jjw0144.mycafe24.com/devlog/write` 접근 시 자동으로 `/myportfolio/devlog/write`로 리다이렉트됩니다.

## 중요 사항

- ✅ 포트폴리오 파일: `/www/myportfolio/`에 배포
- ✅ 리다이렉트 설정: `/www/.htaccess`에 업로드 (루트 디렉토리)
- ❌ 리다이렉트 파일을 `/www/myportfolio/` 안에 넣으면 작동하지 않습니다!

