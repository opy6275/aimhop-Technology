"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { siteConfig, isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/siteConfig";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  MessageSquare,
  ChevronDown,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Log the error to console or error tracking service
    console.error("Runtime Application Error:", error);
  }, [error]);

  const isConfigured = isWhatsAppConfigured();
  const { url: supportWhatsAppUrl } = buildWhatsAppUrl(
    `Hello AIMHOP Tech Support! I encountered an error on the website: ${error?.message || "Application Error"}`
  );
  const safeSupportHref = isConfigured ? supportWhatsAppUrl : "/#contact";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#261C19] flex flex-col justify-between selection:bg-[#6B1D2F] selection:text-white">
      {/* Top Header */}
      <header className="w-full py-5 px-6 border-b border-[#E5DAC9] bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" variant="dark" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#6B1D2F] hover:text-[#8B1E3F] transition-colors"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Main Error Screen */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16 relative overflow-hidden">
        {/* Subtle decorative glow in Wine Red */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#8B1E3F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto text-center space-y-6">
          {/* Warning Badge & Icon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-300 text-xs font-mono text-[#6B1D2F] font-bold tracking-wider uppercase">
            <AlertTriangle className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <span>System Notice • Application Error</span>
          </div>

          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-[#6B1D2F] to-[#3D0B12] text-white flex items-center justify-center shadow-xl shadow-[#6B1D2F]/20">
            <ShieldAlert className="w-10 h-10 text-[#C8963E]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#261C19] font-heading tracking-tight">
            Something Went Wrong
          </h1>

          <p className="text-sm sm:text-base text-[#5E504B] leading-relaxed max-w-md mx-auto">
            An unexpected error occurred while rendering this view. Our engineering team has been notified.
            You can try reloading the component or head back to the main page.
          </p>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Try Again Button */}
            <button
              type="button"
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#6B1D2F] text-white hover:bg-[#8B1E3F] shadow-lg shadow-[#6B1D2F]/25 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#C8963E]" />
              <span>Try Again</span>
            </button>

            {/* Return to Homepage */}
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-[#261C19] border border-[#E5DAC9] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all shadow-xs"
            >
              <Home className="w-4 h-4 text-[#6B1D2F]" />
              <span>Homepage</span>
            </Link>

            {/* Direct Tech Support */}
            <Link
              href={safeSupportHref}
              target={isConfigured ? "_blank" : "_self"}
              rel={isConfigured ? "noopener noreferrer" : undefined}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#F3ECE2] text-[#261C19] border border-[#E5DAC9] hover:bg-[#EAE1D3] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#8B1E3F]" />
              <span>Support Help</span>
            </Link>
          </div>

          {/* Collapsible Error Diagnostics Box */}
          <div className="pt-6 border-t border-[#E5DAC9]/70 max-w-md mx-auto text-left">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-between text-xs font-mono text-[#5E504B] hover:text-[#261C19] transition-colors py-1"
            >
              <span>Technical Diagnostics</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showDetails ? "rotate-180" : ""}`}
              />
            </button>

            {showDetails && (
              <div className="mt-2 p-3.5 rounded-xl bg-white border border-rose-200 text-[11px] font-mono text-[#6B1D2F] space-y-1 shadow-inner animate-in fade-in duration-150">
                <div className="font-bold">Error: {error?.message || "Unknown error"}</div>
                {error?.digest && (
                  <div className="text-[10px] text-[#5E504B]">Digest: {error.digest}</div>
                )}
              </div>
            )}
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
