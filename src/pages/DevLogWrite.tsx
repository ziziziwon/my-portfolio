import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GlassCard from "../components/common/GlassCard";
import SectionTitle from "../components/common/SectionTitle";
import { addDevLog } from "../services/devlogService";

const DevLogWrite: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || saving) return;

    try {
      setSaving(true);
      setError(null);
      const date = new Date().toISOString().split("T")[0];
      await addDevLog(title, content, date, image);
      navigate("/devlog");
    } catch (err) {
      console.error("DevLog 저장 실패:", err);
      setError("작업 로그 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section">
      <SectionTitle
        label="DevLog"
        title="새 글 작성"
        description="작업 로그를 작성해 주세요."
      />
      <GlassCard className="devlog-write-card">
        {error && (
          <div style={{
            padding: "12px",
            margin: "16px 0",
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
            <button type="submit" className="form-submit-btn" disabled={saving}>
              {saving ? "저장 중..." : "작성 완료"}
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



