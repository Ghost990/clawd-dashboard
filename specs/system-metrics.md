# System Metrics Spec

## Required Metrics

### CPU
- Current usage percentage (per core + total)
- Temperature (if available)
- Model name, cores, speed

### Memory
- Total RAM
- Used RAM
- Free RAM
- Usage percentage
- Swap usage (optional)

### Disk
- Total space
- Used space
- Free space
- Usage percentage per mount point

### Network
- Network interfaces list
- Current upload/download speeds
- Total bytes transferred

### System Info
- Hostname
- OS name + version
- Kernel version
- Uptime (formatted: days, hours, minutes, seconds)
- Current time

## API Design

### GET /api/metrics

Returns all system metrics as JSON:

```typescript
interface MetricsResponse {
  cpu: {
    model: string;
    cores: number;
    speed: number;
    usage: number;        // 0-100
    temperature?: number; // Celsius
  };
  memory: {
    total: number;        // bytes
    used: number;
    free: number;
    usagePercent: number; // 0-100
  };
  disk: Array<{
    mount: string;
    total: number;
    used: number;
    free: number;
    usagePercent: number;
  }>;
  network: {
    interfaces: Array<{
      name: string;
      ip: string;
      rx: number;         // bytes received
      tx: number;         // bytes sent
    }>;
  };
  system: {
    hostname: string;
    os: string;
    kernel: string;
    uptime: number;       // seconds
    uptimeFormatted: string;
    timestamp: string;    // ISO date
  };
}
```

## Update Strategy

- Initial load: Server Component fetch
- Real-time updates: Client polling every 2-5 seconds
- Consider Server-Sent Events for future optimization

## systeminformation Usage

```typescript
import si from 'systeminformation';

// CPU
const cpu = await si.cpu();
const cpuLoad = await si.currentLoad();
const cpuTemp = await si.cpuTemperature();

// Memory
const mem = await si.mem();

// Disk
const fsSize = await si.fsSize();

// Network
const networkStats = await si.networkStats();
const networkInterfaces = await si.networkInterfaces();

// System
const osInfo = await si.osInfo();
const time = si.time(); // sync function
```
