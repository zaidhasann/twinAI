import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface AIInsightCardProps {
  title?: string;
  insight?: string;
  priority?: 'high' | 'medium' | 'low';
  action?: string;
  onAction?: () => void;
  onExplore?: () => void;
}

const priorityConfig = {
  high: { dot: 'bg-red-400', label: 'High Priority', border: 'border-red-500/20' },
  medium: { dot: 'bg-[#D6A05A]', label: 'Medium Priority', border: 'border-[#D6A05A]/20' },
  low: { dot: 'bg-[#91A889]', label: 'Low Priority', border: 'border-[#91A889]/20' },
};

export function AIInsightCard({ title = 'TwinAI Insight', insight = 'Your latest career signals have been analyzed.', priority = 'medium', action = 'Explore', onAction, onExplore }: AIInsightCardProps) {
  const cfg = priorityConfig[priority];

  return (
    <div className={`bg-[#3A2A22] border ${cfg.border} rounded-2xl p-4 hover:border-white/[0.12] transition-all`}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C56A4A]/20 to-[#91A889]/20 border border-[#C56A4A]/30 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-4 h-4 text-[#C56A4A]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-white">{title}</h4>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} shrink-0`} />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">{insight}</p>
          {action && (
            <button
              onClick={onAction ?? onExplore}
              className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#C56A4A] hover:text-[#E8A58D] transition-colors"
            >
              {action}
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
