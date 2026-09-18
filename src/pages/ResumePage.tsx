import React, { useState, useEffect } from 'react';
import { getResumeAnalysis } from '../services/apiService';
import { ResumeAnalysis } from '../types';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
  Upload
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const ResumePage: React.FC = () => {
  const [data, setData] = useState<ResumeAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [isImproving, setIsImproving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getResumeAnalysis().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleImprove = () => {
    setIsImproving(true);
    setTimeout(() => {
      setIsImproving(false);
      showToast(
        'AI Resume Enhancement complete!',
        'Rewrote 5 bullet points with metrics and ATS keywords',
        'teal'
      );
    }, 1200);
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
            <span className="p-1.5 rounded-lg bg-[#2E9D6B]/10 border border-indigo-500/20 text-[#2E9D6B]">
              <FileText className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Resume Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            AI-driven ATS parser and recruiter keyword diagnostic. Identifies high-leverage bullet point enhancements.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={() => showToast('Upload modal opened: Drop PDF here', undefined, 'default')}
            className="bg-[#232A30] border border-white/[0.1] hover:border-white/[0.2] text-xs font-semibold text-gray-200 hover:text-white px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New PDF</span>
          </button>
          <button
            onClick={handleImprove}
            disabled={isImproving}
            className="bg-[#2E9D6B] hover:bg-[#237B53] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isImproving ? 'Optimizing Bullets...' : 'Improve Resume'}</span>
          </button>
        </div>
      </div>

      {/* Main Score & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Overall Score */}
        <div className="lg:col-span-4 bg-gradient-to-br from-[#232A30] to-[#29333A] border border-white/[0.1] rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Overall ATS Score
            </span>
            <div className="text-5xl font-extrabold text-white my-3 tracking-tight">
              {data.overallScore}<span className="text-2xl text-gray-500 font-normal">/100</span>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#7ED6A5]/10 text-[#7ED6A5] border border-teal-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Top 12% of Applicants</span>
            </div>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              Your resume formats cleanly across Greenhouse, Workday, and Lever ATS parsers.
            </p>
          </div>

          <div className="pt-4 border-t border-white/[0.06] text-xs text-gray-400">
            Parsed file: <strong className="text-white">Alex_Sharma_Resume_2026.pdf</strong>
          </div>
        </div>

        {/* Breakdown bars */}
        <div className="lg:col-span-8 bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300">
            ATS Evaluation Subscores
          </h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between text-gray-300 mb-1.5">
                <span className="font-medium">Technical Skills & Keyword Density</span>
                <span className="font-bold text-[#7ED6A5]">{data.breakdown.skills}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#7ED6A5] h-full rounded-full w-[92%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1.5">
                <span className="font-medium">Projects & Tech Stack Depth</span>
                <span className="font-bold text-[#7ED6A5]">{data.breakdown.projects}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#7ED6A5] h-full rounded-full w-[84%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1.5">
                <span className="font-medium">ATS Layout & Structural Formatting</span>
                <span className="font-bold text-[#7ED6A5]">{data.breakdown.formatting}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#7ED6A5] h-full rounded-full w-[94%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1.5">
                <span className="font-medium">Direct ATS Compatibility</span>
                <span className="font-bold text-[#2E9D6B]">{data.breakdown.atsCompatibility}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#2E9D6B] h-full rounded-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-gray-300 mb-1.5">
                <span className="font-medium">Internship / Work Experience Metrics</span>
                <span className="font-bold text-[#F4B860]">{data.breakdown.experience}%</span>
              </div>
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#F4B860] h-full rounded-full w-[76%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Box */}
      <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#2E9D6B]" />
          <h3 className="text-base font-bold text-white">AI Suggestions</h3>
        </div>

        <div className="space-y-3">
          {data.suggestions.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                {s.type === 'warning' ? (
                  <AlertTriangle className="w-4 h-4 text-[#F4B860] shrink-0 mt-0.5" />
                ) : s.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#7ED6A5] shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-[#2E9D6B] shrink-0 mt-0.5" />
                )}
                <span className="text-gray-200 leading-relaxed">{s.text}</span>
              </div>

              <span
                className="shrink-0 font-semibold px-2.5 py-1 rounded-md text-[11px] self-start sm:self-auto"
              >
                {s.impact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
