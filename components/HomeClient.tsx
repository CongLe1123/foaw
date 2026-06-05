"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useReactiveDb } from "@/lib/db";
import BunnyAvatar from "@/components/BunnyAvatar";
import FlowerFrame from "@/components/FlowerFrame";
import FlowerBorder from "@/components/FlowerBorder";
import { DeerIcon, BirdIcon, FrogIcon, BearIcon } from "@/components/AnimalIcons";

export default function HomeClient() {
  const { profile } = useReactiveDb();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
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
    <div className="flex-grow flex flex-col font-cute bg-[#dbeb9d]">
      
      {/* 1. Header Section - Pink background */}
      <section className="relative bg-[#ff5493] text-white min-h-[500px] flex items-center justify-center py-20 px-8 border-b-4 border-black">
        <FlowerBorder />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10"
        >
          {/* Greeting Text */}
          <div className="md:col-span-7 space-y-6 text-center md:text-left">
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl sm:text-6xl md:text-7xl font-serif-hand font-black tracking-wide drop-shadow-md text-white"
            >
              Hii!<br />I'm Toanh
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl font-medium max-w-lg leading-relaxed text-pink-50"
            >
              Use this space to know more about me and my study exchange preparation=&gt;&gt;&gt;
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-2">
              <Link
                href="/sop"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#fff2cc] text-slate-800 font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Start here
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          {/* Bunny Hoodie Face Framer */}
          <motion.div 
            variants={itemVariants}
            className="md:col-span-5 flex justify-center items-center"
          >
            <BunnyAvatar src={profile.photoUrl} alt="Toanh Photo" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Hobby Section - Green background */}
      <section className="relative bg-[#dbeb9d] py-20 px-8 border-b-4 border-black">
        <FlowerBorder />
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10 relative">
          {/* Left Column: Kid Slide Photo with Flower mask */}
          <div className="md:col-span-6 flex justify-center">
            <FlowerFrame borderColor="#ff5493" className="w-72 h-72">
              <img
                src={profile.photoUrl}
                alt="Toanh slide hobby"
                className="w-full h-full object-cover scale-110"
              />
            </FlowerFrame>
          </div>

          {/* Right Column: Hobby list */}
          <div className="md:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <h2 className="text-4xl font-serif-hand font-black tracking-wide text-slate-800">
                My hobby
              </h2>
              <span className="text-3xl">☺</span>
            </div>
            <p className="text-sm font-bold tracking-widest text-[#ff5493] uppercase">
              KINDA UNIQUE CHINCHILLA
            </p>

            <div className="space-y-4 pt-4 border-t-2 border-black/10">
              {/* Link 1 */}
              <Link href="/flowers" className="flex items-center justify-between py-3 border-b-2 border-dashed border-black/20 hover:text-[#ff5493] transition-colors group">
                <div>
                  <h3 className="text-lg font-bold">I love to make flower</h3>
                  <p className="text-xs text-slate-600">You can go here to see them</p>
                </div>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Link 2 */}
              <Link href="/cat" className="flex items-center justify-between py-3 border-b-2 border-dashed border-black/20 hover:text-[#ff5493] transition-colors group">
                <div>
                  <h3 className="text-lg font-bold">My cute cat</h3>
                  <p className="text-xs text-slate-600">Click to see her</p>
                </div>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Link 3 */}
              <Link href="/game" className="flex items-center justify-between py-3 border-b-2 border-dashed border-black/20 hover:text-[#ff5493] transition-colors group">
                <div>
                  <h3 className="text-lg font-bold">Games I play this year</h3>
                  <p className="text-xs text-slate-600">check it</p>
                </div>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. My 5 Artifacts Section - Green background */}
      <section className="relative bg-[#dbeb9d] py-20 px-8 border-b-4 border-black">
        <FlowerBorder />
        
        <div className="max-w-5xl mx-auto space-y-12 z-10 relative">
          <div className="flex items-center gap-2 justify-center">
            <h2 className="text-4xl font-serif-hand font-black tracking-wide text-slate-800">
              My 5 artifacts
            </h2>
            <span className="text-3xl">☺</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Artifact 1: SOP */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <DeerIcon className="w-16 h-16" />
              </div>
              <Link href="/sop" className="px-5 py-2 text-xs font-bold text-slate-800 bg-[#ffe0b2] border-2 border-black border-dashed rounded-full hover:bg-[#ffd54f] transition-all text-center">
                State of Purpose
              </Link>
            </div>

            {/* Artifact 2: CV */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <BirdIcon className="w-16 h-16" />
              </div>
              <Link href="/artifacts?tab=cv" className="px-5 py-2 text-xs font-bold text-slate-800 bg-[#ffe0e9] border-2 border-black border-dashed rounded-full hover:bg-[#ffb74d] transition-all text-center">
                Letter of Recommendation
              </Link>
            </div>

            {/* Artifact 3: Cover Letter */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <FrogIcon className="w-16 h-16" />
              </div>
              <Link href="/artifacts?tab=cover-letter" className="px-5 py-2 text-xs font-bold text-slate-800 bg-[#c8e6c9] border-2 border-black border-dashed rounded-full hover:bg-[#81c784] transition-all text-center">
                Program material
              </Link>
            </div>

            {/* Artifact 4: Essay */}
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <BearIcon className="w-16 h-16" />
              </div>
              <Link href="/artifacts?tab=linkedin-opt" className="px-5 py-2 text-xs font-bold text-slate-800 bg-[#d1c4e9] border-2 border-black border-dashed rounded-full hover:bg-[#b39ddb] transition-all text-center">
                Cultural adaption essay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Contacts Section - Pink background */}
      <section className="relative bg-[#ff5493] text-white py-20 px-8">
        <FlowerBorder />
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10 relative">
          {/* Left Column: Traditional Dress photo */}
          <div className="md:col-span-6 flex justify-center">
            <FlowerFrame borderColor="#ffffff" className="w-72 h-72">
              <img
                src={profile.photoUrl}
                alt="Toanh traditional contact"
                className="w-full h-full object-cover scale-110"
              />
            </FlowerFrame>
          </div>

          {/* Right Column: Contact info */}
          <div className="md:col-span-6 space-y-6">
            <h2 className="text-4xl font-serif-hand font-black tracking-wide text-white">
              Contacts:
            </h2>

            <div className="space-y-4 pt-4">
              {/* Email */}
              <a href={`mailto:${profile.email}`} className="flex items-center justify-between px-6 py-3 rounded-full bg-white text-slate-800 font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <span>{profile.email}</span>
                <ArrowRight className="w-5 h-5 text-slate-800" />
              </a>

              {/* Instagram/IG */}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-3 rounded-full bg-white text-slate-800 font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <span>@Tu Oanh on IG</span>
                <ArrowRight className="w-5 h-5 text-slate-800" />
              </a>

              {/* Phone */}
              <a href="tel:090812168" className="flex items-center justify-between px-6 py-3 rounded-full bg-white text-slate-800 font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                <span>090812168</span>
                <ArrowRight className="w-5 h-5 text-slate-800" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
