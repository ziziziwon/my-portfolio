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
    if (!file) return;

    // 파일 크기 제한 (1MB)
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      setError(`이미지 크기는 1MB 이하여야 합니다. (현재: ${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      
      // Base64 인코딩된 이미지 크기 체크 (약 1MB 제한)
      // Base64는 원본보다 약 33% 크므로, 원본 1MB = Base64 약 1.33MB
      const base64Size = result.length * 0.75; // Base64 크기 추정
      if (base64Size > maxSize) {
        setError("이미지가 너무 큽니다. 더 작은 이미지를 사용해주세요.");
        return;
      }
      
      // 이미지 압축 시도
      compressImage(result, maxSize);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (dataUrl: string, maxSize: number) => {
    const img = new Image();
    img.onload = () => {
      // 이미지 크기 조정 (최대 800px)
      const maxWidth = 800;
      const maxHeight = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        } else {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // JPEG 품질 조정 (0.7 = 70% 품질)
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        
        // 압축 후 크기 체크
        const compressedSize = compressedDataUrl.length * 0.75;
        if (compressedSize > maxSize) {
          // 더 낮은 품질로 재압축
          const lowerQuality = canvas.toDataURL("image/jpeg", 0.5);
          setImage(lowerQuality);
        } else {
          setImage(compressedDataUrl);
        }
        setError(null);
      }
    };
    img.onerror = () => {
      setError("이미지를 로드할 수 없습니다.");
    };
    img.src = dataUrl;
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
    } catch (err: any) {
      console.error("DevLog 저장 실패:", err);
      let errorMessage = "작업 로그 저장에 실패했습니다. 잠시 후 다시 시도해주세요.";
      
      // Firebase 에러 메시지 상세화
      if (err?.code === "permission-denied") {
        errorMessage = "권한이 없습니다. Firestore 보안 규칙을 확인해주세요.";
      } else if (err?.code === "unavailable") {
        errorMessage = "Firebase 서비스에 연결할 수 없습니다. 네트워크를 확인해주세요.";
      } else if (err?.message) {
        errorMessage = `저장 실패: ${err.message}`;
      }
      
      setError(errorMessage);
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



