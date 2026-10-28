"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/common/Logo";
import { siteConfig, isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/siteConfig";
import { LegalModal } from "@/components/ui/LegalModal";
import {
  Mail,
  Phone,
  Clock,
  MapPin,
  ArrowUp,
  Heart,
  MessageSquare,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);
  const currentYear = 2026;

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId.replace(/^#/, ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isConfigured = isWhatsAppConfigured();
  const { url: dynamicWhatsAppUrl } = buildWhatsAppUrl("Hello AIMHOP Tech! I have an enquiry about your services.");
  const safeWhatsAppHref = isConfigured ? dynamicWhatsAppUrl : "#contact";

  return (
    <>
      <footer className="relative bg-[#26050A] text-slate-300 border-t border-[#6B1D2F]/40 pt-16 pb-10 overflow-hidden">
        {/* Decorative background glow in Wine Red & Sand Gold */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B1E3F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C8963E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#6B1D2F]/40">
            {/* Column 1: Brand Info & Socials (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Logo size="lg" showTagline={true} variant="light" />

              <p className="text-xs sm:text-sm text-rose-100/75 leading-relaxed max-w-sm">
                AIMHOP Tech is a leading Website Development, Custom Software, and Digital Solutions
                Agency helping businesses, clinics, schools, and brands scale with high-impact digital presence.
              </p>

              {/* Social Channels with rounded icon links */}
              <div className="flex items-center gap-2.5 pt-2">
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8B1E3F] flex items-center justify-center text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                )}

                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8B1E3F] flex items-center justify-center text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}

                <Link
                  href={safeWhatsAppHref}
                  target={isConfigured ? "_blank" : "_self"}
                  rel={isConfigured ? "noopener noreferrer" : undefined}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </Link>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8B1E3F] flex items-center justify-center text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (2 Cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#6B1D2F] pb-2 font-mono">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="hover:text-[#C8963E] transition-colors cursor-pointer"
                  >
                    Website Designing
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="hover:text-[#C8963E] transition-colors cursor-pointer"
                  >
                    Software Development
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    onClick={(e) => handleScrollTo(e, "#portfolio")}
                    className="hover:text-[#C8963E] transition-colors cursor-pointer"
                  >
                    Demo Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#industries"
                    onClick={(e) => handleScrollTo(e, "#industries")}
                    className="hover:text-[#C8963E] transition-colors cursor-pointer"
                  >
                    Industries Served
                  </a>
                </li>
                <li>
                  <a
                    href="#technologies"
                    onClick={(e) => handleScrollTo(e, "#technologies")}
                    className="hover:text-[#C8963E] transition-colors cursor-pointer"
                  >
                    Trending Tech Stack
                  </a>
                </li>
                <li>
                  <a
                    href="#enquiry-form"
                    onClick={(e) => {
                      handleScrollTo(e, "#enquiry-form");
                      if (typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("aimhop:highlight-enquiry"));
                        setTimeout(() => {
                          document.getElementById("fullName")?.focus();
                        }, 350);
                      }
                    }}
                    className="hover:text-[#C8963E] transition-colors cursor-pointer"
                  >
                    Request Project Proposal
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Digital Services (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#6B1D2F] pb-2 font-mono">
                Our Solutions
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#services" className="hover:text-[#C8963E] transition-colors">
                    Static &amp; Dynamic Websites
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#C8963E] transition-colors">
                    E-Commerce Storefronts
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#C8963E] transition-colors">
                    School &amp; Hospital Management ERP
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#C8963E] transition-colors">
                    Billing &amp; Point of Sale (POS)
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#C8963E] transition-colors">
                    Mobile Apps (Android &amp; iOS)
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-[#C8963E] transition-colors">
                    Local SEO &amp; Google Ads Marketing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Direct Operations (3 Cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#6B1D2F] pb-2 font-mono">
                Direct Contact
              </h4>
              <div className="space-y-2.5 text-xs text-rose-100/90">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C8963E] shrink-0" />
                  <a
                    href={`tel:${siteConfig.contact.whatsappDisplayNumber.replace(/[^\d+]/g, "")}`}
                    className="hover:text-white transition-colors"
                  >
                    {siteConfig.contact.whatsappDisplayNumber}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C8963E] shrink-0" />
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                    {siteConfig.contact.email}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C8963E] shrink-0" />
                  <span>{siteConfig.contact.hours}</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C8963E] shrink-0" />
                  <span>{siteConfig.contact.location}</span>
                </div>

                <div className="pt-2">
                  <Link
                    href={safeWhatsAppHref}
                    target={isConfigured ? "_blank" : "_self"}
                    rel={isConfigured ? "noopener noreferrer" : undefined}
                    className="inline-block w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs uppercase tracking-wider btn-brand-orange text-white shadow-md hover:scale-[1.01] transition-transform"
                  >
                    {isConfigured ? "Quick WhatsApp Enquiry" : "Discuss Project With Us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Heart + Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-rose-200/60 font-medium">
            <div className="flex items-center gap-1.5">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#8B1E3F] fill-current" />
              <span>from AIMHOP Tech</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setLegalModal("privacy")}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setLegalModal("terms")}
                className="hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3" />
              </button>
            </div>

            <div>
              &copy; {currentYear} {siteConfig.brand.legalName}. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <LegalModal
        isOpen={legalModal !== null}
        type={legalModal || "privacy"}
        onClose={() => setLegalModal(null)}
      />
    </>
  );
};
