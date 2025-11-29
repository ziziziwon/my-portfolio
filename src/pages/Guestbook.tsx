import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import AdminPasswordModal from "../components/modals/AdminPasswordModal";
import {
  getGuestbookMessages,
  addGuestbookMessage,
  deleteGuestbookMessage,
  type GuestbookItem,
} from "../services/guestbookService";

const AVATARS = ["😊", "🎨", "✨", "💫", "🌸", "🦋", "🌙", "⭐"];

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<GuestbookItem[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  // Firebase에서 방명록 메시지 불러오기
  useEffect(() => {
    const loadMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedMessages = await getGuestbookMessages();
        setMessages(fetchedMessages);
      } catch (err) {
        console.error("방명록 로드 실패:", err);
        setError("방명록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    loadMessages();
  }, []);

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

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    try {
      setSending(true);
      setError(null);
      const messageId = await addGuestbookMessage(
        name,
        text,
        selectedAvatar
      );
      
      // 새 메시지를 목록에 추가 (최신순으로 정렬되므로 맨 앞에 추가)
      const newMessage: GuestbookItem = {
        id: messageId,
        name: name.trim() || "익명",
        message: text.trim(),
        avatar: selectedAvatar,
        date: new Date().toISOString().split("T")[0],
      };
      setMessages((prev) => [newMessage, ...prev]);
      setText("");
      setName("");
    } catch (err) {
      console.error("메시지 전송 실패:", err);
      setError("메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setIsModalOpen(true);
  };

  const handleDeleteSuccess = async () => {
    if (!deleteTargetId) {
      setIsModalOpen(false);
      return;
    }

    try {
      setError(null);
      await deleteGuestbookMessage(deleteTargetId);
      setMessages((prev) => prev.filter((msg) => msg.id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (err) {
      console.error("메시지 삭제 실패:", err);
      setError("메시지 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsModalOpen(false);
    }
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
        {error && (
          <div style={{
            padding: "12px",
            margin: "16px",
            background: "rgba(255, 0, 0, 0.1)",
            border: "1px solid rgba(255, 0, 0, 0.3)",
            borderRadius: "8px",
            color: "var(--text-main)",
            fontSize: "14px",
            textAlign: "center",
          }}>
            {error}
          </div>
        )}
        {loading ? (
          <div style={{
            padding: "40px",
            textAlign: "center",
            color: "var(--text-sub)",
          }}>
            방명록을 불러오는 중...
          </div>
        ) : (
          <div className="guestbook-messages">
          <AnimatePresence mode="popLayout">
            {messages.map((m) => (
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
                    <div className="guestbook-bubble-header-left">
                      <p className="guestbook-name">{m.name}</p>
                      {m.date && (
                        <span className="guestbook-date">{formatDate(m.date)}</span>
                      )}
                    </div>
                    <motion.button
                      className="guestbook-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(m.id);
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="삭제 (관리자)"
                      aria-label="삭제"
                    >
                      <span className="guestbook-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </span>
                    </motion.button>
                  </div>
                  <p className="guestbook-text">{m.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        )}
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
              disabled={!text.trim() || sending}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sending ? "전송 중..." : "SEND"}
            </motion.button>
          </div>
          <div className="guestbook-input-hint">
            {text.length}/200
          </div>
        </div>
      </GlassCard>
      <AdminPasswordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setDeleteTargetId(null);
        }}
        onSuccess={handleDeleteSuccess}
      />
    </section>
  );
};

export default Guestbook;

