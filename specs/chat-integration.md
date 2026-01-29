# Chat Integration Spec

## Overview

Embed Clawdbot chat interfaces via iframes. Each bot has its own page for full-screen chat experience.

## Available Bots

| Bot | Port | URL | Description |
|-----|------|-----|-------------|
| Bernard | 19001 | http://127.0.0.1:19001 | Dev partner |
| Moni | 19002 | http://127.0.0.1:19002 | Wedding planner |

## Implementation

### ChatEmbed Component

```tsx
interface ChatEmbedProps {
  botName: string;
  port: number;
  className?: string;
}

// Full-height iframe with proper styling
// Handle loading states with skeleton
// Error boundary for connection issues
```

### Navigation

- Sidebar should show both bots with status indicator
- Quick-switch tabs on chat pages
- Badge showing unread/activity (future feature)

## Security Considerations

- Same-origin for localhost
- No CORS issues expected
- Content Security Policy: allow frame-src for localhost

## UI Requirements

- Full viewport height for chat
- Responsive: stack on mobile, side-by-side on large screens
- Loading skeleton while iframe loads
- Error state if bot service is down
- Optional: split view with both chats visible
