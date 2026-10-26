"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Zap,
  Globe,
} from "lucide-react";
import { siteConfig, isWhatsAppConfigured, buildWhatsAppUrl } from "@/config/siteConfig";

interface HeroBannerSlide {
  id: number;
  title: string;
  category: string;
  desktopImage: string;
  mobileImage: string;
  inquiryText: string;
}

const slides: HeroBannerSlide[] = [
  {
    id: 1,
    title: "Website Designing Company",
    category: "Website Design & Portals",
    desktopImage: "/slider-one.jpg",
    mobileImage: "/slider-one.jpg",
    inquiryText: "Hello AIMHOP Tech! I am interested in Website Designing & Development services.",
  },
  {
    id: 2,
    title: "Software Development Company",
    category: "ERP & Custom Software",
    desktopImage: "/slider-two.jpg",
    mobileImage: "/slider-two.jpg",
    inquiryText: "Hello AIMHOP Tech! I am interested in Custom Software & ERP Development.",
  },
  {
    id: 3,
    title: "Digital Marketing & Local SEO",
    category: "SEO & Google Rankings",
    desktopImage: "/slider-three.jpg",
    mobileImage: "/slider-three.jpg",
    inquiryText: "Hello AIMHOP Tech! I want to rank my business on Google with SEO & Digital Marketing.",
  },
  {
    id: 4,
    title: "Graphics Designing & Branding",
    category: "Logos & Corporate Identity",
    desktopImage: "/slider-four.jpg",
    mobileImage: "/slider-four.jpg",
    inquiryText: "Hello AIMHOP Tech! I am interested in Graphic Designing & Branding services.",
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const isConfigured = isWhatsAppConfigured();

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Previous Slide
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = slides[currentSlide];
  const { url: currentWhatsAppUrl } = buildWhatsAppUrl(current.inquiryText);
  const activeSlideHref = isConfigured ? currentWhatsAppUrl : "#contact";

  const handleScrollTo = (e: React.MouseEvent, targetId: string) => {
    if (isConfigured && targetId.startsWith("http")) {
      return;
    }
    e.preventDefault();
    const el = document.getElementById(targetId.replace(/^#/, ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative pt-16 sm:pt-20 pb-8 bg-[#FAF7F2] border-b border-[#E5DAC9] w-full overflow-hidden">
      
      {/* 100% Edge-to-Edge Slider with True 16:9 Aspect Ratio preserving all artwork and text */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full overflow-hidden bg-[#200408] group select-none shadow-xl border-b border-[#E5DAC9]"
      >
        {/* Native 1376:768 (16:9) Aspect Container: Ensures 0% text cropping on any screen size */}
        <div className="relative w-full aspect-[16/9] max-h-[82vh]">
          {slides.map((s, idx) => {
            const isActive = idx === currentSlide;
            const { url: slideUrl } = buildWhatsAppUrl(s.inquiryText);
            const slideHref = isConfigured ? slideUrl : "#contact";

            return (
              <div
                key={s.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Link
                  href={slideHref}
                  target={isConfigured ? "_blank" : "_self"}
                  rel={isConfigured ? "noopener noreferrer" : undefined}
                  className="block w-full h-full cursor-pointer relative"
                  aria-label={`${s.title} - ${s.category}`}
                >
                  <img
                    src={s.desktopImage}
                    alt={s.title}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-contain sm:object-cover object-center will-change-transform"
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Previous Slide Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#261C19] hover:text-[#6B1D2F] border border-[#E5DAC9] shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        {/* Next Slide Button */}
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#261C19] hover:text-[#6B1D2F] border border-[#E5DAC9] shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        {/* Bottom Slide Indicators / Dots */}
        <div className="absolute bottom-2.5 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-black/60 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 shadow-xl">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-6 sm:w-10 h-2 sm:h-2.5 bg-[#C8963E]"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Structured Container for Consultation Bar & Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Consultation Action Bar */}
        <div className="mt-6 sm:mt-8 bg-[#F3ECE2] border border-[#E5DAC9] rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-xl bg-[#6B1D2F] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Compass className="w-5 h-5 text-[#C8963E]" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-[#261C19] font-heading">
                Looking for a Custom Website, ERP Software, or Google SEO?
              </h3>
              <p className="text-xs text-[#5E504B] font-medium mt-0.5">
                Engineered for commercial performance. Get a tailored demo &amp; technical consultation.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <a
              href={activeSlideHref}
              target={isConfigured ? "_blank" : "_self"}
              rel={isConfigured ? "noopener noreferrer" : undefined}
              onClick={(e) => handleScrollTo(e, activeSlideHref)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#6B1D2F] text-white hover:bg-[#8B1E3F] shadow-md transition-all hover:scale-[1.02] text-center cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#C8963E]" strokeWidth={1.75} />
              <span>Schedule Consultation</span>
            </a>

            <a
              href="#portfolio"
              onClick={(e) => handleScrollTo(e, "#portfolio")}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-white text-[#261C19] border border-[#E5DAC9] hover:border-[#6B1D2F] hover:text-[#6B1D2F] transition-all text-center cursor-pointer"
            >
              <span>Demo Projects</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* Trust Badges Strip */}
        <div className="mt-6 pt-6 border-t border-[#E5DAC9] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-[#5E504B] font-semibold text-xs sm:text-sm">
            <Zap className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
            <span>Ultra Fast 95+ PageSpeed</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#5E504B] font-semibold text-xs sm:text-sm">
            <Globe className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
            <span>Google SEO &amp; Schema Ready</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#5E504B] font-semibold text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
            <span>100% Clean Custom Code</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#5E504B] font-semibold text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#6B1D2F] shrink-0" strokeWidth={1.6} />
            <span>Ongoing Tech Support &amp; AMC</span>
          </div>
        </div>
      </div>
    </section>
  );
};
