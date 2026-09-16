import React, { useState, useEffect } from 'react';
import { getInterviewAnalytics } from '../services/apiService';
import { InterviewAnalytics } from '../types';
import {
  Mic,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  TrendingUp,
  Volume2
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useToast } from '../components/ToastProvider';

export const InterviewsPage: React.FC = () => {
  const [data, setData] = useState<InterviewAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getInterviewAnalytics().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handlePracticeAgain = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      showToast(
        'Interactive Mock Session Initiated',
        'TwinAI AI Interviewer is loading questions for DSA + System Design',
        'indigo'
      );
    }, 1000);
  };

  if (loading || !data) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 bg-white/[0.05] rounded-xl w-1/3" />
        <div className="h-44 bg-white/[0.05] rounded-2xl" />
        <div className="h-64 bg-white/[0.05] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#D6A05A]/10 border border-amber-500/20 text-[#D6A05A]">
              <Mic className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Interview Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Speech analytics, behavioral evaluation, and live coding performance metrics derived from your mock rounds.
          </p>
        </div>

        <button
          onClick={handlePracticeAgain}
          disabled={isSimulating}
          className="bg-[#C56A4A] hover:bg-[#A94F36] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isSimulating ? 'Starting Session...' : 'Practice Again'}</span>
        </button>
      </div>

      {/* Main Score & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Overall Interview Readiness Score */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#3A2A22] to-[#3D2B22] border border-white/[0.1] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Interview Readiness
            </span>
            <div className="text-5xl font-extrabold text-[#D6A05A] my-3 tracking-tight">
              {data.overallScore}%
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-[#D6A05A] border border-amber-500/20">
              ? Needs improvement
            </span>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Currently 11% below the 75% bar required for direct Tier-1 engineering rounds.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.06] text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Total Mock Sessions:</span>
              <span className="text-white font-bold">8 sessions</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Last Evaluated:</span>
              <span className="text-white font-medium">5 days ago</span>
            </div>
          </div>
        </div>

        {/* Weekly Progress Line Chart */}
        <div className="lg:col-span-8 bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
                Interview Progress Over Time
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">Trajectory across recent technical & behavioral mock assessments</p>
            </div>
            <span className="text-xs font-semibold text-[#91A889] bg-[#91A889]/10 px-2 py-0.5 rounded-full">
              +19% past month
            </span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" stroke="#6B7280" fontSize={11} />
                <YAxis domain={[40, 100]} stroke="#6B7280" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2A1E18',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#C56A4A"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#C56A4A', stroke: '#fff', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Subscores Breakdown */}
      <div className="bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
          Competency Evaluation Rubric
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-[#2A1E18] p-4 rounded-xl border border-white/[0.06] space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Technical</span>
              <span className="text-[#91A889] font-bold">{data.breakdown.technical}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#91A889] h-full rounded-full" style={{ width: ` ${data.breakdown.technical}%` }} />
            </div>
          </div>

          <div className="bg-[#2A1E18] p-4 rounded-xl border border-white/[0.06] space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Communication</span>
              <span className="text-[#91A889] font-bold">{data.breakdown.communication}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#91A889] h-full rounded-full" style={{ width: ` ${data.breakdown.communication}%` }} />
            </div>
          </div>

          <div className="bg-[#2A1E18] p-4 rounded-xl border border-white/[0.06] space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Problem Solving</span>
              <span className="text-[#91A889] font-bold">{data.breakdown.problemSolving}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#91A889] h-full rounded-full" style={{ width: ` ${data.breakdown.problemSolving}%` }} />
            </div>
          </div>

          <div className="bg-[#2A1E18] p-4 rounded-xl border border-amber-500/20 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Confidence</span>
              <span className="text-[#D6A05A] font-bold">{data.breakdown.confidence}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#D6A05A] h-full rounded-full" style={{ width: ` ${data.breakdown.confidence}%` }} />
            </div>
          </div>

          <div className="bg-[#2A1E18] p-4 rounded-xl border border-amber-500/20 space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>CS Fundamentals</span>
              <span className="text-[#D6A05A] font-bold">{data.breakdown.csFundamentals}%</span>
            </div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#D6A05A] h-full rounded-full" style={{ width: ` ${data.breakdown.csFundamentals}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* AI Feedback & Actionable Coaching */}
      <div className="bg-gradient-to-br from-[#3A2A22] to-[#3D2B22] border border-amber-500/30 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-[#D6A05A]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AI Interview Feedback</h3>
            <p className="text-xs text-gray-400">Synthesized from latest 45-minute mock simulation</p>
          </div>
        </div>

        {/* Narrative Feedback */}
        <div className="p-4 rounded-xl bg-[#2A1E18]/90 border border-amber-500/20 text-xs sm:text-sm text-gray-200 leading-relaxed">
          {data.aiFeedback}
        </div>

        {/* Strengths vs Growth Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div className="font-bold text-[#91A889] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Observed Strengths
            </div>
            <ul className="space-y-1.5 text-gray-300">
              {data.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#91A889]">�</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-[#D6A05A] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Key Areas to Improve
            </div>
            <ul className="space-y-1.5 text-gray-300">
              {data.growthAreas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#D6A05A]">�</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
