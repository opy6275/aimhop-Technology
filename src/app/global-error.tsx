"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    console.error("Global Root Layout Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF7F2] text-[#261C19] flex flex-col justify-between items-center p-6 font-sans">
        <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#6B1D2F] text-white flex items-center justify-center shadow-lg">
            <AlertTriangle className="w-8 h-8 text-[#C8963E]" />
          </div>

          <h1 className="text-3xl font-black text-[#261C19] tracking-tight">
            System Interruption
          </h1>

          <p className="text-sm text-[#5E504B] leading-relaxed">
            A critical system error occurred. Our automated monitors have logged this incident. Please click below to reload the application.
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#6B1D2F] text-white hover:bg-[#8B1E3F] transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-4 h-4 text-[#C8963E]" />
            <span>Reload Application</span>
          </button>
        </div>

        <footer className="py-4 text-xs text-[#5E504B]">
          &copy; {currentYear} AIMHOP Tech Solutions. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
