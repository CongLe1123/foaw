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

  const formatText = (text: string) => {
    const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={`b-${i}`} className="font-black text-black">{part.slice(2, -2)}</strong>;
      }
      const codeParts = part.split(/(`[^`]+`)/g);
      return codeParts.map((subPart, j) => {
        if (subPart.startsWith("`") && subPart.endsWith("`")) {
          return (
            <code key={`c-${i}-${j}`} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-xs text-pink-600 font-semibold">
              {subPart.slice(1, -1)}
            </code>
          );
        }
        const italicParts = subPart.split(/(\*[^*]+\*)/g);
        return italicParts.map((italPart, k) => {
          if (italPart.startsWith("*") && italPart.endsWith("*")) {
            return <em key={`i-${i}-${j}-${k}`} className="italic font-medium text-slate-600">{italPart.slice(1, -1)}</em>;
          }
          return italPart;
        });
      });
    });
  };

  const parseMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-xl sm:text-2xl font-black text-black border-b-2 border-dashed border-slate-300 pb-2 font-serif-hand tracking-tight leading-[2rem] m-0 mb-8">
            {formatText(trimmed.replace("# ", ""))}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-base sm:text-lg font-bold text-[#ff5493] font-serif-hand tracking-wide leading-[2rem] m-0 mt-8 mb-8">
            {formatText(trimmed.replace("## ", ""))}
          </h2>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-slate-800 text-sm leading-[2rem] m-0">
            {formatText(trimmed.substring(2))}
          </li>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-4 border-[#ff5493] bg-pink-50/50 p-3 rounded-r-lg text-slate-850 italic text-sm my-2 leading-[2rem] m-0 mb-8">
            {formatText(trimmed.replace("> ", ""))}
          </blockquote>
        );
      }
      if (trimmed === "---") {
        return <hr key={idx} className="border-dashed border-black/10 my-4" />;
      }
      if (trimmed === "") {
        return null;
      }
      const isBoldStart = trimmed.startsWith("**");
      return (
        <p key={idx} className={`text-slate-800 text-sm font-sans leading-[2rem] m-0 mb-0 ${isBoldStart ? "indent-0" : "indent-8"}`}>
          {formatText(line)}
        </p>
      );
    });
  };

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
          <article className="text-slate-800 font-sans text-sm md:text-[15px] text-justify">
            {parseMarkdown(sop.content)}
          </article>
        </NotebookLayout>
      </div>
    </div>
  );
}
