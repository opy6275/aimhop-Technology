export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Services" | "Pricing" | "Process" | "Support";
}

export const faqsData: FAQItem[] = [
  {
    id: "services-offered",
    question: "What core digital and software services does AIMHOP Tech provide?",
    answer:
      "We provide complete digital presence and software solutions under one roof. Our primary services include Custom Website Development (Corporate, E-Commerce, and Portals), Specialized Software (Billing & POS, School/Coaching ERP, Hospital OPD Management), Mobile App Development (Android & iOS), Graphic Designing (Brand kits, social media creatives, hoardings), and Google Business SEO ranking.",
    category: "Services",
  },
  {
    id: "project-delivery-timeline",
    question: "How much time does it take to deliver a website or software?",
    answer:
      "Standard business websites are delivered within 3 to 7 working days. Custom software solutions such as Billing ERPs or School Management Portals typically take 1 to 2 weeks depending on features. Before starting, we provide a mutually agreed delivery schedule and ensure complete testing before handover.",
    category: "Process",
  },
  {
    id: "payment-terms",
    question: "What are your payment terms? Do I have to pay the full amount upfront?",
    answer:
      "No. We never ask for 100% upfront payment. Projects are structured in safe, milestone-based installments: an initial booking token for domain/server allocation, a milestone payment after design approval, and the final balance only after the complete project is tested, verified, and handed over to your satisfaction.",
    category: "Pricing",
  },
  {
    id: "hidden-charges",
    question: "Are there any hidden costs or unexpected renewals later?",
    answer:
      "Absolutely not. We provide a transparent, itemized quotation before starting work, clearly specifying what is included (domain, hosting, licenses, maintenance). There are zero surprise costs or arbitrary billing surprises during or after delivery.",
    category: "Pricing",
  },
  {
    id: "maintenance-support",
    question: "What kind of technical support do you provide after project delivery?",
    answer:
      "Every project comes with 1 Year of Free Technical Support & Maintenance. If your website slows down, encounters bugs, or requires critical updates, our team resolves it promptly. You get direct access to our technical leads via phone call and WhatsApp—no robotic ticketing queues.",
    category: "Support",
  },
  {
    id: "training-and-staff",
    question: "Will you provide operational training to our staff who may not be tech-savvy?",
    answer:
      "Yes. Our billing systems and software dashboards are designed with simple, intuitive interfaces in both Hindi and English. Additionally, our team provides step-by-step hands-on training (via AnyDesk/screen sharing or on-site in regional areas) until your staff is completely comfortable operating it.",
    category: "Support",
  },
  {
    id: "domain-hosting-ownership",
    question: "Who owns the domain, hosting, and project source code after launch?",
    answer:
      "You hold 100% complete ownership of your domain, hosting, business data, and software. Everything is registered under your business name and email address. Upon final delivery, all master credentials and access rights are handed over directly to you.",
    category: "Process",
  },
  {
    id: "free-demo",
    question: "Can I test or see a live demo of the software before committing?",
    answer:
      "Yes, absolutely. We offer a Free 10-Minute Live Demo for all our ready-made solutions, including School ERP, Clinic Management, and Retail POS systems. You can connect with us directly via WhatsApp or phone to inspect the workflow without any advance payment or commitment.",
    category: "Services",
  },
];
