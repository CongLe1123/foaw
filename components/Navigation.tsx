"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Star } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Reflections (SOP)", href: "/sop" },
  { label: "Study Exchange Package", href: "/artifacts" },
  { label: "Connection", href: "/contact" }
];

function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav className="hidden md:flex items-center gap-2 font-cute text-sm">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 text-slate-800 hover:text-[#ff5493] font-medium transition-colors duration-300 group"
          >
            {isActive && (
              <motion.div
                layoutId="activeNavIndicator"
                className="absolute inset-0 bg-[#ff5493]/10 border-2 border-black rounded-lg -z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#ff5493] fill-current" />
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

interface MobileDrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function MobileDrawer({ open, setOpen }: MobileDrawerProps) {
  const pathname = usePathname();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-b-3 border-black bg-white overflow-hidden font-cute text-sm"
        >
          <div className="px-4 py-6 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 border-black transition-all duration-300 ${isActive
                    ? "bg-[#ff5493]/15 text-[#ff5493] font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-white text-slate-700 hover:bg-pink-50"
                    }`}
                >
                  <Heart className="w-4 h-4 text-[#ff5493] fill-current" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fff] border-b-3 border-black h-16">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group font-cute">
          <div className="p-1 rounded-lg bg-[#ff5493]/10 border-2 border-black group-hover:bg-[#ff5493]/20 transition-all duration-300">
            <Star className="w-5 h-5 text-[#ff5493] fill-current" />
          </div>
          <span className="text-sm tracking-wider font-black text-slate-800">
            Toanh // Reflections
          </span>
        </Link>

        {/* Desktop Navigation */}
        {mounted ? (
          <DesktopNav />
        ) : (
          <div className="hidden md:flex items-center gap-4 font-cute text-xs text-slate-400">
            <span>Loading Shell...</span>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border-2 border-black text-slate-850 hover:bg-pink-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mounted && <MobileDrawer open={mobileMenuOpen} setOpen={setMobileMenuOpen} />}
    </header>
  );
}

