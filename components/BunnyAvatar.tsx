import React from "react";
import Image from "next/image";

interface BunnyAvatarProps {
  src: string;
  alt: string;
}

export default function BunnyAvatar({ src, alt }: BunnyAvatarProps) {
  return (
    <div className="relative w-72 h-80 flex items-center justify-center select-none">
      {/* Background/Shadow */}
      <div className="absolute inset-x-8 bottom-4 top-20 bg-black/5 rounded-full blur-xl pointer-events-none" />

      {/* The Avatar (Cropped to circle) positioned behind the bunny costume cutout */}
      <div className="absolute top-[48px] w-28 h-28 rounded-full overflow-hidden border-2 border-pink-100 z-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="112px"
          className="object-cover scale-110"
        />
      </div>

      {/* Bunny Costume Overlay (SVG) */}
      <svg
        className="relative z-10 w-full h-full drop-shadow-md"
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Ear */}
        <path
          d="M 65 95 C 45 40, 60 10, 80 15 C 95 20, 95 65, 88 95 Z"
          fill="#ffffff"
          stroke="#000"
          strokeWidth="3.5"
        />
        <path
          d="M 68 85 C 55 45, 65 25, 75 22 C 85 20, 83 60, 78 85 Z"
          fill="#ffd1dc"
        />

        {/* Right Ear */}
        <path
          d="M 135 95 C 155 40, 140 10, 120 15 C 105 20, 105 65, 112 95 Z"
          fill="#ffffff"
          stroke="#000"
          strokeWidth="3.5"
        />
        <path
          d="M 132 85 C 145 45, 135 25, 125 22 C 115 20, 117 60, 122 85 Z"
          fill="#ffd1dc"
        />

        {/* Bunny Face/Hood Body */}
        <path
          d="M 100 85 C 50 85, 30 115, 30 145 C 30 180, 60 205, 100 205 C 140 205, 170 180, 170 145 C 170 115, 150 85, 100 85 Z"
          fill="#ffffff"
          stroke="#000"
          strokeWidth="3.5"
        />

        {/* Cutout Ring Border inside the hood */}
        <circle cx="100" cy="145" r="38" stroke="#000" strokeWidth="3" fill="none" />

        {/* Bunny Bow */}
        <g transform="translate(68, 80)">
          {/* Left loop */}
          <path d="M 15 10 C 2 -2, -2 6, 15 10 Z" fill="#ff5493" stroke="#000" strokeWidth="2" />
          {/* Right loop */}
          <path d="M 15 10 C 28 -2, 32 6, 15 10 Z" fill="#ff5493" stroke="#000" strokeWidth="2" />
          {/* Ribbon tails */}
          <path d="M 12 10 Q 5 18, 2 16" stroke="#000" strokeWidth="2" />
          <path d="M 18 10 Q 25 18, 28 16" stroke="#000" strokeWidth="2" />
          {/* Center Knot */}
          <circle cx="15" cy="10" r="3.5" fill="#ff5493" stroke="#000" strokeWidth="2" />
        </g>

        {/* Bunny Whiskers/Cheeks */}
        {/* Left Blush */}
        <ellipse cx="50" cy="150" rx="6" ry="4" fill="#ffd1dc" />
        {/* Right Blush */}
        <ellipse cx="150" cy="150" rx="6" ry="4" fill="#ffd1dc" />

        {/* Tiny Mouth under the cutout */}
        <path
          d="M 97 190 Q 100 193 103 190"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Cute Bunny Tail (Behind) */}
        <circle cx="165" cy="185" r="16" fill="#ffffff" stroke="#000" strokeWidth="3" />
        <circle cx="165" cy="185" r="12" fill="#fff" />
      </svg>
    </div>
  );
}
