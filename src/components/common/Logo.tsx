import React from "react";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  variant?: "dark" | "light"; // "dark" for light backgrounds (dark text), "light" for dark backgrounds (white text)
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = "md",
  showTagline = false,
  variant = "dark",
}) => {
  const textSizes = {
    sm: "text-lg",
    md: "text-[22px] sm:text-[25px]",
    lg: "text-2xl sm:text-[32px]",
  };

  const techSizes = {
    sm: "text-[9px]",
    md: "text-[11px] sm:text-[12.5px]",
    lg: "text-[13px] sm:text-[15px]",
  };

  const imgSizes = {
    sm: "w-8 h-8",
    md: "w-11 h-11 sm:w-12 sm:h-12",
    lg: "w-14 h-14 sm:w-16 sm:h-16",
  };

  const isDarkText = variant === "dark";

  return (
    <Link
      href="#top"
      className={`group inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6B1D2F] rounded-lg transition-opacity ${className}`}
      aria-label="AIMHOP Tech - Return to top"
    >
      {/* Official AIMHOP 3D Metallic Emblem (Transparent PNG) */}
      <img
        src="/aimhop-logo.png"
        alt="AIMHOP Logo"
        className={`object-contain transition-transform duration-300 group-hover:scale-105 shrink-0 ${imgSizes[size]}`}
      />

      {/* Confident Typographic Wordmark: AIMHOP vertically centered, TECH positioned directly under HOP from H to P */}
      <div className="relative inline-flex items-center leading-none font-heading select-none">
        <span
          className={`font-bold tracking-tight leading-none ${
            isDarkText ? "text-[#261C19]" : "text-white"
          } ${textSizes[size]}`}
        >
          AIM
          <span className="relative inline-block">
            <span>
              <span className={isDarkText ? "text-[#6B1D2F]" : "text-[#C8963E]"}>H</span>OP
            </span>
            <span
              className={`absolute top-full left-0 right-0 flex justify-between pt-0.5 ${techSizes[size]} font-black uppercase font-heading leading-none pointer-events-none select-none tracking-normal ${
                isDarkText ? "text-[#6B1D2F]" : "text-[#C8963E]"
              }`}
            >
              <span>T</span>
              <span>E</span>
              <span>C</span>
              <span>H</span>
            </span>
          </span>
        </span>
      </div>
    </Link>
  );
};
