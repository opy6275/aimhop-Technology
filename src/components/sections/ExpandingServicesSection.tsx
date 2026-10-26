"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Code2,
  Smartphone,
  Palette,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface ExpandingCardItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  bgImage: string;
  icon: React.ReactNode;
}

const serviceCards: ExpandingCardItem[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Website Designing & Portals",
    shortTitle: "Website Designing",
    description:
      "High-speed, SEO-friendly custom websites, e-commerce stores & dynamic portals built to scale your business.",
    bgImage: "/service-web.jpg",
    icon: <Globe className="w-5 h-5 text-white" strokeWidth={1.6} />,
  },
  {
    id: "software-dev",
    number: "02",
    title: "Custom Software & ERP",
    shortTitle: "Software Development",
    description:
      "Robust Billing, POS, School/Hospital ERPs and cloud management systems designed for smooth operations.",
    bgImage: "/service-software.jpg",
    icon: <Code2 className="w-5 h-5 text-white" strokeWidth={1.6} />,
  },
  {
    id: "app-dev",
    number: "03",
    title: "Mobile App Development",
    shortTitle: "Mobile App Development",
    description:
      "Fast, intuitive Android & iOS mobile applications built with Flutter and React Native for global reach.",
    bgImage: "/service-app.jpg",
    icon: <Smartphone className="w-5 h-5 text-white" strokeWidth={1.6} />,
  },
  {
    id: "graphic-design",
    number: "04",
    title: "Graphic Designing & Branding",
    shortTitle: "Graphic Designing",
    description:
      "Distinctive logos, corporate brand identity, social media creatives, brochures, and outdoor marketing kits.",
    bgImage: "/service-graphics.jpg",
    icon: <Palette className="w-5 h-5 text-white" strokeWidth={1.6} />,
  },
  {
    id: "digital-marketing",
    number: "05",
    title: "Digital Marketing & SEO",
    shortTitle: "Digital Marketing & SEO",
    description:
      "Rank #1 on Google with expert SEO, targeted Google & Meta Ad campaigns, and high-ROI lead generation.",
    bgImage: "/service-seo.jpg",
    icon: <TrendingUp className="w-5 h-5 text-white" strokeWidth={1.6} />,
  },
];

export const ExpandingServicesSection: React.FC = () => {
  // Starts with null (all balanced), expands on hover, closes on mouse leave
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleInquireService = (e: React.MouseEvent, card: (typeof serviceCards)[0]) => {
    e.preventDefault();
    e.stopPropagation();

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    let matchedCategory = "Custom Website Design & Development";
    if (card.id === "software-dev") matchedCategory = "Custom Software / ERP / CRM Development";
    else if (card.id === "app-dev") matchedCategory = "Mobile App Development (Android & iOS)";
    else if (card.id === "digital-marketing") matchedCategory = "Digital Marketing & SEO Ranking";
    else if (card.id === "graphic-design") matchedCategory = "Graphic Designing & Brand Identity";

    window.dispatchEvent(
      new CustomEvent("aimhop:select-project", {
        detail: {
          service: matchedCategory,
          projectName: card.title,
          categoryLabel: "Specialized Service",
        },
      })
    );
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F3ECE2] border-b border-[#E5DAC9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F]">
            Our Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#261C19] tracking-tight font-heading">
            Professional <span className="text-[#6B1D2F]">Digital Services</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5E504B] font-medium">
            AIMHOP Tech delivers complete 360-degree digital solutions tailored to help modern
            businesses, retailers, clinics, and schools establish market leadership online.
          </p>
        </div>

        {/* Desktop Interactive Expanding Cards */}
        <div
          onMouseLeave={() => setActiveCardId(null)}
          className="hidden lg:flex gap-3.5 h-[500px] w-full"
        >
          {serviceCards.map((card) => {
            const isActive = activeCardId === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setActiveCardId(card.id)}
                onClick={() => setActiveCardId(isActive ? null : card.id)}
                className={`group relative isolate rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out flex flex-col justify-between p-6 text-white shadow-xl bg-[#26050A] ${
                  isActive
                    ? "flex-[3.5] ring-2 ring-[#C8963E] shadow-2xl"
                    : activeCardId === null
                    ? "flex-1 opacity-95 hover:opacity-100 hover:scale-[1.01]"
                    : "flex-[0.8] opacity-80 hover:opacity-100"
                }`}
              >
                {/* 100% Crisp Local Background Image (No low opacity, no wash-out) */}
                <img
                  src={card.bgImage}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Bottom-Only Soft Wine Gradient Overlay (Top is 100% open so photo is clearly visible) */}
                <div
                  className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20, 2, 5, 0.95) 0%, rgba(45, 6, 12, 0.65) 45%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)",
                  }}
                />

                {/* Top Bar: Icon + Number Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black/45 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg">
                    {card.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-black/55 backdrop-blur-md border border-white/20 font-mono text-white drop-shadow">
                    {card.number}
                  </span>
                </div>

                {/* Collapsed State: Vertical Short Title */}
                {!isActive && (
                  <div className="relative z-10 my-auto flex items-center justify-center py-6">
                    <span className="text-base xl:text-lg font-bold tracking-wide text-white transform -rotate-90 whitespace-nowrap select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                      {card.shortTitle}
                    </span>
                  </div>
                )}

                {/* Expanded State: Clean, Minimal, Uncluttered Content */}
                {isActive && (
                  <div className="relative z-10 space-y-3 mt-auto mb-2 animate-in fade-in duration-300">
                    <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight font-heading drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#F3ECE2] leading-relaxed max-w-lg font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                      {card.description}
                    </p>

                    {/* Action Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={(e) => handleInquireService(e, card)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FAF7F2] text-[#3D0B12] hover:bg-white shadow-xl hover:scale-[1.02] transition-transform cursor-pointer"
                      >
                        <span>Discuss Project</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#6B1D2F]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Bottom Bar: Status + Signature Arrow */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/20">
                  <span className="text-xs font-medium text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                    {isActive ? "Ready to Launch" : "Hover to expand"}
                  </span>

                  <div className="arrow-cascade text-white drop-shadow">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Responsive Accordion */}
        <div className="lg:hidden space-y-4">
          {serviceCards.map((card) => {
            const isExpanded = activeCardId === card.id;

            return (
              <div
                key={card.id}
                onClick={() => setActiveCardId(isExpanded ? null : card.id)}
                className="relative isolate rounded-2xl p-5 text-white shadow-lg transition-all overflow-hidden cursor-pointer min-h-[140px] flex flex-col justify-between bg-[#26050A]"
              >
                {/* 100% Crisp Local Background Image */}
                <img
                  src={card.bgImage}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20, 2, 5, 0.95) 0%, rgba(45, 6, 12, 0.65) 60%, rgba(0, 0, 0, 0.2) 100%)",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black/45 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-sm">
                      {card.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8963E] block font-mono drop-shadow">
                        Service {card.number}
                      </span>
                      <h3 className="text-lg font-extrabold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <div className="arrow-cascade text-white drop-shadow">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>

                {isExpanded && (
                  <div className="relative z-10 mt-3 pt-3 border-t border-white/20 space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs text-[#F3ECE2] leading-relaxed drop-shadow">{card.description}</p>
                    <div>
                      <button
                        type="button"
                        onClick={(e) => handleInquireService(e, card)}
                        className="block w-full text-center py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#FAF7F2] text-[#3D0B12] hover:bg-white shadow-md transition-colors cursor-pointer"
                      >
                        Inquire About This Service
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
