'use client';

import { useState, useEffect } from 'react';

interface BotCardProps {
  name: string;
  displayName: string;
  color: string;
  port: number;
  description: string;
  status?: 'online' | 'offline' | 'loading';
}

function MiniRobotFace({ color }: { color: string }) {
  return (
    <div className="mini-robot-face">
      <div className="mini-eye" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }} />
      <div className="mini-eye" style={{ backgroundColor: color, boxShadow: `0 0 20px ${color}40` }} />
    </div>
  );
}

function BotCard({ name, displayName, color, port, description, status = 'loading' }: BotCardProps) {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/bot-status?port=${port}`, { 
          method: 'GET',
          signal: AbortSignal.timeout(3000)
        });
        const data = await res.json();
        setCurrentStatus(data.online ? 'online' : 'offline');
      } catch {
        setCurrentStatus('offline');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [port]);

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
            <span className="info-label">ID</span>
            <span className="info-value">{name}</span>
          </div>
        </div>
        
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

export function BotCards() {
  const bots: BotCardProps[] = [
    {
      name: 'bernard',
      displayName: 'Bernard',
      color: '#00e5ff',
      port: 19001,
      description: 'Main assistant - coding, research, daily tasks',
    },
    {
      name: 'soul2',
      displayName: 'Moni',
      color: '#ff6b9d',
      port: 19002,
      description: 'Creative companion - ideas, fun, emotional support',
    },
    {
      name: 'lulu',
      displayName: 'Lulu',
      color: '#a78bfa',
      port: 19003,
      description: 'Personal assistant for Bogi',
    },
  ];

  return (
    <div className="bot-cards-container">
      {bots.map((bot) => (
        <BotCard key={bot.name} {...bot} />
      ))}
    </div>
  );
}
