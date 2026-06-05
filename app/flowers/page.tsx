"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { WavyNote, CloudNote, TapeNote } from "@/components/StickyNotes";
import { motion } from "framer-motion";

export default function FlowersPage() {
  return (
    <div className="min-h-screen bg-[#ff5493] text-slate-800 p-8 font-cute overflow-x-hidden">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Go Back Header (floating/top) */}
        <div className="flex items-center justify-between text-white">
          <Link href="/" className="flex items-center gap-2 text-white/80 hover:text-white font-semibold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </Link>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Row 1: Top-Left Wavy Note & Top-Right Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Note 1: Wavy Blue - Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <WavyNote bgColor="#cce5ff" borderColor="#4a90e2">
              <img
                src="/Flower-1.jpg"
                alt="Flower Crafting"
                className="w-full h-80 object-cover rounded-xl border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </WavyNote>
          </motion.div>

          {/* Right Column: Title "My Flowers" */}
          <div className="flex md:justify-start justify-center md:pl-8 text-white">
            <h1 className="text-6xl sm:text-7xl font-serif-hand font-black tracking-wide text-white drop-shadow-md">
              My Flowers 🌸
            </h1>
          </div>
        </div>

        {/* Row 2: Middle-Right Cloud Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hidden md:block" /> {/* Spacer column */}
          
          {/* Note 2: Pink Cloud with Green Bow - Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <CloudNote bgColor="#ffe0e9" bowColor="#81c784">
              <img
                src="/Flower-2.jpg"
                alt="Floral Inspiration"
                className="w-full h-80 object-cover rounded-xl border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </CloudNote>
          </motion.div>
        </div>

        {/* Row 3: Bottom-Left Tape Note */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Note 3: Tape White - Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <TapeNote bgColor="#ffffff">
              <img
                src="/Flower-3.jpg"
                alt="My Creations"
                className="w-full h-80 object-cover rounded-xl border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </TapeNote>
          </motion.div>
          
          <div className="hidden md:block" /> {/* Spacer column */}
        </div>
      </div>
    </div>
  );
}
