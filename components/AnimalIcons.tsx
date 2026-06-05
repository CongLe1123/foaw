import React from "react";

export const DeerIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="50" cy="65" rx="25" ry="18" fill="#d7ccc8" />
    <ellipse cx="50" cy="65" rx="20" ry="14" fill="#a1887f" />
    {/* Neck & Head */}
    <path d="M 62 55 L 72 38 C 72 38, 75 32, 70 30 C 65 28, 62 35, 62 35 Z" fill="#a1887f" />
    <circle cx="72" cy="30" r="10" fill="#a1887f" />
    <circle cx="70" cy="30" r="8" fill="#d7ccc8" />
    {/* Ears */}
    <path d="M 76 22 C 78 15, 82 15, 78 22 Z" fill="#a1887f" stroke="#5d4037" strokeWidth="2" />
    <path d="M 68 22 C 66 15, 62 15, 68 22 Z" fill="#a1887f" stroke="#5d4037" strokeWidth="2" />
    {/* Antlers */}
    <path d="M 72 20 L 75 10 M 75 10 L 78 7 M 75 10 L 72 8" stroke="#5d4037" strokeWidth="3" strokeLinecap="round" />
    {/* Face details */}
    <circle cx="75" cy="28" r="1.5" fill="#000" />
    <circle cx="79" cy="32" r="2.5" fill="#ff8a80" /> {/* Blush */}
    {/* Legs */}
    <rect x="35" y="75" width="5" height="15" rx="2.5" fill="#5d4037" />
    <rect x="45" y="78" width="5" height="12" rx="2.5" fill="#5d4037" />
    <rect x="55" y="78" width="5" height="12" rx="2.5" fill="#5d4037" />
    <rect x="62" y="75" width="5" height="15" rx="2.5" fill="#5d4037" />
    {/* Tail */}
    <path d="M 27 60 Q 20 55 25 65 Z" fill="#a1887f" stroke="#5d4037" strokeWidth="1.5" />
  </svg>
);

export const BirdIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <circle cx="50" cy="55" r="22" fill="#fff9c4" />
    <circle cx="50" cy="55" r="20" fill="#fff59d" />
    {/* Head */}
    <circle cx="62" cy="40" r="14" fill="#fff59d" />
    {/* Eye */}
    <circle cx="68" cy="36" r="1.5" fill="#000" />
    {/* Beak */}
    <path d="M 76 38 L 84 41 L 76 44 Z" fill="#ffb74d" />
    {/* Wing */}
    <path d="M 40 55 C 32 55, 30 65, 42 62 Z" fill="#ffe082" />
    {/* Tail */}
    <path d="M 30 60 L 15 65 L 22 55 Z" fill="#ffe082" />
    {/* Legs */}
    <path d="M 46 75 L 46 85 M 46 85 L 42 88 M 46 85 L 50 88" stroke="#ffb74d" strokeWidth="3" strokeLinecap="round" />
    <path d="M 54 75 L 54 85 M 54 85 L 50 88 M 54 85 L 58 88" stroke="#ffb74d" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const FrogIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body */}
    <ellipse cx="50" cy="65" rx="26" ry="20" fill="#a5d6a7" />
    <ellipse cx="50" cy="65" rx="24" ry="18" fill="#81c784" />
    <ellipse cx="50" cy="68" rx="16" ry="12" fill="#e8f5e9" />
    {/* Eyes */}
    <circle cx="38" cy="45" r="8" fill="#81c784" />
    <circle cx="38" cy="45" r="5" fill="#fff" />
    <circle cx="39" cy="45" r="2" fill="#000" />
    
    <circle cx="62" cy="45" r="8" fill="#81c784" />
    <circle cx="62" cy="45" r="5" fill="#fff" />
    <circle cx="61" cy="45" r="2" fill="#000" />
    {/* Smile */}
    <path d="M 44 60 Q 50 66 56 60" stroke="#388e3c" strokeWidth="3" strokeLinecap="round" />
    {/* Blush */}
    <circle cx="32" cy="54" r="3" fill="#ff8a80" />
    <circle cx="68" cy="54" r="3" fill="#ff8a80" />
    {/* Legs */}
    <path d="M 26 72 Q 15 75 22 85" stroke="#388e3c" strokeWidth="4" strokeLinecap="round" />
    <path d="M 74 72 Q 85 75 78 85" stroke="#388e3c" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const BearIcon = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Head & Ears */}
    <circle cx="35" cy="35" r="10" fill="#ffe0b2" />
    <circle cx="35" cy="35" r="7" fill="#ffb74d" />
    <circle cx="65" cy="35" r="10" fill="#ffe0b2" />
    <circle cx="65" cy="35" r="7" fill="#ffb74d" />
    
    {/* Body */}
    <circle cx="50" cy="65" r="24" fill="#ffe0b2" />
    <circle cx="50" cy="65" r="20" fill="#ffb74d" />
    <circle cx="50" cy="65" r="14" fill="#fff3e0" />
    
    {/* Head */}
    <circle cx="50" cy="46" r="18" fill="#ffb74d" />
    {/* Snout */}
    <ellipse cx="50" cy="50" rx="6" ry="4.5" fill="#fff3e0" />
    <path d="M 50 48 L 50 51 M 50 51 Q 48 53 47 52 M 50 51 Q 52 53 53 52" stroke="#5d4037" strokeWidth="1.5" />
    <ellipse cx="50" cy="48" rx="2" ry="1.5" fill="#5d4037" />
    {/* Eyes */}
    <circle cx="44" cy="43" r="1.5" fill="#000" />
    <circle cx="56" cy="43" r="1.5" fill="#000" />
    {/* Blush */}
    <circle cx="40" cy="47" r="2.5" fill="#ff8a80" />
    <circle cx="60" cy="47" r="2.5" fill="#ff8a80" />
    {/* Arms */}
    <rect x="23" y="58" width="8" height="14" rx="4" fill="#ffb74d" transform="rotate(30 23 58)" />
    <rect x="69" y="58" width="8" height="14" rx="4" fill="#ffb74d" transform="rotate(-30 69 58)" />
    {/* Legs */}
    <circle cx="38" cy="82" r="7" fill="#ffb74d" />
    <circle cx="62" cy="82" r="7" fill="#ffb74d" />
  </svg>
);
