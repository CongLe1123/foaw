"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Laptop, Eye, FileText, User, BookOpen, AlertCircle, Edit } from "lucide-react";
import { useReactiveDb, Artifact } from "@/lib/db";

type EditorCategory = "profile" | "sop" | "cultural-adaptation" | "cv" | "program-material" | "letter-of-recommendation" | "exchange-sop";

export default function EditorClient() {
  const {
    profile,
    sop,
    artifacts,
    updateProfile,
    updateSop,
    updateArtifact
  } = useReactiveDb();

  const [activeCategory, setActiveCategory] = useState<EditorCategory>("profile");
  const [saveStatus, setSaveStatus] = useState<string>("SYSTEM_IDLE");

  // Local transient inputs for fluid, lag-free typing
  const [localProfile, setLocalProfile] = useState({
    name: "",
    tagline: "",
    email: ""
  });
  const [localSop, setLocalSop] = useState("");
  const [localArtifacts, setLocalArtifacts] = useState<{ [key: string]: Partial<Artifact> }>({});

  // Refs to hold active timeouts for debouncing mutations
  const profileTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sopTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const artifactTimeoutRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

  // Synchronize local state with DB when DB changes and no saves are pending
  useEffect(() => {
    if (profile && !profileTimeoutRef.current) {
      setLocalProfile({
        name: profile.name || "",
        tagline: profile.tagline || "",
        email: profile.email || ""
      });
    }
  }, [profile.name, profile.tagline, profile.email]);

  useEffect(() => {
    if (sop && !sopTimeoutRef.current) {
      setLocalSop(sop.content || "");
    }
  }, [sop.content]);

  // Create a serialized stable string of artifacts to prevent reference-based rendering loops
  const artifactsString = JSON.stringify(artifacts);

  useEffect(() => {
    if (artifacts && artifacts.length > 0) {
      // Only sync keys that don't have active typing timeouts
      setLocalArtifacts((prev) => {
        const updated = { ...prev };
        artifacts.forEach((art) => {
          if (!artifactTimeoutRefs.current[art.key]) {
            updated[art.key] = { ...art };
          }
        });
        return updated;
      });
    }
  }, [artifactsString]);

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
      if (sopTimeoutRef.current) clearTimeout(sopTimeoutRef.current);
      Object.values(artifactTimeoutRefs.current).forEach((t) => {
        if (t) clearTimeout(t);
      });
    };
  }, []);

  // Local transient states initialized from our reactive db
  const handleProfileChange = (field: string, value: any) => {
    // 1. Update local state immediately for instant feedback
    setLocalProfile((prev) => {
      const updated = { ...prev, [field]: value };
      
      // 2. Debounce mutation call
      if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
      setSaveStatus("SAVING_TO_STORES...");
      
      profileTimeoutRef.current = setTimeout(() => {
        updateProfile({ ...profile, ...updated });
        setSaveStatus("SAVED_AND_ACTIVE");
        profileTimeoutRef.current = null;
      }, 600); // 600ms debounce
      
      return updated;
    });
  };

  const handleSopChange = (value: string) => {
    // 1. Update local state immediately
    setLocalSop(value);
    
    // 2. Debounce mutation call
    if (sopTimeoutRef.current) clearTimeout(sopTimeoutRef.current);
    setSaveStatus("SAVING_TO_STORES...");
    
    sopTimeoutRef.current = setTimeout(() => {
      updateSop(value);
      setSaveStatus("SAVED_AND_ACTIVE");
      sopTimeoutRef.current = null;
    }, 600);
  };

  const handleArtifactChange = (key: string, field: keyof Artifact, value: string) => {
    // 1. Update local state immediately
    setLocalArtifacts((prev) => {
      const currentArt = prev[key] || {};
      const updatedArt = { ...currentArt, [field]: value };
      const updatedMap = { ...prev, [key]: updatedArt };
      
      // 2. Debounce mutation
      if (!artifactTimeoutRefs.current[key]) {
        artifactTimeoutRefs.current[key] = null;
      }
      if (artifactTimeoutRefs.current[key]) {
        clearTimeout(artifactTimeoutRefs.current[key]!);
      }
      setSaveStatus("SAVING_TO_STORES...");
      
      artifactTimeoutRefs.current[key] = setTimeout(() => {
        updateArtifact(key, { [field]: value });
        setSaveStatus("SAVED_AND_ACTIVE");
        artifactTimeoutRefs.current[key] = null;
      }, 600);
      
      return updatedMap;
    });
  };

  // Get active local artifact for editing and previewing
  const localCurrentArtifact = localArtifacts[activeCategory] || {
    key: activeCategory,
    title: "",
    documentBody: "",
    reviewer1Name: "",
    reviewer1Date: "",
    reviewer1Feedback: "",
    reviewer2Name: "",
    reviewer2Date: "",
    reviewer2Feedback: "",
    revisionNarrative: ""
  };

  // Markdown renderer for the scaled-down preview window
  const renderPreviewMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-xs font-bold text-slate-800 border-b border-pink-500/10 pb-0.5 mb-1 mt-2 font-serif">
            {trimmed.replace("# ", "")}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-[10px] font-bold text-pink-600 mb-1 mt-1.5 font-serif">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="ml-3 list-disc text-slate-700 text-[9px] mb-0.5">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed === "---") {
        return <hr key={idx} className="border-pink-100 my-1.5" />;
      }
      if (trimmed === "") return null;
      return (
        <p key={idx} className="text-slate-650 text-[9px] mb-1 leading-normal font-sans">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="flex-grow max-w-7xl w-full mx-auto px-4 py-6 relative flex flex-col">


      {/* Editor Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-pink-100 bg-white/80 p-4 rounded-2xl gap-4 mb-6 z-10 font-serif">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Feather className="w-5 h-5 text-pink-500 shrink-0" />
            <h1 className="text-lg sm:text-xl font-black text-slate-800 tracking-tight">
              Editorial Content Workspace
            </h1>
          </div>
          <p className="text-xs text-slate-500 italic">Reactive Split-Pane Content Hub</p>
        </div>

        {/* Sync Status Display */}
        <div className="flex items-center gap-3 font-serif text-xs sm:self-center">
          <span className="text-slate-500">Sync State:</span>
          <span className={`px-2.5 py-1 rounded-md border ${
            saveStatus === "SAVED_AND_ACTIVE" 
              ? "bg-emerald-50 border-emerald-200 text-emerald-800 font-bold" 
              : saveStatus === "SAVING_TO_STORES..." 
                ? "bg-pink-50 border-pink-200 text-pink-600 animate-pulse font-bold"
                : "bg-white border-pink-100 text-slate-500"
          }`}>
            {saveStatus}
          </span>
        </div>
      </div>

      {/* Split Pane Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
        
        {/* LEFT COLUMN: Input Control Panel (CMS Workspace) */}
        <div className="lg:col-span-6 flex flex-col border border-pink-100 bg-white/90 rounded-2xl p-4 sm:p-5 relative shadow-xl space-y-4 font-serif">
          <div className="flex items-center gap-2 border-b border-pink-100 pb-3 mb-2">
            <Edit className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-700 font-bold">Content Editor</span>
          </div>

          {/* Quick Categories Navigation */}
          <div className="flex flex-wrap gap-1 bg-pink-50/30 p-1 rounded-xl border border-pink-100">
            <button
              onClick={() => setActiveCategory("profile")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "profile" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveCategory("sop")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "sop" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              Essay (Art1)
            </button>
             <button
              onClick={() => setActiveCategory("exchange-sop")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "exchange-sop" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              Exch SOP (Art2)
            </button>
            <button
              onClick={() => setActiveCategory("letter-of-recommendation")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "letter-of-recommendation" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              Rec (Art3)
            </button>
            <button
              onClick={() => setActiveCategory("cv")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "cv" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              CV (Art4)
            </button>
            <button
              onClick={() => setActiveCategory("cultural-adaptation")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "cultural-adaptation" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              Adaptation (Art5)
            </button>
            <button
              onClick={() => setActiveCategory("program-material")}
              className={`flex-1 py-1.5 px-2 rounded-lg font-serif text-xs text-center transition-all cursor-pointer ${
                activeCategory === "program-material" ? "bg-pink-500 text-white font-bold" : "text-slate-600 hover:text-pink-600"
              }`}
            >
              Material (Art6)
            </button>
          </div>

          {/* Form Fields Container */}
          <div className="flex-1 overflow-y-auto max-h-[500px] pr-1 space-y-4 text-xs font-serif">
            {activeCategory === "profile" && (
              <div className="space-y-3 font-serif">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 text-xs font-bold">Professional Name</label>
                  <input
                    type="text"
                    value={localProfile.name}
                    onChange={(e) => handleProfileChange("name", e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 text-xs font-bold">Professional Tagline</label>
                  <textarea
                    rows={2}
                    value={localProfile.tagline}
                    onChange={(e) => handleProfileChange("tagline", e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs leading-normal"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 text-xs font-bold">Email (VinUni email mandatory)</label>
                  <input
                    type="email"
                    value={localProfile.email}
                    onChange={(e) => handleProfileChange("email", e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                  />
                </div>
              </div>
            )}

            {activeCategory === "sop" && (
              <div className="space-y-2 font-serif">
                <div className="flex justify-between items-center text-xs text-slate-555">
                  <span className="font-bold">Statement of Purpose Reflection Content</span>
                  <span className="px-1.5 py-0.5 rounded bg-pink-50 border border-pink-100 text-pink-655 font-bold">
                    {localSop.trim().split(/\s+/).filter(Boolean).length} Words (400-500 strict)
                  </span>
                </div>
                <textarea
                  rows={15}
                  value={localSop}
                  onChange={(e) => handleSopChange(e.target.value)}
                  className="w-full bg-white border border-pink-100 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs leading-relaxed"
                />
              </div>
            )}

            {activeCategory !== "profile" && activeCategory !== "sop" && (
              <div className="space-y-4 font-serif">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-555 text-xs font-bold">Reflective Title</label>
                  <input
                    type="text"
                    value={localCurrentArtifact.title}
                    onChange={(e) => handleArtifactChange(activeCategory, "title", e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-555 text-xs font-bold">Polished Deliverable Body (Markdown)</label>
                  <textarea
                    rows={8}
                    value={localCurrentArtifact.documentBody}
                    onChange={(e) => handleArtifactChange(activeCategory, "documentBody", e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs leading-normal"
                  />
                </div>

                {/* Double Peer Review Inputs */}
                <div className="p-3 border border-pink-100 bg-rose-50/10 rounded-xl space-y-3">
                  <span className="text-pink-700 font-bold text-xs">Collaborative Reader Echoes</span>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 text-[10px] uppercase font-bold">First Reader Name</label>
                      <input
                        type="text"
                        value={localCurrentArtifact.reviewer1Name}
                        onChange={(e) => handleArtifactChange(activeCategory, "reviewer1Name", e.target.value)}
                        className="bg-white border border-pink-100 rounded p-1.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 text-[10px] uppercase font-bold">First Reader Date</label>
                      <input
                        type="text"
                        value={localCurrentArtifact.reviewer1Date}
                        onChange={(e) => handleArtifactChange(activeCategory, "reviewer1Date", e.target.value)}
                        className="bg-white border border-pink-100 rounded p-1.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500 text-[10px] uppercase font-bold">First Reader Echoes</label>
                    <textarea
                      rows={2}
                      value={localCurrentArtifact.reviewer1Feedback}
                      onChange={(e) => handleArtifactChange(activeCategory, "reviewer1Feedback", e.target.value)}
                      className="w-full bg-white border border-pink-100 rounded p-1.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs leading-normal"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-pink-100">
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 text-[10px] uppercase font-bold">Second Reader Name</label>
                      <input
                        type="text"
                        value={localCurrentArtifact.reviewer2Name}
                        onChange={(e) => handleArtifactChange(activeCategory, "reviewer2Name", e.target.value)}
                        className="bg-white border border-pink-100 rounded p-1.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-slate-500 text-[10px] uppercase font-bold">Second Reader Date</label>
                      <input
                        type="text"
                        value={localCurrentArtifact.reviewer2Date}
                        onChange={(e) => handleArtifactChange(activeCategory, "reviewer2Date", e.target.value)}
                        className="bg-white border border-pink-100 rounded p-1.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-slate-500 text-[10px] uppercase font-bold">Second Reader Echoes</label>
                    <textarea
                      rows={2}
                      value={localCurrentArtifact.reviewer2Feedback}
                      onChange={(e) => handleArtifactChange(activeCategory, "reviewer2Feedback", e.target.value)}
                      className="w-full bg-white border border-pink-100 rounded p-1.5 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs leading-normal"
                    />
                  </div>
                </div>

                {/* Revision Narrative Input */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs text-slate-550">
                    <label className="font-bold">The Weaver's Reflection</label>
                    <span className="px-1.5 py-0.5 rounded bg-pink-50 border border-pink-100 text-pink-600 font-bold">
                      {(localCurrentArtifact.revisionNarrative || "").trim().split(/\s+/).filter(Boolean).length} / 300 Words (100-300 rule)
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={localCurrentArtifact.revisionNarrative}
                    onChange={(e) => handleArtifactChange(activeCategory, "revisionNarrative", e.target.value)}
                    className="w-full bg-white border border-pink-100 rounded-xl p-3 text-slate-800 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 font-sans text-xs leading-normal"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live View Screen (Scaled-down, Real-time responsive rendering) */}
        <div className="lg:col-span-6 flex flex-col border border-pink-100 bg-white/90 rounded-2xl p-4 sm:p-5 relative shadow-xl font-serif">
          <div className="flex items-center justify-between border-b border-pink-100 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-pink-500" />
              <span className="text-sm text-pink-700 font-bold">Active Reader View</span>
            </div>
            <span className="text-xs italic text-slate-400">Prerendered Output</span>
          </div>

          {/* Scaled Reading pane frame */}
          <div className="flex-grow rounded-xl border border-pink-100 bg-white overflow-hidden relative min-h-[400px] flex flex-col shadow-inner">
            <div className="px-4 py-2 border-b border-pink-100 bg-pink-50/30 flex justify-between items-center text-xs text-slate-555 font-serif italic">
              <span className="flex items-center gap-1.5 font-semibold"><Feather className="w-3.5 h-3.5 text-pink-500" /> Nguyễn Lê Tú Oanh Selected Reflections // Active Preview</span>
              <span>Reader Frame</span>
            </div>

            {/* Scale Container */}
            <div className="flex-grow p-4 overflow-y-auto max-h-[460px] bg-rose-50/10">
              <AnimatePresence mode="wait">
                {activeCategory === "profile" && (
                  <motion.div
                    key="profile-prev"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-6 space-y-4"
                  >
                    <div className="relative w-20 h-20 rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-sky-400 animate-pulse">
                      <div className="w-full h-full bg-white rounded-full overflow-hidden flex items-center justify-center relative">
                        <img
                          src="/Avatar.jpg"
                          alt="Nguyễn Lê Tú Oanh Avatar preview"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 font-serif">
                      <h2 className="text-sm font-black text-slate-900">{localProfile.name}</h2>
                      <p className="text-[10px] text-slate-655 max-w-xs mx-auto leading-relaxed italic">{localProfile.tagline}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center max-w-xs text-[9px] font-serif">
                      <span className="px-2 py-1 rounded bg-white border border-pink-100 text-slate-600 truncate max-w-[130px]">Email: {localProfile.email}</span>
                    </div>
                  </motion.div>
                )}

                {activeCategory === "sop" && (
                  <motion.div
                    key="sop-prev"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3 py-2 text-[9px] font-serif"
                  >
                    <div className="flex items-center justify-between border-b border-pink-100 pb-1 text-slate-500 font-serif uppercase font-bold">
                      <span>Statement of Purpose reflection</span>
                      <span>Reflections</span>
                    </div>
                    <div className="text-slate-800 leading-relaxed font-sans space-y-2 text-justify">
                      {localSop.split("\n\n").map((para, index) => (
                        <p key={index}>{para}</p>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeCategory !== "profile" && activeCategory !== "sop" && (
                  <motion.div
                    key={`${activeCategory}-prev`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 py-2"
                  >
                    {/* Block A Preview */}
                    <div className="p-3 border border-pink-100 bg-white rounded-lg">
                      <div className="border-b border-pink-100 pb-1.5 mb-2 flex justify-between items-center text-[8px] font-serif text-pink-655 uppercase font-bold">
                        <span>Polished Deliverable Preview</span>
                        <span className="text-slate-400">Reflective Text</span>
                      </div>
                      <div className="text-left font-sans">
                        {renderPreviewMarkdown(localCurrentArtifact.documentBody || "")}
                      </div>
                    </div>

                    {/* Block B Peer Feedback */}
                    <div className="p-3 border border-pink-100 bg-white rounded-lg space-y-2 font-serif">
                      <div className="border-b border-pink-100 pb-1 mb-1.5 flex justify-between items-center text-[8px] font-serif text-pink-655 uppercase font-bold">
                        <span>Collaborative Reader Echoes</span>
                        <span className="text-slate-400">Review Matrix</span>
                      </div>
                      
                      <div className="p-2 border border-pink-100 rounded bg-rose-50/10 text-[9px]">
                        <div className="font-serif text-slate-800 font-bold mb-0.5">1. {localCurrentArtifact.reviewer1Name || "First Reader"} ({localCurrentArtifact.reviewer1Date || "Date Pending"})</div>
                        <div className="text-slate-655 italic font-sans">"{localCurrentArtifact.reviewer1Feedback || "No feedback loaded."}"</div>
                      </div>
                      <div className="p-2 border border-pink-100 rounded bg-rose-50/10 text-[9px]">
                        <div className="font-serif text-slate-800 font-bold mb-0.5">2. {localCurrentArtifact.reviewer2Name || "Second Reader"} ({localCurrentArtifact.reviewer2Date || "Date Pending"})</div>
                        <div className="text-slate-655 italic font-sans">"{localCurrentArtifact.reviewer2Feedback || "No feedback loaded."}"</div>
                      </div>
                    </div>

                    {/* Block C Revision Narrative */}
                    <div className="p-3 border border-pink-100 bg-white rounded-lg space-y-1 relative font-serif">
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-pink-500" />
                      <div className="border-b border-pink-100 pb-1.5 mb-1.5 flex justify-between items-center text-[8px] font-serif text-pink-655 uppercase font-bold">
                        <span>The Weaver's Reflection</span>
                        <span className="text-slate-400">{(localCurrentArtifact.revisionNarrative || "").trim().split(/\s+/).filter(Boolean).length} Words</span>
                      </div>
                      <p className="text-slate-700 text-[9px] leading-normal font-sans text-justify">
                        {localCurrentArtifact.revisionNarrative}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
