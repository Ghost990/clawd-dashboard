# AGENTS.md - Clawd Dashboard

## Project Overview

System monitoring dashboard with embedded Clawdbot chat interfaces.

**Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, systeminformation

## Commands

### Development
```bash
npm run dev          # Start dev server (default: http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Testing
```bash
npm run build && npm run start   # Full build test
curl http://localhost:3000/api/metrics   # Test API endpoint
```

## Key Dependencies

- `systeminformation` - Server-side system metrics (CPU, RAM, disk, network)
- `shadcn/ui` - UI components (card, button, badge, progress, tabs, skeleton)

## File Conventions

- Components: `src/components/{category}/{ComponentName}.tsx`
- Pages: `src/app/{route}/page.tsx`
- API routes: `src/app/api/{endpoint}/route.ts`
- Types: `src/types/{name}.ts`
- Utils: `src/lib/{name}.ts`

## Important Notes

### systeminformation
- **Server-side only** - Cannot run in browser
- Must be called from API routes or Server Components
- Some functions are async, some sync (e.g., `si.time()`)

### Chat Embeds
- Bernard: http://127.0.0.1:19001
- Moni: http://127.0.0.1:19002
- Use iframe with full viewport height

### Styling
- Dark mode is default
- Use shadcn/ui components where possible
- Tailwind for custom styling
- CSS variables defined in globals.css

## Specs Reference

Read these for detailed requirements:
- `specs/architecture.md` - File structure, tech stack
- `specs/system-metrics.md` - Metrics API design
- `specs/chat-integration.md` - Chat iframe setup
- `specs/ui-design.md` - Visual design guidelines

## Git Workflow

- Commit after completing each task
- Use clear commit messages: "feat: add metrics API route"
- Keep commits atomic (one feature/fix per commit)

## Troubleshooting

### "systeminformation is not defined"
- Ensure import is in server-side code only
- Use dynamic import if needed: `const si = await import('systeminformation')`

### CORS/iframe issues
- localhost should not have CORS issues
- If chat doesn't load, check if service is running: `systemctl status clawdbot-bernard`
