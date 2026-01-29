# Implementation Plan - Clawd Dashboard

## Project Goal (JTBD)

Build a system monitoring dashboard that displays machine metrics (CPU, memory, disk, uptime) and provides embedded chat access to Clawdbot instances (Bernard on :19001, Moni on :19002).

## Phase 1: Core Infrastructure ✅

- [x] Initialize Next.js 16 project with TypeScript + Tailwind
- [x] Set up shadcn/ui with required components
- [x] Install systeminformation package
- [x] Create specs documentation

## Phase 2: API Layer ✅

- [x] **Task 2.1:** Create `/api/metrics` route
  - Fetch CPU, memory, disk, network, system info via systeminformation
  - Return typed JSON response
  - Handle errors gracefully
  - Files: `src/app/api/metrics/route.ts`, `src/lib/metrics.ts`

- [x] **Task 2.2:** Create types for metrics
  - Define TypeScript interfaces matching API response
  - Files: `src/types/metrics.ts`

## Phase 3: Layout & Navigation ✅

- [x] **Task 3.1:** Create root layout with sidebar
  - Dark mode by default
  - Navigation between Dashboard, Bernard, Moni
  - Files: `src/app/layout.tsx`, `src/components/layout/Sidebar.tsx`

- [x] **Task 3.2:** Create header component
  - Title + live time display
  - Files: `src/components/layout/Header.tsx`

## Phase 4: Dashboard Components ✅

- [x] **Task 4.1:** Create MetricCard component
  - Circular SVG progress gauge
  - Color coding: green < 50% < yellow < 75% < orange < 90% < red
  - Files: `src/components/dashboard/MetricCard.tsx`

- [x] **Task 4.2:** Create SystemMetrics component
  - Fetches and displays CPU, Memory, Disk metrics
  - Auto-refresh with polling (every 3s)
  - Files: `src/components/dashboard/SystemMetrics.tsx`

- [x] **Task 4.3:** Create UptimeDisplay component
  - Formatted uptime with live second counter
  - Files: `src/components/dashboard/UptimeDisplay.tsx`

- [x] **Task 4.4:** Create SystemInfo component
  - Hostname, OS, kernel, IP addresses
  - Network interfaces with badges
  - Files: `src/components/dashboard/SystemInfo.tsx`

## Phase 5: Dashboard Home Page ✅

- [x] **Task 5.1:** Implement home page
  - 4-column grid with metric cards
  - System info section below
  - Files: `src/app/page.tsx`

## Phase 6: Chat Integration ✅

- [x] **Task 6.1:** Create ChatEmbed component
  - Iframe wrapper with loading skeleton
  - Error handling for unavailable services
  - Files: `src/components/chat/ChatEmbed.tsx`

- [x] **Task 6.2:** Create Bernard chat page
  - Full-height chat embed on port 19001
  - Files: `src/app/chat/bernard/page.tsx`

- [x] **Task 6.3:** Create Moni chat page
  - Full-height chat embed on port 19002
  - Files: `src/app/chat/moni/page.tsx`

## Phase 7: Polish & Testing ✅

- [x] **Task 7.1:** Add loading skeletons (in SystemMetrics and ChatEmbed)
- [x] **Task 7.2:** Responsive design (grid cols adjust to screen size)
- [x] **Task 7.3:** Error handling (API errors, chat load errors)
- [x] **Task 7.4:** Test all features locally - BUILD SUCCESSFUL

## Phase 8: Deployment Config ✅

- [x] **Task 8.1:** Create systemd service file (in README)
- [x] **Task 8.2:** Update README with setup instructions
- [x] **Task 8.3:** Initial git commit and push

---

**STATUS: COMPLETE** ✅

**Completed:** 2026-01-29

**Summary:**
All 8 phases completed. Dashboard fully functional with:
- Real-time system metrics (CPU, RAM, disk, uptime)
- Auto-refresh every 3 seconds
- Chat embeds for Bernard and Moni
- Dark mode UI with shadcn/ui components

**Future Enhancements:**
- WebSocket/SSE for real-time metrics (reduce polling)
- Collapsible sidebar
- Service status indicators (check if bots are running)
- Historical charts (requires storage)
