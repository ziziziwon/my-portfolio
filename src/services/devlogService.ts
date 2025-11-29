// DevLog Firestore 서비스
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
  createdAt?: Timestamp;
};

// DevLog 컬렉션 참조
const devlogCollection = collection(db, "devlogs");

// 모든 DevLog 가져오기
export const getDevLogs = async (): Promise<DevLogItem[]> => {
  try {
    // createdAt 필드가 있는 문서만 정렬, 없으면 정렬 없이 가져오기
    let querySnapshot;
    try {
      const q = query(devlogCollection, orderBy("createdAt", "desc"));
      querySnapshot = await getDocs(q);
    } catch (orderError: any) {
      // 정렬 실패 시 (인덱스 없음 또는 데이터 없음) 정렬 없이 가져오기
      if (orderError.code === "failed-precondition" || orderError.code === "not-found") {
        querySnapshot = await getDocs(devlogCollection);
      } else {
        throw orderError;
      }
    }
    
    const logs: DevLogItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      logs.push({
        id: doc.id,
        date: data.date || (data.createdAt?.toDate().toISOString().split("T")[0]),
        title: data.title || "",
        content: data.content || "",
        image: data.image || null,
        createdAt: data.createdAt,
      });
    });
    
    // createdAt이 없으면 메모리에서 정렬
    if (logs.length > 0 && logs.some(log => !log.createdAt)) {
      logs.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        }
        if (a.createdAt) return -1;
        if (b.createdAt) return 1;
        // 둘 다 createdAt이 없으면 date로 정렬
        return b.date.localeCompare(a.date);
      });
    }
    
    return logs;
  } catch (error: any) {
    // 권한 에러인 경우 빈 배열 반환 (기본 로그는 표시됨)
    if (error.code === "permission-denied") {
      console.warn("DevLog 권한 없음 - 기본 로그만 표시됩니다.");
      return [];
    }
    console.error("DevLog 가져오기 실패:", error);
    throw error;
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
    const newLog = {
      title: title.trim(),
      content: content.trim(),
      date: date || new Date().toISOString().split("T")[0],
      image: image || null,
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(devlogCollection, newLog);
    return docRef.id;
  } catch (error) {
    console.error("DevLog 추가 실패:", error);
    throw error;
  }
};

// DevLog 삭제
export const deleteDevLog = async (id: string): Promise<void> => {
  try {
    const logDoc = doc(db, "devlogs", id);
    await deleteDoc(logDoc);
  } catch (error) {
    console.error("DevLog 삭제 실패:", error);
    throw error;
  }
};

