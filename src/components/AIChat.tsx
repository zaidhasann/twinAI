import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Minimize2, Maximize2, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SAMPLE_RESPONSES = [
  "Based on your profile, I recommend focusing on System Design next. You're strong in DSA but your system design score is 52% — that's the gap companies like Google and Amazon will probe hardest.",
  "Your placement readiness is 78%. To reach 90%+, tackle 3 things: finish the React project, solve 20 more hard LeetCode problems, and practice 5 mock interviews.",
  "For Goldman Sachs, they heavily test financial domain knowledge. Your CS fundamentals are strong (89%), but you'd benefit from learning about trading systems and low-latency programming.",
  "You're on track! At your current pace, you'll be interview-ready for top product companies in 6–8 weeks. Keep your daily streak going.",
  "Your weakest area is DBMS (62%). I'd suggest spending 30 mins daily for 2 weeks on SQL optimization and indexing — that alone can boost your readiness score by 8–10 points.",
];

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChat({ isOpen, onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi! I'm your Career Twin AI. Ask me anything about your placement readiness, skill gaps, or study plan. 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const aiResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
    setMessages(prev => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      },
    ]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  if (!isOpen) return null;

  const widthClass = isExpanded ? 'w-[420px]' : 'w-[340px]';
  const heightClass = isExpanded ? 'h-[600px]' : 'h-[480px]';

  return (
    <div
      className={`glass-panel fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#232A30] border border-white/[0.12] rounded-xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${widthClass} ${heightClass}`}
    >
      {/* Chat Header */}
      <div className="p-4 border-b border-white/[0.08] bg-[#171B1F]/90 backdrop-blur-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#8B6FC7] to-[#7ED6A5] p-px flex items-center justify-center">
            <div className="w-full h-full bg-[#171B1F] rounded-[6px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#8B6FC7]" />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              Your Career Twin
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ED6A5] animate-ping" />
            </div>
            <p className="text-[11px] text-gray-400">Ask me anything about your preparation</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors hidden sm:block"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'assistant' ? 'bg-gradient-to-tr from-[#8B6FC7] to-[#7ED6A5]' : 'bg-white/[0.1]'}`}>
              {msg.role === 'assistant' ? (
                <Bot className="w-4 h-4 text-white" />
              ) : (
                <User className="w-3.5 h-3.5 text-gray-300" />
              )}
            </div>
            <div
              className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#8B6FC7] text-white rounded-tr-sm'
                  : 'bg-white/[0.05] text-gray-200 rounded-tl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#8B6FC7] to-[#7ED6A5] flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/[0.05] px-3.5 py-3 rounded-xl rounded-tl-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
        {['What should I study?', 'My weak areas', 'Best companies for me'].map(prompt => (
          <button
            key={prompt}
            onClick={() => { setInput(prompt); }}
            className="shrink-0 text-[10px] px-2.5 py-1 rounded-full border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.2] transition-colors whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/[0.08] flex items-center gap-2 shrink-0">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your Career Twin..."
          className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#8B6FC7]/50 focus:bg-white/[0.07] transition-all"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl bg-[#8B6FC7] hover:bg-[#7357AB] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
