import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminPasswordModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  // 환경 변수에서 비밀번호 가져오기 (없으면 기본값 사용)
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "jiwon";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 간단한 비밀번호 체크 (Firebase Auth 대신)
    if (password === ADMIN_PASSWORD) {
      onSuccess();
      setPassword("");
      onClose();
    } else {
      setError("비밀번호가 올바르지 않습니다.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="modal-title">관리자 인증</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className={`modal-input ${isShaking ? "shake" : ""}`}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-actions">
              <button type="submit" className="modal-btn primary">
                확인
              </button>
              <button
                type="button"
                className="modal-btn ghost"
                onClick={onClose}
              >
                취소
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminPasswordModal;



