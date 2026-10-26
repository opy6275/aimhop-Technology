"use client";

import React from "react";
import Link from "next/link";
import { industriesData, IndustryItem } from "@/data/industriesData";

export const IndustriesSection: React.FC = () => {
  return (
    <section id="industries" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#E5DAC9] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F]">
            Industries We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#261C19] tracking-tight font-heading">
            Tailored Solutions For <span className="text-[#6B1D2F]">Every Sector</span>
          </h2>
          <p className="text-base sm:text-lg text-[#5E504B] font-medium">
            We empower businesses across all industries, from retail stores to hospitals and educational institutions.
          </p>
        </div>

        {/* 16 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {industriesData.map((ind) => (
            <div
              key={ind.id}
              className="group p-5 rounded-2xl border border-[#E5DAC9] bg-white hover:border-[#6B1D2F] hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center justify-between"
            >
              {/* Image Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7F2] shadow-2xs border border-[#E5DAC9]/60 flex items-center justify-center p-3 mb-3 group-hover:scale-110 group-hover:bg-[#6B1D2F]/5 transition-all">
                <img
                  src={ind.imageUrl}
                  alt={`${ind.name} Website Designing`}
                  loading="lazy"
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#261C19] group-hover:text-[#6B1D2F] transition-colors leading-snug font-heading">
                  {ind.name}
                </h3>
                <span className="inline-block text-[10px] font-semibold text-[#5E504B] mt-1 bg-[#F3ECE2] px-2 py-0.5 rounded-full border border-[#E5DAC9] font-mono">
                  {ind.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Quick Link in Wine Red */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#6B1D2F] to-[#3D0B12] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-[#E5DAC9]">
          <div className="text-center sm:text-left">
            <h4 className="text-lg font-bold font-heading">Don&apos;t see your specific industry listed?</h4>
            <p className="text-xs text-rose-100 mt-0.5">
              We design custom software and bespoke websites for unique enterprise models.
            </p>
          </div>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="shrink-0 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider btn-brand-orange text-white shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
          >
            Ask for Custom Solution
          </a>
        </div>
      </div>
    </section>
  );
};
