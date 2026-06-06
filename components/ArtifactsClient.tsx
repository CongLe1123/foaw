"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Edit3, Users, CheckCircle } from "lucide-react";
import { useReactiveDb } from "@/lib/db";
import NotebookLayout from "@/components/NotebookLayout";
import { DeerIcon, BirdIcon, FrogIcon, BearIcon } from "@/components/AnimalIcons";

export default function ArtifactsClient() {
  const { artifacts } = useReactiveDb();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("exchange-sop");
  const [openReviewers, setOpenReviewers] = useState<{ [key: string]: boolean }>({
    rev1: true,
    rev2: false
  });

  // Sync with query param 'tab' if it exists (e.g. from Home page clicks)
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["cultural-adaptation", "cv", "program-material", "letter-of-recommendation", "exchange-sop"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const activeArtifact = (artifacts && artifacts.length > 0)
    ? (artifacts.find((art) => art.key === activeTab) || artifacts[0])
    : null;

  const handleToggleReviewer = (key: string) => {
    setOpenReviewers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Determine background color based on active tab matching the design PDF
  const getBgColor = (key: string) => {
    switch (key) {
      case "cultural-adaptation":
        return "#ff5493";
      case "cv":
        return "#dbeb9d";
      case "program-material":
        return "#ff5493";
      case "letter-of-recommendation":
        return "#dbeb9d";
      case "exchange-sop":
        return "#ff5493";
      default:
        return "#ff5493";
    }
  };

  const getNotebookTitle = (key: string) => {
    switch (key) {
      case "cultural-adaptation":
        return "CULTURAL ADAPTATION";
      case "cv":
        return "CURRICULUM VITAE";
      case "program-material":
        return "PROGRAM MATERIAL";
      case "letter-of-recommendation":
        return "LETTER OF RECOMMENDATION";
      case "exchange-sop":
        return "EXCHANGE STATEMENT OF PURPOSE";
      default:
        return "ACADEMIC DOCUMENT";
    }
  };

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

  const narrativeWordCount = activeArtifact?.revisionNarrative
    ? activeArtifact.revisionNarrative.trim().split(/\s+/).length
    : 0;

  const renderAnimalIcon = () => {
    switch (activeTab) {
      case "cultural-adaptation":
        return <FrogIcon className="w-16 h-16" />;
      case "cv":
        return <BearIcon className="w-16 h-16" />;
      case "program-material":
        return <BirdIcon className="w-16 h-16" />;
      case "letter-of-recommendation":
        return <DeerIcon className="w-16 h-16" />;
      case "exchange-sop":
        return <DeerIcon className="w-16 h-16" />;
      default:
        return null;
    }
  };

  // Custom side panel containing peer feedback and the revision narrative
  const sidePanel = (
    <div className="space-y-6">
      <div className="p-4 rounded-2xl border-3 border-black bg-white flex flex-col items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {renderAnimalIcon()}
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Companion Guide</span>
      </div>

      {/* Block B: Peer Reviews */}
      <div className="p-5 rounded-2xl border-3 border-black bg-white space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-2 font-serif-hand">
          <Users className="w-5 h-5 text-[#ff5493]" />
          <span className="text-sm text-black font-black">Peer Feedback Matrix</span>
        </div>

        {/* Reviewer 1 */}
        <div className="border-2 border-black rounded-xl overflow-hidden">
          <button
            onClick={() => handleToggleReviewer("rev1")}
            className="w-full flex items-center justify-between p-3 text-xs text-left bg-slate-50 font-bold"
          >
            <span>1. {activeArtifact?.reviewer1Name || "First Reader"} ({activeArtifact?.reviewer1Date || "Pending"})</span>
            <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${openReviewers.rev1 ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {openReviewers.rev1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t-2 border-black p-3 bg-white text-xs leading-relaxed text-slate-700 italic font-medium"
              >
                "{activeArtifact?.reviewer1Feedback || "No feedback loaded."}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reviewer 2 */}
        <div className="border-2 border-black rounded-xl overflow-hidden">
          <button
            onClick={() => handleToggleReviewer("rev2")}
            className="w-full flex items-center justify-between p-3 text-xs text-left bg-slate-50 font-bold"
          >
            <span>2. {activeArtifact?.reviewer2Name || "Second Reader"} ({activeArtifact?.reviewer2Date || "Pending"})</span>
            <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${openReviewers.rev2 ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence initial={false}>
            {openReviewers.rev2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t-2 border-black p-3 bg-white text-xs leading-relaxed text-slate-700 italic font-medium"
              >
                "{activeArtifact?.reviewer2Feedback || "No feedback loaded."}"
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Block C: Revision Narrative */}
      <div className="p-5 rounded-2xl border-3 border-black bg-white space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="flex items-center gap-2 border-b-2 border-black pb-3 mb-2 font-serif-hand">
          <Edit3 className="w-5 h-5 text-[#ff5493]" />
          <span className="text-sm text-black font-black">Revision Narrative</span>
        </div>

        <p className="text-slate-800 text-xs sm:text-sm leading-relaxed text-justify">
          {activeArtifact?.revisionNarrative || "No reflection loaded."}
        </p>

        <div className="pt-3 border-t-2 border-dashed border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-slate-650 font-bold">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Reflection depth</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-50 border-2 border-black font-black text-slate-800">
            {narrativeWordCount} / 300 words
          </span>
        </div>
      </div>
    </div>
  );

  const activeBg = getBgColor(activeTab);

  return (
    <div
      className="flex-1 w-full min-h-screen py-12 px-4 transition-colors duration-500 flex flex-col items-center justify-center "
      style={{ backgroundColor: activeBg }}
    >
      <div className="max-w-6xl w-full">

        {/* Interactive Tabs Header */}
        <div className="relative border-3 border-black bg-white p-1.5 rounded-2xl flex flex-wrap sm:flex-nowrap gap-1.5 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {artifacts.map((art) => {
            const isSelected = activeTab === art.key;
            return (
              <button
                key={art.key}
                onClick={() => {
                  setActiveTab(art.key);
                  setOpenReviewers({ rev1: true, rev2: false });
                }}
                className={`relative flex-1 py-3 px-4 rounded-xl font-cute text-sm text-center transition-all duration-300 z-10 cursor-pointer border-2 ${isSelected ? "text-white font-black border-black bg-[#ff5493]" : "text-slate-700 hover:text-[#ff5493] border-transparent"
                  }`}
              >
                {art.title}
              </button>
            );
          })}
        </div>

        {/* Notebook Render */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <NotebookLayout
              title={getNotebookTitle(activeTab)}
              sidePanel={sidePanel}
            >
              <article className="text-slate-800 font-sans text-sm md:text-[15px] text-justify">
                {parseMarkdown(activeArtifact?.documentBody || "")}
              </article>


            </NotebookLayout>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
