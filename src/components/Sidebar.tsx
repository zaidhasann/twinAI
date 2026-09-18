import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Brain, Map, Building2, Code2, Mic, TrendingUp,
  FileText, Plug, User, HelpCircle, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { Logo } from './Logo';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { path: '/digital-twin', icon: Brain, label: 'Digital Twin' },
  { path: '/skills', icon: Zap, label: 'Skill Gap' },
  { path: '/roadmap', icon: Map, label: 'Roadmap' },
  { path: '/companies', icon: Building2, label: 'Companies' },
  { path: '/practice', icon: Code2, label: 'Practice' },
  { path: '/interviews', icon: Mic, label: 'Interviews' },
  { path: '/progress', icon: TrendingUp, label: 'Progress' },
  { path: '/resume', icon: FileText, label: 'Resume' },
  { path: '/integrations', icon: Plug, label: 'Integrations' },
];

const BOTTOM_ITEMS = [
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/help', icon: HelpCircle, label: 'Help' },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
}

export function Sidebar({ collapsed, onToggle, mobileOpen = false }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const NavLink = ({ path, icon: Icon, label }: { path: string; icon: any; label: string }) => {
    const active = location.pathname === path;
    return (
      <button
        onClick={() => {
          navigate(path);
          if (mobileOpen) onToggle();
        }}
        title={collapsed ? label : undefined}
        aria-current={active ? 'page' : undefined}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
          active
            ? 'bg-[#8B6FC7]/15 text-white border border-[#8B6FC7]/30'
            : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
        }`}
      >
        <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? 'text-[#8B6FC7]' : ''}`} />
        {!collapsed && <span className="truncate">{label}</span>}
        {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#8B6FC7] rounded-r-full" />}
      </button>
    );
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#1D2429] border-r border-white/[0.06] transition-all duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${collapsed ? 'w-16' : 'w-60'}`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-white/[0.06] shrink-0">
        {!collapsed && <Logo />}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          aria-expanded={!collapsed}
          className="ml-auto p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => (
          <NavLink key={item.path} {...item} />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="p-3 border-t border-white/[0.06] space-y-1">
        {BOTTOM_ITEMS.map(item => (
          <NavLink key={item.path} {...item} />
        ))}
      </div>
    </aside>
  );
}
