#!/usr/bin/env bash
set -euo pipefail

# Ralph Building Loop for Clawd Dashboard
# Usage: ./ralph-loop.sh

MAX_ITERS=20
PLAN_SENTINEL='STATUS: COMPLETE'
LOG_FILE=".ralph/ralph.log"

mkdir -p .ralph

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Run this inside a git repo."
  exit 1
fi

touch PROMPT.md AGENTS.md IMPLEMENTATION_PLAN.md

echo "🚀 Starting Ralph Building Loop for Clawd Dashboard"
echo "📋 Max iterations: $MAX_ITERS"
echo "📁 Log: $LOG_FILE"
echo ""

for i in $(seq 1 "$MAX_ITERS"); do
  echo -e "\n=== Ralph iteration $i/$MAX_ITERS ===" | tee -a "$LOG_FILE"
  echo "$(date '+%Y-%m-%d %H:%M:%S')" | tee -a "$LOG_FILE"
  
  # Run Claude Code with the prompt
  claude --dangerously-skip-permissions "$(cat PROMPT.md)" 2>&1 | tee -a "$LOG_FILE"
  
  # Check completion
  if grep -Fq "$PLAN_SENTINEL" IMPLEMENTATION_PLAN.md; then
    echo "✅ Completion detected! All tasks done." | tee -a "$LOG_FILE"
    exit 0
  fi
  
  echo "⏳ Task completed, continuing to next..." | tee -a "$LOG_FILE"
  sleep 2
done

echo "❌ Max iterations ($MAX_ITERS) reached without completion." | tee -a "$LOG_FILE"
exit 1
