"use client";

import React, { useEffect } from "react";
import { X, Shield } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface LegalModalProps {
  isOpen: boolean;
  type: "privacy" | "terms";
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, type, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white border border-[#E5DAC9] p-6 sm:p-8 text-[#261C19] shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DAC9]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#6B1D2F]/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#6B1D2F]" />
            </div>
            <h3 className="text-xl font-bold text-[#261C19] font-heading">
              {type === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#5E504B] hover:text-[#261C19] hover:bg-[#F3ECE2] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs sm:text-sm text-[#5E504B] space-y-4 leading-relaxed">
          {type === "privacy" ? (
            <>
              <p>
                <strong className="text-[#261C19]">1. Information Collection:</strong> AIMHOP Tech collects information voluntarily
                provided by you through our consultation form (name, phone number, email, and project scope details)
                solely for discussing potential digital service engagements.
              </p>
              <p>
                <strong className="text-[#261C19]">2. Use of Information:</strong> We do not sell, rent, or trade your contact details
                to third parties. Submitted details are used exclusively by our technical and account teams to
                prepare tailored project proposals and coordinate communication via WhatsApp or Email.
              </p>
              <p>
                <strong className="text-[#261C19]">3. WhatsApp Communication:</strong> When you submit a project brief via our WhatsApp
                integration, standard WhatsApp encryption and privacy standards apply. You maintain complete control
                to start or cease communication at any point.
              </p>
              <p>
                <strong className="text-[#261C19]">4. Data Retention:</strong> You may request deletion of your contact records from our
                active database at any time by sending an email to {siteConfig.contact.email}.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-[#261C19]">1. Scope of Services:</strong> All engineering, advertising management, branding,
                and search optimization services provided by AIMHOP Tech are governed by individual written
                scope-of-work agreements and milestone schedules.
              </p>
              <p>
                <strong className="text-[#261C19]">2. Transparent Pricing:</strong> Pricing quotations are provided upfront prior to project
                commencement. We do not bill unexpected retainers without written mutual consent.
              </p>
              <p>
                <strong className="text-[#261C19]">3. Client Approval Gates:</strong> Deliverables (website designs, advertising campaigns,
                social media content calendars) require explicit client review and sign-off before public launch.
              </p>
              <p>
                <strong className="text-[#261C19]">4. Intellectual Property:</strong> Upon full settlement of agreed project invoices,
                all bespoke website code, graphic collateral, and creative assets produced for your business become
                your exclusive intellectual property.
              </p>
              <p>
                <strong className="text-[#261C19]">5. Demo Concepts &amp; Architecture Showcase:</strong> All design mockups, concept architectures, and interactive demo references displayed on this website are shown strictly for demonstration, skill illustration, and technical benchmarking purposes. AIMHOP Tech does not claim exclusive authorship or prior primary ownership of third-party brand marks or external creative assets. All trademarks remain the property of their respective holders. All client deliverables commissioned with AIMHOP Tech are custom-developed from scratch with clean, original code.
              </p>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-[#E5DAC9] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#6B1D2F] hover:bg-[#8B1E3F] transition-colors shadow-sm"
          >
            Acknowledge &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
