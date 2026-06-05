"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Award, GraduationCap, CheckCircle } from "lucide-react";
import { useReactiveDb } from "@/lib/db";
import NotebookLayout from "@/components/NotebookLayout";
import { DeerIcon } from "@/components/AnimalIcons";

export default function SopClient() {
  const { sop } = useReactiveDb();

  // Word count check
  const wordCount = sop.content.trim().split(/\s+/).length;

  const sidePanel = (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="p-6 rounded-2xl border-3 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6"
    >
      <div className="border-b-2 border-black pb-3 flex flex-col items-center gap-2">
        <DeerIcon className="w-16 h-16" />
        <h3 className="font-serif-hand text-lg text-black font-black">Essay Metadata</h3>
      </div>

      <ul className="space-y-4 text-xs font-bold text-slate-700">
        <li className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#ff5493] shrink-0" />
          <span>Course: <strong className="text-black">ENGL1030</strong></span>
        </li>
        <li className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#ff5493] shrink-0" />
          <span>Date: <strong className="text-black">May 2026</strong></span>
        </li>
        <li className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#ff5493] shrink-0" />
          <span>Institution: <strong className="text-black">VinUniversity</strong></span>
        </li>
        <li className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-[#ff5493] shrink-0" />
          <span>Integrity: <strong className="text-emerald-700">Harmony Confirmed</strong></span>
        </li>
      </ul>

      <div className="pt-3 border-t-2 border-black flex justify-between items-center text-xs font-bold">
        <span className="text-slate-500">Reflection Scope:</span>
        <span className="px-2.5 py-1 rounded bg-[#ff5493]/10 border-2 border-black text-[#ff5493] font-black">
          {wordCount} Words
        </span>
      </div>
    </motion.div>
  );

  return (
    <div className="flex-1 bg-[#dbeb9d] w-full min-h-screen px-4 py-12 relative flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <NotebookLayout title="STATEMENT OF PURPOSE" sidePanel={sidePanel}>
          <article className="space-y-8 text-slate-800 leading-[2rem] font-sans text-sm md:text-[15px] text-justify">
            {sop.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="indent-0 m-0">
                {paragraph}
              </p>
            ))}
          </article>


        </NotebookLayout>
      </div>
    </div>
  );
}
