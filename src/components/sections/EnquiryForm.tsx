"use client";

import React, { useState } from "react";
import { siteConfig, isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/siteConfig";
import {
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  businessName: string;
  serviceCategory: string;
  projectGoal: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

const serviceCategories = [
  "School & Coaching Management ERP (Purvanchal Special)",
  "Hospital OPD & Clinic Software",
  "Vyapar GST Billing & POS Software",
  "Custom Website Design & Development",
  "E-Commerce Store (WooCommerce / Shopify / Custom)",
  "Custom Software / ERP / CRM Development",
  "Mobile App Development (Android & iOS)",
  "Graphic Designing & Brand Identity",
  "Digital Marketing & SEO Ranking",
  "Website Redesign & Speed Optimization",
  "Request Free Live Demo (Online / On-Premise)",
  "Other IT / Tech Consultation",
];

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    businessName: "",
    serviceCategory: serviceCategories[0],
    projectGoal: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);
  const [highlightNotice, setHighlightNotice] = useState<string | null>(null);
  const [highlightTarget, setHighlightTarget] = useState<"contact" | "enquiry" | null>(null);

  const isConfigured = isWhatsAppConfigured();

  React.useEffect(() => {
    const handleSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectName?: string; service?: string; categoryLabel?: string }>;
      if (customEvent.detail) {
        const { projectName, service, categoryLabel } = customEvent.detail;

        setFormData((prev) => ({
          ...prev,
          serviceCategory: service || prev.serviceCategory,
          projectGoal: projectName
            ? `I am interested in developing a website with architecture and features similar to ${projectName} (${categoryLabel || "Custom Architecture"}). Please provide project estimation, timeline, and consultation.`
            : prev.projectGoal,
        }));

        setHighlightNotice(
          `Project reference selected: "${projectName}". Please complete your contact details below.`
        );
        setHighlightTarget("enquiry");

        setTimeout(() => {
          const nameInput = document.getElementById("fullName");
          if (nameInput) {
            nameInput.focus();
          }
        }, 350);

        setTimeout(() => {
          setHighlightNotice(null);
          setHighlightTarget(null);
        }, 6000);
      }
    };

    const handleHighlightContact = () => {
      setHighlightTarget("contact");
      setTimeout(() => {
        setHighlightTarget(null);
      }, 3500);
    };

    const handleHighlightEnquiry = () => {
      setHighlightTarget("enquiry");
      setTimeout(() => {
        const nameInput = document.getElementById("fullName");
        if (nameInput) {
          nameInput.focus();
        }
      }, 300);
      setTimeout(() => {
        setHighlightTarget(null);
      }, 3500);
    };

    window.addEventListener("aimhop:select-project", handleSelectProject);
    window.addEventListener("aimhop:highlight-contact", handleHighlightContact);
    window.addEventListener("aimhop:highlight-enquiry", handleHighlightEnquiry);

    return () => {
      window.removeEventListener("aimhop:select-project", handleSelectProject);
      window.removeEventListener("aimhop:highlight-contact", handleHighlightContact);
      window.removeEventListener("aimhop:highlight-enquiry", handleHighlightEnquiry);
    };
  }, []);

  const generateFormattedMessage = (): string => {
    const lines = [
      `*Hello AIMHOP Tech Team!*`,
      `I would like to discuss a project:`,
      ``,
      `*Client Name:* ${formData.fullName.trim() || "[Name]"}`,
      `*Mobile/WhatsApp:* ${formData.phone.trim() || "[Phone]"}`,
      formData.email.trim() ? `*Email:* ${formData.email.trim()}` : null,
      formData.businessName.trim() ? `*Business/Brand:* ${formData.businessName.trim()}` : null,
      `*Service Required:* ${formData.serviceCategory}`,
      formData.projectGoal.trim()
        ? `*Project Requirements:*\n${formData.projectGoal.trim()}`
        : null,
      ``,
      `_Submitted via AIMHOP Tech project consultation form._`,
    ];

    return lines.filter((line) => line !== null).join("\n");
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your mobile or WhatsApp number.";
    } else {
      const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, "");
      if (!/^\+?\d{8,15}$/.test(cleanPhone)) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (typeof window !== "undefined" && !navigator.onLine) {
      setSubmissionNotice(
        "Network Error: Your device appears to be offline. Please verify your connection and resubmit."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmissionNotice(null);

    const message = generateFormattedMessage();

    if (!isConfigured) {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionNotice(
          "Thank you! Your project enquiry has been registered. Our technical team will reach out to your contact details shortly."
        );
      }, 350);
      return;
    }

    const { url } = buildWhatsAppUrl(message);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionNotice(
        "WhatsApp opened in a new tab with your pre-formatted brief. Please tap Send to dispatch directly to our technical team."
      );
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    }, 400);
  };

  const scrollToContact = () => {
    setHighlightTarget("contact");
    const el = document.getElementById("contact-info");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => setHighlightTarget(null), 3000);
  };

  const scrollToEnquiry = () => {
    setHighlightTarget("enquiry");
    const el = document.getElementById("enquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      document.getElementById("fullName")?.focus();
    }, 350);
    setTimeout(() => setHighlightTarget(null), 3000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 lg:py-28 bg-[#FAF7F2] text-[#261C19] border-t border-[#E5DAC9] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F]">
            Direct Connect &amp; Project Inquiries
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#261C19] font-heading">
            Connect With AIMHOP Tech
          </h2>
          <p className="text-[#5E504B] text-sm sm:text-base leading-relaxed">
            Choose your preferred way to connect: reach out directly via call, WhatsApp, or official email,
            or submit your project scope below for a tailored milestone roadmap and formal quotation.
          </p>

          {/* Interactive Fast-Switch Navigation Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToContact}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                highlightTarget === "contact"
                  ? "bg-[#6B1D2F] text-white shadow-lg ring-2 ring-[#6B1D2F]/40 scale-105"
                  : "bg-white text-[#5E504B] border border-[#E5DAC9] hover:border-[#6B1D2F] hover:text-[#6B1D2F] shadow-2xs"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Direct Communication Desk</span>
            </button>

            <button
              type="button"
              onClick={scrollToEnquiry}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                highlightTarget === "enquiry"
                  ? "bg-[#6B1D2F] text-white shadow-lg ring-2 ring-[#6B1D2F]/40 scale-105"
                  : "bg-white text-[#5E504B] border border-[#E5DAC9] hover:border-[#6B1D2F] hover:text-[#6B1D2F] shadow-2xs"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Project Estimation Form</span>
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Left Contact Info Hub + Right Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Hub */}
          <div
            id="contact-info"
            className={`lg:col-span-5 space-y-6 scroll-mt-28 lg:scroll-mt-32 transition-all duration-500 rounded-3xl p-1 sm:p-2 ${
              highlightTarget === "contact"
                ? "ring-4 ring-[#6B1D2F]/40 ring-offset-4 ring-offset-[#FAF7F2] bg-white/60 shadow-2xl"
                : ""
            }`}
          >
            {/* Visual Team Graphic Card: Full-Bleed Image Section */}
            <div className="relative rounded-3xl overflow-hidden shadow-md group min-h-[360px] sm:min-h-[400px] flex flex-col justify-end p-6 sm:p-7 border border-[#E5DAC9]">
              {/* Full bleed background image */}
              <img
                src="/discuss.jpg"
                alt="Discuss project with AIMHOP Tech Team"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.72]"
                loading="lazy"
              />
              {/* Cinematic dark gradient overlay for optimal readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

              {/* Bottom Floating Title & Description */}
              <div className="relative z-10 pt-14">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight drop-shadow-sm">
                  Let&apos;s Build Something Incredible
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed drop-shadow-sm font-normal">
                  Connect with our technical consultants directly for quick questions, support, or initial exploration.
                </p>
              </div>
            </div>

            {/* Quick Interactive Contact Cards - Refined Human-Engineered System */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <a
                href={`tel:${siteConfig.contact.whatsappDisplayNumber.replace(/[^\d+]/g, "")}`}
                className="p-4 rounded-2xl bg-white border border-[#E5DAC9] hover:border-[#6B1D2F] hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] group-hover:bg-[#6B1D2F] group-hover:text-white transition-colors flex items-center justify-center text-[#6B1D2F] flex-shrink-0 shadow-2xs">
                    <Phone className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#5E504B] uppercase tracking-wider font-mono">
                      Call / WhatsApp
                    </div>
                    <div className="text-xs font-semibold text-[#261C19]">
                      {siteConfig.contact.whatsappDisplayNumber}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity">
                  Call →
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-4 rounded-2xl bg-white border border-[#E5DAC9] hover:border-[#6B1D2F] hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] group-hover:bg-[#6B1D2F] group-hover:text-white transition-colors flex items-center justify-center text-[#6B1D2F] flex-shrink-0 shadow-2xs">
                    <Mail className="w-4 h-4" strokeWidth={1.6} />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-[#5E504B] uppercase tracking-wider font-mono">
                      Official Email
                    </div>
                    <div className="text-xs font-semibold text-[#261C19] truncate max-w-[130px]">
                      {siteConfig.contact.email}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#6B1D2F] opacity-0 group-hover:opacity-100 transition-opacity">
                  Write →
                </span>
              </a>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DAC9] shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] flex items-center justify-center text-[#6B1D2F] flex-shrink-0 shadow-2xs">
                  <Clock className="w-4 h-4" strokeWidth={1.6} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#5E504B] uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span>Office Hours</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-xs font-semibold text-[#261C19]">{siteConfig.contact.hours}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E5DAC9] shadow-2xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] flex items-center justify-center text-[#6B1D2F] flex-shrink-0 shadow-2xs">
                  <MapPin className="w-4 h-4" strokeWidth={1.6} />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[#5E504B] uppercase tracking-wider font-mono">
                    Registered Office
                  </div>
                  <div className="text-xs font-semibold text-[#261C19] leading-snug">
                    {siteConfig.contact.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Project Estimation & Scope Specification Form */}
          <div
            id="enquiry-form"
            className={`lg:col-span-7 bg-white rounded-3xl border border-[#E5DAC9] p-7 sm:p-10 shadow-xl space-y-6 scroll-mt-28 lg:scroll-mt-32 transition-all duration-500 ${
              highlightTarget === "enquiry"
                ? "ring-4 ring-[#6B1D2F]/40 ring-offset-4 ring-offset-[#FAF7F2] shadow-2xl"
                : ""
            }`}
          >
            {/* Form Top Professional Header */}
            <div className="border-b border-[#F0E6D8] pb-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-[#6B1D2F]">
                  Project Estimation &amp; Consultation Request
                </span>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  24h Roadmap
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#261C19] font-heading mt-1">
                Tell Us About Your Project
              </h3>
              <p className="text-xs text-[#5E504B] mt-1 leading-relaxed">
                Provide your requirements below. Our engineering team reviews all briefs to supply transparent architecture recommendations, delivery milestones, and cost estimates.
              </p>
            </div>

            {highlightNotice && (
              <div className="p-3.5 rounded-2xl bg-[#6B1D2F]/10 border border-[#6B1D2F]/30 text-xs text-[#6B1D2F] font-bold flex items-center gap-2.5 animate-in fade-in duration-200">
                <MessageCircle className="w-4 h-4 text-[#8B1E3F] shrink-0" />
                <span>{highlightNotice}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-[#261C19] uppercase tracking-wider mb-2 font-mono">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#261C19] placeholder-[#5E504B]/60 focus:outline-none transition-colors ${
                      errors.fullName
                        ? "border-rose-500 bg-rose-50/20"
                        : "border-[#E5DAC9] focus:border-[#6B1D2F] focus:bg-white"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-[#261C19] uppercase tracking-wider mb-2 font-mono">
                    WhatsApp / Mobile Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#261C19] placeholder-[#5E504B]/60 focus:outline-none transition-colors ${
                      errors.phone
                        ? "border-rose-500 bg-rose-50/20"
                        : "border-[#E5DAC9] focus:border-[#6B1D2F] focus:bg-white"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-[#261C19] uppercase tracking-wider mb-2 font-mono">
                    Email Address <span className="text-[#5E504B] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="yourname@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border text-sm text-[#261C19] placeholder-[#5E504B]/60 focus:outline-none transition-colors ${
                      errors.email
                        ? "border-rose-500 bg-rose-50/20"
                        : "border-[#E5DAC9] focus:border-[#6B1D2F] focus:bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-600 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="businessName" className="block text-xs font-bold text-[#261C19] uppercase tracking-wider mb-2 font-mono">
                    Business / Project Name <span className="text-[#5E504B] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Apex Hospital, Style Store"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] text-sm text-[#261C19] placeholder-[#5E504B]/60 focus:outline-none focus:border-[#6B1D2F] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label htmlFor="serviceCategory" className="block text-xs font-bold text-[#261C19] uppercase tracking-wider mb-2 font-mono">
                  Select Required Service / Package
                </label>
                <select
                  id="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] text-sm text-[#261C19] focus:outline-none focus:border-[#6B1D2F] focus:bg-white transition-colors"
                >
                  {serviceCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Requirements / Message */}
              <div>
                <label htmlFor="projectGoal" className="block text-xs font-bold text-[#261C19] uppercase tracking-wider mb-2 font-mono">
                  Project Description / Demo Request Details
                </label>
                <textarea
                  id="projectGoal"
                  rows={3}
                  value={formData.projectGoal}
                  onChange={(e) => setFormData({ ...formData, projectGoal: e.target.value })}
                  placeholder="Tell us about your project requirements, target features, or preferred live demo schedule..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#E5DAC9] text-sm text-[#261C19] placeholder-[#5E504B]/60 focus:outline-none focus:border-[#6B1D2F] focus:bg-white transition-colors"
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-brand-orange w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg disabled:opacity-50 hover:scale-[1.01] transition-transform"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Send Project Inquiry"}</span>
                </button>
              </div>

              {/* Feedback Alert */}
              {submissionNotice && (
                <div className="p-4 rounded-2xl bg-[#F3ECE2] border border-[#E5DAC9] text-xs text-[#261C19] space-y-1">
                  <span className="font-bold text-[#6B1D2F] block">Status:</span>
                  <p className="text-[#5E504B]">{submissionNotice}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
