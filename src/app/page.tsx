import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocalSolutionsSection } from "@/components/sections/LocalSolutionsSection";
import { AboutAgencySection } from "@/components/sections/AboutAgencySection";
import { ExpandingServicesSection } from "@/components/sections/ExpandingServicesSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ClientMarqueeSection } from "@/components/sections/ClientMarqueeSection";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { FAQSection } from "@/components/sections/FAQSection";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF7F2] text-[#261C19] selection:bg-[#6B1D2F] selection:text-white">
      {/* 1. Header with Mega Menus */}
      <Navbar />

      {/* Main Conversion Flow */}
      <main id="main-content" className="flex-1">
        {/* Stage 1: Hook & Brand Trust */}
        {/* 2. Hero Banner & Visual Showcase */}
        <HeroSection />

        {/* 3. Industry Trust & Partner Marquee (Immediate Social Proof) */}
        <ClientMarqueeSection />

        {/* 4. About Agency (Company Identity & Core Pillars) */}
        <AboutAgencySection />

        {/* Stage 2: Purpose-Built Solutions & Core Services */}
        {/* 5. Regional Solutions & Local Trust (School, Hospital, Vyapar, Website) */}
        <LocalSolutionsSection />

        {/* 6. Comprehensive Agency Services (Web, App, Software, Graphics, SEO) */}
        <ExpandingServicesSection />

        {/* Stage 3: Proven Track Record & Domain Depth */}
        {/* 7. Live Project Portfolio & Real Showcase */}
        <PortfolioSection />

        {/* 8. Industries We Support (Domain Expertise Grid) */}
        <IndustriesSection />

        {/* 9. Modern Engineering Technologies & Tech Stack */}
        <TechStackSection />

        {/* Stage 4: Conversion & Reassurance */}
        {/* 10. Project Consultation & Estimation Form (Lead Capture) */}
        <EnquiryForm />

        {/* 11. Frequently Asked Questions (Clarity & Objection Handling) */}
        <FAQSection />
      </main>

      {/* 12. Agency Footer */}
      <Footer />

      {/* 13. Floating Quick WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}
