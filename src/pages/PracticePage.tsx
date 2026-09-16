import React, { useState } from 'react';
import {
  Code2,
  BookOpen,
  Mic,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const PracticePage: React.FC = () => {
  const { showToast } = useToast();
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);

  const handleStartTask = (title: string, category: string) => {
    showToast(`Launching ${category} session: ${title}`, 'Preparing simulation environment', 'indigo');
  };

  const toggleProblem = (id: string, name: string) => {
    if (completedProblems.includes(id)) {
      setCompletedProblems(prev => prev.filter(p => p !== id));
      showToast('Problem reset', name, 'default');
    } else {
      setCompletedProblems(prev => [...prev, id]);
      showToast('Problem marked solved!', '+15 pts towards DSA score', 'teal');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-[#C56A4A]/10 border border-indigo-500/20 text-[#C56A4A]">
            <Code2 className="w-4 h-4" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Practice What Matters
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
          Do not practice random LeetCode problems. Every question recommended here is tailored to close your verified skill gaps for your target companies.
        </p>
      </div>

      {/* Section 1: Recommended For You */}
      <div className="bg-gradient-to-br from-[#3A2A22] to-[#3D2B22] border border-[#C56A4A]/30 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C56A4A]">
                ? Top Recommendation Today
              </span>
              <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                High Priority
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">Binary Trees & Traversals</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Difficulty: <strong className="text-indigo-400">Medium</strong> • Estimated time: 45 min
            </p>
          </div>

          <button
            onClick={() => handleStartTask('Binary Trees', 'DSA')}
            className="bg-[#C56A4A] hover:bg-[#A94F36] text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>Solve Problems</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#2A1E18]/80 border border-white/[0.08] p-4 rounded-xl text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-gray-400 block text-[11px]">Reason for this recommendation:</span>
            <span className="text-white font-medium">
              High priority for your target companies (Microsoft, Accenture). You answered 1 tree question incorrectly in your recent test.
            </span>
          </div>
          <span className="text-[#91A889] font-semibold text-xs shrink-0">+6% Potential DSA Boost</span>
        </div>

        {/* 3 Specific curated tree questions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {[
            { id: 'tree_1', name: 'Lowest Common Ancestor of a Binary Tree', diff: 'Medium', tags: 'Recursion, DFS' },
            { id: 'tree_2', name: 'Binary Tree Zigzag Level Order Traversal', diff: 'Medium', tags: 'BFS, Queue' },
            { id: 'tree_3', name: 'Diameter of Binary Tree', diff: 'Easy', tags: 'Depth, Postorder' },
          ].map((prob) => {
            const isDone = completedProblems.includes(prob.id);
            return (
              <div
                key={prob.id}
                className={`p-3 rounded-xl border transition-all flex flex-col justify-between gap-2 ${isDone ? 'border-[#91A889]/40 bg-[#91A889]/5' : 'border-white/[0.08] bg-[#2A1E18]/60'}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/[0.05] text-indigo-300">
                      {prob.diff}
                    </span>
                    <button
                      onClick={() => toggleProblem(prob.id, prob.name)}
                      className={`text-xs cursor-pointer ${isDone ? 'text-[#91A889]' : 'text-indigo-300'}`}
                    >
                      {isDone ? '? Solved' : 'Mark Done'}
                    </button>
                  </div>
                  <h4 className="text-xs font-semibold">
                    {prob.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-1">{prob.tags}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Columns: Skill Gap Practice & Interview Practice */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skill Gap Practice: System Design */}
        <div className="bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D6A05A]" />
                <h3 className="text-base font-bold text-white">Skill Gap Practice</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-[#D6A05A] border border-amber-500/20">
                -27% Gap
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">System Design Fundamentals</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              5 recommended interactive architectural walkthroughs covering load balancing, distributed caching, and microservices databases.
            </p>

            <div className="space-y-2 mt-4 text-xs">
              {[
                'Design a Scalable URL Shortener (TinyURL)',
                'Consistent Hashing & Cache Invalidation',
                'SQL vs NoSQL Database Sharding Strategies',
                'Message Queues & Event Streaming with Kafka',
                'Rate Limiting Algorithms (Token Bucket)'
              ].map((topic, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-[#2A1E18] border border-white/[0.04]">
                  <span className="text-gray-300">{topic}</span>
                  <span className="text-[10px] text-gray-500">20 min</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-gray-400">Target: Microsoft Bar</span>
            <button
              onClick={() => handleStartTask('System Design Fundamentals', 'System Design')}
              className="bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Start Track</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Interview Practice: Behavioral & Situational */}
        <div className="bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#91A889]" />
                <h3 className="text-base font-bold text-white">Interview Practice</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-[#91A889] border border-teal-500/20">
                Behavioral
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">Behavioral & STAR Questions</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              10 curated behavioral questions commonly asked by Capgemini, Accenture, and Microsoft hiring managers.
            </p>

            <div className="space-y-2 mt-4 text-xs">
              {[
                'Tell me about a difficult engineering bug you resolved under deadline pressure.',
                'How do you manage disagreements with team members during project sprints?',
                'Describe a time when you had to learn an unfamiliar technology rapidly.',
                'Why are you targeting an SDE role at our organization?',
                'Give an example of how you prioritized features when time was constrained.'
              ].map((q, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#2A1E18] border border-white/[0.04] text-gray-300 leading-relaxed">
                  <span className="text-[#C56A4A] font-bold mr-1.5">Q0{i+1}.</span>
                  {q}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="text-xs text-gray-400">AI Voice & Text Coach</span>
            <button
              onClick={() => handleStartTask('Behavioral Questions', 'Interview')}
              className="bg-[#C56A4A] hover:bg-[#A94F36] text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Practice Questions</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
