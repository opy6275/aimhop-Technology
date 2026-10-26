"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import {
  ChevronDown,
  Menu,
  X,
  Globe,
  Code2,
  Smartphone,
  Palette,
  Briefcase,
  PhoneCall,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { siteConfig, isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/siteConfig";

interface SubMenuItem {
  title: string;
  desc?: string;
  href: string;
}

interface MegaMenuCategory {
  title: string;
  items: SubMenuItem[];
}

const websiteCategories: MegaMenuCategory[] = [
  {
    title: "Web Development",
    items: [
      { title: "Static Website Designing", href: "#services" },
      { title: "Dynamic Business Websites", href: "#services" },
      { title: "WordPress & CMS Development", href: "#services" },
    ],
  },
  {
    title: "Specialized Web",
    items: [
      { title: "E-Commerce Web Storefronts", href: "#services" },
      { title: "High-Converting Landing Pages", href: "#services" },
      { title: "Corporate & Portfolio Websites", href: "#services" },
    ],
  },
  {
    title: "Advanced Solutions",
    items: [
      { title: "Custom Web Portals & CRM", href: "#services" },
      { title: "Website Re-Designing & Audit", href: "#services" },
      { title: "Speed & SEO Optimization", href: "#services" },
    ],
  },
];

const softwareCategories: MegaMenuCategory[] = [
  {
    title: "Business & Retail",
    items: [
      { title: "Billing & POS Software", href: "#services" },
      { title: "Inventory & ERP Systems", href: "#services" },
      { title: "Restaurant Management System", href: "#services" },
      { title: "Pharmacy & Medical Store ERP", href: "#services" },
    ],
  },
  {
    title: "Institutions & Clinics",
    items: [
      { title: "School Management Software", href: "#services" },
      { title: "Coaching & Institute Software", href: "#services" },
      { title: "Hospital & OPD Management", href: "#services" },
      { title: "Gym & Fitness Club Software", href: "#services" },
    ],
  },
  {
    title: "Custom Workflows",
    items: [
      { title: "Lead & CRM Software", href: "#services" },
      { title: "Online Appointment Booking", href: "#services" },
      { title: "Exam & Result Management", href: "#services" },
      { title: "Bespoke Enterprise Software", href: "#services" },
    ],
  },
];

const mobileAppCategories: MegaMenuCategory[] = [
  {
    title: "Commerce & Services",
    items: [
      { title: "E-Commerce Shopping Apps", href: "#services" },
      { title: "Restaurant & Delivery Apps", href: "#services" },
      { title: "Service Booking & Scheduling", href: "#services" },
    ],
  },
  {
    title: "Content & EdTech",
    items: [
      { title: "Live News & Media Apps", href: "#services" },
      { title: "Learning & Education Apps", href: "#services" },
      { title: "Real Estate Property Apps", href: "#services" },
    ],
  },
  {
    title: "Custom Android & iOS",
    items: [
      { title: "Native Android (Kotlin / Java)", href: "#services" },
      { title: "Cross-Platform (Flutter / React Native)", href: "#services" },
      { title: "OTT & Video Streaming Apps", href: "#services" },
    ],
  },
];

const designCategories: MegaMenuCategory[] = [
  {
    title: "Brand Identity",
    items: [
      { title: "Logo & Brand Guidelines", href: "#services" },
      { title: "Visiting Cards & Stationery", href: "#services" },
      { title: "Letterhead & Corporate Kits", href: "#services" },
    ],
  },
  {
    title: "Print & Marketing",
    items: [
      { title: "Brochures & Catalogs", href: "#services" },
      { title: "Pamphlets & Flyers", href: "#services" },
      { title: "Hoardings & Outdoor Banners", href: "#services" },
    ],
  },
  {
    title: "Digital & Video",
    items: [
      { title: "Social Media Post Creatives", href: "#services" },
      { title: "High-CTR Ad Creatives", href: "#services" },
      { title: "Promo Video & Reel Editing", href: "#services" },
    ],
  },
];

export const Navbar: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isConfigured = isWhatsAppConfigured();
  const { url: generatedWhatsAppUrl } = buildWhatsAppUrl("Hello AIMHOP Tech! I am interested in your services.");
  const activeEnquireHref = isConfigured ? generatedWhatsAppUrl : "#enquiry-form";

  const smoothScrollTo = (targetId: string, customOffset = 80) => {
    if (typeof window === "undefined") return;
    if (targetId === "/" || targetId === "#top" || targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const cleanId = targetId.replace(/^#/, "");
    const el = document.getElementById(cleanId);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - customOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }
  };

  const handleNavScroll = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    smoothScrollTo(targetId, 80);
  };

  const handleContactNav = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    smoothScrollTo("contact", 80);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("aimhop:highlight-contact"));
    }
  };

  const handleEnquireNav = (e: React.MouseEvent<HTMLElement>) => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    if (isConfigured) return;
    e.preventDefault();
    const targetId = typeof window !== "undefined" && window.innerWidth >= 1024 ? "enquiry-form" : "contact";
    smoothScrollTo(targetId, 80);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("aimhop:highlight-enquiry"));
      setTimeout(() => {
        document.getElementById("fullName")?.focus();
      }, 400);
    }
  };

  return (
    <header
      id="top"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#E5DAC9]"
          : "bg-[#FAF7F2] py-3.5 border-b border-[#E5DAC9]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo size="md" variant="dark" />
          </div>

          {/* Desktop Nav with Mega Menus */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6" aria-label="Main Navigation">
            <a
              href="#top"
              onClick={(e) => handleNavScroll(e, "#top")}
              className="text-[11px] xl:text-xs uppercase font-bold tracking-wider text-[#261C19] hover:text-[#6B1D2F] transition-colors cursor-pointer"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavScroll(e, "#about")}
              className="text-[11px] xl:text-xs uppercase font-bold tracking-wider text-[#261C19] hover:text-[#6B1D2F] transition-colors cursor-pointer"
            >
              About
            </a>

            {/* WEBSITE Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("website")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`text-[11px] xl:text-xs uppercase font-bold tracking-wider transition-colors py-2 cursor-pointer ${activeDropdown === "website" ? "text-[#6B1D2F]" : "text-[#261C19] hover:text-[#6B1D2F]"
                  }`}
              >
                Website
              </button>

              {activeDropdown === "website" && (
                <div className="absolute top-full -left-20 w-[780px] bg-white rounded-xl shadow-2xl border border-[#E5DAC9] p-6 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-3 grid grid-cols-3 gap-5">
                    {websiteCategories.map((cat, idx) => (
                      <div key={idx}>
                        <h4 className="text-xs font-extrabold text-[#6B1D2F] uppercase tracking-wider mb-3 pb-1 border-b border-[#F0E6D8]">
                          {cat.title}
                        </h4>
                        <ul className="space-y-2">
                          {cat.items.map((item, i) => (
                            <li key={i}>
                              <a
                                href={item.href}
                                onClick={(e) => handleNavScroll(e, item.href)}
                                className="text-xs text-[#5E504B] hover:text-[#8B1E3F] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span className="text-[#6B1D2F] font-bold">›</span>
                                <span>{item.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Visual Promotion Card with Service Illustration */}
                  <div className="col-span-1 bg-gradient-to-br from-[#6B1D2F] to-[#3D0B12] text-white p-4 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#8B1E3F] mb-2 font-mono">
                        Web Solutions
                      </span>
                      <h5 className="text-xs font-bold leading-snug">Modern Websites That Convert</h5>
                      <div className="my-2 p-1 bg-white/10 rounded-md">
                        <img
                          src="/service-web.jpg"
                          alt="Website Designing Services"
                          loading="lazy"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <p className="text-[11px] text-rose-100">SEO ready, mobile-first & lightning fast.</p>
                    </div>
                    <a
                      href="#portfolio"
                      onClick={(e) => handleNavScroll(e, "#portfolio")}
                      className="mt-3 text-[11px] font-bold text-[#6B1D2F] bg-[#FAF7F2] px-3 py-1.5 rounded text-center hover:bg-white transition-colors cursor-pointer"
                    >
                      Explore Demo Websites →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* SOFTWARE Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("software")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`text-[11px] xl:text-xs uppercase font-bold tracking-wider transition-colors py-2 cursor-pointer ${activeDropdown === "software" ? "text-[#6B1D2F]" : "text-[#261C19] hover:text-[#6B1D2F]"
                  }`}
              >
                Software
              </button>

              {activeDropdown === "software" && (
                <div className="absolute top-full -left-28 w-[820px] bg-white rounded-xl shadow-2xl border border-[#E5DAC9] p-6 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-3 grid grid-cols-3 gap-5">
                    {softwareCategories.map((cat, idx) => (
                      <div key={idx}>
                        <h4 className="text-xs font-extrabold text-[#6B1D2F] uppercase tracking-wider mb-3 pb-1 border-b border-[#F0E6D8]">
                          {cat.title}
                        </h4>
                        <ul className="space-y-2">
                          {cat.items.map((item, i) => (
                            <li key={i}>
                              <a
                                href={item.href}
                                onClick={(e) => handleNavScroll(e, item.href)}
                                className="text-xs text-[#5E504B] hover:text-[#8B1E3F] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span className="text-[#6B1D2F] font-bold">›</span>
                                <span>{item.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-1 bg-gradient-to-br from-[#3D0B12] to-[#6B1D2F] text-white p-4 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-600 mb-2 font-mono">
                        Custom ERP
                      </span>
                      <h5 className="text-xs font-bold leading-snug">Automate Operations</h5>
                      <div className="my-2 p-1 bg-white/10 rounded-md">
                        <img
                          src="/service-software.jpg"
                          alt="Custom Software Development"
                          loading="lazy"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <p className="text-[11px] text-rose-100">Billing, Inventory, Appointments & Staff.</p>
                    </div>
                    <a
                      href="#enquiry-form"
                      onClick={handleEnquireNav}
                      className="mt-3 text-[11px] font-bold text-white bg-[#8B1E3F] px-3 py-1.5 rounded text-center hover:bg-[#6B1D2F] transition-colors cursor-pointer"
                    >
                      Book Free Demo →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* MOBILE APP Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("app")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`text-[11px] xl:text-xs uppercase font-bold tracking-wider transition-colors py-2 cursor-pointer ${activeDropdown === "app" ? "text-[#6B1D2F]" : "text-[#261C19] hover:text-[#6B1D2F]"
                  }`}
              >
                Mobile App
              </button>

              {activeDropdown === "app" && (
                <div className="absolute top-full -left-48 w-[800px] bg-white rounded-xl shadow-2xl border border-[#E5DAC9] p-6 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-3 grid grid-cols-3 gap-5">
                    {mobileAppCategories.map((cat, idx) => (
                      <div key={idx}>
                        <h4 className="text-xs font-extrabold text-[#6B1D2F] uppercase tracking-wider mb-3 pb-1 border-b border-[#F0E6D8]">
                          {cat.title}
                        </h4>
                        <ul className="space-y-2">
                          {cat.items.map((item, i) => (
                            <li key={i}>
                              <a
                                href={item.href}
                                onClick={(e) => handleNavScroll(e, item.href)}
                                className="text-xs text-[#5E504B] hover:text-[#8B1E3F] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span className="text-[#6B1D2F] font-bold">›</span>
                                <span>{item.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-1 bg-gradient-to-br from-[#6B1D2F] to-[#8B1E3F] text-white p-4 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-[#6B1D2F] mb-2 font-mono">
                        Android & iOS
                      </span>
                      <h5 className="text-xs font-bold leading-snug">Flutter & Native Apps</h5>
                      <div className="my-2 p-1 bg-white/10 rounded-md">
                        <img
                          src="/service-app.jpg"
                          alt="Mobile App Development"
                          loading="lazy"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <p className="text-[11px] text-white/90">Sleek user experience with offline mode.</p>
                    </div>
                    <a
                      href="#enquiry-form"
                      onClick={handleEnquireNav}
                      className="mt-3 text-[11px] font-bold text-[#6B1D2F] bg-[#FAF7F2] px-3 py-1.5 rounded text-center hover:bg-white transition-colors cursor-pointer"
                    >
                      Discuss App →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* DESIGNING Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("design")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`text-[11px] xl:text-xs uppercase font-bold tracking-wider transition-colors py-2 cursor-pointer ${activeDropdown === "design" ? "text-[#6B1D2F]" : "text-[#261C19] hover:text-[#6B1D2F]"
                  }`}
              >
                Designing
              </button>

              {activeDropdown === "design" && (
                <div className="absolute top-full -left-64 w-[800px] bg-white rounded-xl shadow-2xl border border-[#E5DAC9] p-6 grid grid-cols-4 gap-6 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="col-span-3 grid grid-cols-3 gap-5">
                    {designCategories.map((cat, idx) => (
                      <div key={idx}>
                        <h4 className="text-xs font-extrabold text-[#6B1D2F] uppercase tracking-wider mb-3 pb-1 border-b border-[#F0E6D8]">
                          {cat.title}
                        </h4>
                        <ul className="space-y-2">
                          {cat.items.map((item, i) => (
                            <li key={i}>
                              <a
                                href={item.href}
                                onClick={(e) => handleNavScroll(e, item.href)}
                                className="text-xs text-[#5E504B] hover:text-[#8B1E3F] hover:translate-x-1 transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <span className="text-[#6B1D2F] font-bold">›</span>
                                <span>{item.title}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="col-span-1 bg-gradient-to-br from-[#3D0B12] to-[#6B1D2F] text-white p-4 rounded-lg flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#8B1E3F] mb-2 font-mono">
                        Branding Kit
                      </span>
                      <h5 className="text-xs font-bold leading-snug">Visual Design & Videos</h5>
                      <div className="my-2 p-1 bg-white/10 rounded-md">
                        <img
                          src="/service-graphics.jpg"
                          alt="Graphic Designing Services"
                          loading="lazy"
                          className="w-full h-24 object-cover rounded"
                        />
                      </div>
                      <p className="text-[11px] text-rose-100">Social media posts, reels & hoardings.</p>
                    </div>
                    <a
                      href="#enquiry-form"
                      onClick={handleEnquireNav}
                      className="mt-3 text-[11px] font-bold text-white bg-[#8B1E3F] px-3 py-1.5 rounded text-center hover:bg-[#6B1D2F] transition-colors cursor-pointer"
                    >
                      Get Quote →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <a
              href="#portfolio"
              onClick={(e) => handleNavScroll(e, "#portfolio")}
              className="text-[11px] xl:text-xs uppercase font-bold tracking-wider text-[#261C19] hover:text-[#6B1D2F] transition-colors cursor-pointer whitespace-nowrap"
            >
              Demo Projects
            </a>

            <a
              href="#contact"
              onClick={handleContactNav}
              className="text-[11px] xl:text-xs uppercase font-bold tracking-wider text-[#261C19] hover:text-[#6B1D2F] transition-colors cursor-pointer whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${siteConfig.contact.whatsappDisplayNumber.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DAC9] hover:border-[#6B1D2F] text-[#261C19] hover:text-[#6B1D2F] transition-all text-xs font-bold font-mono shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap"
              title={`Call ${siteConfig.contact.whatsappDisplayNumber}`}
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{siteConfig.contact.whatsappDisplayNumber}</span>
            </a>

            <a
              href={activeEnquireHref}
              target={isConfigured ? "_blank" : "_self"}
              rel={isConfigured ? "noopener noreferrer" : undefined}
              onClick={handleEnquireNav}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg font-bold text-xs uppercase tracking-wider btn-brand-orange shadow-xs hover:scale-[1.02] transition-transform cursor-pointer whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Enquire Now</span>
            </a>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={activeEnquireHref}
              target={isConfigured ? "_blank" : "_self"}
              rel={isConfigured ? "noopener noreferrer" : undefined}
              onClick={handleEnquireNav}
              className="inline-flex items-center gap-1 h-7 px-3 rounded text-[10px] font-bold uppercase tracking-wider btn-brand-orange text-white cursor-pointer"
            >
              <PhoneCall className="w-2.5 h-2.5" />
              <span>Enquire</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-md text-[#261C19] hover:text-[#6B1D2F] hover:bg-[#F3ECE2]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-[#FAF7F2] z-50 overflow-y-auto border-t border-[#E5DAC9] p-5 animate-in slide-in-from-top-4 duration-200">
          <div className="space-y-4 pb-12">
            <a
              href="#top"
              onClick={(e) => handleNavScroll(e, "#top")}
              className="block font-bold text-sm text-[#261C19] hover:text-[#6B1D2F] uppercase tracking-wide py-2 border-b border-[#E5DAC9] cursor-pointer"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={(e) => handleNavScroll(e, "#about")}
              className="block font-bold text-sm text-[#261C19] hover:text-[#6B1D2F] uppercase tracking-wide py-2 border-b border-[#E5DAC9] cursor-pointer"
            >
              About Agency
            </a>

            {/* Mobile Accordion: Website */}
            {/* Mobile Accordion: Website */}
            <div className="border-b border-[#E5DAC9] pb-2">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === "website" ? null : "website")
                }
                className="w-full flex items-center justify-between font-bold text-sm text-[#261C19] uppercase py-2 cursor-pointer"
              >
                <span>Website Designing</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileExpandedSection === "website" ? "rotate-180 text-[#6B1D2F]" : ""}`}
                />
              </button>
              {mobileExpandedSection === "website" && (
                <div className="pl-3 py-2 space-y-2 text-xs text-[#5E504B] bg-[#F3ECE2] rounded-lg p-3 mt-1">
                  {websiteCategories.flatMap((c) => c.items).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavScroll(e, item.href)}
                      className="block py-1 hover:text-[#6B1D2F] cursor-pointer"
                    >
                      • {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Software */}
            <div className="border-b border-[#E5DAC9] pb-2">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === "software" ? null : "software")
                }
                className="w-full flex items-center justify-between font-bold text-sm text-[#261C19] uppercase py-2 cursor-pointer"
              >
                <span>Software Solutions</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileExpandedSection === "software" ? "rotate-180 text-[#6B1D2F]" : ""}`}
                />
              </button>
              {mobileExpandedSection === "software" && (
                <div className="pl-3 py-2 space-y-2 text-xs text-[#5E504B] bg-[#F3ECE2] rounded-lg p-3 mt-1">
                  {softwareCategories.flatMap((c) => c.items).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavScroll(e, item.href)}
                      className="block py-1 hover:text-[#6B1D2F] cursor-pointer"
                    >
                      • {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Mobile App */}
            <div className="border-b border-[#E5DAC9] pb-2">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === "app" ? null : "app")
                }
                className="w-full flex items-center justify-between font-bold text-sm text-[#261C19] uppercase py-2 cursor-pointer"
              >
                <span>Mobile App Development</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileExpandedSection === "app" ? "rotate-180 text-[#6B1D2F]" : ""}`}
                />
              </button>
              {mobileExpandedSection === "app" && (
                <div className="pl-3 py-2 space-y-2 text-xs text-[#5E504B] bg-[#F3ECE2] rounded-lg p-3 mt-1">
                  {mobileAppCategories.flatMap((c) => c.items).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavScroll(e, item.href)}
                      className="block py-1 hover:text-[#6B1D2F] cursor-pointer"
                    >
                      • {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Accordion: Designing */}
            <div className="border-b border-[#E5DAC9] pb-2">
              <button
                type="button"
                onClick={() =>
                  setMobileExpandedSection(mobileExpandedSection === "design" ? null : "design")
                }
                className="w-full flex items-center justify-between font-bold text-sm text-[#261C19] uppercase py-2 cursor-pointer"
              >
                <span>Designing & Media</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileExpandedSection === "design" ? "rotate-180 text-[#6B1D2F]" : ""}`}
                />
              </button>
              {mobileExpandedSection === "design" && (
                <div className="pl-3 py-2 space-y-2 text-xs text-[#5E504B] bg-[#F3ECE2] rounded-lg p-3 mt-1">
                  {designCategories.flatMap((c) => c.items).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavScroll(e, item.href)}
                      className="block py-1 hover:text-[#6B1D2F] cursor-pointer"
                    >
                      • {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#portfolio"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavScroll(e, "#portfolio")}
              className="block font-bold text-sm text-[#261C19] uppercase py-2 border-b border-[#E5DAC9] cursor-pointer"
            >
              Demo Projects
            </a>

            <a
              href="#faqs"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavScroll(e, "#faqs")}
              className="block font-bold text-sm text-[#261C19] uppercase py-2 border-b border-[#E5DAC9] cursor-pointer"
            >
              FAQ
            </a>

            <a
              href="#contact-info"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleContactNav(e)}
              className="block font-bold text-sm text-[#261C19] uppercase py-2 border-b border-[#E5DAC9] cursor-pointer"
            >
              Contact &amp; Support Desk
            </a>

            <div className="pt-2 pb-1 flex items-center justify-between text-xs border-b border-[#E5DAC9]">
              <span className="font-semibold text-[#5E504B]">Direct Phone / WhatsApp:</span>
              <a
                href={`tel:${siteConfig.contact.whatsappDisplayNumber.replace(/[^\d+]/g, "")}`}
                className="font-bold text-[#6B1D2F] font-mono hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{siteConfig.contact.whatsappDisplayNumber}</span>
              </a>
            </div>

            <div className="pt-3">
              <a
                href={activeEnquireHref}
                target={isConfigured ? "_blank" : "_self"}
                rel={isConfigured ? "noopener noreferrer" : undefined}
                onClick={handleEnquireNav}
                className="w-full py-3 rounded-lg text-center font-bold text-sm uppercase tracking-wider btn-brand-orange block cursor-pointer"
              >
                {isConfigured ? "Start Free Consultation on WhatsApp" : "Enquire Now — Project Proposal"}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
