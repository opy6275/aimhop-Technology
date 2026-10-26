"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Hospital,
  Store,
  Building2,
  Check,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Headphones,
  Users2,
  Zap,
  MapPin,
  Globe,
  Clock,
  ArrowRight
} from "lucide-react";
import { siteConfig, buildWhatsAppUrl, isWhatsAppConfigured } from "@/config/siteConfig";

interface LocalPackage {
  id: string;
  badge: string;
  title: string;
  image: string;
  icon: React.ElementType;
  tagline: string;
  deliveryTag: string;
  features: string[];
  popularFor: string;
  inquiryQuery: string;
}

const LOCAL_PACKAGES: LocalPackage[] = [
  {
    id: "school-coaching",
    badge: "Education ERP",
    title: "School & Coaching Management ERP",
    image: "/local-school.jpg",
    icon: GraduationCap,
    tagline: "Admission se lekar Results aur Fees collection tak sab kuch ek mobile aur computer par.",
    deliveryTag: "Free Live Demo",
    popularFor: "Schools, Coaching Centers, Degree Colleges, Computer Institutes",
    inquiryQuery: "Hello AIMHOP Tech! Mujhe School / Coaching Management Software ka live demo aur quotation chahiye.",
    features: [
      "Fees Collection & Auto WhatsApp/SMS Receipt",
      "Student Attendance & Parents SMS Alert",
      "Online Report Card / Result Generator",
      "ID Card & Admit Card 1-Click Print",
      "Teacher & Staff Salary Management",
      "Free 1 Year Complete Support & Training"
    ]
  },
  {
    id: "hospital-clinic",
    badge: "Clinical Automation",
    title: "Hospital OPD & Clinic Software",
    image: "/local-clinic.jpg",
    icon: Hospital,
    tagline: "Kagazi parchi band kijiye — digital OPD, patient history aur billing 1-second me.",
    deliveryTag: "Customized Scope",
    popularFor: "Private Clinics, Nursing Homes, Pathology Labs, Dental Clinics",
    inquiryQuery: "Hello AIMHOP Tech! Mujhe Hospital OPD / Clinic Management Software ka demo aur pricing chahiye.",
    features: [
      "Fast OPD Registration & Digital Prescription",
      "Patient Medical History & Previous Records",
      "Doctor Appointment Scheduling via WhatsApp",
      "Pharmacy / Medical Store Billing Integrated",
      "Pathology Lab Test Reports System",
      "Offline + Online Dono me Kaam Karta Hai"
    ]
  },
  {
    id: "retail-vyapar",
    badge: "POS & Billing",
    title: "Vyapar GST Billing & POS Software",
    image: "/local-retail.jpg",
    icon: Store,
    tagline: "Thermal printer aur barcode scanner support ke sath dukan ka hisaab-kitab aasaan banayein.",
    deliveryTag: "Quick Setup",
    popularFor: "Retail Shops, Wholesale Traders, Supermarkets, Hardware & Electronics",
    inquiryQuery: "Hello AIMHOP Tech! Mujhe Dukaan / Vyapar GST Billing Software ka demo aur quote chahiye.",
    features: [
      "Superfast Barcode Scanning & GST Invoicing",
      "Thermal Printer (2-inch / 3-inch) Support",
      "Stock / Inventory Alert (Maal khatam hone par alert)",
      "Udhaar Khata & Customers WhatsApp Reminders",
      "Mobile App se Dukan ka Munafa / Bikri Check Karein",
      "Aasaan Hindi aur English dono interface"
    ]
  },
  {
    id: "business-website",
    badge: "High-Speed Web",
    title: "High-Speed Business Website & Local SEO",
    image: "/local-business.jpg",
    icon: Building2,
    tagline: "Google par aapka business top par dikhega — mobile friendly aur calling buttons ke sath.",
    deliveryTag: "Turnkey Package",
    popularFor: "Hotels, Real Estate, Advocates, CA, Manufacturers & Local Brands",
    inquiryQuery: "Hello AIMHOP Tech! Mujhe apne business ke liye professional website aur Google SEO ka quotation chahiye.",
    features: [
      "Free .in / .com Domain & Fast Hosting Included",
      "Google Business Profile Setup & 5-Star SEO",
      "Mobile-Friendly & Ultra-Fast Loading Speed",
      "Direct Call & WhatsApp Chat Buttons",
      "Professional Business Email (info@yourbrand.com)",
      "100% Mobile & Tablet Responsive Design"
    ]
  }
];

