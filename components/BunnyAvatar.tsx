import React from "react";
import Image from "next/image";

interface BunnyAvatarProps {
  src: string;
  alt: string;
}

export default function BunnyAvatar({ src, alt }: BunnyAvatarProps) {
  return (
    <div className="relative w-96 h-96 flex items-center justify-center select-none">
      {/* Background/Shadow */}
      <div className="absolute inset-x-8 bottom-4 top-20 bg-black/5 rounded-full blur-xl pointer-events-none" />

      {/* Hero Avatar Frame Overlay */}
      <img
        src="/Hero Avatar Frame.png"
        alt="Hero Avatar Frame"
        className="relative z-10 w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
}

