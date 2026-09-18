import React from 'react';
import { Building2, MapPin, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CompanyMatch } from '../types';

interface CompanyCardProps {
  company: CompanyMatch;
  onClick?: () => void;
}

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const matchColor =
    company.readiness >= 80
      ? '#7ED6A5'
      : company.readiness >= 60
      ? '#F4B860'
      : '#FF8066';

  return (
    <Link
      to={`/companies/${company.id}`}
      onClick={onClick}
      className="block bg-[#232A30] border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-[#2D353B] transition-all cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B6FC7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171B1F]"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center overflow-hidden">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
            ) : (
              <Building2 className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white group-hover:text-[#2E9D6B] transition-colors">
              {company.name}
            </h3>
            <p className="text-xs text-gray-400">{company.role}</p>
          </div>
        </div>

        {/* Match Score */}
        <div className="text-right">
          <div className="text-xl font-bold" style={{ color: matchColor }}>
            {company.readiness}%
          </div>
          <p className="text-[10px] text-gray-500">Match</p>
        </div>
      </div>

      {/* Match bar */}
      <div className="mb-4">
        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: company.readiness + '%', backgroundColor: matchColor }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {[company.role].map(role => (
          <span
            key={role}
            className="text-[10px] px-2 py-0.5 bg-[#2E9D6B]/10 text-[#BFEAD4] rounded-full border border-[#2E9D6B]/20"
          >
            {role}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.05]">
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-3 h-3" />
          </div>
          <span className="text-[10px] text-gray-500 text-center">{company.targetTimeline}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-gray-400">
            <TrendingUp className="w-3 h-3" />
          </div>
          <span className="text-[10px] text-gray-500">{company.salaryRange}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-gray-400">
            <Star className="w-3 h-3" />
          </div>
          <span className="text-[10px] text-gray-500">{company.status}</span>
        </div>
      </div>
    </Link>
  );
}
