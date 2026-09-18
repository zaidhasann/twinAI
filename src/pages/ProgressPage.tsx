import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Code2,
  BookOpen,
  Clock,
  Mic,
  Award,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MOCK_PROGRESS_HISTORY } from '../data/mockData';

export const ProgressPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7 Days' | '30 Days' | '3 Months' | '1 Year'>('30 Days');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#2E9D6B]/10 border border-indigo-500/20 text-[#2E9D6B]">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Your Progress
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Empirical historical trajectory of your career readiness, problem solving throughput, and study velocity.
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1 bg-[#232A30] border border-white/[0.08] p-1 rounded-xl self-start sm:self-auto">
          {(['7 Days', '30 Days', '3 Months', '1 Year'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${timeframe === t ? 'bg-[#2E9D6B] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Readiness Growth Chart */}
      <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white">Placement Readiness Trajectory</h3>
            <p className="text-xs text-gray-400">Comparing your growth against average target company hiring benchmark</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-gray-300">
              <span className="w-3 h-3 rounded-full bg-[#2E9D6B]" />
              <span>Alex's Readiness</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400">
              <span className="w-3 h-0.5 bg-gray-500" />
              <span>Benchmark (75%)</span>
            </div>
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_PROGRESS_HISTORY.readiness}>
              <defs>
                <linearGradient id="readinessGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E9D6B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2E9D6B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="period" stroke="#6B7280" fontSize={11} />
              <YAxis domain={[40, 100]} stroke="#6B7280" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#171B1F',
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#2E9D6B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#readinessGradient)"
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#6B7280"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Charts: Study Hours per day & Problems Solved */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Study Hours */}
        <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Weekly Study Hours</h3>
              <p className="text-xs text-gray-400">Average: 4.3 hrs/day</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#7ED6A5]/10 text-[#7ED6A5]">
              +14% vs Last Week
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PROGRESS_HISTORY.studyHours}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171B1F',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="hours" fill="#7ED6A5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Problems Solved */}
        <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">DSA Problems Solved</h3>
              <p className="text-xs text-gray-400">Total: 187 problems</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300">
              62 solved this week
            </span>
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PROGRESS_HISTORY.problemsSolved}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="period" stroke="#6B7280" fontSize={11} />
                <YAxis stroke="#6B7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#171B1F',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#2E9D6B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
