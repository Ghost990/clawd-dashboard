import { ChatEmbed } from '@/components/chat/ChatEmbed';

export const metadata = {
  title: 'Bernard - Clawd Dashboard',
  description: 'Chat with Bernard, your dev partner',
};

// Token from ~/.clawdbot-bernard/clawdbot.json
const BERNARD_TOKEN = 'cd560f6547565c179e2f6ad5892f66619aab035ce2813eca';

export default function BernardChat() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ChatEmbed 
        botName="Bernard" 
        port={19001} 
        token={BERNARD_TOKEN}
      />
    </div>
  );
}
