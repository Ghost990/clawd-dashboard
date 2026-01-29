# Clawd Dashboard

System monitoring dashboard with embedded Clawdbot chat interfaces.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## Features

- 📊 **Real-time System Metrics** - CPU, memory, disk, network stats with auto-refresh
- ⏱️ **Live Uptime Counter** - Formatted uptime with animated seconds
- 💬 **Embedded Chat** - Full-height iframe integration for Clawdbot instances
- 🌙 **Dark Mode** - Clean, modern dark theme
- 🎨 **shadcn/ui** - Beautiful, accessible components

## Screenshots

### Dashboard
Shows CPU, memory, disk usage with circular gauges, uptime counter, and system information.

### Chat Integration
Full-height chat embed for Bernard (dev partner) and Moni (wedding planner) bots.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Ghost990/clawd-dashboard.git
cd clawd-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

The dashboard expects Clawdbot instances running on:
- **Bernard**: http://127.0.0.1:19001
- **Moni**: http://127.0.0.1:19002

See [clawdbot-services.md](/home/ankyr/clawdbot-services.md) for systemd service setup.

## API Endpoints

### GET /api/metrics

Returns system metrics as JSON:

```json
{
  "cpu": { "usage": 45.2, "cores": 4, "speed": 2.4, "temperature": 65 },
  "memory": { "usagePercent": 62.3, "total": 16000000000, "used": 9968000000 },
  "disks": [{ "mount": "/", "usagePercent": 38.1, "total": 512000000000 }],
  "network": [{ "name": "eth0", "ip4": "192.168.1.100" }],
  "system": { "hostname": "server", "os": "Ubuntu 22.04", "uptime": 86400 }
}
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Metrics**: systeminformation

## Development

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment as systemd Service

Create `/etc/systemd/system/clawd-dashboard.service`:

```ini
[Unit]
Description=Clawd Dashboard
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=ankyr
WorkingDirectory=/home/ankyr/clawd-dashboard
Environment=HOME=/home/ankyr
Environment=PATH=/home/linuxbrew/.linuxbrew/bin:/usr/local/bin:/usr/bin:/bin
Environment=PORT=3000
ExecStart=/home/linuxbrew/.linuxbrew/bin/npm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl daemon-reload
sudo systemctl enable clawd-dashboard
sudo systemctl start clawd-dashboard
```

## License

MIT
