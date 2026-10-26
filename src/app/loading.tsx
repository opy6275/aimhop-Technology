import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] w-screen h-screen flex items-center justify-center bg-[#FAF7F2] select-none overflow-hidden">
      {/* Central Big Logo Display - No text, no extra design */}
      <div className="relative flex items-center justify-center p-4">
        {/* Subtle warm ambient glow behind the logo */}
        <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#6B1D2F]/15 via-[#C8963E]/15 to-[#8B1E3F]/15 blur-3xl animate-pulse pointer-events-none" />

        {/* Big Official AIMHOP 3D Logo Emblem */}
        <img
          src="/aimhop-logo.png"
          alt="AIMHOP Logo"
          className="relative z-10 w-44 h-44 sm:w-60 sm:h-60 md:w-72 md:h-72 object-contain drop-shadow-2xl animate-pulse"
        />
      </div>
    </div>
  );
}
