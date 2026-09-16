import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { TopNavbar } from '../components/TopNavbar';
import { AIChat } from '../components/AIChat';
import { Sparkles, Menu } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#2A1E18] text-gray-100 flex flex-col antialiased selection:bg-[#C56A4A] selection:text-white">
      {/* Sidebar navigation */}
      <Sidebar collapsed={false} onToggle={() => setSidebarOpen(prev => !prev)} />

      {/* Main Content Area */}
      <div className="pl-16 lg:pl-60 flex flex-col flex-1 min-w-0">
        {/* Top Navbar */}
        <div className="flex items-center justify-between lg:block">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-3 text-gray-400 hover:text-white bg-[#2A1E18] border-b border-white/[0.08] w-full flex items-center gap-3"
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs font-semibold text-gray-300">TwinAI Menu</span>
          </button>
        </div>

        <TopNavbar onOpenAssistant={() => setAssistantOpen(true)} />

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating Ask TwinAI Trigger Button */}
      {!assistantOpen && (
        <button
          onClick={() => setAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#C56A4A] via-[#A94F36] to-[#91A889] hover:opacity-95 text-white p-3.5 rounded-full shadow-2xl shadow-indigo-500/30 flex items-center gap-2.5 group transition-transform hover:scale-105 cursor-pointer"
          aria-label="Ask TwinAI"
        >
          <Sparkles className="w-5 h-5 animate-spin-slow" />
          <span className="text-xs font-semibold pr-1.5 hidden sm:inline">Ask TwinAI</span>
          <span className="w-2 h-2 rounded-full bg-[#91A889] absolute top-1 right-1 animate-ping" />
        </button>
      )}

      {/* Floating Interactive AI Career Assistant */}
      <AIChat isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />
    </div>
  );
};
