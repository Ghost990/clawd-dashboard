'use client';

import { useState, useEffect } from 'react';

interface BotCardProps {
  name: string;
  displayName: string;
  color: string;
  port: number;
  service: string;
  description: string;
  workspace?: string;
  status?: 'online' | 'offline' | 'loading';
}

interface BotStatus {
  active: boolean;
  memory?: string;
  cpu?: string;
  uptime?: string;
  skills?: string[];
}

function MiniRobotFace({ color }: { color: string }) {
  return (
    <div className="mini-robot-face">
      <div className="mini-eye" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }} />
      <div className="mini-eye" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }} />
    </div>
  );
}

function BotCard({ name, displayName, color, port, service, description, workspace, status = 'loading' }: BotCardProps) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [botInfo, setBotInfo] = useState<BotStatus | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/bot-status?service=${service}`, { 
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });
        const data = await res.json();
        setBotInfo(data);
        setCurrentStatus(data.active ? 'online' : 'offline');
      } catch {
        setCurrentStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [service]);

  const statusColor = {
    online: '#22c55e',
    offline: '#ef4444',
    loading: '#eab308',
  }[currentStatus];

  const statusText = {
    online: 'Online',
    offline: 'Offline',
    loading: 'Checking...',
  }[currentStatus];

  return (
    <div className="bot-card" style={{ '--card-color': color } as React.CSSProperties}>
      <div className="bot-card-header" style={{ background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)` }}>
        <MiniRobotFace color={color} />
        <div className="bot-card-status">
          <span className="status-dot" style={{ backgroundColor: statusColor }} />
          <span className="status-text">{statusText}</span>
        </div>
      </div>
      
      <div className="bot-card-content">
        <h3 className="bot-card-name" style={{ color }}>{displayName}</h3>
        <p className="bot-card-description">{description}</p>
        
        <div className="bot-card-info">
          <div className="info-row">
            <span className="info-label">Port</span>
            <span className="info-value">{port}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Service</span>
            <span className="info-value">{service}</span>
          </div>
          {workspace && (
            <div className="info-row">
              <span className="info-label">Workspace</span>
              <span className="info-value">{workspace}</span>
            </div>
          )}
          {botInfo?.uptime && currentStatus === 'online' && (
            <div className="info-row">
              <span className="info-label">Uptime</span>
              <span className="info-value">{botInfo.uptime}</span>
            </div>
          )}
          {botInfo?.memory && currentStatus === 'online' && (
            <div className="info-row">
              <span className="info-label">Memory</span>
              <span className="info-value">{botInfo.memory}</span>
            </div>
          )}
        </div>

        {botInfo?.skills && botInfo.skills.length > 0 && (
          <div className="bot-card-skills">
            <span className="skills-label">Skills</span>
            <div className="skills-tags">
              {botInfo.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="skill-tag" style={{ borderColor: `${color}40`, color }}>
                  {skill}
                </span>
              ))}
              {botInfo.skills.length > 4 && (
                <span className="skill-tag more" style={{ borderColor: `${color}40`, color }}>
                  +{botInfo.skills.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
        
        <a 
          href={`http://127.0.0.1:${port}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bot-card-button"
          style={{ 
            backgroundColor: `${color}20`,
            borderColor: `${color}40`,
            color: color 
          }}
        >
          Open Dashboard →
        </a>
      </div>
    </div>
  );
}

function MiniMetricsBar() {
  const [metrics, setMetrics] = useState<{cpu?: number; memory?: number; disk?: number} | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        setMetrics({
          cpu: data.cpu?.usage,
          memory: data.memory?.usedPercent,
          disk: data.disk?.usedPercent,
        });
      } catch {
        // ignore
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <div className="mini-metrics-bar">
      <div className="mini-metric">
        <span className="mini-metric-label">CPU</span>
        <div className="mini-metric-bar">
          <div className="mini-metric-fill" style={{ width: `${metrics.cpu || 0}%` }} />
        </div>
        <span className="mini-metric-value">{metrics.cpu?.toFixed(0) || 0}%</span>
      </div>
      <div className="mini-metric">
        <span className="mini-metric-label">RAM</span>
        <div className="mini-metric-bar">
          <div className="mini-metric-fill" style={{ width: `${metrics.memory || 0}%` }} />
        </div>
        <span className="mini-metric-value">{metrics.memory?.toFixed(0) || 0}%</span>
      </div>
      <div className="mini-metric">
        <span className="mini-metric-label">Disk</span>
        <div className="mini-metric-bar">
          <div className="mini-metric-fill" style={{ width: `${metrics.disk || 0}%` }} />
        </div>
        <span className="mini-metric-value">{metrics.disk?.toFixed(0) || 0}%</span>
      </div>
    </div>
  );
}

export function BotCards() {
  const bots: BotCardProps[] = [
    {
      name: 'bernard',
      displayName: 'Bernard',
      color: '#00e5ff',
      port: 19001,
      service: 'openclaw-bernard',
      workspace: '~/clawd',
      description: 'Main assistant - coding, research, daily tasks',
    },
    {
      name: 'moni',
      displayName: 'Moni',
      color: '#ff6b9d',
      port: 19002,
      service: 'openclaw-moni',
      workspace: '~/clawd-soul2',
      description: 'Creative companion - ideas, fun, emotional support',
    },
    {
      name: 'lulu',
      displayName: 'Lulu',
      color: '#a78bfa',
      port: 19003,
      service: 'clawdbot-bogi',
      workspace: '~/clawd-bogi',
      description: 'Personal assistant for Bogi',
    },
  ];

  return (
    <div className="dashboard-content">
      <div className="bot-cards-container">
        {bots.map((bot) => (
          <BotCard key={bot.name} {...bot} />
        ))}
      </div>
      <MiniMetricsBar />
    </div>
  );
}
