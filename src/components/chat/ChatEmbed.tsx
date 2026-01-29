'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ChatEmbedProps {
  botName: string;
  port: number;
  description?: string;
  emoji?: string;
}

export function ChatEmbed({ botName, port, description, emoji = '🤖' }: ChatEmbedProps) {
  const url = `http://127.0.0.1:${port}`;

  const openChat = () => {
    window.open(url, `${botName}-chat`, 'width=800,height=600');
  };

  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="bg-slate-900 border-slate-800 max-w-md w-full">
        <CardHeader className="text-center pb-2">
          <div className="text-6xl mb-4">{emoji}</div>
          <CardTitle className="text-2xl text-white">{botName}</CardTitle>
          {description && (
            <p className="text-slate-400 text-sm mt-2">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <Badge variant="outline" className="border-slate-700">
              Port {port}
            </Badge>
            <span>•</span>
            <span className="font-mono">{url}</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button 
              onClick={openChat}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              Open Chat in New Window
            </Button>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-sm text-slate-400 hover:text-white transition-colors"
            >
              Or open in new tab →
            </a>
          </div>

          <p className="text-xs text-slate-600 text-center">
            The Clawdbot UI requires authentication, so iframe embedding is not supported.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
