import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EnquiryPayload {
  fullName: string;
  phone: string;
  email?: string;
  businessName?: string;
  serviceCategory: string;
  projectGoal?: string;
}

// In-memory rate limiter: maximum 5 requests per 10 minutes per IP
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean expired record
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a few minutes before submitting another enquiry.",
        },
        { status: 429 }
      );
    }

    // 2. Safe JSON Parsing
    let body: EnquiryPayload;
    try {
      body = (await request.json()) as EnquiryPayload;
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON body provided." },
        { status: 400 }
      );
    }

    const { fullName, phone, email, businessName, serviceCategory, projectGoal } = body;

    // 3. Strict Input Validation
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Client name is required." },
        { status: 400 }
      );
    }

    if (fullName.trim().length > 100) {
      return NextResponse.json(
        { success: false, error: "Client name must not exceed 100 characters." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Mobile / WhatsApp number is required." },
        { status: 400 }
      );
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const cleanDigits = cleanPhone.replace(/\D/g, "");
    if (cleanDigits.length < 8 || cleanDigits.length > 15) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number (8 to 15 digits)." },
        { status: 400 }
      );
    }

    if (!serviceCategory || typeof serviceCategory !== "string" || !serviceCategory.trim()) {
      return NextResponse.json(
        { success: false, error: "Service category selection is required." },
        { status: 400 }
      );
    }

    if (email && typeof email === "string" && email.trim()) {
      if (!EMAIL_REGEX.test(email.trim())) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    if (projectGoal && typeof projectGoal === "string" && projectGoal.length > 4000) {
      return NextResponse.json(
        { success: false, error: "Project details must not exceed 4000 characters." },
        { status: 400 }
      );
    }

    const recipientEmail =
      process.env.NOTIFICATION_EMAIL ||
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
      "aimhoptechnology@gmail.com";

    const gmailUser = process.env.GMAIL_USER || "aimhoptechnology@gmail.com";
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.trim();

    // Check if Gmail SMTP is configured
    if (!gmailAppPassword) {
      console.warn(
        "[AIMhOP API] GMAIL_APP_PASSWORD is not configured in environment variables. Form received successfully, but email dispatch skipped."
      );

      return NextResponse.json({
        success: true,
        emailSent: false,
        message: "Enquiry received successfully! Our team will reach out via WhatsApp.",
      });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const waPhone = cleanPhone.startsWith("+") ? cleanPhone.slice(1) : cleanPhone;
    const submissionDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Sanitized values for HTML email interpolation (Prevents HTML Injection / XSS)
    const safeFullName = escapeHtml(fullName.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeCleanPhone = escapeHtml(cleanPhone);
    const safeEmail = email && email.trim() ? escapeHtml(email.trim()) : "";
    const safeBusinessName = businessName && businessName.trim() ? escapeHtml(businessName.trim()) : "";
    const safeServiceCategory = escapeHtml(serviceCategory.trim());
    const safeProjectGoal = projectGoal && projectGoal.trim() ? escapeHtml(projectGoal.trim()) : "";

    // Elegant HTML Email Template for AIMhOP Technology
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
          .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: linear-gradient(135deg, #091322 0%, #0d233a 100%); padding: 32px 28px; text-align: left; border-bottom: 3px solid #00f2fe; }
          .logo-text { color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; margin: 0 0 6px 0; }
          .tagline { color: #94a3b8; font-size: 13px; margin: 0; }
          .content { padding: 32px 28px; }
          .alert-badge { display: inline-block; background-color: #ecfdf5; color: #059669; font-weight: 700; font-size: 12px; padding: 6px 14px; border-radius: 9999px; border: 1px solid #a7f3d0; margin-bottom: 20px; }
          .title { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 20px 0; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px; }
          .field-row { display: flex; padding: 8px 0; border-bottom: 1px dashed #e2e8f0; }
          .field-row:last-child { border-bottom: none; }
          .label { width: 140px; font-size: 13px; font-weight: 600; color: #64748b; }
          .value { font-size: 14px; font-weight: 500; color: #0f172a; flex: 1; word-break: break-word; }
          .actions { display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
          .btn { display: inline-block; padding: 12px 22px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 8px; text-align: center; }
          .btn-wa { background: #25D366; color: #ffffff; }
          .btn-call { background: #0284c7; color: #ffffff; }
          .btn-mail { background: #334155; color: #ffffff; }
          .footer { background: #f8fafc; padding: 20px 28px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo-text">AIMhOP <span style="color: #38bdf8;">Technology</span></h1>
            <p class="tagline">New Client Consultation & Project Enquiry Notification</p>
          </div>
          <div class="content">
            <span class="alert-badge">⚡ Instant Website Enquiry</span>
            <h2 class="title">New Lead: ${safeFullName}</h2>

            <div class="card">
              <div class="field-row">
                <span class="label">Client Name:</span>
                <span class="value"><strong>${safeFullName}</strong></span>
              </div>
              <div class="field-row">
                <span class="label">Mobile Number:</span>
                <span class="value"><a href="tel:${safeCleanPhone}" style="color: #0284c7; text-decoration: none;"><strong>${safePhone}</strong></a></span>
              </div>
              ${
                safeEmail
                  ? `
              <div class="field-row">
                <span class="label">Email Address:</span>
                <span class="value"><a href="mailto:${safeEmail}" style="color: #0284c7; text-decoration: none;">${safeEmail}</a></span>
              </div>`
                  : ""
              }
              ${
                safeBusinessName
                  ? `
              <div class="field-row">
                <span class="label">Business / Brand:</span>
                <span class="value">${safeBusinessName}</span>
              </div>`
                  : ""
              }
              <div class="field-row">
                <span class="label">Requested Service:</span>
                <span class="value" style="color: #0284c7; font-weight: 700;">${safeServiceCategory}</span>
              </div>
              ${
                safeProjectGoal
                  ? `
              <div class="field-row" style="flex-direction: column; gap: 6px;">
                <span class="label">Project Details / Message:</span>
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${safeProjectGoal}</div>
              </div>`
                  : ""
              }
              <div class="field-row">
                <span class="label">Received At:</span>
                <span class="value" style="font-size: 12px; color: #64748b;">${submissionDate}</span>
              </div>
            </div>

            <div class="actions">
              <a href="https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${fullName.trim()}, thank you for contacting AIMhOP Technology regarding ${serviceCategory.trim()}. We are glad to assist you.`)}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>
              <a href="tel:${safeCleanPhone}" class="btn btn-call">Call Client</a>
              ${safeEmail ? `<a href="mailto:${safeEmail}" class="btn btn-mail">Reply via Email</a>` : ""}
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0;">This email was sent automatically from your website form at AIMhOP Technology.</p>
            <p style="margin: 4px 0 0 0;">AIMHOP Security Solution Pvt. Ltd. • Singhariya, Gorakhpur</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send Mail
    await transporter.sendMail({
      from: `"AIMhOP Website Enquiries" <${gmailUser}>`,
      to: recipientEmail,
      replyTo: email && email.trim() ? email.trim() : undefined,
      subject: `🔥 New Lead: ${fullName.trim()} - ${serviceCategory.trim()}`,
      html: htmlContent,
      text: `New Enquiry from ${fullName.trim()}\nPhone: ${phone.trim()}\nEmail: ${email?.trim() || "N/A"}\nBusiness: ${businessName?.trim() || "N/A"}\nService: ${serviceCategory.trim()}\nRequirements: ${projectGoal?.trim() || "N/A"}\nDate: ${submissionDate}`,
    });

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: "Enquiry submitted successfully and email notification sent to your inbox!",
    });
  } catch (error: unknown) {
    console.error("[AIMhOP Enquiry API Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process enquiry. Please try reaching out via WhatsApp." },
      { status: 500 }
    );
  }
}
