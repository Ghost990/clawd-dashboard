'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  if (percent >= 90) return 'text-red-500';
  if (percent >= 75) return 'text-orange-500';
  if (percent >= 50) return 'text-yellow-500';
  return 'text-green-500';
}

function getProgressColor(percent: number): string {
  if (percent >= 90) return 'bg-red-500';
  if (percent >= 75) return 'bg-orange-500';
  if (percent >= 50) return 'bg-yellow-500';
  return 'bg-green-500';
}

export function MetricCard({ title, value, maxValue = 100, unit = '%', icon, subtitle }: MetricCardProps) {
  const percent = Math.min((value / maxValue) * 100, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-800"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className={cn('transition-all duration-500', getProgressColor(percent))}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('text-xl font-bold', getColorClass(percent))}>
              {Math.round(value)}{unit}
            </span>
          </div>
        </div>
        {subtitle && (
          <div className="text-right">
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
