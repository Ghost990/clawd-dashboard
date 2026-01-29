export interface CpuMetrics {
  model: string;
  cores: number;
  physicalCores: number;
  speed: number;
  usage: number;
  temperature?: number;
}

export interface MemoryMetrics {
  total: number;
  used: number;
  free: number;
  usagePercent: number;
  swapTotal: number;
  swapUsed: number;
}

export interface DiskMetrics {
  mount: string;
  type: string;
  total: number;
  used: number;
  free: number;
  usagePercent: number;
}

export interface NetworkInterface {
  name: string;
  ip4: string;
  ip6: string;
  mac: string;
  rx: number;
  tx: number;
  rxSec: number;
  txSec: number;
}

export interface SystemInfo {
  hostname: string;
  os: string;
  osVersion: string;
  kernel: string;
  arch: string;
  uptime: number;
  uptimeFormatted: string;
  timestamp: string;
}

export interface MetricsResponse {
  cpu: CpuMetrics;
  memory: MemoryMetrics;
  disks: DiskMetrics[];
  network: NetworkInterface[];
  system: SystemInfo;
}
