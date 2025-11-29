// DevLog Firebase 서비스
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export type DevLogItem = {
  id: string;
  date: string;
  title: string;
  content: string;
  image?: string | null;
  createdAt?: string;
};

// 이미지 압축 함수
const compressImage = (dataUrl: string, maxSize: number): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      let quality = 0.7;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      // 최대 크기 800px로 제한
      const maxDimension = 800;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = (height / width) * maxDimension;
          width = maxDimension;
        } else {
          width = (width / height) * maxDimension;
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      let compressed = canvas.toDataURL("image/jpeg", quality);

      // 크기가 여전히 크면 품질을 낮춤
      while (compressed.length * 0.75 > maxSize && quality > 0.1) {
        quality -= 0.1;
        compressed = canvas.toDataURL("image/jpeg", quality);
      }

      resolve(compressed);
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
};

// 모든 DevLog 가져오기
export const getDevLogs = async (): Promise<DevLogItem[]> => {
  try {
    const devlogsRef = collection(db, "devlogs");
    const q = query(devlogsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const logs: DevLogItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      logs.push({
        id: doc.id,
        date: data.date || "",
        title: data.title || "",
        content: data.content || "",
        image: data.image || null,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || "",
      });
    });

    return logs;
  } catch (error: any) {
    console.error("DevLog 가져오기 실패:", error);
    // 인덱스가 없거나 권한 오류인 경우 빈 배열 반환
    if (error.code === "failed-precondition" || error.code === "permission-denied") {
      try {
        // 정렬 없이 다시 시도
        const devlogsRef = collection(db, "devlogs");
        const querySnapshot = await getDocs(devlogsRef);
        const logs: DevLogItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          logs.push({
            id: doc.id,
            date: data.date || "",
            title: data.title || "",
            content: data.content || "",
            image: data.image || null,
            createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt || "",
          });
        });
        return logs.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      } catch (fallbackError) {
        return [];
      }
    }
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
    let compressedImage = image;

    // 이미지가 있으면 압축
    if (image && image.startsWith("data:image")) {
      const maxSize = 1 * 1024 * 1024; // 1MB
      compressedImage = await compressImage(image, maxSize);
    }

    const devlogsRef = collection(db, "devlogs");
    const docRef = await addDoc(devlogsRef, {
      title,
      content,
      date,
      image: compressedImage || null,
      createdAt: Timestamp.now(),
    });

    return docRef.id;
  } catch (error: any) {
    console.error("DevLog 추가 실패:", error);
    if (error.code === "permission-denied") {
      throw new Error("권한이 없습니다. Firebase 설정을 확인해주세요.");
    }
    if (error.message?.includes("bytes")) {
      throw new Error("이미지가 너무 큽니다. 더 작은 이미지를 사용해주세요.");
    }
    throw new Error(error.message || "DevLog 저장에 실패했습니다.");
  }
};

// DevLog 삭제
export const deleteDevLog = async (id: string): Promise<void> => {
  try {
    const devlogDoc = doc(db, "devlogs", id);
    await deleteDoc(devlogDoc);
  } catch (error: any) {
    console.error("DevLog 삭제 실패:", error);
    if (error.code === "permission-denied") {
      throw new Error("권한이 없습니다.");
    }
    throw new Error(error.message || "DevLog 삭제에 실패했습니다.");
  }
};

