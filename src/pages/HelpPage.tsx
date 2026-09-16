import React from 'react';
import { HelpCircle, BookOpen, MessageSquare, Terminal, ExternalLink, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HelpPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-[#C56A4A]/10 border border-indigo-500/20 text-[#C56A4A]">
            <HelpCircle className="w-4 h-4" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Help & Documentation
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-400">
          Understand how the TwinAI career engine evaluates student placement probability and generates study roadmaps.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 space-y-2">
          <h3 className="text-base font-bold text-white">How is Placement Readiness Calculated?</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Placement Readiness (currently 78%) is a weighted neural composite computed from 1,247 verified data points across four core pillars: DSA difficulty rating, System Design fundamentals, Mock Interview scores, and ATS Resume keyword matching against target company hiring rubrics.
          </p>
        </div>

        <div className="bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 space-y-2">
          <h3 className="text-base font-bold text-white">How Do Skill Gaps Differ from Regular Scores?</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            A regular score simply indicates completion. A Skill Gap calculates the mathematical difference between your verified proficiency and the minimum threshold required by your specific target companies (e.g. Microsoft requires 75% System Design, while your score is 48%, giving a 27% high-priority gap).
          </p>
        </div>

        <div className="bg-[#3A2A22] border border-white/[0.08] rounded-2xl p-6 space-y-2">
          <h3 className="text-base font-bold text-white">Frontend-Only Prototype Notice</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            This is a production-quality frontend implementation designed with realistic mock service layers (<code className="text-indigo-400">apiService.ts</code>) ready for seamless REST/GraphQL backend replacement.
          </p>
        </div>
      </div>
    </div>
  );
};
