import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { initialGuestbook } from "../data/guestbook";

const AVATARS = ["😊", "🎨", "✨", "💫", "🌸", "🦋", "🌙", "⭐"];

interface GuestbookItem {
  id: string;
  name: string;
  message: string;
  avatar: string;
  date?: string;
}

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<GuestbookItem[]>(() => {
    const saved = localStorage.getItem("guestbookMessages");
    return saved ? JSON.parse(saved) : initialGuestbook;
  });
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  useEffect(() => {
    localStorage.setItem("guestbookMessages", JSON.stringify(messages));
  }, [messages]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "오늘";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "어제";
    } else {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const handleSend = () => {
    if (!text.trim()) return;
    const newMessage: GuestbookItem = {
      id: `${Date.now()}`,
      name: name.trim() || "익명",
      message: text.trim(),
      avatar: selectedAvatar,
      date: new Date().toISOString().split("T")[0],
    };
    setMessages((prev) => [...prev, newMessage]);
    setText("");
    setName("");
  };

  return (
    <section className="section">
      <SectionTitle
        label="Guestbook"
        title="방명록"
        description="포트폴리오에 들른 사람들이 자유롭게 메시지를 남길 수 있어요."
      />
      <GlassCard className="guestbook-card">
        <div className="guestbook-header">
          <div className="guestbook-count">
            총 <strong>{messages.length}</strong>개의 메시지
          </div>
        </div>
        <div className="guestbook-messages">
          <AnimatePresence mode="popLayout">
            {messages.slice().reverse().map((m) => (
              <motion.div
                key={m.id}
                className="guestbook-bubble"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                layout
              >
                <motion.div
                  className="guestbook-avatar"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 1.2, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {m.avatar}
                </motion.div>
                <div className="guestbook-bubble-content">
                  <div className="guestbook-bubble-header">
                    <p className="guestbook-name">{m.name}</p>
                    {m.date && (
                      <span className="guestbook-date">{formatDate(m.date)}</span>
                    )}
                  </div>
                  <p className="guestbook-text">{m.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="guestbook-form">
          <div className="guestbook-form-row">
            <input
              className="guestbook-name-input"
              placeholder="이름 (선택)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
            />
            <div className="guestbook-avatar-selector">
              {AVATARS.map((avatar) => (
                <motion.button
                  key={avatar}
                  className={`guestbook-avatar-btn ${selectedAvatar === avatar ? "active" : ""
                    }`}
                  onClick={() => setSelectedAvatar(avatar)}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {avatar}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="guestbook-input-row">
            <input
              className="guestbook-input"
              placeholder="메시지를 남겨 주세요 :)"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              maxLength={200}
            />
            <motion.button
              className="guestbook-send"
              onClick={handleSend}
              disabled={!text.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SEND
            </motion.button>
          </div>
          <div className="guestbook-input-hint">
            {text.length}/200
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default Guestbook;

