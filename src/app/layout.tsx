import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/config/siteConfig";
import { PagePreloader } from "@/components/common/PagePreloader";
import { NetworkStatusBanner } from "@/components/common/NetworkStatusBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: siteConfig.metadata.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "AIMHOP Tech — Your Digital Growth Partner | Web Development & Marketing",
  description:
    "We build your digital presence. You grow your business. High-performance websites, paid advertising (Google & Meta Ads), SEO, and conversion-focused digital solutions managed under one roof.",
  keywords: [
    "AIMHOP Tech",
    "Digital Growth Partner",
    "Website Development",
    "Landing Page Design",
    "Google Ads Management",
    "Meta Ads Management",
    "SEO Services",
    "E-Commerce Solutions",
    "Lead Generation",
    "Business Automation",
  ],
  authors: [{ name: siteConfig.brand.legalName }],
  creator: siteConfig.brand.name,
  metadataBase: new URL(siteConfig.metadata.siteUrl),
  icons: {
    icon: [
      { url: "/aimhop-logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/aimhop-logo.png", type: "image/png" },
    ],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.metadata.locale,
    url: siteConfig.metadata.siteUrl,
    title: "AIMHOP Tech — We Build Your Digital Presence. You Grow Your Business.",
    description:
      "From websites and digital marketing to paid advertising and lead generation, AIMHOP Tech helps businesses choose the right digital solutions and manage them under one roof.",
    siteName: siteConfig.brand.name,
    images: [
      {
        url: "/slider-one.jpg",
        width: 1200,
        height: 630,
        alt: "AIMHOP Tech Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AIMHOP Tech — Your Digital Growth Partner",
    description:
      "From websites and digital marketing to paid advertising and lead generation, AIMHOP Tech helps businesses choose the right digital solutions and manage them under one roof.",
    images: ["/slider-one.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rich JSON-LD structured data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.metadata.siteUrl}#organization`,
        name: siteConfig.brand.name,
        legalName: siteConfig.brand.legalName,
        url: siteConfig.metadata.siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.metadata.siteUrl}/aimhop-logo.png`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteConfig.contact.whatsappDisplayNumber,
          contactType: "customer service",
          email: siteConfig.contact.email,
          availableLanguage: ["English", "Hindi"],
        },
        sameAs: [
          siteConfig.social.linkedin,
          siteConfig.social.twitter,
          siteConfig.social.instagram,
          siteConfig.social.facebook,
        ].filter(Boolean),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.metadata.siteUrl}#service`,
        name: siteConfig.brand.name,
        legalName: siteConfig.brand.legalName,
        description: siteConfig.brand.supportingText,
        url: siteConfig.metadata.siteUrl,
        telephone: siteConfig.contact.whatsappDisplayNumber,
        email: siteConfig.contact.email,
        openingHours: "Mo-Sa 09:30-19:00",
        priceRange: "$$",
        areaServed: "Worldwide",
        serviceType: [
          "Website Development",
          "Paid Advertising Management",
          "Search Engine Optimization",
          "Social Media Marketing",
          "Lead Generation Strategy",
          "E-Commerce Development",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#261C19]" suppressHydrationWarning>
        <script
          id="schema-org-jsonld"
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NetworkStatusBanner />
        <PagePreloader />
        {children}
      </body>
    </html>
  );
}
