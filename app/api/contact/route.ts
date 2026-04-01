import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, subject, message, bizDetails } = await req.json();

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

    await resend.emails.send({
      from: "SamuiKids.com <hello@samuikids.com>",
      to: process.env.CONTACT_EMAIL ?? "hello@samuikids.com",
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

          ${bizDetails ? `
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;" />
          <h3 style="color:#f97316;margin-bottom:12px;">Business Listing Details</h3>
          <table style="width:100%;border-collapse:collapse;background:#fff7ed;border-radius:8px;padding:12px;">
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;width:160px;">Business Name</td><td style="padding:6px 12px;color:#111827;">${bizDetails.businessName}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Area</td><td style="padding:6px 12px;color:#111827;">${bizDetails.area || "Not specified"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Website</td><td style="padding:6px 12px;color:#111827;">${bizDetails.website || "Not provided"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Age Range</td><td style="padding:6px 12px;color:#111827;">${bizDetails.ageRange || "Not specified"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">English Spoken</td><td style="padding:6px 12px;color:#111827;">${bizDetails.englishSpoken ? "Yes" : "No"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Session Types</td><td style="padding:6px 12px;color:#111827;">${bizDetails.sessionTypes || "Not specified"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Session Lengths</td><td style="padding:6px 12px;color:#111827;">${bizDetails.sessionLengths || "Not specified"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Food / Drinks</td><td style="padding:6px 12px;color:#111827;">${[bizDetails.hasFood && "Food", bizDetails.hasDrinks && "Drinks"].filter(Boolean).join(", ") || "None"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Drop-off</td><td style="padding:6px 12px;color:#111827;">${bizDetails.dropOff ? "Yes" : "No"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Member Offer</td><td style="padding:6px 12px;color:#111827;">${bizDetails.memberOffer || "Not specified"}</td></tr>
            <tr><td style="padding:6px 12px;font-weight:700;color:#374151;">Legally Registered</td><td style="padding:6px 12px;color:${bizDetails.legallyRegistered ? "#059669" : "#dc2626"};font-weight:700;">${bizDetails.legallyRegistered ? "YES - confirmed" : "NOT confirmed"}</td></tr>
          </table>
          ` : ""}
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
          <p style="color:#9ca3af;font-size:12px;">Sent via SamuiKids.com contact form. Reply directly to respond to ${name}</p>
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
