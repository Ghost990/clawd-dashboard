# PROMPT.md - Ralph Building Loop

You are running a Ralph BUILDING loop for: **Clawd Dashboard**

## Goal (JTBD)

Build a system monitoring dashboard (Next.js) that:
1. Shows real-time system metrics (CPU, memory, disk, network, uptime)
2. Embeds Clawdbot chat interfaces (Bernard :19001, Moni :19002)
3. Has clean, modern dark-mode UI using shadcn/ui components

## Context Files

Read these before starting:
- `IMPLEMENTATION_PLAN.md` - Current tasks and progress
- `AGENTS.md` - Commands, conventions, troubleshooting
- `specs/*.md` - Detailed specifications

## Your Tasks

1. **Pick the next incomplete task** from `IMPLEMENTATION_PLAN.md`
2. **Read relevant specs** for that task
3. **Implement** the feature/component
4. **Test** using commands from `AGENTS.md`
5. **Update** `IMPLEMENTATION_PLAN.md` (mark task done, add notes)
6. **Commit** with a clear message

## Rules

- Follow file conventions from `AGENTS.md`
- Use shadcn/ui components from `src/components/ui/`
- Keep `systeminformation` server-side only
- Write TypeScript with proper types
- Test before marking complete

## Completion

When ALL tasks in `IMPLEMENTATION_PLAN.md` are complete, add this line at the bottom:

```
STATUS: COMPLETE
```

---

**Start by reading `IMPLEMENTATION_PLAN.md` to find your next task.**
