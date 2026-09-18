import React, { useState, useEffect } from 'react';
import { getCompanyMatches } from '../services/apiService';
import { CompanyMatch } from '../types';
import { CompanyCard } from '../components/CompanyCard';
import { Building2, Search, ArrowUpDown, Filter, Sparkles } from 'lucide-react';

export const CompaniesPage: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'All' | 'Strong Match' | 'Good Match' | 'Needs Preparation'>('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'readiness' | 'name'>('readiness');

  useEffect(() => {
    getCompanyMatches().then((res) => {
      setCompanies(res);
      setLoading(false);
    });
  }, []);

  const filteredCompanies = companies
    .filter((c) => {
      if (filter !== 'All' && c.status !== filter) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.role.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'readiness') return b.readiness - a.readiness;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[#2E9D6B]/10 border border-indigo-500/20 text-[#2E9D6B]">
              <Building2 className="w-4 h-4" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Companies You're Ready For
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl">
            Companies ranked by how closely your current verified profile matches their hiring requirements and historical interview rubrics.
          </p>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#232A30] border border-white/[0.08] p-4 rounded-2xl">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by company name or role..."
            className="w-full bg-[#171B1F] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#2E9D6B]"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-[#171B1F] border border-white/[0.08] p-1 rounded-xl">
            {(['All', 'Strong Match', 'Good Match', 'Needs Preparation'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${filter === tab ? 'bg-[#2E9D6B] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSortBy(sortBy === 'readiness' ? 'name' : 'readiness')}
            className="flex items-center gap-1.5 bg-[#171B1F] border border-white/[0.08] hover:border-white/[0.15] text-xs text-gray-300 px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
            <span>Sort: {sortBy === 'readiness' ? 'Readiness %' : 'Alphabetical'}</span>
          </button>
        </div>
      </div>

      {/* Grid of Companies */}
      {filteredCompanies.length === 0 ? (
        <div className="bg-[#232A30] border border-white/[0.08] rounded-2xl p-12 text-center space-y-3">
          <Building2 className="w-10 h-10 text-gray-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No company matches</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            No target companies match your current filter query. Try selecting 'All' or updating your profile.
          </p>
          <button
            onClick={() => {
              setFilter('All');
              setSearch('');
            }}
            className="bg-[#2E9D6B] text-white text-xs px-4 py-2 rounded-xl font-medium"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      )}
    </div>
  );
};
