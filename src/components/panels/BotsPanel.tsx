'use client';

import { BotControlCard } from '@/components/dashboard/BotControlCard';

const bots = [
  {
    name: 'Bernard',
    serviceName: 'openclaw-bernard',
    port: 19001,
    emoji: '🔧',
    description: 'Dev partner — coder, thinker, collaborator',
    workspace: '/home/ankyr/clawd',
    chatPath: '/chat/bernard',
  },
  {
    name: 'Moni',
    serviceName: 'openclaw-moni',
    port: 19002,
    emoji: '💒',
    description: 'Wedding planner assistant',
    workspace: '/home/ankyr/.openclaw-soul2',
    chatPath: '/chat/moni',
  },
];

export function BotsPanel() {
  return (
    <div className="space-y-4 p-1">
      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span>🤖</span> Bot Controls
      </h3>
      <div className="space-y-4 max-h-[60vh] overflow-auto pr-2 custom-scrollbar">
        {bots.map((bot) => (
          <BotControlCard key={bot.name} {...bot} compact />
        ))}
      </div>
    </div>
  );
}
