"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Edit3, Users, CheckCircle } from "lucide-react";
import { useReactiveDb } from "@/lib/db";
import NotebookLayout from "@/components/NotebookLayout";

export default function ArtifactsClient() {
  const { artifacts } = useReactiveDb();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("cv");
  const [openReviewers, setOpenReviewers] = useState<{ [key: string]: boolean }>({
    rev1: true,
    rev2: false
  });

  // Sync with query param 'tab' if it exists (e.g. from Home page clicks)
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam && ["cv", "cover-letter", "linkedin-opt", "email-templates"].includes(tabParam)) {
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
      case "cv": // Letter of Rec
        return "#ff5493";
      case "cover-letter": // Program Material
        return "#dbeb9d";
      case "linkedin-opt": // Cultural Adaption
        return "#ff5493";
      case "email-templates":
        return "#dbeb9d";
      default:
        return "#ff5493";
    }
  };

  const getNotebookTitle = (key: string) => {
    switch (key) {
      case "cv":
        return "LETTER OF RECOMMENDATION";
      case "cover-letter":
        return "PROGRAM MATERIAL";
      case "linkedin-opt":
        return "CULTURAL ADAPTION ESAY";
      case "email-templates":
        return "EMAIL TEMPLATES";
      default:
        return "ACADEMIC DOCUMENT";
    }
  };

  const parseMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-xl sm:text-2xl font-black text-black border-b-2 border-dashed border-slate-300 pb-2 mb-4 mt-6 font-serif-hand tracking-tight">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-base sm:text-lg font-bold text-[#ff5493] mb-2 mt-4 font-serif-hand tracking-wide">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 list-disc text-slate-800 text-sm leading-relaxed mb-1">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote key={idx} className="border-l-4 border-[#ff5493] bg-pink-50/50 p-3 rounded-r-lg text-slate-850 italic text-sm my-2">
            {trimmed.replace("> ", "")}
          </blockquote>
        );
      }
      if (trimmed === "---") {
        return <hr key={idx} className="border-dashed border-black/10 my-4" />;
      }
      if (trimmed === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p key={idx} className="text-slate-800 text-sm leading-relaxed mb-2 font-sans">
          {line}
        </p>
      );
    });
  };

  const narrativeWordCount = activeArtifact?.revisionNarrative
    ? activeArtifact.revisionNarrative.trim().split(/\s+/).length
    : 0;

  // Custom side panel containing peer feedback and the revision narrative
  const sidePanel = (
    <div className="space-y-6">
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
      className="flex-1 w-full min-h-screen py-12 px-4 transition-colors duration-500 flex flex-col items-center justify-center pt-24"
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
                className={`relative flex-1 py-3 px-4 rounded-xl font-cute text-sm text-center transition-all duration-300 z-10 cursor-pointer border-2 ${
                  isSelected ? "text-white font-black border-black bg-[#ff5493]" : "text-slate-700 hover:text-[#ff5493] border-transparent"
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
              <div className="prose-custom max-w-none">
                {parseMarkdown(activeArtifact?.documentBody || "")}
              </div>
            </NotebookLayout>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
