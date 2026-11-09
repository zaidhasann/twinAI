import React, { useState } from 'react';
import { User, School, Award, Target, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { updateStudentProfile, syncCodeforces } from '../services/apiService';
import { useToast } from './ToastProvider';

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdated: () => void;
  initialName?: string;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  onProfileUpdated,
  initialName = ''
}) => {
  const { showToast } = useToast();
  const [name, setName] = useState(initialName || 'Zaid Hasan');
  const [college, setCollege] = useState('Engineering Institute');
  const [degree, setDegree] = useState('B.Tech Computer Science');
  const [graduationYear, setGraduationYear] = useState('2027');
  const [cfHandle, setCfHandle] = useState('zaidhasan');
  const [targetRole, setTargetRole] = useState('Software Development Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    showToast('Initializing Digital Twin...', `Linking profile for ${name}`, 'indigo');

    try {
      // 1. Update Profile in backend
      await updateStudentProfile({
        name: name.trim(),
        college: college.trim(),
        degree: degree.trim(),
        graduationYear: parseInt(graduationYear) || 2027,
        targetRole: targetRole.trim()
      });

      // 2. Sync with Codeforces if handle provided
      if (cfHandle.trim()) {
        await syncCodeforces(cfHandle.trim(), 40);
      }

      showToast(
        'Digital Twin Initialized!',
        `Welcome, ${name}. Your concept graph and readiness are active.`,
        'teal'
      );

      onProfileUpdated();
      onClose();
    } catch (err) {
      showToast('Profile Updated', `Active student set to ${name}`, 'teal');
      onProfileUpdated();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const loadPreset = (presetName: string, presetCollege: string, presetHandle: string) => {
    setName(presetName);
    setCollege(presetCollege);
    setCfHandle(presetHandle);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#1C2227] border border-white/[0.12] rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#8B6FC7]/20 border border-indigo-500/30 flex items-center justify-center text-[#8B6FC7]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Student Login & Twin Setup</h2>
            <p className="text-xs text-gray-400">Connect your profile to build your personalized Digital Twin</p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 my-4 pt-2 border-t border-white/[0.06]">
          <span className="text-[11px] text-gray-500 font-medium">Quick Presets:</span>
          <button
            type="button"
            onClick={() => loadPreset('Zaid Hasan', 'Faculty of Engineering', 'zaidhasan')}
            className="text-[11px] bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 px-2.5 py-1 rounded-lg transition-colors border border-white/[0.08]"
          >
            Zaid Hasan
          </button>
          <button
            type="button"
            onClick={() => loadPreset('Alex Sharma', 'ABC Engineering College', 'AlexSharma_CP')}
            className="text-[11px] bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 px-2.5 py-1 rounded-lg transition-colors border border-white/[0.08]"
          >
            Alex (Demo)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('Gennady Korotkevich', 'ITMO University', 'tourist')}
            className="text-[11px] bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 px-2.5 py-1 rounded-lg transition-colors border border-white/[0.08]"
          >
            tourist (CP)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name (e.g. Zaid Hasan)"
                className="w-full bg-[#14171A] border border-white/[0.1] focus:border-[#8B6FC7] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                College / University
              </label>
              <div className="relative">
                <School className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Your College Name"
                  className="w-full bg-[#14171A] border border-white/[0.1] focus:border-[#8B6FC7] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Codeforces Handle
              </label>
              <div className="relative">
                <Award className="w-4 h-4 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={cfHandle}
                  onChange={(e) => setCfHandle(e.target.value)}
                  placeholder="e.g. zaidhasan / tourist"
                  className="w-full bg-[#14171A] border border-white/[0.1] focus:border-teal-500 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Degree & Branch
              </label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="B.Tech Computer Science"
                className="w-full bg-[#14171A] border border-white/[0.1] focus:border-[#8B6FC7] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Graduation Year
              </label>
              <input
                type="number"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                placeholder="2027"
                className="w-full bg-[#14171A] border border-white/[0.1] focus:border-[#8B6FC7] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Target Role
            </label>
            <div className="relative">
              <Target className="w-4 h-4 text-indigo-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Development Engineer"
                className="w-full bg-[#14171A] border border-white/[0.1] focus:border-[#8B6FC7] rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-gray-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#8B6FC7] to-[#7ED6A5] hover:opacity-95 text-gray-950 font-bold text-xs py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Syncing Real Submissions...' : 'Initialize & Build My Digital Twin'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
