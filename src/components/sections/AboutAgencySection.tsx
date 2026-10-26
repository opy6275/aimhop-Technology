"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layers, Smartphone, Users, Code2, Headphones } from "lucide-react";

export const AboutAgencySection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#E5DAC9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Office & Team Image with Experience Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 group">
              <img
                src="/office.jpg"
                alt="AIMHOP Tech Agency Office & Engineering Hub"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D0B12]/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Client Focus Badge */}
            <div className="hidden sm:flex absolute -top-4 -left-4 bg-[#FAF7F2] text-[#261C19] p-4 rounded-2xl shadow-lg items-center gap-3 border border-[#E5DAC9]">
              <div className="w-10 h-10 rounded-xl bg-[#6B1D2F]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#6B1D2F]" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#6B1D2F]">Full-Cycle</div>
                <div className="text-[11px] text-[#5E504B] font-medium">Design, Dev &amp; Marketing</div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F] mb-3 inline-block">
                About AIMHOP Tech
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#261C19] font-heading leading-tight">
                Your Trusted <span className="text-[#6B1D2F]">Technology &amp; Software Partner</span>
              </h2>
            </div>

            <p className="text-[#5E504B] text-base sm:text-lg leading-relaxed">
              AIMHOP Tech is a full-service software and digital engineering agency empowering commercial enterprises, startups, educational institutions, healthcare clinics, and retail brands across India and global markets with modern web platforms, billing systems, and digital growth infrastructure.
            </p>

            <p className="text-[#5E504B] text-sm sm:text-base leading-relaxed">
              Our core promise is simple: transparent milestones, zero confusing technical jargon, and dependable software designed to streamline operations, attract high-intent customers, and save valuable staff hours.
            </p>

            {/* 4 Feature Highlights - Refined Human-Crafted Brand Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3ECE2] border border-[#E5DAC9] transition-all hover:bg-white hover:border-[#6B1D2F]/40 shadow-2xs group">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 mt-0.5 shadow-2xs transition-colors">
                  <Layers className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#261C19]">Custom Built Solutions</h4>
                  <p className="text-xs text-[#5E504B] mt-0.5">Tailored specifically to your business niche.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3ECE2] border border-[#E5DAC9] transition-all hover:bg-white hover:border-[#6B1D2F]/40 shadow-2xs group">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 mt-0.5 shadow-2xs transition-colors">
                  <Code2 className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#261C19]">Modern Tech Stack</h4>
                  <p className="text-xs text-[#5E504B] mt-0.5">Next.js, React, Node, Laravel, Flutter.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3ECE2] border border-[#E5DAC9] transition-all hover:bg-white hover:border-[#6B1D2F]/40 shadow-2xs group">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 mt-0.5 shadow-2xs transition-colors">
                  <Smartphone className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#261C19]">SEO &amp; Mobile-First</h4>
                  <p className="text-xs text-[#5E504B] mt-0.5">Optimized for Google ranking &amp; speed.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F3ECE2] border border-[#E5DAC9] transition-all hover:bg-white hover:border-[#6B1D2F]/40 shadow-2xs group">
                <div className="w-9 h-9 rounded-xl bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 mt-0.5 shadow-2xs transition-colors">
                  <Headphones className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#261C19]">Free 1-Year Support</h4>
                  <p className="text-xs text-[#5E504B] mt-0.5">Continuous technical backup &amp; maintenance.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="btn-brand-orange inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl text-white shadow-lg cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-[#261C19] bg-[#F3ECE2] hover:bg-[#EAE1D3] border border-[#E5DAC9] transition-colors cursor-pointer"
              >
                <span>Demo Projects</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
