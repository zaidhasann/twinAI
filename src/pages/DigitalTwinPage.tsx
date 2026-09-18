import React, { useState, useEffect } from 'react';
import { getDigitalTwin, getStudentProfile } from '../services/apiService';
import { DigitalTwinNode, StudentProfile } from '../types';
import {
  Cpu,
  Sparkles,
  GitBranch,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Database,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../components/ToastProvider';

export const DigitalTwinPage: React.FC = () => {
  const [nodes, setNodes] = useState<DigitalTwinNode[]>([]);
  const [twinMeta, setTwinMeta] = useState<{ confidence: number; datapoints: number } | null>(null);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [selectedNode, setSelectedNode] = useState<DigitalTwinNode | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    Promise.all([getDigitalTwin(), getStudentProfile()]).then(([dt, p]) => {
      setNodes(dt.nodes);
      setTwinMeta({ confidence: dt.confidence, datapoints: dt.datapoints });
      setProfile(p);
      if (dt.nodes.length > 0) setSelectedNode(dt.nodes[0]);
    });
  }, []);

  const handleResync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast(
        'Digital Twin synchronization complete',
        'Refreshed weights for 1,247 career signals',
        'teal'
      );
    }, 1200);
  };

  const getStatusColor = (status: DigitalTwinNode['status']) => {
    switch (status) {
      case 'Strong':
        return 'text-[#7ED6A5] border-teal-500/30 bg-teal-500/10';
      case 'Good':
        return 'text-[#8B6FC7] border-indigo-500/30 bg-indigo-500/10';
      case 'Attention':
        return 'text-[#F4B860] border-amber-500/30 bg-amber-500/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#8B6FC7]/10 border border-indigo-500/20 text-[#8B6FC7]">
              <Cpu className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Digital Twin
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            An evolving, professional AI representation of your skills, code quality, academic metrics, and interview preparedness.
          </p>
        </div>

        <button
          onClick={handleResync}
          disabled={isSyncing}
          className="bg-[#232A30] border border-white/[0.1] hover:border-indigo-500/40 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#8B6FC7]" />
          <span>{isSyncing ? 'Recalculating Twin Weights...' : 'Sync Career Vector'}</span>
        </button>
      </div>

      {/* Twin Confidence & Datapoints Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#8B6FC7]/10 border border-indigo-500/20 flex items-center justify-center text-[#8B6FC7]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Twin Confidence</div>
            <div className="text-xl font-extrabold text-white mt-0.5">87% High Precision</div>
          </div>
        </div>

        <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#7ED6A5]/10 border border-teal-500/20 flex items-center justify-center text-[#7ED6A5]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Data Points</div>
            <div className="text-xl font-extrabold text-white mt-0.5">1,247 Verified Signals</div>
          </div>
        </div>

        <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[#F4B860]">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">Latest Update</div>
            <div className="text-xl font-extrabold text-white mt-0.5">GitHub 2 hrs ago</div>
          </div>
        </div>
      </div>

      {/* Central Interactive Twin Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Graph Panel */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#232A30] to-[#273036] border border-white/[0.08] rounded-2xl p-6 sm:p-8 min-h-[440px] relative overflow-hidden flex flex-col justify-between">
          {/* Subtle neural network grid background lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Connected SVG lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/[0.08]">
            <line x1="50%" y1="50%" x2="22%" y2="28%" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="78%" y2="26%" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="82%" y2="72%" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="24%" y2="76%" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="50%" y2="16%" strokeWidth="1.5" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="50%" y2="86%" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Central Core Identity Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center text-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#8B6FC7] to-[#7ED6A5] p-[2px] shadow-2xl shadow-indigo-600/30 animate-pulse-subtle">
              <div className="w-full h-full bg-[#171B1F] rounded-[22px] flex flex-col items-center justify-center p-2">
                <Cpu className="w-6 h-6 text-[#8B6FC7] mb-1" />
                <span className="text-xs font-extrabold text-white leading-none">Alex.Twin</span>
                <span className="text-[9px] text-[#7ED6A5] font-mono mt-1">v2.6 active</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-gray-300 mt-2 bg-[#171B1F]/90 px-2.5 py-0.5 rounded-full border border-white/[0.08]">
              78% Placement Ready
            </span>
          </div>

          {/* Orbiting Satellite Node Buttons */}
          <div className="relative z-10 w-full h-full min-h-[360px]">
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isAttention = node.status === 'Attention';
              const isStrong = node.status === 'Strong';

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-xl border text-left transition-all transform hover:scale-105 cursor-pointer max-w-[150px]"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] text-gray-400 font-medium truncate">
                      {node.label}
                    </span>
                    <span
                      className="text-[9px] font-bold px-1 rounded"
                    >
                      {node.score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full"
                      style={{ width: `${node.score}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative z-10 text-[11px] text-gray-500 pt-2 border-t border-white/[0.04] flex items-center justify-between">
            <span>Click any node to inspect synthesized career weights</span>
            <span>Neural Vector Engine</span>
          </div>
        </div>

        {/* Node Inspector Side Panel */}
        <div className="lg:col-span-4 bg-[#232A30] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.06]">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Node Inspector
              </span>
              {selectedNode && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border">
                  {selectedNode.status}
                </span>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedNode.label}</h3>
                  <div className="text-3xl font-extrabold text-[#8B6FC7] mt-1">
                    {selectedNode.score}%
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                <div className="bg-[#171B1F] p-3.5 rounded-xl border border-white/[0.06] space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Last Synced:</span>
                    <span className="text-gray-200 font-medium">{selectedNode.updatedAgo}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Data Source:</span>
                    <span className="text-gray-200 font-medium">Verified Integration</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Model Weight:</span>
                    <span className="text-indigo-400 font-medium">0.22 (High Influence)</span>
                  </div>
                </div>

                {selectedNode.status === 'Attention' && (
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-xs text-amber-200 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F4B860] shrink-0 mt-0.5" />
                    <span>
                      This node is currently dragging your placement readiness score down by ~7%. Prioritize this in your roadmap.
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-gray-500">Select a node to inspect</p>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-white/[0.06]">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Recently Synced Events
            </div>
            <div className="space-y-1.5 text-xs text-gray-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#171B1F]">
                <span>GitHub Commits</span>
                <span className="text-[11px] text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#171B1F]">
                <span>LeetCode Progress</span>
                <span className="text-[11px] text-gray-500">Yesterday</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#171B1F]">
                <span>Resume ATS Scan</span>
                <span className="text-[11px] text-gray-500">3 days ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#171B1F]">
                <span>Mock Interview Round</span>
                <span className="text-[11px] text-gray-500">5 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
