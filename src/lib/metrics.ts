import si from 'systeminformation';
import type { MetricsResponse, CpuMetrics, MemoryMetrics, DiskMetrics, NetworkInterface, SystemInfo } from '@/types/metrics';

function formatUptime(seconds: number): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);

  return parts.join(' ');
}

export async function getSystemMetrics(): Promise<MetricsResponse> {
  const [cpu, cpuLoad, cpuTemp, mem, fsSize, networkStats, networkInterfaces, osInfo] = await Promise.all([
    si.cpu(),
    si.currentLoad(),
    si.cpuTemperature(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.networkInterfaces(),
    si.osInfo(),
  ]);

  const time = si.time();

  const cpuMetrics: CpuMetrics = {
    model: cpu.brand || cpu.manufacturer,
    cores: cpu.cores,
    physicalCores: cpu.physicalCores,
    speed: cpu.speed,
    usage: Math.round(cpuLoad.currentLoad * 10) / 10,
    temperature: cpuTemp.main !== null ? cpuTemp.main : undefined,
  };

  // Use 'active' memory for more accurate usage (excludes buffers/cache)
  const actualUsed = mem.active || mem.used;
  const memoryMetrics: MemoryMetrics = {
    total: mem.total,
    used: actualUsed,
    free: mem.available || mem.free,
    usagePercent: Math.round((actualUsed / mem.total) * 1000) / 10,
    swapTotal: mem.swaptotal,
    swapUsed: mem.swapused,
  };

  const diskMetrics: DiskMetrics[] = fsSize
    .filter((fs) => fs.size > 0 && !fs.mount.startsWith('/snap'))
    .map((fs) => ({
      mount: fs.mount,
      type: fs.type,
      total: fs.size,
      used: fs.used,
      free: fs.available,
      usagePercent: Math.round(fs.use * 10) / 10,
    }));

  const networkMetrics: NetworkInterface[] = (Array.isArray(networkInterfaces) ? networkInterfaces : [])
    .filter((iface) => !iface.internal && iface.ip4)
    .map((iface) => {
      const stats = (Array.isArray(networkStats) ? networkStats : []).find((s) => s.iface === iface.iface);
      return {
        name: iface.iface,
        ip4: iface.ip4,
        ip6: iface.ip6 || '',
        mac: iface.mac,
        rx: stats?.rx_bytes || 0,
        tx: stats?.tx_bytes || 0,
        rxSec: stats?.rx_sec || 0,
        txSec: stats?.tx_sec || 0,
      };
    });

  const systemInfo: SystemInfo = {
    hostname: osInfo.hostname,
    os: osInfo.distro || osInfo.platform,
    osVersion: osInfo.release,
    kernel: osInfo.kernel,
    arch: osInfo.arch,
    uptime: time.uptime,
    uptimeFormatted: formatUptime(time.uptime),
    timestamp: new Date().toISOString(),
  };

  return {
    cpu: cpuMetrics,
    memory: memoryMetrics,
    disks: diskMetrics,
    network: networkMetrics,
    system: systemInfo,
  };
}
