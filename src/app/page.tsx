import { SystemMetrics } from '@/components/dashboard/SystemMetrics';

export default function Home() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="heading-lg text-white mb-2">System Overview</h2>
        <p className="text-slate-500">Real-time metrics and system status</p>
      </div>
      <SystemMetrics />
    </div>
  );
}
