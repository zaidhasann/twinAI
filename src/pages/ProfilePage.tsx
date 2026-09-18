import React, { useState, useEffect } from 'react';
import { getStudentProfile } from '../services/apiService';
import { StudentProfile } from '../types';
import {
  User,
  GraduationCap,
  Briefcase,
  Building2,
  CheckCircle2,
  Code2,
  FolderGit2,
  Flame,
  Award,
  Edit3
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    getStudentProfile().then((res) => {
      setProfile(res);
      setLoading(false);
    });
  }, []);

  if (loading || !profile) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-white/[0.05] rounded-xl w-1/3" />
        <div className="h-64 bg-white/[0.05] rounded-xl" />
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
              <User className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Student Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Fictional student verification record used for AI digital twin calibration and placement readiness scoring.
          </p>
        </div>

        <button
          onClick={() => showToast('Profile editor opened', 'Saved to local prototype state', 'default')}
          className="bg-[#232A30] border border-white/[0.1] hover:border-white/[0.2] text-xs font-semibold text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Main Student Profile Card */}
      <div className="bg-[#232A30] border border-white/[0.08] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-tr from-[#2E9D6B] to-[#7ED6A5] p-[2px] shadow-xl shrink-0">
            <div className="w-full h-full bg-[#171B1F] rounded-[14px] flex items-center justify-center font-extrabold text-2xl text-white">
              AS
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {profile.name}
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#7ED6A5]/10 text-[#7ED6A5] border border-teal-500/20">
                Verified Candidate
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-medium flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              {profile.degree} • Class of {profile.graduationYear}
            </p>

            <p className="text-xs text-gray-400">
              {profile.college}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <span className="bg-[#171B1F] px-3 py-1 rounded-lg border border-white/[0.08] font-mono text-indigo-400 font-bold">
                CGPA: {profile.cgpa} / 10
              </span>
              <span className="text-gray-400">
                Target Role: <strong className="text-white font-medium">{profile.targetRole}</strong>
              </span>
              <span className="text-gray-400">
                Expected Package: <strong className="text-teal-400 font-semibold">{profile.targetSalary}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Target Companies Chips */}
        <div className="bg-[#171B1F] p-4 rounded-xl border border-white/[0.06] w-full md:w-auto min-w-[240px] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
            Target Employers
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.targetCompanies.map((c, i) => (
              <span
                key={i}
                className="text-xs bg-white/[0.05] text-gray-200 px-2.5 py-1 rounded-lg border border-white/[0.08] font-medium"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Metrics Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#232A30] border border-white/[0.08] rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-[#2E9D6B]">{profile.stats.leetCodeProblems}</div>
          <span className="text-xs text-gray-400 font-medium mt-0.5 block">LeetCode Solved</span>
        </div>
        <div className="bg-[#232A30] border border-white/[0.08] rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-[#7ED6A5]">{profile.stats.githubRepos}</div>
          <span className="text-xs text-gray-400 font-medium mt-0.5 block">GitHub Repos</span>
        </div>
        <div className="bg-[#232A30] border border-white/[0.08] rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-[#F4B860]">{profile.stats.streakDays} Days</div>
          <span className="text-xs text-gray-400 font-medium mt-0.5 block">Current Streak</span>
        </div>
        <div className="bg-[#232A30] border border-white/[0.08] rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-white">{profile.stats.projectsCount}</div>
          <span className="text-xs text-gray-400 font-medium mt-0.5 block">Full Stack Projects</span>
        </div>
      </div>
    </div>
  );
};
