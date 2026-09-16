import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-7 h-7', text: 'text-sm' },
    md: { container: 'w-8 h-8', text: 'text-base' },
    lg: { container: 'w-11 h-11', text: 'text-xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.container} rounded-xl bg-gradient-to-tr from-[#C56A4A] to-[#91A889] p-px flex items-center justify-center`}>
        <div className="w-full h-full bg-[#2A1E18] rounded-xl flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-4/6 h-4/6" fill="none">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="url(#logoGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="logoGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#C56A4A" />
                <stop offset="1" stopColor="#91A889" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`${s.text} font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}>
          Twin<span className="text-[#C56A4A]">AI</span>
        </span>
      )}
    </div>
  );
}
