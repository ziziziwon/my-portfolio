import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/common/GlassCard";
import SectionTitle from "../components/common/SectionTitle";

const DevLogWrite: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newLog = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      title,
      content,
      image,
    };

    const existingLogs = JSON.parse(
      localStorage.getItem("devlogs") || "[]"
    );
    existingLogs.unshift(newLog);
    localStorage.setItem("devlogs", JSON.stringify(existingLogs));

    navigate("/devlog");
  };

  return (
    <section className="section">
      <SectionTitle
        label="DevLog"
        title="새 글 작성"
        description="작업 로그를 작성해 주세요."
      />
      <GlassCard className="devlog-write-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div className="form-group">
            <label>내용</label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={10}
              required
            />
          </div>
          <div className="form-group">
            <label>이미지</label>
            {image && (
              <div className="form-image-preview">
                <img src={image} alt="Preview" />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="form-image-remove"
                >
                  ✕
                </button>
              </div>
            )}
            <button
              type="button"
              className="form-image-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              이미지 업로드
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="form-submit-btn">
              작성 완료
            </button>
            <button
              type="button"
              className="form-cancel-btn"
              onClick={() => navigate("/devlog")}
            >
              취소
            </button>
          </div>
        </form>
      </GlassCard>
    </section>
  );
};

export default DevLogWrite;



