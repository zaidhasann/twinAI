import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import {
  Sparkles,
  ArrowRight,
  Target,
  Milestone,
  Building2,
  Cpu,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Mic,
  Share2,
  ShieldCheck,
  Flame
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#171B1F] text-gray-100 flex flex-col antialiased selection:bg-[#8B6FC7] selection:text-white">
      {/* Landing Navbar */}
      <header className="h-20 border-b border-white/[0.08] bg-[#171B1F]/80 backdrop-blur-md sticky top-0 z-50 px-6 sm:px-12 flex items-center justify-between">
        <Link to="/">
          <Logo size="lg" showTagline={true} />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-xs font-medium text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#preview" className="hover:text-white transition-colors">Live Dashboard Preview</a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-xs font-semibold text-gray-300 hover:text-white px-3 py-2 transition-colors"
          >
            Demo Sign In
          </Link>
          <Link
            to="/dashboard"
            className="bg-[#8B6FC7] hover:bg-[#7357AB] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-28 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#8B6FC7]/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 bg-[#232A30] border border-[#8B6FC7]/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 mb-6 shadow-md shadow-indigo-950/40 animate-in fade-in slide-in-from-top-4">
          <span className="w-2 h-2 rounded-full bg-[#7ED6A5] animate-ping" />
          <span>Know where you are. Know what to do next.</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl leading-[1.1]">
          Meet Your <span className="bg-gradient-to-r from-[#8B6FC7] via-indigo-400 to-[#7ED6A5] bg-clip-text text-transparent">AI Career Twin</span>.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-6 max-w-2xl leading-relaxed">
          Your personal AI that understands your skills, tracks your progress, finds your gaps, and helps you become placement-ready.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
          <Link
            to="/dashboard"
            className="w-full sm:w-auto bg-[#8B6FC7] hover:bg-[#7357AB] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Build My Career Twin</span>
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <span>See How It Works</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </a>
        </div>

        {/* Realistic Dashboard Preview Frame */}
        <div id="preview" className="w-full mt-16 rounded-xl border border-white/[0.12] bg-[#232A30] shadow-2xl shadow-black/80 p-4 sm:p-6 text-left relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-teal-500/60" />
              <span className="ml-3 text-gray-400 font-mono text-[11px]">app.twinai.careers/overview</span>
            </div>
            <span className="text-[11px] bg-[#8B6FC7]/10 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/20">
              Live Interactive Prototype
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-4 bg-[#171B1F] p-4 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold text-gray-500 block">Placement Readiness</span>
              <div className="text-3xl font-extrabold text-white mt-1">78%</div>
              <span className="text-xs text-[#7ED6A5] font-semibold">? 6% from last month</span>
              <div className="w-full bg-gray-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#8B6FC7] h-full rounded-full w-[78%]" />
              </div>
            </div>

            <div className="md:col-span-8 bg-[#171B1F] p-4 rounded-xl border border-[#8B6FC7]/30 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B6FC7] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  ? AI Career Insight
                </span>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                  Your DSA is strong at 81%, but System Design (48%) is currently blocking your Microsoft readiness. Complete 3 load balancing and normalization modules this week.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/[0.06] text-xs">
                <span className="text-[#F4B860] font-semibold">3 high-impact gaps identified</span>
                <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300 font-medium">
                  Explore Demo ?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: LANDING PAGE — HOW IT WORKS (Four Steps using the Four Brand Colors) */}
      <section id="how-it-works" className="py-24 px-6 sm:px-12 border-t border-white/[0.08] bg-[#171B1F]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B6FC7]">
              Four-Phase Career Synthesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How TwinAI Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              From raw developer traces to verified job offers, see how our four-step pipeline builds your digital twin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 01 - Deep Navy Card */}
            <div className="bg-[#171B1F] border-2 border-white/[0.15] rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center font-extrabold text-sm text-white">
                  01
                </div>
                <h3 className="text-lg font-bold text-white">Connect</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Connect your resume, coding profiles, projects, academics and career data seamlessly in minutes.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Step 01 • Data Ingestion
              </span>
            </div>

            {/* Step 02 - Electric Indigo Card */}
            <div className="bg-[#232A30] border-2 border-[#8B6FC7]/50 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl shadow-indigo-950/30">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#8B6FC7]/20 border border-[#8B6FC7]/50 flex items-center justify-center font-extrabold text-sm text-[#8B6FC7]">
                  02
                </div>
                <h3 className="text-lg font-bold text-white">Understand</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  TwinAI builds an evolving digital representation of your skills, code quality, and interview preparedness.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#8B6FC7] tracking-wider">
                Step 02 • Digital Twin
              </span>
            </div>

            {/* Step 03 - Amber Card */}
            <div className="bg-[#232A30] border-2 border-[#F4B860]/50 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl shadow-amber-950/20">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-extrabold text-sm text-[#F4B860]">
                  03
                </div>
                <h3 className="text-lg font-bold text-white">Improve</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Get personalized recommendations, skill gap closures, and an actionable daily preparation plan.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#F4B860] tracking-wider">
                Step 03 • Actionable Plan
              </span>
            </div>

            {/* Step 04 - Teal Card */}
            <div className="bg-[#232A30] border-2 border-[#7ED6A5]/50 rounded-xl p-6 flex flex-col justify-between space-y-6 shadow-xl shadow-teal-950/20">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/50 flex items-center justify-center font-extrabold text-sm text-[#7ED6A5]">
                  04
                </div>
                <h3 className="text-lg font-bold text-white">Get Placed</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Discover companies where your current profile is a strong match, and unlock targeted employer tracks.
                </p>
              </div>
              <span className="text-[10px] uppercase font-bold text-[#7ED6A5] tracking-wider">
                Step 04 • Offer Ready
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: LANDING PAGE — 8 CORE FEATURES */}
      <section id="features" className="py-24 px-6 sm:px-12 border-t border-white/[0.08] bg-[#0d1326]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7ED6A5]">
              Engine Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineered for Placement Excellence
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Every module answers two core questions: What does this mean for my career? And what should I do next?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-indigo-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#8B6FC7]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                AI Career Twin
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                An evolving representation of your professional profile built from 1,247 active career data points.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-amber-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F4B860]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Skill Gap Detection
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Identify the exact skills and topics currently preventing you from clearing target company screening rounds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-teal-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[#7ED6A5]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                Placement Readiness
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Understand quantitatively how prepared you are across Tier-1, Tier-2, and product firm bars.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-indigo-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#8B6FC7]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                Company Matching
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Discover companies based on your actual verified profile, compensation ranges, and match percentages.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-teal-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[#7ED6A5]">
                <Milestone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                Personalized Roadmap
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Know exactly what to learn next with difficulty ratings, estimated hours, and daily micro-tasks.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-amber-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F4B860]">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                Interview Intelligence
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Understand your interview strengths, edge case deliberation, communication fluency, and behavioral STAR stories.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-indigo-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[#8B6FC7]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                Resume Intelligence
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Analyze your resume across ATS filters, discover missing keywords, and inject quantitative impact metrics.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-[#232A30] border border-white/[0.08] hover:border-teal-500/40 p-6 rounded-xl space-y-3 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[#7ED6A5]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                Progress Tracking
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                See how your career readiness changes over time with interactive charts, study velocity, and streak tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Footer */}
      <section className="py-20 px-6 sm:px-12 border-t border-white/[0.08] bg-[#171B1F] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to meet your Career Twin?
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
            Join thousands of engineering students mastering their placement preparation with personalized intelligence.
          </p>
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-[#8B6FC7] hover:bg-[#7357AB] text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
            >
              <span>Launch TwinAI Experience</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-12 border-t border-white/[0.05] bg-[#171B1F] text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span>© 2026 TwinAI Technologies Inc. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Frontend Architecture Showcase</span>
          <span>Dark Mode 4-Color Standard</span>
        </div>
      </footer>
    </div>
  );
};
