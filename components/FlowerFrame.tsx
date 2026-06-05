import React from "react";

interface FlowerFrameProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}

export default function FlowerFrame({ children, className = "w-64 h-64", borderColor = "#ff5493" }: FlowerFrameProps) {
  // Generate a random ID for the clip path to prevent conflicts if multiple frames are rendered
  const clipId = React.useId().replace(/:/g, "");

  return (
    <div className={`relative ${className} flex items-center justify-center p-2 group`}>
      {/* Outer border shape matching the crop */}
      <div 
        className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03] pointer-events-none" 
        style={{ 
          backgroundColor: borderColor,
          clipPath: `url(#${clipId})`
        }} 
      />

      {/* Inner container containing the cropped children */}
      <div 
        className="absolute inset-1.5 overflow-hidden bg-white"
        style={{ 
          clipPath: `url(#${clipId})`
        }}
      >
        <div className="w-full h-full relative">
          {children}
        </div>
      </div>

      {/* SVG Clip Path definition */}
      <svg className="absolute w-0 h-0" width="0" height="0">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            {/* Using relative units (0 to 1) for scaling automatically with container */}
            {/* Top Petal */}
            <circle cx="0.5" cy="0.3" r="0.22" />
            {/* Right Petal */}
            <circle cx="0.7" cy="0.5" r="0.22" />
            {/* Bottom Petal */}
            <circle cx="0.5" cy="0.7" r="0.22" />
            {/* Left Petal */}
            <circle cx="0.3" cy="0.5" r="0.22" />
            {/* Center filling */}
            <circle cx="0.5" cy="0.5" r="0.26" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}


