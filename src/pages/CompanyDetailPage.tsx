import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCompanyById } from '../services/apiService';
import { CompanyMatch } from '../types';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const CompanyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<CompanyMatch | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      getCompanyById(id).then((data) => {
        if (data) setCompany(data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-white/[0.05] rounded-xl w-32" />
        <div className="h-48 bg-white/[0.05] rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-white/[0.05] rounded-2xl" />
          <div className="h-64 bg-white/[0.05] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-12 text-center space-y-4">
        <h2 className="text-lg font-bold text-white">Company Not Found</h2>
        <p className="text-xs text-gray-400">The company profile requested could not be located.</p>
        <Link to="/companies" className="text-xs bg-[#2E9D6B] text-white px-4 py-2 rounded-xl inline-block">
          Back to Companies
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate('/companies')}
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Companies Overview</span>
      </button>

      {/* Main Header Banner */}
      <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#171B1F] border border-white/[0.1] flex items-center justify-center font-extrabold text-2xl text-white shadow-xl">
            {company.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {company.name}
              </h1>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/[0.05] text-gray-300 border border-white/[0.1]">
                {company.role}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl leading-relaxed">
              {company.description}
            </p>
            <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
              <div>
                <span className="text-gray-500 uppercase text-[10px] block font-bold">Package Range</span>
                <span className="text-white font-semibold">{company.salaryRange}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[10px] block font-bold">Timeline</span>
                <span className="text-white font-semibold">{company.targetTimeline}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Readiness Score */}
        <div className="bg-[#171B1F] border border-white/[0.08] rounded-2xl p-5 flex flex-col items-center justify-center min-w-[180px] text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Your Readiness
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold text-[#2E9D6B] my-1 tracking-tight">
            {company.readiness}%
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${company.status === 'Strong Match' ? 'bg-[#7ED6A5]/10 text-[#7ED6A5]' : company.status === 'Good Match' ? 'bg-[#2E9D6B]/10 text-[#2E9D6B]' : 'bg-[#F4B860]/10 text-[#F4B860]'}`}
          >
            {company.status}
          </span>
        </div>
      </div>

      {/* Two Column Breakdown: What You Have vs What You Are Missing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What You Already Have */}
        <div className="bg-[#232A30] border border-teal-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
            <CheckCircle2 className="w-5 h-5 text-[#7ED6A5]" />
            <div>
              <h3 className="text-base font-bold text-white">What You Already Have</h3>
              <p className="text-xs text-gray-400">Skills meeting {company.name}'s qualifying baseline</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {company.skillsMatched.map((skill, i) => (
              <div
                key={i}
                className="bg-[#171B1F] border border-white/[0.06] p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 font-medium text-gray-200">
                  <span className="text-[#7ED6A5] font-bold">?</span>
                  <span>{skill}</span>
                </div>
                <span className="text-[11px] text-[#7ED6A5] font-semibold bg-[#7ED6A5]/10 px-2 py-0.5 rounded">
                  Cleared
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* What You're Missing */}
        <div className="bg-[#232A30] border border-amber-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/[0.06]">
            <AlertTriangle className="w-5 h-5 text-[#F4B860]" />
            <div>
              <h3 className="text-base font-bold text-white">What You're Missing</h3>
              <p className="text-xs text-gray-400">High-leverage gaps preventing an offer clearance</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {company.missingSkills.map((skill, i) => (
              <div
                key={i}
                className="bg-[#171B1F] border border-amber-500/20 p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 font-medium text-gray-200">
                  <span className="text-[#F4B860] font-bold">?</span>
                  <span>{skill}</span>
                </div>
                <span className="text-[11px] text-[#F4B860] font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                  Action Required
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommended Preparation Sequence */}
      <div className="bg-gradient-to-br from-[#232A30] to-[#29333A] border border-[#2E9D6B]/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-[#2E9D6B]/20 text-[#2E9D6B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Recommended Preparation Plan for {company.name}
              </h3>
              <p className="text-xs text-gray-400">
                Tailored 30-day tactical study plan generated by TwinAI
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {company.recommendedPreparation.map((step, i) => (
            <div
              key={i}
              className="bg-[#171B1F]/80 border border-white/[0.08] p-4 rounded-xl flex flex-col justify-between text-xs space-y-3"
            >
              <div className="space-y-1.5">
                <span className="text-[#2E9D6B] font-bold text-xs uppercase tracking-wider">
                  Step 0{i + 1}
                </span>
                <p className="text-gray-200 leading-relaxed">{step}</p>
              </div>
              <span className="text-[10px] text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Target: Week {i + 1}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
          <p className="text-xs text-gray-400">
            Completing these steps will boost your readiness score from{' '}
            <strong className="text-[#F4B860]">{company.readiness}%</strong> to{' '}
            <strong className="text-[#7ED6A5]">88%+</strong>.
          </p>

          <button
            onClick={() => {
              showToast(
                `Preparation plan for ${company.name} synced!`,
                'Added 4 milestones to your Placement Roadmap',
                'indigo'
              );
              navigate('/roadmap');
            }}
            className="bg-[#2E9D6B] hover:bg-[#237B53] text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Preparation Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
