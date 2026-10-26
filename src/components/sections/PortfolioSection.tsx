"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ExternalLink } from "lucide-react";
import { projectsData, ProjectItem } from "@/data/projectsData";
import { siteConfig } from "@/config/siteConfig";

type CategoryFilter = "all" | "ecommerce" | "healthcare" | "education" | "corporate" | "media";

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const whatsappNumber = siteConfig.contact.whatsappNumber || "919129680681";

  const filteredProjects =
    activeCategory === "all"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-[#FBF9F5] border-b border-[#E5DAC9]/60 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DAC9] text-[11px] font-bold uppercase tracking-widest text-[#6B1D2F] font-mono shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <span>AIMHOP Proprietary Design Benchmarks</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#261C19] tracking-tight font-heading leading-tight uppercase">
            Our Latest <span className="text-[#6B1D2F]">Website Design</span> &amp; Demo Projects
          </h2>

          <p className="text-base sm:text-lg text-[#5E504B] font-medium leading-relaxed">
            Explore industry-tailored website architectures engineered by AIMHOP Tech – high performance, conversion-focused, and mobile optimized.
          </p>
        </div>

        {/* Filter Pills with Horizontal Touch-Scroll on Mobile */}
        <div className="flex items-center sm:justify-center gap-2 mb-14 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-none px-1">
          {[
            { id: "all", label: "All Projects", count: projectsData.length },
            {
              id: "ecommerce",
              label: "E-Commerce",
              count: projectsData.filter((p) => p.category === "ecommerce").length,
            },
            {
              id: "healthcare",
              label: "Doctor & Clinic",
              count: projectsData.filter((p) => p.category === "healthcare").length,
            },
            {
              id: "education",
              label: "School & Education",
              count: projectsData.filter((p) => p.category === "education").length,
            },
            {
              id: "corporate",
              label: "Corporate & B2B",
              count: projectsData.filter((p) => p.category === "corporate").length,
            },
            {
              id: "media",
              label: "News Portal",
              count: projectsData.filter((p) => p.category === "media").length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CategoryFilter)}
              className={`whitespace-nowrap shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#6B1D2F] text-white shadow-md shadow-[#6B1D2F]/20"
                  : "bg-white text-[#5E504B] hover:bg-[#FAF7F2] border border-[#E5DAC9]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  activeCategory === tab.id
                    ? "bg-white/20 text-white"
                    : "bg-[#EAE1D3] text-[#5E504B]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* 3-Column Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((project, idx) => {
            const isPriority = idx < 3;
            const whatsappOrderText = `Hello AIMHOP Tech! I want to get a website like ${project.name} (${project.categoryLabel}) for my business.`;
            const whatsappOrderUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappOrderText)}`;

            const whatsappDemoText = `Hello AIMHOP Tech! Please share the live interactive demo and pricing details for the ${project.name} (${project.categoryLabel}) website design.`;
            const whatsappDemoUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDemoText)}`;

            return (
              <div
                key={project.id}
                className="flex flex-col items-center text-center group pb-4"
              >
                {/* 1. Project Screenshot Image (Clean Rounded-2xl Frame) */}
                <Link
                  href={`/demos/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#E5DAC9] bg-white shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group/img"
                  title={`Open interactive live demo of ${project.name}`}
                >
                  <Image
                    src={project.imageUrl}
                    alt={`${project.name} Website Designed By AIMHOP Tech`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={isPriority}
                    loading={isPriority ? "eager" : "lazy"}
                    className="object-cover object-top group-hover/img:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Hover Action Hint */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="px-4 py-2 rounded-xl bg-white/95 text-[#261C19] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-[#6B1D2F]" />
                      <span>Visit Live Demo</span>
                    </span>
                  </div>
                </Link>

                {/* 2. Project Title & Category Subtitle */}
                <div className="mt-5 text-center w-full px-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#261C19] group-hover:text-[#6B1D2F] transition-colors font-heading mb-1">
                    <Link
                      href={`/demos/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center justify-center gap-1.5"
                    >
                      <span>{project.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </h3>

                  <p className="text-sm text-[#5E504B] font-medium mb-5">
                    {project.categoryLabel}
                  </p>

                  {/* 3. Dual Action Buttons: "Get Similar Website" (Solid) & "Visit Live Demo" (Outlined) */}
                  <div className="flex items-center justify-center gap-2.5 flex-wrap sm:flex-nowrap">
                    {/* Primary Button: Get Similar Website -> WhatsApp Order/Quote */}
                    <a
                      href={whatsappOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#6B1D2F] text-white hover:bg-[#8B1E3F] shadow-xs hover:shadow-md transition-all whitespace-nowrap cursor-pointer"
                      title={`Get a website similar to ${project.name}`}
                    >
                      Get Similar Website
                    </a>

                    {/* Secondary Button: Visit Live Demo -> Opens /demos/[id] */}
                    <Link
                      href={`/demos/${project.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-[#6B1D2F] border border-[#6B1D2F] hover:bg-[#6B1D2F] hover:text-white transition-all shadow-2xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
                      title={`Visit full live interactive demo of ${project.name}`}
                    >
                      <span>Visit Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
