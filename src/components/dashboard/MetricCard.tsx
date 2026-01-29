'use client';

import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number;
  maxValue?: number;
  unit?: string;
  icon?: string;
  subtitle?: string;
}

function getColorClass(percent: number): string {
  if (percent >= 90) return 'text-red-400';
  if (percent >= 75) return 'text-orange-400';
  if (percent >= 50) return 'text-yellow-400';
  return 'text-cyan-400';
}

function getStrokeColor(percent: number): string {
  if (percent >= 90) return '#f87171';
  if (percent >= 75) return '#fb923c';
  if (percent >= 50) return '#facc15';
  return '#00d4ff';
}

function getGaugeClass(percent: number): string {
  if (percent >= 90) return 'gauge-red';
  if (percent >= 75) return 'gauge-orange';
  if (percent >= 50) return 'gauge-yellow';
  return 'gauge-green';
}

export function MetricCard({ title, value, maxValue = 100, unit = '%', icon, subtitle }: MetricCardProps) {
  const percent = Math.min((value / maxValue) * 100, 100);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="glass-card rounded-2xl p-6 gradient-border hover:scale-[1.02] transition-transform">
      <div className="flex items-center gap-2 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={cn("relative w-28 h-28", getGaugeClass(percent))}>
          <svg className="w-28 h-28 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="56"
              cy="56"
              r={radius}
              fill="none"
              stroke={getStrokeColor(percent)}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('metric-value-sm', getColorClass(percent))}>
              {Math.round(value)}<span className="text-lg">{unit}</span>
            </span>
          </div>
        </div>
        
        {subtitle && (
          <div className="text-right flex-1 ml-4">
            <p className="text-sm text-slate-500 leading-relaxed">{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
}
