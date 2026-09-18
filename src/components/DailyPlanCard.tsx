import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Zap, MoreHorizontal } from 'lucide-react';
import { DailyTask } from '../types';
import { useToast } from './ToastProvider';

interface DailyPlanCardProps {
  tasks: DailyTask[];
  onTaskToggle?: (taskId: string) => void;
}

const categoryColors: Record<string, string> = {
  dsa: '#2E9D6B',
  project: '#7ED6A5',
  resume: '#F4B860',
  interview: '#F28BA8',
  learning: '#10B981',
};

const categoryBg: Record<string, string> = {
  dsa: 'bg-[#2E9D6B]/10 text-[#BFEAD4]',
  project: 'bg-[#7ED6A5]/10 text-[#7ED6A5]',
  resume: 'bg-[#F4B860]/10 text-[#F4B860]',
  interview: 'bg-pink-500/10 text-pink-400',
  learning: 'bg-emerald-500/10 text-emerald-400',
};

export function DailyPlanCard({ tasks, onTaskToggle }: DailyPlanCardProps) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const { showToast } = useToast();

  const completed = localTasks.filter(t => t.status === 'completed').length;
  const progress = localTasks.length > 0 ? Math.round((completed / localTasks.length) * 100) : 0;

  const toggle = (id: string) => {
    setLocalTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const next = t.status !== 'completed';
          if (next) showToast('Task completed! Keep going 🔥', 'success');
          return { ...t, status: next ? 'completed' : 'pending' };
        }
        return t;
      })
    );
    onTaskToggle?.(id);
  };

  return (
    <div className="bg-[#232A30] border border-white/[0.06] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Today's Plan</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {completed}/{localTasks.length} tasks completed
          </p>
        </div>
        <div className="relative w-10 h-10">
          <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="#2E9D6B"
              strokeWidth="3"
              strokeDasharray={'94.2 94.2'}
              strokeDashoffset={94.2 - (94.2 * progress) / 100}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
            {progress}%
          </span>
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {localTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer group ${
              task.status === 'completed'
                ? 'border-white/[0.04] bg-white/[0.02] opacity-60'
                : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]'
            }`}
            onClick={() => toggle(task.id)}
          >
            <button className="shrink-0">
              {task.status === 'completed' ? (
                <CheckCircle2 className="w-4.5 h-4.5 text-[#7ED6A5]" />
              ) : (
                <Circle className="w-4.5 h-4.5 text-gray-500 group-hover:text-gray-300 transition-colors" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                {task.title}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${categoryBg[task.type] ?? 'bg-gray-700 text-gray-300'}`}>
                  {task.type}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Clock className="w-3 h-3" />
                  {task.timeEstimate}
                </span>
              </div>
            </div>

            {task.priority && (
              <div className="flex items-center gap-1 shrink-0">
                <Zap className="w-3 h-3 text-[#F4B860]" />
                <span className="text-[10px] font-medium text-[#F4B860]">{task.priority}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
