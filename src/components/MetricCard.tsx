import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label?: string;
  title?: string;
  value: string | number;
  unit?: string;
  change?: number;
  delta?: string;
  deltaPositive?: boolean;
  statusText?: string;
  statusColor?: string;
  icon?: React.ReactNode;
  color?: string;
  subtitle?: string;
  progress?: number;
}

export function MetricCard({
  label,
  title,
  value,
  unit,
  change,
  delta,
  icon,
  color = '#C56A4A',
  subtitle,
  progress,
}: MetricCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div className="bg-[#3A2A22] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {icon && (
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: color + '18' }}
            >
              <span style={{ color }}>{icon}</span>
            </div>
          )}
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label ?? title}</p>
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-[#91A889]' : isNegative ? 'text-red-400' : 'text-gray-400'}`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <div className="flex items-end gap-1 mb-2">
        <span className="text-3xl font-bold text-white tracking-tight">{value}</span>
        {unit && <span className="text-sm text-gray-400 mb-1">{unit}</span>}
      </div>

      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}

      {progress !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: progress + '%', backgroundColor: color }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
