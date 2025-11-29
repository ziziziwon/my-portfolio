// 방명록 Firestore 서비스
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

export type GuestbookItem = {
  id: string;
  name: string;
  message: string;
  avatar: string;
  date?: string;
  createdAt?: Timestamp;
};

// 방명록 컬렉션 참조
const guestbookCollection = collection(db, "guestbook");

// 모든 방명록 메시지 가져오기
export const getGuestbookMessages = async (): Promise<GuestbookItem[]> => {
  try {
    const q = query(guestbookCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const messages: GuestbookItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        name: data.name || "익명",
        message: data.message || "",
        avatar: data.avatar || "😊",
        date: data.date || (data.createdAt?.toDate().toISOString().split("T")[0]),
        createdAt: data.createdAt,
      });
    });
    
    return messages;
  } catch (error) {
    console.error("방명록 메시지 가져오기 실패:", error);
    throw error;
  }
};

// 방명록 메시지 추가
export const addGuestbookMessage = async (
  name: string,
  message: string,
  avatar: string
): Promise<string> => {
  try {
    const newMessage = {
      name: name.trim() || "익명",
      message: message.trim(),
      avatar: avatar,
      date: new Date().toISOString().split("T")[0],
      createdAt: Timestamp.now(),
    };
    
    const docRef = await addDoc(guestbookCollection, newMessage);
    return docRef.id;
  } catch (error) {
    console.error("방명록 메시지 추가 실패:", error);
    throw error;
  }
};

// 방명록 메시지 삭제
export const deleteGuestbookMessage = async (id: string): Promise<void> => {
  try {
    const messageDoc = doc(db, "guestbook", id);
    await deleteDoc(messageDoc);
  } catch (error) {
    console.error("방명록 메시지 삭제 실패:", error);
    throw error;
  }
};

