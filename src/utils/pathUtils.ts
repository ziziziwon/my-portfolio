// 경로 유틸리티 함수
// basename을 동적으로 감지하여 이미지 경로 처리

export const getBasePath = (): string => {
  // Vite의 BASE_URL 사용 (개발/프로덕션 모두 /myportfolio/)
  return import.meta.env.BASE_URL;
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

