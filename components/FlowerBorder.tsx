import React from "react";

const FLOWER_COLORS = [
  "#fff176", // Yellow
  "#f48fb1", // Pink
  "#81c784", // Green
  "#90caf9", // Blue
  "#b39ddb", // Purple
  "#ffe0b2", // Orange
];

interface FlowerProps {
  color: string;
  className?: string;
}

export const CuteFlower: React.FC<FlowerProps> = ({ color, className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Petals */}
      <circle cx="12" cy="6.5" r="3.5" fill={color} />
      <circle cx="17.5" cy="10.5" r="3.5" fill={color} />
      <circle cx="15.5" cy="17" r="3.5" fill={color} />
      <circle cx="8.5" cy="17" r="3.5" fill={color} />
      <circle cx="6.5" cy="10.5" r="3.5" fill={color} />
      {/* Center */}
      <circle cx="12" cy="12" r="3" fill="#ffffff" />
      <circle cx="12" cy="12" r="2" fill="#ffd54f" />
    </svg>
  );
};

export const MiniDot: React.FC<{ className?: string }> = ({ className = "w-2 h-2" }) => (
  <svg className={className} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="2" fill="#ffffff" opacity="0.8" />
  </svg>
);

export default function FlowerBorder() {
  // We can render a set of repeating flowers and dots using CSS flexbox for top and bottom,
  // and absolute positioning for left and right columns.
  const flowersCount = 16;
  const items = Array.from({ length: flowersCount }).map((_, i) => ({
    color: FLOWER_COLORS[i % FLOWER_COLORS.length],
    id: i,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between p-1.5">
      {/* Top border */}
      <div className="w-full flex justify-between items-center px-4">
        {items.map((item) => (
          <React.Fragment key={`top-${item.id}`}>
            <CuteFlower color={item.color} className="w-5 h-5 sm:w-7 sm:h-7 drop-shadow-sm" />
            <MiniDot className="w-1.5 h-1.5 text-white/50 hidden sm:block" />
          </React.Fragment>
        ))}
      </div>

      {/* Middle section with side borders */}
      <div className="flex-1 flex justify-between px-1.5 py-4">
        {/* Left column */}
        <div className="flex flex-col justify-between items-center h-full">
          {items.slice(0, 8).map((item) => (
            <React.Fragment key={`left-${item.id}`}>
              <CuteFlower color={item.color} className="w-5 h-5 sm:w-7 sm:h-7 drop-shadow-sm" />
              <MiniDot className="w-1.5 h-1.5 text-white/50" />
            </React.Fragment>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col justify-between items-center h-full">
          {items.slice(4, 12).map((item) => (
            <React.Fragment key={`right-${item.id}`}>
              <CuteFlower color={item.color} className="w-5 h-5 sm:w-7 sm:h-7 drop-shadow-sm" />
              <MiniDot className="w-1.5 h-1.5 text-white/50" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="w-full flex justify-between items-center px-4">
        {items.reverse().map((item) => (
          <React.Fragment key={`bottom-${item.id}`}>
            <CuteFlower color={item.color} className="w-5 h-5 sm:w-7 sm:h-7 drop-shadow-sm" />
            <MiniDot className="w-1.5 h-1.5 text-white/50 hidden sm:block" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
