export interface GuestbookItem {
  id: string;
  name: string;
  message: string;
  avatar?: string;
  date?: string;
}

export const initialGuestbook: GuestbookItem[] = [
  {
    id: "1",
    name: "friend",
    message: "포폴 너무 귀엽고 감성 있다… 계속 응원할게!",
    avatar: "😊",
    date: new Date().toISOString().split("T")[0],
  },
  {
    id: "2",
    name: "recruiter",
    message: "인터랙션이 인상적이네요. 프로젝트 상세 내용 잘 봤습니다 :)",
    avatar: "✨",
    date: new Date().toISOString().split("T")[0],
  },
];

