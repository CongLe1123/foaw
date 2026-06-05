"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Link as LinkIcon, GitBranch, ArrowUpRight, Feather, UserCheck } from "lucide-react";
import { useReactiveDb } from "@/lib/db";

export default function ContactClient() {
  const { profile } = useReactiveDb();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 relative flex flex-col justify-center">


      <div className="flex flex-col items-center text-center gap-2 mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="p-3 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-500 mb-2"
        >
          <UserCheck className="w-6 h-6" />
        </motion.div>
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl sm:text-4xl font-serif font-black tracking-tight leading-none text-slate-800"
        >
          Shared Spaces & Connection
        </motion.h1>
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xs font-serif italic text-slate-500 tracking-wide"
        >
          Let us share pathways and create meaningful works
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Email Card */}
        <motion.a
          href={`mailto:${profile.email}`}
          variants={itemVariants}
          className="p-6 rounded-2xl tech-glow-card border border-pink-100 bg-white shadow-lg flex flex-col justify-between group h-48 cursor-pointer relative overflow-hidden font-serif"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl group-hover:bg-pink-500/10 transition-all duration-300" />
          
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/25 text-pink-600 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-pink-500 transition-colors" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 italic">Direct Correspondence</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-pink-655 transition-colors truncate">
              {profile.email}
            </h3>
            <p className="text-xs text-slate-500 font-sans">Send a thoughtful letter.</p>
          </div>
        </motion.a>

        {/* LinkedIn Card */}
        <motion.a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants}
          className="p-6 rounded-2xl tech-glow-card border border-pink-100 bg-white shadow-lg flex flex-col justify-between group h-48 cursor-pointer relative overflow-hidden font-serif"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl group-hover:bg-sky-500/10 transition-all duration-300" />

          <div className="flex justify-between items-start">
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/25 text-sky-600 group-hover:scale-110 transition-transform duration-300">
              <LinkIcon className="w-6 h-6" />
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-sky-655 transition-colors" />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 italic">LinkedIn Network Garden</span>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-pink-655 transition-colors truncate">
              Sophia Le Profile
            </h3>
            <p className="text-xs text-slate-500 font-sans">Connect and share in professional journeys.</p>
          </div>
        </motion.a>
      </motion.div>

      {/* Secondary Professional Projects / Other Links */}
      {profile.otherLinks && profile.otherLinks.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 rounded-2xl border border-pink-100 bg-white shadow-lg"
        >
          <div className="flex items-center gap-2 border-b border-pink-100 pb-3 mb-4">
            <Feather className="w-4 h-4 text-pink-500" />
            <h3 className="font-serif text-sm text-pink-700 font-bold">Poetic Spaces & Companion Portals</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-serif">
            {profile.otherLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border border-pink-100 bg-rose-50/10 hover:border-pink-500/40 hover:bg-pink-50/40 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-50 text-slate-550 group-hover:text-pink-600 transition-colors">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-450 italic">Companion Pathway 0{idx + 1}</span>
                    <span className="text-sm font-semibold text-slate-800 group-hover:text-pink-655 transition-colors">{link.label}</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-pink-655 transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
