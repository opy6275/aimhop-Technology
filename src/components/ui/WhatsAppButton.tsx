"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig, buildWhatsAppUrl, isWhatsAppConfigured } from "@/config/siteConfig";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isConfigured = isWhatsAppConfigured();

  const defaultMessage =
    "Hello AIMHOP Tech team, I would like to enquire about web development and digital solutions for my business.";
  const { url } = buildWhatsAppUrl(defaultMessage);

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Floating Tooltip */}
      {showTooltip && (
        <div className="mb-2 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DAC9] text-xs text-[#261C19] shadow-xl max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-3 mb-1">
            <span className="font-bold text-[#6B1D2F] font-heading">Quick WhatsApp Enquiry</span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-[#5E504B] hover:text-[#261C19]"
              aria-label="Dismiss quick enquiry notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-[#5E504B]">
            {isConfigured
              ? "Connect directly with our digital team on WhatsApp to discuss your goals."
              : "Demo mode active: replace the placeholder in siteConfig.ts with your real WhatsApp number."}
          </p>
        </div>
      )}

      {/* Floating Button */}
      {isConfigured ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50"
          aria-label="Open WhatsApp chat with AIMHOP Tech"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
          <MessageCircle className="w-7 h-7 relative z-10 fill-current text-white" />
        </a>
      ) : (
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          onMouseEnter={() => setShowTooltip(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/50 cursor-pointer"
          aria-label="Navigate to contact form"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
          <MessageCircle className="w-7 h-7 relative z-10 fill-current text-white" />
        </a>
      )}
    </aside>
  );
};
