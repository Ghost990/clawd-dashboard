import { ChatEmbed } from '@/components/chat/ChatEmbed';

export const metadata = {
  title: 'Bernard - Clawd Dashboard',
  description: 'Chat with Bernard, your dev partner',
};

export default function BernardChat() {
  return (
    <div className="h-[calc(100vh-3.5rem)]">
      <ChatEmbed 
        botName="Bernard" 
        port={19001} 
        emoji="🔧"
        description="Your dev partner — coder, thinker, collaborator"
      />
    </div>
  );
}
