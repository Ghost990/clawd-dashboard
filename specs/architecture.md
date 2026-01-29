# Architecture Spec

## Overview

Clawd Dashboard is a Next.js 16 web application that provides:
1. System monitoring (CPU, memory, disk, network, uptime)
2. Embedded Clawdbot chat interfaces via iframe
3. Real-time metrics updates via Server-Sent Events or polling

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **UI:** shadcn/ui components, Tailwind CSS v4
- **System Metrics:** `systeminformation` package (server-side only)
- **State:** React hooks + Server Components where possible

## Key Constraints

- `systeminformation` is server-side only (no browser support)
- Must use API routes for metrics fetching
- Chat embeds require specific localhost URLs from clawdbot-services

## Current Clawdbot Services (from clawdbot-services.md)

| Service | Port | Description |
|---------|------|-------------|
| clawdbot-ui | 19080 | Web management dashboard |
| clawdbot-bernard | 19001 | Dev partner assistant |
| clawdbot-moni | 19002 | Wedding planner assistant |

## File Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Dashboard home (system metrics)
│   ├── chat/
│   │   ├── bernard/page.tsx  # Bernard chat embed
│   │   └── moni/page.tsx     # Moni chat embed
│   └── api/
│       └── metrics/route.ts  # System metrics API endpoint
├── components/
│   ├── ui/                   # shadcn components
│   ├── dashboard/
│   │   ├── SystemMetrics.tsx # CPU, Memory, Disk cards
│   │   ├── UptimeDisplay.tsx # Uptime counter
│   │   └── MetricCard.tsx    # Reusable metric card
│   ├── chat/
│   │   └── ChatEmbed.tsx     # Iframe wrapper for chats
│   └── layout/
│       ├── Sidebar.tsx       # Navigation sidebar
│       └── Header.tsx        # Top header
└── lib/
    ├── utils.ts              # shadcn utils
    └── metrics.ts            # System metrics helpers
```
