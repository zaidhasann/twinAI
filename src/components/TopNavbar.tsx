import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Sparkles,
  User,
  ChevronDown,
  Moon,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getNotifications, getStudentProfile } from '../services/apiService';
import { NotificationItem, StudentProfile } from '../types';
import { useToast } from './ToastProvider';

export const TopNavbar: React.FC<{ onOpenAssistant: () => void }> = ({ onOpenAssistant }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getNotifications().then(setNotifications);
    getStudentProfile().then(setProfile);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('Notifications marked as read', undefined, 'default');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    showToast(`Searching for "${searchQuery}"`, 'Filtering TwinAI intelligence database', 'indigo');
 if (searchQuery.toLowerCase().includes('company') || searchQuery.toLowerCase().includes('microsoft') || searchQuery.toLowerCase().includes('tcs')) {
 navigate('/companies');
 } else if (searchQuery.toLowerCase().includes('skill') || searchQuery.toLowerCase().includes('system design')) {
 navigate('/skills');
 } else if (searchQuery.toLowerCase().includes('roadmap')) {
 navigate('/roadmap');
 }
 };

 return (
 <header className="glass-panel h-16 border-b border-white/[0.08] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
 {/* Left: Global Search Bar */}
 <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-0 max-w-md">
 <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Search skills, companies, topics... (?K)"
 className="w-full bg-[#232A30] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#8B6FC7] focus:ring-1 focus:ring-[#8B6FC7] transition-all"
 />
 </form>

 {/* Right Action Center */}
 <div className="flex items-center gap-3 md:gap-4">
 {/* Placement Readiness Pill Indicator */}
 <Link
 to="/progress"
 className="hidden sm:flex items-center gap-2 bg-[#232A30] border border-white/[0.08] hover:border-indigo-500/40 px-3 py-1.5 rounded-full transition-all group"
 >
 <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
 <span className="w-2 h-2 rounded-full bg-[#7ED6A5] animate-pulse" />
 Placement Readiness:
 <span className="text-[#8B6FC7] font-bold">
 {profile ? `${profile.stats.placementReadiness}%` : '78%'}
 </span>
 </div>
 <span className="text-[11px] text-[#7ED6A5] font-medium bg-[#7ED6A5]/10 px-1.5 py-0.5 rounded">
 ? 6%
 </span>
 </Link>

 {/* Ask AI Twin Shortcut Button */}
 <button
 onClick={onOpenAssistant}
 className="flex items-center gap-1.5 bg-gradient-to-r from-[#8B6FC7] to-[#7357AB] hover:from-[#7357AB] hover:to-[#5C458F] text-white px-3 py-1.5 rounded-xl text-xs font-medium shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
 >
 <Sparkles className="w-3.5 h-3.5" />
 <span className="hidden md:inline">Ask TwinAI</span>
 </button>

 {/* Notification Dropdown Container */}
 <div className="relative">
 <button
 onClick={() => {
 setShowNotifications(!showNotifications);
 setShowProfileMenu(false);
 }}
 className="relative p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
 aria-label="Notifications"
 aria-expanded={showNotifications}
 aria-haspopup="menu"
 >
 <Bell className="w-4 h-4" />
 {unreadCount > 0 && (
 <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F4B860] shadow-sm shadow-amber-500" />
 )}
 </button>

 {showNotifications && (
 <div className="absolute right-0 mt-2 w-80 md:w-96 bg-[#232A30] border border-white/[0.1] rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
 <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
 <div className="flex items-center gap-2">
 <span className="font-semibold text-sm text-white">Notifications</span>
 {unreadCount > 0 && (
 <span className="text-[10px] bg-[#8B6FC7]/20 text-[#8B6FC7] px-1.5 py-0.5 rounded-full font-medium">
 {unreadCount} new
 </span>
 )}
 </div>
 {unreadCount > 0 && (
 <button
 onClick={markAllRead}
 className="text-xs text-gray-400 hover:text-indigo-400 transition-colors"
 >
 Mark all as read
 </button>
 )}
 </div>

 <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
 {notifications.map((item) => (
 <div
 key={item.id}
 className="p-2.5 rounded-xl border text-xs transition-all"
 >
 <div className="flex items-center justify-between mb-1">
 <div className="flex items-center gap-1.5 font-medium text-white">
 {item.type === 'growth' && <ArrowUpRight className="w-3.5 h-3.5 text-[#7ED6A5]" />}
 {item.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-[#F4B860]" />}
 {item.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-[#7ED6A5]" />}
 {item.type === 'update' && <Sparkles className="w-3.5 h-3.5 text-[#8B6FC7]" />}
 <span>{item.title}</span>
 </div>
 <span className="text-[10px] text-gray-500">{item.timestamp}</span>
 </div>
 <p className="text-gray-400 leading-relaxed text-[11px]">{item.description}</p>
 </div>
 ))}
 </div>
 </div>
 )}
 </div>

 {/* Profile Avatar & Menu */}
 <div className="relative">
 <button
 onClick={() => {
 setShowProfileMenu(!showProfileMenu);
 setShowNotifications(false);
 }}
 className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/[0.06]"
 aria-expanded={showProfileMenu}
 aria-haspopup="menu"
 >
 <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#8B6FC7]/50 bg-indigo-900/30 flex items-center justify-center text-xs font-bold text-white">
 {profile ? profile.name.split(' ').map(n => n[0]).join('') : 'AS'}
 </div>
 <div className="hidden md:block text-left text-xs">
 <div className="text-white font-medium leading-none">
 {profile ? profile.name : 'Alex Sharma'}
 </div>
 <div className="text-gray-400 text-[10px] mt-0.5">B.Tech CSE '27</div>
 </div>
 <ChevronDown className="w-3 h-3 text-gray-400" />
 </button>

 {showProfileMenu && (
 <div className="absolute right-0 mt-2 w-56 bg-[#232A30] border border-white/[0.1] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
 <div className="px-3 py-2 border-b border-white/[0.08]">
 <div className="text-xs font-semibold text-white">{profile?.name}</div>
 <div className="text-[11px] text-gray-400 truncate">{profile?.college}</div>
 <div className="text-[10px] text-indigo-400 mt-1 font-mono">CGPA: {profile?.cgpa} / 10</div>
 </div>
 <div className="py-1 text-xs">
 <Link
 to="/profile"
 onClick={() => setShowProfileMenu(false)}
 className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors"
 >
 <User className="w-3.5 h-3.5 text-indigo-400" />
 View Full Profile
 </Link>
 <Link
 to="/integrations"
 onClick={() => setShowProfileMenu(false)}
 className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors"
 >
 <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
 Connected Profiles
 </Link>
 </div>
 <div className="pt-1 border-t border-white/[0.08]">
 <button
 onClick={() => {
 setShowProfileMenu(false);
 showToast('Simulation: Switched to demo preview mode', undefined, 'default');
 }}
 className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-gray-200 rounded-lg hover:bg-white/[0.05] transition-colors"
 >
 Switch Student Profile
 </button>
 </div>
 </div>
 )}
 </div>
 </div>
 </header>
 );
};
