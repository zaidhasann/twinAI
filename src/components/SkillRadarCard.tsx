import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { SkillRadarItem } from '../types';

interface SkillRadarCardProps {
  data: SkillRadarItem[];
}

export function SkillRadarCard({ data }: SkillRadarCardProps) {
  return (
    <div className="bg-[#3A2A22] border border-white/[0.06] rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-white mb-1">Skill Radar</h3>
      <p className="text-xs text-gray-400 mb-4">Your competency across key domains</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <PolarGrid
              gridType="polygon"
              stroke="rgba(255,255,255,0.06)"
            />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Current"
              dataKey="A"
              stroke="#C56A4A"
              fill="#C56A4A"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="Target"
              dataKey="B"
              stroke="#91A889"
              fill="#91A889"
              fillOpacity={0.08}
              strokeWidth={1.5}
              strokeDasharray="4 2"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#C56A4A] rounded" />
          <span className="text-xs text-gray-400">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#91A889] rounded border-dashed" />
          <span className="text-xs text-gray-400">Target</span>
        </div>
      </div>
    </div>
  );
}
