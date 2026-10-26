"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { ArrowLeft, Home, MessageSquare, Compass } from "lucide-react";

export default function NotFound() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#261C19] flex flex-col justify-between selection:bg-[#6B1D2F] selection:text-white">
      {/* Top minimal header */}
      <header className="w-full py-5 px-6 border-b border-[#E5DAC9] bg-white/70 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" variant="dark" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6B1D2F] hover:text-[#8B1E3F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B1E3F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#C8963E]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6B1D2F]/10 text-xs font-mono text-[#6B1D2F] font-bold tracking-wider uppercase">
            <span>Error 404 • Page Not Found</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-[#6B1D2F] font-heading tracking-tight">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#261C19] font-heading">
            Looks Like You Took a Detour
          </h2>

          <p className="text-sm sm:text-base text-[#5E504B] leading-relaxed max-w-md mx-auto">
            The page you are looking for doesn&apos;t exist, has been moved, or the link might be broken.
            Explore our core solutions below or return to the main landing page.
          </p>

          {/* Action Navigation Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#6B1D2F] text-white hover:bg-[#8B1E3F] shadow-lg shadow-[#6B1D2F]/25 transition-all hover:scale-[1.02]"
            >
              <Home className="w-4 h-4 text-[#C8963E]" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/#services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-[#261C19] border border-[#E5DAC9] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all shadow-xs"
            >
              <Compass className="w-4 h-4 text-[#6B1D2F]" />
              <span>Our Services</span>
            </Link>

            <Link
              href="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#F3ECE2] text-[#261C19] border border-[#E5DAC9] hover:bg-[#EAE1D3] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#8B1E3F]" />
              <span>Get Support</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 border-t border-[#E5DAC9] text-center text-xs text-[#5E504B]">
        &copy; {currentYear} AIMHOP Tech Solutions. All rights reserved.
      </footer>
    </div>
  );
}