export function LocalSolutionsSection() {
  const isConfigured = isWhatsAppConfigured();

  const handleBookDemo = (packageTitle: string) => {
    // Select service in EnquiryForm and scroll down
    if (typeof window !== "undefined") {
      const formEl = document.getElementById("enquiry");
      const serviceSelect = document.getElementById("service-select") as HTMLSelectElement | null;
      if (serviceSelect) {
        // Try to match or set requirement text
        const reqBox = document.getElementById("project-goal-input") as HTMLTextAreaElement | null;
        if (reqBox) {
          reqBox.value = `Mujhe "${packageTitle}" ka live demo aur quotation chahiye.`;
        }
      }
      if (formEl) {
        formEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section 
      id="local-solutions" 
      className="py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#E5DAC9] scroll-mt-20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#6B1D2F]/10 border border-[#6B1D2F]/20 text-[#6B1D2F] text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#6B1D2F]" />
            <span>Serving Businesses Across India &amp; Worldwide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#261C19] tracking-tight font-heading">
            Popular Business <span className="text-[#6B1D2F]">Packages &amp; ERP Solutions</span>
          </h2>

          <p className="text-base sm:text-lg text-[#5E504B] leading-relaxed">
            Tailored digital packages for schools, clinics, and retail stores with hands-on setup and a 1-year dedicated service guarantee.
          </p>
        </div>

        {/* 4 Clean Human-Designed Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {LOCAL_PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            const { url: whatsAppUrl } = buildWhatsAppUrl(pkg.inquiryQuery);

            return (
              <div 
                key={pkg.id}
                className="bg-white rounded-2xl border border-[#E5DAC9] overflow-hidden hover:border-[#6B1D2F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo Header */}
                <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-[#6B1D2F] shadow-xs font-mono">
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-bold text-white bg-[#6B1D2F]/90 backdrop-blur-xs px-2.5 py-1 rounded-md shadow-xs border border-white/20">
                      {pkg.deliveryTag}
                    </span>
                  </div>

                  {/* Title Bar over image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/95 flex items-center justify-center shrink-0 text-[#6B1D2F] shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-sm font-heading leading-snug">
                      {pkg.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    <div className="text-xs font-semibold text-[#8B1E3F] mb-1.5 flex items-center gap-1 font-mono">
                      <span>Suitable For:</span>
                      <span className="text-[#5E504B] font-medium">{pkg.popularFor}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5E504B] mt-1 mb-4 leading-relaxed">
                      {pkg.tagline}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 pt-3 border-t border-[#E5DAC9]/60 mb-6">
                      {pkg.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#261C19]">
                          <Check className="w-3.5 h-3.5 text-[#6B1D2F] shrink-0 mt-0.5 stroke-[2.2]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons matching site UI */}
                  <div className="pt-4 border-t border-[#E5DAC9] flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => handleBookDemo(pkg.title)}
                      className="btn-brand-orange w-full sm:flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-center flex items-center justify-center gap-1.5 shadow-sm hover:scale-[1.01] transition-transform cursor-pointer"
                    >
                      <span>Book Free Live Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {isConfigured && (
                      <a
                        href={whatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Pillars Guarantee: Clean, Beautiful Human Design matching site layout */}
        <div className="rounded-3xl border border-[#E5DAC9] bg-white p-6 sm:p-10 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Photo Card */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#E5DAC9] bg-slate-100 group shadow-sm">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="/local-guarantee.jpg"
                  alt="AIMHOP Tech Professional Client Support in Uttar Pradesh"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-bold bg-[#6B1D2F] px-2.5 py-1 rounded text-white font-mono uppercase">
                    On-Site Support
                  </span>
                  <div className="text-sm font-bold mt-1 font-heading">
                    Real Support Engineers — No Automated Bots
                  </div>
                </div>
              </div>
            </div>

            {/* Right Pillars Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F] mb-2 inline-block">
                  AIMHOP Tech Guarantee
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#261C19] font-heading">
                  Our 4-Point <span className="text-[#6B1D2F]">Service Commitment</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#5E504B] mt-1">
                  Dedicated engineering support and dependable technical delivery for businesses across India and global markets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] hover:bg-white hover:border-[#6B1D2F]/40 transition-colors shadow-2xs group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 shadow-2xs transition-colors">
                      <ShieldCheck className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                    </div>
                    <h4 className="font-bold text-sm text-[#261C19]">1-Year Free Support</h4>
                  </div>
                  <p className="text-xs text-[#5E504B] leading-relaxed">
                    Zero maintenance headaches. Any technical issues are promptly resolved with no unexpected charges.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] hover:bg-white hover:border-[#6B1D2F]/40 transition-colors shadow-2xs group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 shadow-2xs transition-colors">
                      <Headphones className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                    </div>
                    <h4 className="font-bold text-sm text-[#261C19]">Direct Technical Access</h4>
                  </div>
                  <p className="text-xs text-[#5E504B] leading-relaxed">
                    No complicated ticketing queues. Connect directly with our lead engineers via phone or WhatsApp.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] hover:bg-white hover:border-[#6B1D2F]/40 transition-colors shadow-2xs group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 shadow-2xs transition-colors">
                      <Users2 className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                    </div>
                    <h4 className="font-bold text-sm text-[#261C19]">Staff Training Included</h4>
                  </div>
                  <p className="text-xs text-[#5E504B] leading-relaxed">
                    We ensure complete operational ease with hands-on computer training for your entire staff team.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] hover:bg-white hover:border-[#6B1D2F]/40 transition-colors shadow-2xs group">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#E5DAC9] group-hover:border-[#6B1D2F]/40 flex items-center justify-center text-[#6B1D2F] shrink-0 shadow-2xs transition-colors">
                      <Clock className="w-4 h-4 text-[#6B1D2F]" strokeWidth={1.6} />
                    </div>
                    <h4 className="font-bold text-sm text-[#261C19]">On-Schedule Delivery</h4>
                  </div>
                  <p className="text-xs text-[#5E504B] leading-relaxed">
                    No open-ended timelines. Strict milestones with rigorous quality testing before client handover.
                  </p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="btn-brand-orange inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold rounded-xl text-white shadow-md cursor-pointer hover:scale-[1.01] transition-transform"
                >
                  <Zap className="w-4 h-4" />
                  <span>Request Free Live Demo</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
