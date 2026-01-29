'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ChatEmbedProps {
  botName: string;
  port: number;
  token: string;
}

export function ChatEmbed({ botName, port, token }: ChatEmbedProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const url = `http://127.0.0.1:${port}/?token=${token}`;

  return (
    <div className="h-full relative bg-slate-950">
      {loading && !error && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4 bg-slate-800" />
            <p className="text-slate-400">Loading {botName}...</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-10">
          <div className="text-center">
            <p className="text-red-500 mb-2">Failed to load {botName}</p>
            <p className="text-slate-500 text-sm mb-4">
              Make sure the service is running on port {port}
            </p>
            <code className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 block mb-4">
              systemctl status clawdbot-{botName.toLowerCase()}
            </code>
            <button 
              onClick={() => { setError(false); setLoading(true); }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-white text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <iframe
        src={url}
        className="w-full h-full border-0"
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        title={`${botName} Chat`}
        allow="microphone; clipboard-write"
      />
    </div>
  );
}
