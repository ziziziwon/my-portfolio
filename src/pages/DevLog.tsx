import React, { useState, useEffect } from "react";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import AdminPasswordModal from "../components/modals/AdminPasswordModal";
import { getDevLogs, type DevLogItem } from "../services/devlogService";
import { devlogs as defaultDevlogs } from "../data/devlog";

const DevLog: React.FC = () => {
  const [logs, setLogs] = useState<DevLogItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firebase에서 DevLog 불러오기
  useEffect(() => {
    const loadLogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedLogs = await getDevLogs();
        // Firebase에서 가져온 로그와 기본 로그를 합치기 (중복 제거)
        const allLogs = [...fetchedLogs];
        const defaultIds = new Set(fetchedLogs.map(log => log.id));
        const uniqueDefaults = defaultDevlogs.filter(log => !defaultIds.has(log.id));
        setLogs([...allLogs, ...uniqueDefaults]);
      } catch (err) {
        console.error("DevLog 로드 실패:", err);
        setError("작업 로그를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.");
        // 에러 발생 시 기본 로그만 표시
        setLogs(defaultDevlogs);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, []);

  const handleNewClick = () => {
    setIsModalOpen(true);
  };

  const handleAuthSuccess = () => {
    window.location.href = "/devlog/write";
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="section">
      <div className="section-header">
        <SectionTitle
          label="DevLog"
          title="작업 로그"
          description="프로젝트를 하면서 고민했던 점, 배운 점들을 기록합니다."
        />
        <button className="devlog-new-btn" onClick={handleNewClick}>
          New
        </button>
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
          작업 로그를 불러오는 중...
        </div>
      ) : (
        <div className="devlog-timeline">
          {logs.map((log, index) => (
          <div key={log.id} className="devlog-item">
            <div className="timeline-marker">
              <div className="timeline-line" />
              <div className="timeline-dot" />
            </div>
            <GlassCard
              className={`devlog-card ${expandedId === log.id ? "expanded" : ""}`}
              onClick={() => toggleExpand(log.id)}
            >
              <div className="devlog-header">
                <span className="devlog-date">{log.date}</span>
                {index === 0 && <span className="badge-new">NEW</span>}
              </div>
              <h3 className="devlog-title">
                {log.title} <span className="expand-icon">{expandedId === log.id ? "▴" : "▾"}</span>
              </h3>
              {expandedId === log.id && (
                <div className="devlog-content-expanded">
                  {log.image && (
                    <div className="devlog-image">
                      <img src={log.image} alt={log.title} />
                    </div>
                  )}
                  <p className="devlog-body">{log.content}</p>
                </div>
              )}
            </GlassCard>
          </div>
        ))}
        </div>
      )}
      <AdminPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </section>
  );
};

export default DevLog;

