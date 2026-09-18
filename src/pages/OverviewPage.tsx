import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowUpRight,
  Target,
  Code2,
  FolderGit2,
  Mic,
  FileCheck2,
  Flame,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../components/MetricCard';
import { AIInsightCard } from '../components/AIInsightCard';
import { SkillRadarCard } from '../components/SkillRadarCard';
import { DailyPlanCard } from '../components/DailyPlanCard';
import { CompanyCard } from '../components/CompanyCard';
import {
  getStudentProfile,
  getSkillAnalysis,
  getDailyPlan,
  getCompanyMatches
} from '../services/apiService';
import { StudentProfile, SkillRadarItem, DailyTask, CompanyMatch } from '../types';

export const OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [radarData, setRadarData] = useState<SkillRadarItem[]>([]);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [companies, setCompanies] = useState<CompanyMatch[]>([]);

  useEffect(() => {
    Promise.all([
      getStudentProfile(),
      getSkillAnalysis(),
      getDailyPlan(),
      getCompanyMatches()
    ]).then(([p, s, d, c]) => {
      setProfile(p);
      setRadarData(s.radar);
      setDailyTasks(d);
      setCompanies(c);
      setLoading(false);
    });
  }, []);

  const handleTaskToggle = (id: string) => {
    setDailyTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: t.status === 'completed' ? 'pending' : 'completed'
            }
          : t
      )
    );
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-white/[0.05] rounded-xl w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-56 bg-white/[0.05] rounded-xl md:col-span-2" />
          <div className="h-56 bg-white/[0.05] rounded-xl" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-white/[0.05] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Good morning, {profile?.name.split(' ')[0]} ??</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
            Your Digital Twin analysed your recent activity across GitHub, LeetCode, and mock tests. Here's where you stand today.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => navigate('/digital-twin')}
            className="bg-[#232A30] border border-white/[0.1] hover:border-indigo-500/40 text-xs text-gray-200 hover:text-white px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8B6FC7]" />
            <span>Sync Digital Twin</span>
          </button>
          <button
            onClick={() => navigate('/progress')}
            className="bg-[#8B6FC7] hover:bg-[#7357AB] text-xs font-semibold text-white px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Full Report</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Feature Highlight: Placement Readiness Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Hero Card: Placement Readiness Gauge */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#232A30] to-[#273036] border border-white/[0.1] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Placement Readiness
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7ED6A5]/15 text-[#7ED6A5] border border-teal-500/20">
                ? On Track
              </span>
            </div>

            {/* Circular Gauge Representation */}
            <div className="flex items-center justify-center my-6">
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* SVG circular progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-gray-800"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-[#8B6FC7] transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - (profile?.stats.placementReadiness || 78) / 100)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    {profile?.stats.placementReadiness}%
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium mt-0.5">
                    Ready for 3 Target Roles
                  </span>
                </div>
              </div>
            </div>

            {/* Stat comparison footnote */}
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-[#171B1F]/70 border border-white/[0.04]">
              <div className="flex items-center gap-1.5 text-[#7ED6A5] font-semibold">
                <ArrowUpRight className="w-4 h-4" />
                <span>? 6% from last month</span>
              </div>
              <span className="text-gray-400">Benchmark: 75%</span>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-white/[0.08] relative z-10">
            <button
              onClick={() => navigate('/progress')}
              className="w-full bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>View detailed analysis</span>
              <span>?</span>
            </button>
          </div>
        </div>

        {/* Right Section: AI Career Insight Card */}
        <div className="lg:col-span-7">
          <AIInsightCard onExplore={() => navigate('/skills')} />
        </div>
      </div>

      {/* 6 Key Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
            Diagnostic Performance Indicators
          </h2>
          <span className="text-xs text-gray-500">Realtime twin sync</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <MetricCard
            title="Skills Overall"
            value="72%"
            delta="? 8%"
            deltaPositive={true}
            statusText="Broad Coverage"
            statusColor="teal"
            icon={<Target className="w-4 h-4" />}
          />
          <MetricCard
            title="DSA Score"
            value="81%"
            statusText="Strong"
            statusColor="teal"
            icon={<Code2 className="w-4 h-4" />}
            subtitle="187 solves (92 Easy, 76 Med)"
          />
          <MetricCard
            title="Projects"
            value="76%"
            statusText="Good"
            statusColor="teal"
            icon={<FolderGit2 className="w-4 h-4" />}
            subtitle="5 active GitHub repos"
          />
          <MetricCard
            title="Interview Readiness"
            value="64%"
            statusText="Needs improvement"
            statusColor="amber"
            icon={<Mic className="w-4 h-4" />}
            subtitle="Edge cases & confidence"
          />
          <MetricCard
            title="Resume Score"
            value="86/100"
            statusText="Excellent ATS"
            statusColor="teal"
            icon={<FileCheck2 className="w-4 h-4" />}
            subtitle="48 keywords verified"
          />
          <MetricCard
            title="Consistency"
            value="84%"
            statusText="12-day streak"
            statusColor="amber"
            icon={<Flame className="w-4 h-4 text-[#F4B860]" />}
            subtitle="Active study cadence"
          />
        </div>
      </div>

      {/* Skills Radar & Daily Plan Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SkillRadarCard data={radarData} />
        </div>
        <div className="lg:col-span-5">
          <DailyPlanCard tasks={dailyTasks} onTaskToggle={handleTaskToggle} />
        </div>
      </div>

      {/* Company Matches Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Companies You're Ready For
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Ranked by compatibility with your current verified skill profile
            </p>
          </div>
          <button
            onClick={() => navigate('/companies')}
            className="text-xs text-[#8B6FC7] hover:text-indigo-300 font-semibold cursor-pointer"
          >
            Explore all companies ({companies.length}) ?
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
    </div>
  );
};
