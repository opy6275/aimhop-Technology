"use client";

import React from "react";

const clientLogos1 = [
  { name: "Prashant Exports", url: "/clients/logo1.png" },
  { name: "Apex Healthcare", url: "/clients/logo2.png" },
  { name: "St Joseph School", url: "/clients/logo3.png" },
  { name: "El-Dorado Oils", url: "/clients/logo4.png" },
  { name: "Thermage Infra", url: "/clients/logo5.png" },
  { name: "Yug Prabodhan", url: "/clients/logo6.png" },
  { name: "Dope Tees", url: "/clients/logo7.png" },
  { name: "Calmcure Pharma", url: "/clients/logo8.png" },
];

const clientLogos2 = [
  { name: "Mukti Nath Oil", url: "/clients/logo9.png" },
  { name: "LSP Samadhan", url: "/clients/logo10.png" },
  { name: "Nitin Bal Vatika", url: "/clients/logo11.png" },
  { name: "Gangotri Public", url: "/clients/logo12.png" },
  { name: "Singh Architects", url: "/clients/logo13.png" },
  { name: "Lari Clinic", url: "/clients/logo14.png" },
  { name: "Mahakal Seva", url: "/clients/logo15.png" },
  { name: "Fit Eat Store", url: "/clients/logo16.png" },
];

const clientLogos3 = [
  { name: "Client Partner 17", url: "/clients/logo17.png" },
  { name: "Client Partner 18", url: "/clients/logo18.png" },
  { name: "Client Partner 19", url: "/clients/logo19.png" },
  { name: "Client Partner 20", url: "/clients/logo20.png" },
  { name: "Client Partner 21", url: "/clients/logo21.png" },
  { name: "Client Partner 22", url: "/clients/logo22.png" },
  { name: "Client Partner 23", url: "/clients/logo23.png" },
  { name: "Client Partner 24", url: "/clients/logo24.png" },
];

export const ClientMarqueeSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-[#F3ECE2] border-b border-[#E5DAC9] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F] mb-3 inline-block">
          Trusted Partners
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#261C19] tracking-tight font-heading">
          Brands &amp; Enterprises Supported Across <span className="text-[#6B1D2F]">India</span>
        </h2>
        <p className="text-base text-[#5E504B] mt-2 font-medium max-w-2xl mx-auto">
          Delivering high-performance website design, scalable software engineering, and data-driven SEO growth solutions.
        </p>
      </div>

      {/* Infinite Logo Scrollers with Local Assets */}
      <div className="space-y-5 relative">
        {/* Left & Right gradient masks for smooth edge fade in Light Sand */}
        <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-[#F3ECE2] via-[#F3ECE2]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-[#F3ECE2] via-[#F3ECE2]/80 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left-to-Right */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 sm:gap-6 animate-marquee-left shrink-0">
            {clientLogos1.concat(clientLogos1).map((client, idx) => (
              <div
                key={`row1-${client.name}-${idx}`}
                className="w-44 sm:w-52 h-20 sm:h-24 bg-white rounded-2xl border border-[#E5DAC9] shadow-2xs flex items-center justify-center p-4 hover:border-[#6B1D2F] hover:shadow-md transition-all duration-300 group/card shrink-0"
              >
                <img
                  src={client.url}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 w-auto object-contain transition-all duration-300 group-hover/card:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right-to-Left */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 sm:gap-6 animate-marquee-right shrink-0">
            {clientLogos2.concat(clientLogos2).map((client, idx) => (
              <div
                key={`row2-${client.name}-${idx}`}
                className="w-44 sm:w-52 h-20 sm:h-24 bg-white rounded-2xl border border-[#E5DAC9] shadow-2xs flex items-center justify-center p-4 hover:border-[#6B1D2F] hover:shadow-md transition-all duration-300 group/card shrink-0"
              >
                <img
                  src={client.url}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 w-auto object-contain transition-all duration-300 group-hover/card:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Left-to-Right */}
        <div className="flex overflow-hidden group">
          <div className="flex gap-4 sm:gap-6 animate-marquee-left shrink-0">
            {clientLogos3.concat(clientLogos3).map((client, idx) => (
              <div
                key={`row3-${client.name}-${idx}`}
                className="w-44 sm:w-52 h-20 sm:h-24 bg-white rounded-2xl border border-[#E5DAC9] shadow-2xs flex items-center justify-center p-4 hover:border-[#6B1D2F] hover:shadow-md transition-all duration-300 group/card shrink-0"
              >
                <img
                  src={client.url}
                  alt={client.name}
                  loading="lazy"
                  className="max-h-12 sm:max-h-14 w-auto object-contain transition-all duration-300 group-hover/card:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Brand attribution note */}
        <p className="text-[11px] text-center text-[#5E504B]/70 font-mono mt-8 px-4 max-w-xl mx-auto">
          * Logos and trademarks are displayed for technical demonstration and capability benchmarking. All rights remain with respective proprietors.
        </p>
      </div>
    </section>
  );
};
