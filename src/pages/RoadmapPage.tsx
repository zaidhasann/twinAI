import React, { useEffect, useState } from 'react';
import { getRoadmap } from '../services/apiService';
import { RoadmapPhase, RoadmapTopic } from '../types';
import {
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  Milestone,
  Check
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const RoadmapPage: React.FC = () => {
  const [phases, setPhases] = useState<RoadmapPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    getRoadmap().then((res) => {
      setPhases(res);
      setLoading(false);
    });
  }, []);

  const totalTopics = phases.flatMap((p) => p.topics).length;
  const completedTopics = phases.flatMap((p) => p.topics).filter((t) => t.status === 'completed').length;
  const overallProgress = Math.round((completedTopics / totalTopics) * 100) || 68;

  const toggleTopicStatus = (phaseId: string, topicId: string) => {
    setPhases((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        const newTopics = phase.topics.map((t) => {
          if (t.id !== topicId) return t;
          const nextStatus: RoadmapTopic['status'] =
            t.status === 'completed' ? 'in_progress' : t.status === 'in_progress' ? 'upcoming' : 'completed';
          return { ...t, status: nextStatus };
        });
        const completed = newTopics.filter((t) => t.status === 'completed').length;
        const progressPercentage = Math.round((completed / newTopics.length) * 100);
        const status: RoadmapPhase['status'] =
          progressPercentage === 100 ? 'Completed' : progressPercentage > 0 ? 'In Progress' : 'Upcoming';
        return { ...phase, topics: newTopics, progressPercentage, status };
      })
    );
  };

  const getDifficultyBadge = (diff: RoadmapTopic['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return 'text-[#91A889] bg-[#91A889]/10 border-teal-500/20';
      case 'Medium':
        return 'text-[#C56A4A] bg-[#C56A4A]/10 border-indigo-500/20';
      case 'Hard':
        return 'text-[#D6A05A] bg-[#D6A05A]/10 border-amber-500/20';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#C56A4A]/10 border border-indigo-500/20 text-[#C56A4A]">
              <Milestone className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Your Placement Roadmap
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            A personalized preparation plan synthesized automatically around your current skills, weak areas, and target SDE roles.
          </p>
        </div>

        <div className="bg-[#3A2A22] border border-white/[0.1] rounded-2xl px-5 py-3.5 flex items-center gap-4 self-start sm:self-auto min-w-[220px]">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Overall Roadmap
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-2xl font-extrabold text-white">{overallProgress}%</span>
              <span className="text-xs text-[#91A889] font-semibold">
                {completedTopics}/{totalTopics} topics
              </span>
            </div>
          </div>
          <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-800"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#C56A4A]"
                strokeDasharray={`${overallProgress}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 sm:before:left-8 before:w-0.5 before:bg-gradient-to-b before:from-[#91A889] before:via-[#C56A4A] before:to-gray-800 before:z-0">
        {phases.map((phase) => {
          const isPhaseCompleted = phase.status === 'Completed';
          const isPhaseInProgress = phase.status === 'In Progress';

          return (
            <div key={phase.id} className="relative z-10 pl-12 sm:pl-20">
              <div
                className={`absolute left-2 sm:left-5 top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                  isPhaseCompleted
                    ? 'bg-[#91A889] border-[#91A889] text-black shadow-lg shadow-teal-500/30'
                    : isPhaseInProgress
                    ? 'bg-[#C56A4A] border-[#C56A4A] text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                    : 'bg-[#2A1E18] border-gray-700 text-gray-500'
                }`}
              >
                {isPhaseCompleted ? (
                  <Check className="w-4 h-4 text-black font-bold" />
                ) : (
                  phase.phaseNumber
                )}
              </div>

              <div className="bg-[#3A2A22] border border-white/[0.08] hover:border-white/[0.15] rounded-2xl p-6 transition-all shadow-xl shadow-black/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Phase {phase.phaseNumber}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                           isPhaseCompleted
                            ? 'text-[#91A889] bg-[#91A889]/10 border-teal-500/30'
                            : isPhaseInProgress
                            ? 'text-[#C56A4A] bg-[#C56A4A]/10 border-indigo-500/30'
                            : 'text-gray-400 bg-gray-800/40 border-white/[0.08]'
                        }`}
                      >
                        {phase.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-1">{phase.title}</h3>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    <span className="text-xs font-semibold text-gray-300">
                      {phase.progressPercentage}% Completed
                    </span>
                    <div className="w-24 bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isPhaseCompleted
                            ? 'bg-[#91A889]'
                            : isPhaseInProgress
                            ? 'bg-[#C56A4A]'
                            : 'bg-gray-700'
                        }`}
                        style={{ width: `${phase.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {phase.topics.map((topic) => {
                    const isCompleted = topic.status === 'completed';
                    const isInProgress = topic.status === 'in_progress';

                    return (
                      <div
                        key={topic.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                          isCompleted
                            ? 'bg-[#2A1E18]/40 border-white/[0.05] opacity-80'
                            : isInProgress
                            ? 'bg-[#2A1E18] border-[#C56A4A]/40 shadow-md shadow-indigo-950/30'
                            : 'bg-[#2A1E18] border-white/[0.06] hover:border-white/[0.12]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2.5">
                            <button
                              onClick={() => {
                                toggleTopicStatus(phase.id, topic.id);
                                showToast(
                                  `Topic status updated: ${topic.title}`,
                                  undefined,
                                  isCompleted ? 'default' : 'success'
                                );
                              }}
                              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                                isCompleted
                                  ? 'bg-[#91A889] border-[#91A889] text-black'
                                 : isInProgress
                                 ? 'border-[#C56A4A] text-[#C56A4A]'
                                 : 'border-white/[0.2]'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : isInProgress ? (
                                <Circle className="w-2.5 h-2.5 fill-current" />
                              ) : null}
                            </button>

                            <div>
                              <h4
                                className={`text-xs font-bold ${
                                  isCompleted ? 'line-through text-gray-400' : 'text-white'
                                }`}
                              >
                                {topic.title}
                              </h4>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                                <Clock className="w-3 h-3" />
                                <span>~{topic.estimatedHours} hrs</span>
                                <span>•</span>
                                <span>{topic.category}</span>
                              </div>
                            </div>
                          </div>

                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${getDifficultyBadge(topic.difficulty)}`}>
                            {topic.difficulty}
                          </span>
                        </div>

                        <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between">
                          <span className="text-[11px] text-gray-400 capitalize">
                            Status: {topic.status.replace('_', ' ')}
                          </span>
                          <button
                            onClick={() => {
                              showToast(
                                `Session started: ${topic.title}`,
                                'AI Twin will track your completion',
                                'indigo'
                              );
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              isCompleted
                                ? 'bg-white/[0.04] text-gray-400 hover:text-white'
                                : isInProgress
                                ? 'bg-[#C56A4A] text-white hover:bg-[#A94F36]'
                                : 'bg-white/[0.08] text-gray-200 hover:bg-white/[0.15]'
                            }`}
                          >
                            <span>{isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
