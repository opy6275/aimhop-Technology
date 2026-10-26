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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryPayload;

    const { fullName, phone, email, businessName, serviceCategory, projectGoal } = body;

    // Validate essential fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Client name is required." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Mobile/WhatsApp number is required." },
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
        warning: "GMAIL_APP_PASSWORD not set in .env.local",
        message: "Enquiry received successfully! (Email dispatch pending SMTP credentials configuration).",
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

    const cleanPhone = phone.replace(/[^\d+]/g, "");
    const waPhone = cleanPhone.startsWith("+") ? cleanPhone.slice(1) : cleanPhone;
    const submissionDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

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
            <h2 class="title">New Lead: ${fullName}</h2>

            <div class="card">
              <div class="field-row">
                <span class="label">Client Name:</span>
                <span class="value"><strong>${fullName}</strong></span>
              </div>
              <div class="field-row">
                <span class="label">Mobile Number:</span>
                <span class="value"><a href="tel:${cleanPhone}" style="color: #0284c7; text-decoration: none;"><strong>${phone}</strong></a></span>
              </div>
              ${
                email && email.trim()
                  ? `
              <div class="field-row">
                <span class="label">Email Address:</span>
                <span class="value"><a href="mailto:${email.trim()}" style="color: #0284c7; text-decoration: none;">${email.trim()}</a></span>
              </div>`
                  : ""
              }
              ${
                businessName && businessName.trim()
                  ? `
              <div class="field-row">
                <span class="label">Business / Brand:</span>
                <span class="value">${businessName.trim()}</span>
              </div>`
                  : ""
              }
              <div class="field-row">
                <span class="label">Requested Service:</span>
                <span class="value" style="color: #0284c7; font-weight: 700;">${serviceCategory}</span>
              </div>
              ${
                projectGoal && projectGoal.trim()
                  ? `
              <div class="field-row" style="flex-direction: column; gap: 6px;">
                <span class="label">Project Details / Message:</span>
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${projectGoal.trim()}</div>
              </div>`
                  : ""
              }
              <div class="field-row">
                <span class="label">Received At:</span>
                <span class="value" style="font-size: 12px; color: #64748b;">${submissionDate}</span>
              </div>
            </div>

            <div class="actions">
              <a href="https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${fullName}, thank you for contacting AIMhOP Technology regarding ${serviceCategory}. We are glad to assist you.`)}" class="btn btn-wa" target="_blank">Chat on WhatsApp</a>
              <a href="tel:${cleanPhone}" class="btn btn-call">Call Client</a>
              ${email && email.trim() ? `<a href="mailto:${email.trim()}" class="btn btn-mail">Reply via Email</a>` : ""}
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
      subject: `🔥 New Lead: ${fullName} - ${serviceCategory}`,
      html: htmlContent,
      text: `New Enquiry from ${fullName}\nPhone: ${phone}\nEmail: ${email || "N/A"}\nBusiness: ${businessName || "N/A"}\nService: ${serviceCategory}\nRequirements: ${projectGoal || "N/A"}\nDate: ${submissionDate}`,
    });

    return NextResponse.json({
      success: true,
      emailSent: true,
      message: "Enquiry submitted successfully and email notification sent to your inbox!",
    });
  } catch (error: unknown) {
    console.error("[AIMhOP Enquiry API Error]:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: "Failed to send email notification.", details: errorMessage },
      { status: 500 }
    );
  }
}
