// 경로 유틸리티 함수
// basename을 동적으로 감지하여 이미지 경로 처리

export const getBasePath = (): string => {
  if (import.meta.env.DEV) {
    return import.meta.env.BASE_URL;
  }
  
  // 프로덕션 환경에서 현재 경로를 확인
  const pathname = window.location.pathname;
  if (pathname.startsWith('/myportfolio')) {
    return '/myportfolio/';
  }
  
  // /myportfolio가 없으면 루트 경로
  return '/';
};

export const getImagePath = (imagePath: string): string => {
  const basePath = getBasePath();
  
  // 이미 절대 경로로 시작하는 경우
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // /로 시작하는 경우
  if (imagePath.startsWith('/')) {
    return `${basePath}${imagePath.slice(1)}`;
  }
  
  // 상대 경로인 경우
  return `${basePath}${imagePath}`;
};

