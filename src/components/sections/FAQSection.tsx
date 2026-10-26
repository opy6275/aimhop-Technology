"use client";

import React, { useState } from "react";
import Link from "next/link";
import { faqsData } from "@/data/faqsData";
import { ChevronDown, ArrowUpRight } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Services", "Pricing", "Process", "Support"];

  const toggleFAQ = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs =
    selectedCategory === "All"
      ? faqsData
      : faqsData.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="faqs"
      className="relative py-24 sm:py-32 bg-[#FAF7F2] text-[#261C19] border-t border-[#E5DAC9] scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#6B1D2F]">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#261C19] font-heading">
            Everything You Need To Know
          </h2>
          <p className="text-sm sm:text-base text-[#5E504B] leading-relaxed font-normal">
            Direct, transparent answers regarding our project timelines, pricing philosophy, and delivery standards.
          </p>
        </div>

        {/* Category Pills */}
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  isSelected
                    ? "bg-[#6B1D2F] text-white border-[#6B1D2F] shadow-sm"
                    : "bg-white text-[#5E504B] border-[#E5DAC9] hover:bg-[#F3ECE2] hover:text-[#261C19]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordions */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#E5DAC9] overflow-hidden transition-all hover:border-[#6B1D2F]/50 shadow-2xs"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-btn-${faq.id}`}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#261C19] pr-2 font-heading">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center bg-[#FAF7F2] border border-[#E5DAC9] text-[#261C19] transition-transform flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#6B1D2F] border-[#6B1D2F]" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${faq.id}`}
                    className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#5E504B] leading-relaxed border-t border-[#E5DAC9]/60 bg-[#FAF7F2]"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Prompt */}
        <div className="mt-12 text-center text-xs text-[#5E504B] flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>Need a customized scope or technical clarification?</span>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="text-[#6B1D2F] hover:text-[#8B1E3F] font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Ask our technical leads directly</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
