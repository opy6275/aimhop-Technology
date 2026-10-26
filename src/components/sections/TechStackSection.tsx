"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Smartphone,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface TechItem {
  name: string;
  category: string;
  iconUrl: string;
}

const techColumn1: TechItem[] = [
  { name: "HTML5", category: "Core Markup", iconUrl: "/tech/html.png" },
  { name: "CSS3", category: "Modern Styling", iconUrl: "/tech/css.png" },
  { name: "JavaScript", category: "Interactive Logic", iconUrl: "/tech/js.png" },
  { name: "PHP", category: "Backend Engine", iconUrl: "/tech/php.png" },
  { name: "Bootstrap", category: "Responsive Grid", iconUrl: "/tech/bootstrap.png" },
  { name: "Tailwind CSS", category: "Utility-First CSS", iconUrl: "/tech/tailwind.png" },
  { name: "WordPress", category: "Leading CMS", iconUrl: "/tech/wordpress.png" },
  { name: "WooCommerce", category: "E-Commerce", iconUrl: "/tech/woocommerce.png" },
];

const techColumn2: TechItem[] = [
  { name: "React", category: "Modern UI Library", iconUrl: "/tech/react.png" },
  { name: "Laravel", category: "Enterprise PHP", iconUrl: "/tech/laravel.png" },
  { name: "CodeIgniter", category: "Rapid Framework", iconUrl: "/tech/ci.png" },
  { name: "Flutter", category: "Cross-Platform App", iconUrl: "/tech/flutter.png" },
  { name: "Android", category: "Native OS", iconUrl: "/tech/android.png" },
  { name: "Java", category: "Enterprise Backend", iconUrl: "/tech/java.png" },
  { name: "React", category: "Modern UI Library", iconUrl: "/tech/react.png" },
  { name: "Flutter", category: "Cross-Platform App", iconUrl: "/tech/flutter.png" },
];

export const TechStackSection: React.FC = () => {
  return (
    <section id="technologies" className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#E5DAC9] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F]">
            Tech Stack &amp; Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#261C19] tracking-tight font-heading">
            Modern <span className="text-[#6B1D2F]">Technologies</span> We Work With
          </h2>
          <p className="text-base sm:text-lg text-[#5E504B] font-medium">
            Seamless integration with modern frameworks, cloud architectures, and scalable database engines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Centerpiece with Service Image */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#E5DAC9] shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 text-center">
              <img
                src="/tech-engineer.jpg"
                alt="AIMHOP Tech Digital Engineering"
                loading="lazy"
                className="w-full max-w-[340px] mx-auto rounded-2xl object-cover shadow-md hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="w-full md:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 text-[#6B1D2F] text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-[#8B1E3F]" />
                <span>Full-Stack Development</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#261C19] leading-tight font-heading">
                High-Performance Web, Mobile &amp; ERP Solutions
              </h3>

              <p className="text-xs sm:text-sm text-[#5E504B] leading-relaxed">
                Whether creating a high-converting e-commerce web store, enterprise billing ERP, or
                an Android/iOS mobile application, we build on scalable, industry-standard technologies.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#261C19]">
                  <Smartphone className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
                  <span>Cross-Device Responsive Architecture</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#261C19]">
                  <Zap className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
                  <span>Fast Load Speeds &amp; Clean Modern Code</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#261C19]">
                  <ShieldCheck className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
                  <span>Secure Payment Gateways &amp; Cloud Database</span>
                </div>
              </div>

              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="btn-brand-orange inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Vertical Tech Tickers with Real Logos */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 h-[440px] overflow-hidden relative">
            {/* Top & Bottom gradient mask for smooth fade in/out */}
            <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

            {/* Column 1 Vertical Scroller */}
            <div className="flex flex-col gap-3 animate-marquee-vertical">
              {[...techColumn1, ...techColumn1].map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-[#E5DAC9] shadow-2xs hover:border-[#6B1D2F] transition-colors flex items-center gap-3"
                >
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    loading="lazy"
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#261C19] block leading-tight font-heading">{tech.name}</span>
                    <span className="text-[10px] text-[#5E504B] font-medium block font-mono">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Column 2 Reverse Vertical Scroller */}
            <div className="flex flex-col gap-3 animate-marquee-vertical-reverse">
              {[...techColumn2, ...techColumn2].map((tech, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-[#E5DAC9] shadow-2xs hover:border-[#8B1E3F] transition-colors flex items-center gap-3"
                >
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    loading="lazy"
                    className="w-8 h-8 object-contain shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-[#261C19] block leading-tight font-heading">{tech.name}</span>
                    <span className="text-[10px] text-[#5E504B] font-medium block font-mono">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
