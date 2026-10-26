"use client";

import React, { useState, useEffect } from "react";

export const PagePreloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock body scroll while preloader is visible so user doesn't accidentally scroll during entry
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Show big logo preloader briefly on page load/refresh, then smoothly reveal the site
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 850);

    const unmountTimer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = originalOverflow;
    }, 1400);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!loading) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Loading AIMHOP Tech"
      className={`fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center bg-[#FAF7F2] transition-all duration-500 ease-out select-none overflow-hidden ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      {/* Central Big Logo - Only Logo, No extra text or design */}
      <div className="relative flex items-center justify-center p-4">
        {/* Soft subtle glow behind the logo */}
        <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#6B1D2F]/15 via-[#C8963E]/15 to-[#8B1E3F]/15 blur-3xl animate-pulse pointer-events-none" />

        {/* Big Official AIMHOP 3D Logo Emblem */}
        <img
          src="/aimhop-logo.png"
          alt="AIMHOP Logo"
          fetchPriority="high"
          className="relative z-10 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 object-contain drop-shadow-2xl animate-pulse"
        />
      </div>
    </aside>
  );
};
