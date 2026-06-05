import React from "react";

// 1. Wavy Note component
export const WavyNote: React.FC<{ children: React.ReactNode; bgColor?: string; borderColor?: string }> = ({
  children,
  bgColor = "#ffe0e9",
  borderColor = "#ff5493",
}) => {
  return (
    <div className="relative p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: bgColor }}>
      {/* Sketchy wavy outline effect using SVG */}
      <svg className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none stroke-current" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ color: borderColor }}>
        <path d="M 5 5 Q 25 2, 50 5 Q 75 8, 95 5 Q 98 25, 95 50 Q 92 75, 95 95 Q 75 98, 50 95 Q 25 92, 5 95 Q 2 75, 5 50 Q 8 25, 5 5 Z" strokeWidth="2.5" strokeDasharray="3 3" />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// 2. Cloud Note component with a bow
export const CloudNote: React.FC<{ children: React.ReactNode; bgColor?: string; bowColor?: string }> = ({
  children,
  bgColor = "#cce5ff",
  bowColor = "#ff5493",
}) => {
  return (
    <div className="relative p-8 rounded-[40px] border-3 border-dashed border-white shadow-lg flex flex-col items-center justify-center text-center" style={{ backgroundColor: bgColor }}>
      {/* Bow SVG at the top */}
      <div className="absolute -top-5 z-20">
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Left loop */}
          <path d="M 30 15 C 15 -5, 5 5, 30 15 Z" fill={bowColor} stroke="#000" strokeWidth="2" />
          {/* Right loop */}
          <path d="M 30 15 C 45 -5, 55 5, 30 15 Z" fill={bowColor} stroke="#000" strokeWidth="2" />
          {/* Left ribbon tail */}
          <path d="M 28 15 C 20 22, 15 28, 12 25" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right ribbon tail */}
          <path d="M 32 15 C 40 22, 45 28, 48 25" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
          {/* Center knot */}
          <circle cx="30" cy="15" r="4.5" fill={bowColor} stroke="#000" strokeWidth="2" />
        </svg>
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};

// 3. Yellow/White Sticky Note with Tape
export const TapeNote: React.FC<{ children: React.ReactNode; bgColor?: string }> = ({
  children,
  bgColor = "#fffdeb",
}) => {
  return (
    <div className="relative p-6 shadow-md border border-slate-200/50 flex flex-col min-h-[180px]" style={{ backgroundColor: bgColor }}>
      {/* Washi Tape/Pin at the top center */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#bebebe]/80 rounded-full border border-[#9a9a9a]/40 shadow-inner flex items-center justify-center">
        <div className="w-8 h-8 bg-[#8a8a8a]/30 rounded-full" />
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </div>
  );
};
