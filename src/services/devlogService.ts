// DevLog PHP API 서비스
export type DevLogItem = {
  id: string;
  date: string;
  title: string;
  content: string;
  image?: string | null;
  createdAt?: string;
};

const API_URL = "/myportfolio/api/devlog.php";

// 모든 DevLog 가져오기
export const getDevLogs = async (): Promise<DevLogItem[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("DevLog 가져오기 실패:", error);
    return [];
  }
};

// DevLog 추가
export const addDevLog = async (
  title: string,
  content: string,
  date: string,
  image?: string | null
): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);

    if (image) {
      // Base64 이미지를 Blob으로 변환
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append("image", blob, "image.jpg");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "저장 실패");
    }

    return result.data.id;
  } catch (error) {
    console.error("DevLog 추가 실패:", error);
    throw error;
  }
};

// DevLog 삭제 (현재 PHP API 미구현, 필요 시 추가)
export const deleteDevLog = async (_id: string): Promise<void> => {
  // TODO: Implement delete in PHP
  throw new Error("Delete functionality not implemented yet");
};

