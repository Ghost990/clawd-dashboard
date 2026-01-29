import { SystemMetrics } from '@/components/dashboard/SystemMetrics';

export default function Home() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">System Overview</h2>
        <p className="text-slate-400">Real-time system metrics and status</p>
      </div>
      <SystemMetrics />
    </div>
  );
}
