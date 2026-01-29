# UI Design Spec

## Design Principles

1. **Clean & Modern** - Minimal, professional dashboard aesthetic
2. **Dark Mode First** - Primary dark theme with light mode support
3. **Information Dense** - Show metrics at a glance without clutter
4. **Responsive** - Works on desktop and tablet (mobile secondary)

## Color Scheme (shadcn defaults)

- Background: slate-900/950
- Cards: slate-800/900
- Accent: Blue/Cyan for metrics
- Success: Green (good metrics)
- Warning: Yellow/Orange (moderate usage)
- Danger: Red (high usage, errors)

## Layout

```
┌─────────────────────────────────────────────────┐
│ Header: Logo + Title + Time                     │
├─────────┬───────────────────────────────────────┤
│ Sidebar │ Main Content                          │
│         │                                       │
│ • Home  │ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│ • Bernard│ CPU 45% │ │ RAM 62% │ │ Disk 38%│  │
│ • Moni  │ └─────────┘ └─────────┘ └─────────┘  │
│         │                                       │
│ System  │ ┌───────────────────────────────────┐│
│ • Logs  │ │ Detailed Charts / Info            ││
│         │ │                                   ││
│         │ └───────────────────────────────────┘│
└─────────┴───────────────────────────────────────┘
```

## Dashboard Widgets

### Metric Cards
- Circular progress or radial gauge
- Large percentage number
- Label underneath
- Color coded by severity

### Uptime Display
- Large formatted time: "5d 12h 34m 21s"
- Subtle animation (counting seconds)

### System Info Card
- Hostname, OS, Kernel
- IP addresses
- Service status indicators

## Chat Pages

- Full height iframe (calc(100vh - header))
- Tab bar to switch between bots
- Sidebar collapses to icons on chat pages
- Optional: resizable split view

## Component Usage (shadcn)

- `Card` - metric containers
- `Badge` - status indicators
- `Button` - actions
- `Progress` - linear progress bars
- `Tabs` - navigation within pages
- `Skeleton` - loading states

## Animations

- Subtle transitions on metric updates
- Smooth sidebar collapse
- Loading skeletons with pulse animation
- Counter animation for uptime seconds

## Inspiration References

- Vercel Dashboard (clean, modern)
- Grafana (data dense)
- Linear (minimal, polished)
- Raycast (dark mode, clean)
