# Implementation Plan - Clawd Dashboard

## Project Goal (JTBD)

Build a system monitoring dashboard that displays machine metrics (CPU, memory, disk, uptime) and provides embedded chat access to Clawdbot instances (Bernard on :19001, Moni on :19002).

## Phase 1: Core Infrastructure ✅

- [x] Initialize Next.js 16 project with TypeScript + Tailwind
- [x] Set up shadcn/ui with required components
- [x] Install systeminformation package
- [x] Create specs documentation

## Phase 2: API Layer

- [ ] **Task 2.1:** Create `/api/metrics` route
  - Fetch CPU, memory, disk, network, system info via systeminformation
  - Return typed JSON response
  - Handle errors gracefully
  - Files: `src/app/api/metrics/route.ts`, `src/lib/metrics.ts`

- [ ] **Task 2.2:** Create types for metrics
  - Define TypeScript interfaces matching API response
  - Files: `src/types/metrics.ts`

## Phase 3: Layout & Navigation

- [ ] **Task 3.1:** Create root layout with sidebar
  - Dark mode by default
  - Collapsible sidebar
  - Files: `src/app/layout.tsx`, `src/components/layout/Sidebar.tsx`

- [ ] **Task 3.2:** Create header component
  - Logo/title, current time display
  - Files: `src/components/layout/Header.tsx`

## Phase 4: Dashboard Components

- [ ] **Task 4.1:** Create MetricCard component
  - Reusable card with circular/radial progress
  - Color coding based on value thresholds
  - Files: `src/components/dashboard/MetricCard.tsx`

- [ ] **Task 4.2:** Create SystemMetrics component
  - Fetches and displays CPU, Memory, Disk metrics
  - Auto-refresh with polling (every 3s)
  - Files: `src/components/dashboard/SystemMetrics.tsx`

- [ ] **Task 4.3:** Create UptimeDisplay component
  - Formatted uptime with live second counter
  - Files: `src/components/dashboard/UptimeDisplay.tsx`

- [ ] **Task 4.4:** Create SystemInfo component
  - Hostname, OS, kernel, IP addresses
  - Files: `src/components/dashboard/SystemInfo.tsx`

## Phase 5: Dashboard Home Page

- [ ] **Task 5.1:** Implement home page
  - Grid layout with metric cards
  - System info section
  - Files: `src/app/page.tsx`

## Phase 6: Chat Integration

- [ ] **Task 6.1:** Create ChatEmbed component
  - Iframe wrapper with loading state
  - Error handling for unavailable services
  - Files: `src/components/chat/ChatEmbed.tsx`

- [ ] **Task 6.2:** Create Bernard chat page
  - Full-height chat embed
  - Files: `src/app/chat/bernard/page.tsx`

- [ ] **Task 6.3:** Create Moni chat page
  - Full-height chat embed
  - Files: `src/app/chat/moni/page.tsx`

## Phase 7: Polish & Testing

- [ ] **Task 7.1:** Add loading skeletons
- [ ] **Task 7.2:** Responsive design adjustments
- [ ] **Task 7.3:** Error boundaries
- [ ] **Task 7.4:** Test all features locally

## Phase 8: Deployment Config

- [ ] **Task 8.1:** Create systemd service file
- [ ] **Task 8.2:** Update README with setup instructions
- [ ] **Task 8.3:** Initial git commit and push

---

**STATUS:** IN PROGRESS

**Current Focus:** Phase 2 - API Layer

**Notes:**
- systeminformation must run server-side only
- Chat embeds use localhost URLs (not exposed externally)
- Consider WebSocket/SSE for real-time metrics in future iteration
