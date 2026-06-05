"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WavyNote, CloudNote, TapeNote } from "@/components/StickyNotes";

export default function GamePage() {
  return (
    <div className="min-h-screen bg-[#dbeb9d] text-slate-800 p-8 pt-24 font-cute">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-black font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </Link>
          <h1 className="text-4xl font-serif-hand font-black tracking-wide text-slate-850">
            My game 🎮
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-6">
          {/* Note 1: Wavy Pink */}
          <WavyNote bgColor="#ffe0e9" borderColor="#ff5493">
            <h2 className="text-xl font-bold mb-3 text-pink-700">Favorite Genre</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Cozy, cute, and relaxing simulation games! I love building beautiful islands, harvesting crops, and decorating custom houses.
            </p>
          </WavyNote>

          {/* Note 2: Blue Cloud with Bow */}
          <CloudNote bgColor="#cce5ff" bowColor="#ff5493">
            <h2 className="text-xl font-bold mb-3 text-blue-700">Cozy Favorites</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Animal Crossing: New Horizons, Minecraft (building cute pastel cottages), and Stardew Valley are my ultimate stress relievers.
            </p>
          </CloudNote>

          {/* Note 3: Tape Yellow */}
          <TapeNote bgColor="#fffdeb">
            <h2 className="text-xl font-bold mb-3 text-amber-700">Play List 2026</h2>
            <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>Stardew Valley Coop</li>
              <li>Unpacking</li>
              <li>Dorfromantik</li>
              <li>Sky: Children of the Light</li>
            </ul>
          </TapeNote>
        </div>
      </div>
    </div>
  );
}
