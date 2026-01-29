import { ChatEmbed } from '@/components/chat/ChatEmbed';

export const metadata = {
  title: 'Moni - Clawd Dashboard',
  description: 'Chat with Moni, your wedding planner',
};

export default function MoniChat() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ChatEmbed 
        botName="Moni" 
        port={19002}
        emoji="💒"
        description="Your wedding planner assistant"
      />
    </div>
  );
}
