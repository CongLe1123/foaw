"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WavyNote, CloudNote, TapeNote } from "@/components/StickyNotes";

export default function FlowersPage() {
  return (
    <div className="min-h-screen bg-[#ff5493] text-slate-800 p-8 pt-24 font-cute">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between text-white">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </Link>
          <h1 className="text-4xl font-serif-hand font-black tracking-wide text-white">
            My Flowers 🌸
          </h1>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-6">
          {/* Note 1: Wavy Blue */}
          <WavyNote bgColor="#cce5ff" borderColor="#4a90e2">
            <h2 className="text-xl font-bold mb-3 text-blue-700">Flower Crafting</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              I love creating handcrafted flowers using crepe paper, wool, and clay! Making roses, daisies, and lavender is super satisfying.
            </p>
          </WavyNote>

          {/* Note 2: Pink Cloud with Green Bow */}
          <CloudNote bgColor="#ffe0e9" bowColor="#81c784">
            <h2 className="text-xl font-bold mb-3 text-pink-700">Floral Inspiration</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Flowers represent bright colors, freshness, and creative growth. I enjoy combining pastel shades to make gorgeous bouquets.
            </p>
          </CloudNote>

          {/* Note 3: Tape White */}
          <TapeNote bgColor="#ffffff">
            <h2 className="text-xl font-bold mb-3 text-slate-700">My Creations</h2>
            <ul className="text-sm text-slate-700 space-y-2 list-disc list-inside">
              <li>Giant crepe paper roses</li>
              <li>Cozy crocheted tulips</li>
              <li>Dried flower bookmarks</li>
              <li>Mini clay succulents</li>
            </ul>
          </TapeNote>
        </div>
      </div>
    </div>
  );
}
