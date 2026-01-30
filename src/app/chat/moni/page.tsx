import { ChatEmbed } from '@/components/chat/ChatEmbed';

export const metadata = {
  title: 'Moni - Clawd Dashboard',
  description: 'Chat with Moni, your wedding planner',
};

// Token from ~/.openclaw-soul2/openclaw.json
const MONI_TOKEN = 'fc2efb0bac7f65361d2d4315ffe107dc844ad1d383de11f3';

export default function MoniChat() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ChatEmbed 
        botName="Moni" 
        port={19002}
        token={MONI_TOKEN}
      />
    </div>
  );
}
