import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ ease: "linear", duration: 4, repeat: Infinity }}
      className={`${className} shrink-0`}
    >
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </motion.div>
  );
};

export const MiniDot: React.FC<{ className?: string }> = ({ className = "w-2 h-2" }) => (
  <svg className={`${className} shrink-0`} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="2" fill="#ffffff" opacity="0.8" />
  </svg>
);

export default function FlowerBorder() {
  const flowersCount = 12;
  const items = Array.from({ length: flowersCount }).map((_, i) => ({
    color: FLOWER_COLORS[i % FLOWER_COLORS.length],
    id: i,
  }));

  // Double items for seamless infinite scroll loops
  const doubledItems = [...items, ...items];

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-20 flex flex-col justify-between p-1">
      {/* Top border - horizontally running right */}
      <div className="w-full flex items-center overflow-hidden h-38">
        <motion.div
          className="flex gap-6 items-center shrink-0 pr-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {doubledItems.map((item, idx) => (
            <React.Fragment key={`top-${idx}`}>
              <CuteFlower color={item.color} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
              <MiniDot className="w-2 h-2 text-white/55" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Middle section with vertically running side borders */}
      <div className="flex-grow flex justify-between relative overflow-hidden">
        {/* Left column - vertically running up */}
        <div className="w-16 h-full flex flex-col items-center overflow-hidden">
          <motion.div
            className="flex flex-col gap-6 items-center shrink-0 pb-6"
            animate={{ y: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          >
            {doubledItems.map((item, idx) => (
              <React.Fragment key={`left-${idx}`}>
                <CuteFlower color={item.color} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
                <MiniDot className="w-2 h-2 text-white/55" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right column - vertically running down */}
        <div className="w-16 h-full flex flex-col items-center overflow-hidden">
          <motion.div
            className="flex flex-col gap-6 items-center shrink-0 pt-6"
            animate={{ y: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          >
            {doubledItems.map((item, idx) => (
              <React.Fragment key={`right-${idx}`}>
                <CuteFlower color={item.color} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
                <MiniDot className="w-2 h-2 text-white/55" />
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom border - horizontally running left */}
      <div className="w-full flex items-center overflow-hidden h-38">
        <motion.div
          className="flex gap-6 items-center shrink-0 pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {doubledItems.map((item, idx) => (
            <React.Fragment key={`bottom-${idx}`}>
              <CuteFlower color={item.color} className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-sm" />
              <MiniDot className="w-2 h-2 text-white/55" />
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

