import React, { useState, useEffect } from 'react';
import { getIntegrations } from '../services/apiService';
import { Integration } from '../types';
import {
  Share2,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  GitBranch,
  Code2,
  Terminal,
  BriefcaseBusiness,
  FileText,
  GraduationCap
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    getIntegrations().then((res) => {
      setIntegrations(res);
      setLoading(false);
    });
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <GitBranch className="w-5 h-5" />;
      case 'code':
        return <Code2 className="w-5 h-5" />;
      case 'terminal':
        return <Terminal className="w-5 h-5" />;
      case 'share-2':
        return <BriefcaseBusiness className="w-5 h-5" />;
      case 'file-text':
        return <FileText className="w-5 h-5" />;
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Share2 className="w-5 h-5" />;
    }
  };

  const handleAction = (item: Integration) => {
    if (!item.connected) {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, connected: true, statusText: 'Connected ?', lastSynced: 'Just now' }
            : i
        )
      );
      showToast(`${item.name} connected successfully!`, 'Career signals synced into your Digital Twin', 'teal');
    } else {
      showToast('Resyncing ...', 'Fetched latest metrics and activities', 'indigo');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1.5 rounded-lg bg-[#C56A4A]/10 border border-indigo-500/20 text-[#C56A4A]">
            <Share2 className="w-4 h-4" />
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Connect Your Career Data
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
          Link your developer profiles, repositories, competitive coding handles, resume, and academic records to keep your Career Twin up-to-date.
        </p>
      </div>

      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div
            key={item.id}
            className="bg-[#3A2A22] border border-white/[0.08] hover:border-white/[0.18] rounded-2xl p-6 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#2A1E18] border border-white/[0.1] flex items-center justify-center text-white group-hover:text-[#C56A4A] transition-colors shadow-inner">
                  {getIcon(item.icon)}
                </div>

                <span
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-full border"
                >
                  {item.statusText}
                </span>
              </div>

              <h3 className="text-base font-bold text-white">{item.name}</h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed min-h-[36px]">
                {item.detail}
              </p>

              <div className="text-[11px] text-gray-500 mt-3 pt-3 border-t border-white/[0.04]">
                Last synced: <span className="text-gray-300 font-medium">{item.lastSynced}</span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-white/[0.06]">
              <button
                onClick={() => handleAction(item)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {item.connected ? <RefreshCw className="w-3.5 h-3.5" /> : <ExternalLink className="w-3.5 h-3.5" />}
                <span>{item.actionText}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
