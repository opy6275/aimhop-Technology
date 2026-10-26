/**
 * AIMHOP Tech - Central Site Configuration
 * 
 * IMPORTANT CONFIGURATION INSTRUCTIONS:
 * 1. WHATSAPP_NUMBER:
 *    - To activate live WhatsApp enquiries, replace the placeholder below with your real
 *      business WhatsApp number in international format (Country code + phone number,
 *      without the '+' sign, dashes, or spaces).
 *    - Example for India (+91 98765 43210): "919876543210"
 *    - Example for US (+1 202 555 0123): "12025550123"
 *    - Current default: "91XXXXXXXXXX" (Identified as demo/unconfigured mode).
 * 
 * 2. CONTACT DETAILS:
 *    - Update the email, operational location, and social links to match your registered business profiles.
 */

export interface SiteConfig {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    headline: string;
    supportingText: string;
    foundedYear: string;
  };
  contact: {
    /**
     * International format without '+' or spaces, e.g. "919876543210"
     * Use "91XXXXXXXXXX" when pending actual business number.
     */
    whatsappNumber: string;
    whatsappDisplayNumber: string;
    email: string;
    secondaryEmail?: string;
    location: string;
    hours: string;
    serviceAvailability: string;
  };
  social: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    github?: string;
  };
  metadata: {
    siteUrl: string;
    locale: string;
    themeColor: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "AIMHOP Tech",
    legalName: "AIMHOP Tech Solutions",
    tagline: "Your Digital Growth Partner",
    headline: "We Build Your Digital Presence. You Grow Your Business.",
    supportingText:
      "From websites and digital marketing to paid advertising and lead generation, AIMHOP Tech helps businesses choose the right digital solutions and manage them under one roof.",
    foundedYear: "2024",
  },
  contact: {
    // Reads from environment variables (NEXT_PUBLIC_*) securely:
    whatsappNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "919129680681",
    whatsappDisplayNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY?.trim() || "+91 91296 80681",
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "aimhoptechnology@gmail.com",
    secondaryEmail: "aimhoptechnology@gmail.com",
    location:
      process.env.NEXT_PUBLIC_LOCATION?.trim() ||
      "AIMHOP Security Solution Pvt. Ltd., Behind Ashoka Gas Godam, Singhariya, Gorakhpur - 273008, Uttar Pradesh",
    hours: "Monday – Saturday, 9:30 AM – 7:00 PM IST",
    serviceAvailability: "Serving Businesses Across India & Worldwide",
  },
  social: {
    linkedin: "https://linkedin.com/company/aimhop-tech",
    twitter: "https://x.com/aimhoptech",
    instagram: "https://instagram.com/aimhoptech",
    facebook: "https://facebook.com/aimhoptech",
  },
  metadata: {
    siteUrl: "https://aimhoptech.com",
    locale: "en_US",
    themeColor: "#FAFAFC",
  },
};

/**
 * Checks whether the WhatsApp number has been populated with a real number
 * instead of the initial placeholder "91XXXXXXXXXX".
 */
export function isWhatsAppConfigured(): boolean {
  const num = siteConfig.contact.whatsappNumber.trim();
  if (!num) return false;
  if (num === "91XXXXXXXXXX" || num.includes("X") || num.includes("x")) {
    return false;
  }
  // Validate that it consists of digits only and is between 10 to 15 digits
  return /^\d{10,15}$/.test(num);
}

/**
 * Helper to build an official WhatsApp click-to-chat URL with encoded message
 */
export function buildWhatsAppUrl(message: string): { url: string; isConfigured: boolean } {
  const configured = isWhatsAppConfigured();
  if (!configured) {
    return {
      url: "",
      isConfigured: false,
    };
  }

  const encodedMessage = encodeURIComponent(message);
  return {
    url: `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodedMessage}`,
    isConfigured: true,
  };
}
