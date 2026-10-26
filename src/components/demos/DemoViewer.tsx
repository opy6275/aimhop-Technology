"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Maximize2,
  X,
  Zap,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Layers,
  Eye,
} from "lucide-react";
import { ProjectItem } from "@/data/projectsData";
import { siteConfig } from "@/config/siteConfig";

interface DemoViewerProps {
  project: ProjectItem;
}

export const DemoViewer: React.FC<DemoViewerProps> = ({ project }) => {
  const screens =
    project.screens && project.screens.length > 0
      ? project.screens
      : [
          {
            id: "main",
            title: "Full Website Overview",
            subtitle: "Official Live Design",
            imageUrl: project.imageUrl,
          },
        ];

  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);

  const activeScreen = screens[activeScreenIndex] || screens[0];

  const whatsappNumber = siteConfig.contact.whatsappNumber || "919129680681";
  const whatsappQuoteText = `Hello AIMHOP Tech! I am viewing the live demo of "${project.name}" (${project.categoryLabel}). I want to get a similar website built for my business. Please share quotation and timeframe.`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappQuoteText)}`;

  const handlePrev = () => {
    setActiveScreenIndex((prev) => (prev > 0 ? prev - 1 : screens.length - 1));
  };

  const handleNext = () => {
    setActiveScreenIndex((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isFullImageOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullImageOpen(false);
      if (e.key === "ArrowLeft") {
        setActiveScreenIndex((prev) => (prev > 0 ? prev - 1 : screens.length - 1));
      }
      if (e.key === "ArrowRight") {
        setActiveScreenIndex((prev) => (prev < screens.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isFullImageOpen, screens.length]);

  return (
    <div className="min-h-screen bg-white text-[#261C19] flex flex-col font-sans selection:bg-[#6B1D2F] selection:text-white">
      {/* 1. TOP SLEEK FLOATING AIMHOP CONTROL BAR */}
      <header className="sticky top-0 z-40 bg-[#261C19]/95 backdrop-blur-md text-white border-b border-white/10 px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          {/* Back & Project Info */}
          <div className="flex items-center gap-3">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider transition-colors shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to AimHop</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 border-l border-white/20 pl-3">
              <span className="font-bold text-white font-heading text-sm">
                {project.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#6B1D2F] text-white uppercase tracking-wider">
                {project.categoryLabel}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsFullImageOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold cursor-pointer transition-colors"
              title="View full high-resolution design"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                View Full Image ({activeScreenIndex + 1}/{screens.length})
              </span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold uppercase tracking-wider shadow-sm transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Get This Website</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. MAIN WEBSITE SHOWCASE */}
      <main className="flex-1 w-full flex flex-col">
        {/* VIEW SELECTOR BAR (if multiple screens exist) */}
        {screens.length > 1 && (
          <div className="bg-[#FAF7F2] border-b border-[#E5DAC9]/60 px-4 py-2.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono uppercase font-bold text-[#5E504B] tracking-wider shrink-0 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#6B1D2F]" />
                  <span>Website Views:</span>
                </span>
                <div className="flex items-center gap-1.5">
                  {screens.map((screen, idx) => {
                    const isActive = idx === activeScreenIndex;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => setActiveScreenIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#6B1D2F] text-white shadow-xs"
                            : "bg-white text-[#261C19] hover:bg-[#E5DAC9]/40 border border-[#E5DAC9]"
                        }`}
                      >
                        {screen.id.includes("mobile") ? (
                          <Smartphone className="w-3 h-3" />
                        ) : (
                          <Monitor className="w-3 h-3" />
                        )}
                        <span>{screen.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HERO FOLD: High-Resolution Real Website Screen Display */}
        <section
          onClick={() => setIsFullImageOpen(true)}
          className="relative w-full aspect-[16/9] max-h-[720px] bg-gray-900 border-b border-gray-100 overflow-hidden shadow-xs cursor-pointer group"
          title="Click to view full uncropped 4K design"
        >
          <Image
            src={activeScreen.imageUrl}
            alt={`${project.name} - ${activeScreen.title}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
          />

          {/* Navigation Arrows on Hero (if multiple screens) */}
          {screens.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                title="Previous View"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                title="Next View"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Clean Floating Bottom Info & Enlarge Button */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 pointer-events-none">
            <div className="px-3.5 py-1.5 rounded-lg bg-black/70 backdrop-blur-md text-white text-xs font-medium">
              <span className="font-bold">{activeScreen.title}</span> —{" "}
              <span className="text-white/70">{activeScreen.subtitle}</span>
            </div>

            <span className="pointer-events-auto px-3.5 py-1.5 rounded-lg bg-[#6B1D2F] hover:bg-[#832339] text-white backdrop-blur-md shadow-lg transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full 4K Lightbox</span>
            </span>
          </div>
        </section>

        {/* MULTI-SCREEN GALLERY GRID (shows all pages side-by-side) */}
        {screens.length > 1 && (
          <section className="py-10 bg-white border-b border-[#E5DAC9]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-[#261C19] font-heading flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#6B1D2F]" />
                    <span>All Website Pages &amp; Screen Flows</span>
                  </h3>
                  <p className="text-xs text-[#5E504B] mt-0.5">
                    Click any screen below to preview or enlarge in full resolution
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#6B1D2F] bg-[#6B1D2F]/10 px-2.5 py-1 rounded-full">
                  {screens.length} Screens Included
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {screens.map((screen, idx) => {
                  const isCurrent = idx === activeScreenIndex;
                  return (
                    <div
                      key={screen.id}
                      onClick={() => {
                        setActiveScreenIndex(idx);
                        setIsFullImageOpen(true);
                      }}
                      className={`group relative rounded-xl overflow-hidden border cursor-pointer transition-all ${
                        isCurrent
                          ? "border-[#6B1D2F] shadow-md ring-2 ring-[#6B1D2F]/20"
                          : "border-[#E5DAC9] hover:border-[#6B1D2F]/60 hover:shadow-xs"
                      }`}
                    >
                      <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                        <Image
                          src={screen.imageUrl}
                          alt={screen.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white p-1 rounded-md">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <div className="font-bold text-xs text-[#261C19] truncate font-heading">
                          {screen.title}
                        </div>
                        <div className="text-[11px] text-[#5E504B] truncate mt-0.5">
                          {screen.subtitle}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 3. CLEAN & ELEGANT SPECIFICATIONS (2-Column Simple Layout) */}
        <section className="py-14 lg:py-20 bg-[#FAF7F2] border-b border-[#E5DAC9]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left Column: Architecture & Key Highlights */}
              <div className="space-y-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-3 shadow-2xs font-mono"
                    style={{ backgroundColor: project.accentColor || "#6B1D2F" }}
                  >
                    AIMHOP Verified Architecture
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#261C19] font-heading tracking-tight leading-tight">
                    {project.name}
                  </h2>
                  <p className="text-sm text-[#5E504B] font-medium mt-1">
                    {project.categoryLabel}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#5E504B] leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metric Badge */}
                <div className="p-4 rounded-xl bg-white border border-[#E5DAC9] shadow-2xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#6B1D2F]/10 text-[#6B1D2F] flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5E504B] block font-mono">
                      Performance Benchmark
                    </span>
                    <span className="font-bold text-sm text-[#261C19]">
                      {project.keyMetric}
                    </span>
                  </div>
                </div>

                {/* Tech Tags */}
                <div>
                  <span className="text-xs font-bold text-[#5E504B] uppercase tracking-wider block mb-2 font-mono">
                    Technologies &amp; Integrations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-white border border-[#E5DAC9] text-xs font-semibold text-[#261C19]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: What's Included (Clean Checklist) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DAC9] shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-[#261C19] font-heading flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6B1D2F]" />
                  <span>Modules &amp; Workflows Included</span>
                </h3>

                <ul className="space-y-3.5">
                  {project.modulesIncluded.map((mod, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#261C19] font-medium leading-relaxed">
                        {mod}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#5E504B]">
                  <span>Turnkey delivery in 5–7 business days</span>
                  <span className="font-bold text-[#6B1D2F]">100% Mobile Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONVERSION ACTION BAR (Direct WhatsApp Inquiry) */}
        <section className="py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#261C19] text-white shadow-xl text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#25D366] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Launch Your Business Website?</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                Get a website custom-built like {project.name}
              </h3>

              <p className="text-sm text-white/70 max-w-lg mx-auto">
                Domain setup, high-speed cloud hosting, WhatsApp lead automation, and Google SEO ranking included.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-slate-950 font-bold text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950" />
                  <span>Chat on WhatsApp (+91 9129680681)</span>
                </a>

                <Link
                  href="/#portfolio"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  View More Demos
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. MINIMAL CLEAN FOOTER */}
        <footer className="bg-[#1A1615] text-white py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
            <div>
              <span className="font-bold text-white">{project.name}</span> — Website Design engineered by AIMHOP Technologies.
            </div>

            <div className="flex items-center gap-4">
              <Link href="/#portfolio" className="hover:text-white transition-colors">
                Portfolio
              </Link>
              <span>•</span>
              <Link href="/#contact" className="hover:text-white transition-colors">
                Contact
              </Link>
              <span>•</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] font-bold hover:underline"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* 6. FULL-SCREEN 4K LIGHTBOX MODAL (Multi-Screen Gallery Enabled) */}
      {isFullImageOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/15 text-white shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm sm:text-base font-heading">
                {project.name}
              </span>
              <span className="text-xs text-white/60 hidden sm:inline">
                ({project.categoryLabel})
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/15 text-white">
                View {activeScreenIndex + 1} of {screens.length}: {activeScreen.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 rounded-lg bg-[#25D366] text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Order on WhatsApp
              </a>

              <button
                onClick={() => setIsFullImageOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full Screen Image with Next/Prev Controls */}
          <div className="flex-1 relative overflow-hidden p-4 sm:p-8 flex items-center justify-center">
            {screens.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                title="Previous Screen (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="relative w-full h-full max-w-6xl max-h-[80vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex items-center justify-center">
              <Image
                src={activeScreen.imageUrl}
                alt={`${project.name} - ${activeScreen.title}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {screens.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 cursor-pointer"
                title="Next Screen (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Filmstrip Thumbnails at bottom (if multiple screens) */}
          {screens.length > 1 && (
            <div className="p-3 bg-black/60 border-t border-white/10 shrink-0 flex items-center justify-center gap-2 overflow-x-auto">
              {screens.map((screen, idx) => {
                const isSelected = idx === activeScreenIndex;
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveScreenIndex(idx)}
                    className={`relative w-20 h-12 rounded-lg overflow-hidden border transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "border-[#25D366] ring-2 ring-[#25D366]/40 scale-105"
                        : "border-white/30 hover:border-white/70 opacity-60 hover:opacity-100"
                    }`}
                    title={screen.title}
                  >
                    <Image
                      src={screen.imageUrl}
                      alt={screen.title}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
