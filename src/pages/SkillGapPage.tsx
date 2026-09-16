import React, { useEffect, useState } from 'react';
import { getSkillAnalysis } from '../services/apiService';
import { SkillItem } from '../types';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const SkillGapPage: React.FC = () => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    getSkillAnalysis().then((res) => {
      setSkills(res.skills);
      setLoading(false);
    });
  }, []);

  const filteredSkills = skills.filter((s) => {
    if (activeFilter === 'all') return true;
    return s.priority === activeFilter;
  });

  const highPriority = skills.filter((s) => s.priority === 'high');
  const mediumPriority = skills.filter((s) => s.priority === 'medium');
  const lowPriority = skills.filter((s) => s.priority === 'low');

  const renderSkillCard = (skill: SkillItem) => {
    const isHigh = skill.priority === 'high';
    const isMedium = skill.priority === 'medium';
    const badgeColor = isHigh
      ? 'bg-amber-500/10 text-[#D6A05A] border-amber-500/30'
      : isMedium
      ? 'bg-indigo-500/10 text-[#C56A4A] border-indigo-500/30'
      : 'bg-teal-500/10 text-[#91A889] border-teal-500/30';

    return (
      <div
        key={skill.id}
        className="bg-[#3A2A22] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl p-6 flex flex-col justify-between transition-all group"
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${badgeColor}`}>
                {skill.priority} Priority Gap
              </span>
              <h3 className="text-lg font-bold text-white mt-1.5 group-hover:text-indigo-300 transition-colors">
                {skill.name}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">{skill.category}</p>
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-[#D6A05A] tracking-tight">
                -{skill.gap}%
              </div>
              <span className="text-[10px] text-gray-400 font-medium">placement gap</span>
            </div>
          </div>

          <div className="space-y-2 bg-[#2A1E18]/70 p-3.5 rounded-xl border border-white/[0.04]">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C56A4A]" />
                <span className="text-gray-300">Current: <strong className="text-white font-bold">{skill.currentScore}%</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#91A889]" />
                <span className="text-gray-300">Required: <strong className="text-white font-bold">{skill.requiredScore}%</strong></span>
              </div>
            </div>

            <div className="relative w-full bg-gray-800 h-2.5 rounded-full overflow-hidden">
              <div className="absolute top-0 bottom-0 bg-white/20 rounded-full z-0" style={{ width: `${skill.requiredScore}%` }} />
              <div className={`relative h-full rounded-full z-10 transition-all duration-700 ${isHigh ? 'bg-[#D6A05A]' : isMedium ? 'bg-[#C56A4A]' : 'bg-[#91A889]'  }`} style={{ width: `${skill.currentScore}%` }} />
            </div>
            <div className="text-[11px] text-gray-500 flex justify-between">
              <span>Current Ability</span>
              <span>Target Bar ({skill.requiredScore}%)</span>
            </div>
          </div>

          <div className="bg-amber-500/[0.05] border border-amber-500/20 rounded-xl p-3 text-xs">
            <span className="font-bold text-[#D6A05A] block mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              What this means for you:
            </span>
            <p className="text-gray-300 text-[11px] leading-relaxed">
              {skill.impactOnPlacement}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#91A889]" />
              Recommended Next Step
            </span>
            <p className="text-xs text-gray-300 leading-relaxed">
              {skill.recommendation}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skill.recommendedTopics.map((topic, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-white/[0.05] text-gray-300 px-2 py-0.5 rounded-md border border-white/[0.08]"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between">
          <span className="text-xs text-gray-400">Estimated ~8–12 hrs prep</span>
          <button
            onClick={() => {
              showToast(
                `Learning module launched: ${skill.name}`,
                'TwinAI generated a targeted study sequence.',
                'indigo'
              );
            }}
            className="bg-[#C56A4A] hover:bg-[#A94F36] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Start Learning</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#D6A05A]/10 border border-amber-500/20 text-[#D6A05A]">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Your Skill Gap
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Skills currently preventing you from reaching your target companies. Every card answers exactly why this matters and what to study next.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#3A2A22] border border-white/[0.08] p-1 rounded-xl self-start sm:self-auto">
          {(['all', 'high', 'medium', 'low'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium capitalize transition-colors cursor-pointer ${activeFilter === filter ? 'bg-[#C56A4A] text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {filter === 'all' ? 'All Gaps' : `${filter} Priority`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#3A2A22] border border-amber-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#D6A05A]">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{highPriority.length} High Gaps</div>
            <p className="text-xs text-gray-400 mt-0.5">System Design & Advanced Graphs</p>
          </div>
        </div>

        <div className="bg-[#3A2A22] border border-indigo-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#C56A4A]">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{mediumPriority.length} Moderate Gap</div>
            <p className="text-xs text-gray-400 mt-0.5">DBMS & Query Optimization</p>
          </div>
        </div>

        <div className="bg-[#3A2A22] border border-teal-500/30 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[#91A889]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{lowPriority.length} Minor Gap</div>
            <p className="text-xs text-gray-400 mt-0.5">Operating Systems & Threads</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSkills.map(renderSkillCard)}
      </div>
    </div>
  );
};
