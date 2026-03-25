import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "mail.samuikids.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "hello@samuikids.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: '"Samui Kids Contact" <hello@samuikids.com>',
      to: "hello@samuikids.com",
      replyTo: email,
      subject: subject
        ? `[SamuiKids] ${subject}`
        : `[SamuiKids] New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#0891b2;margin-bottom:4px;">New Contact Form Submission</h2>
          <p style="color:#6b7280;font-size:14px;margin-top:0;">SamuiKids.com Contact Form</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-weight:700;color:#374151;width:100px;">Name</td>
              <td style="padding:8px 0;color:#111827;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-weight:700;color:#374151;">Email</td>
              <td style="padding:8px 0;color:#111827;"><a href="mailto:${email}" style="color:#0891b2;">${email}</a></td>
            </tr>
            ${subject ? `<tr>
              <td style="padding:8px 0;font-weight:700;color:#374151;">Subject</td>
              <td style="padding:8px 0;color:#111827;">${subject}</td>
            </tr>` : ""}
          </table>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />

          <h3 style="color:#374151;margin-bottom:8px;">Message</h3>
          <div style="background:#f9fafb;border-radius:8px;padding:16px;color:#374151;line-height:1.6;white-space:pre-wrap;">${message}</div>

          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#9ca3af;font-size:12px;">Sent via SamuiKids.com contact form · Reply directly to this email to respond to ${name}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
