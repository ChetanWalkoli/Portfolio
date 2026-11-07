import { NextResponse } from "next/server";
import { site } from "@/data/site";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown; // Honeypot anti-spam field
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\0/g, "").slice(0, maxLength);
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const honeypot = sanitizeText(body.company, 100);
    if (honeypot.length > 0) {
      return NextResponse.json(
        { ok: true, message: "Message sent successfully!" },
        { status: 200 },
      );
    }

    const name = sanitizeText(body.name, 100);
    const email = sanitizeText(body.email, 160);
    const subject = sanitizeText(body.subject, 160);
    const message = sanitizeText(body.message, 4000);

    if (name.length < 2) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please enter your full name (at least 2 characters).",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (subject.length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please enter a subject for your message." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          error: "Please write a message of at least 10 characters.",
        },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();

    if (resendApiKey) {
      const fromAddress =
        process.env.RESEND_FROM_EMAIL?.trim() ||
        "Chetan Walkoli Portfolio <onboarding@resend.dev>";
      const toAddress =
        process.env.CONTACT_RECEIVER_EMAIL?.trim() || site.email;

      const htmlBody = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; line-height: 1.6;">
          <h2 style="margin-bottom: 16px;">New Portfolio Inquiry — ${escapeHtml(subject)}</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `;

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [toAddress],
          reply_to: email,
          subject: `[Portfolio Contact] ${subject} — from ${name}`,
          html: htmlBody,
        }),
      });

      if (!resendResponse.ok) {
        return NextResponse.json(
          {
            ok: false,
            error: `Unable to deliver email right now. Please reach out directly via ${site.email}.`,
          },
          { status: 502 },
        );
      }
    }

    return NextResponse.json(
      { ok: true, message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid request payload. Please check your inputs and try again.",
      },
      { status: 400 },
    );
  }
}
