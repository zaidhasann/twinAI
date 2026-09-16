import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, typeOrDetail?: ToastType | string, legacyType?: ToastType | string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colors = {
  success: 'border-[#91A889] text-[#91A889]',
  error: 'border-red-500 text-red-400',
  warning: 'border-[#D6A05A] text-[#D6A05A]',
  info: 'border-[#C56A4A] text-[#C56A4A]',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, typeOrDetail: ToastType | string = 'info', legacyType?: ToastType | string) => {
    const type: ToastType = (legacyType ?? typeOrDetail) === 'success' || (legacyType ?? typeOrDetail) === 'teal'
      ? 'success'
      : (legacyType ?? typeOrDetail) === 'error'
      ? 'error'
      : (legacyType ?? typeOrDetail) === 'warning'
      ? 'warning'
      : 'info';
    const detail = legacyType ? typeOrDetail : undefined;
    const displayMessage = detail && !['default', 'indigo', 'teal', 'success', 'error', 'warning', 'info'].includes(detail)
      ? `${message} - ${detail}`
      : message;
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message: displayMessage, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => {
          const Icon = icons[toast.type];
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 bg-[#3A2A22] border ${colors[toast.type]} rounded-xl px-4 py-3 shadow-2xl min-w-[260px] max-w-sm animate-fade-in`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <p className="text-sm text-white flex-1">{toast.message}</p>
              <button
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
