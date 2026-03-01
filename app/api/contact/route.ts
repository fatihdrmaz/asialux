import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
/** Alıcı e-posta (form mesajlarının gideceği adres). Boşsa SMTP_USER kullanılır. */
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || SMTP_USER;

export async function POST(request: NextRequest) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { success: false, message: "SMTP ayarları eksik." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; phone?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Geçersiz istek." },
      { status: 400 }
    );
  }

  const { name, email, phone, message } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, message: "Ad, e-posta ve mesaj zorunludur." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const to = CONTACT_EMAIL || SMTP_USER;
  const text = [
    `Ad Soyad: ${name.trim()}`,
    `E-posta: ${email.trim()}`,
    phone?.trim() ? `Telefon: ${phone.trim()}` : "",
    "",
    "Mesaj:",
    message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <p><strong>Ad Soyad:</strong> ${escapeHtml(name.trim())}</p>
    <p><strong>E-posta:</strong> ${escapeHtml(email.trim())}</p>
    ${phone?.trim() ? `<p><strong>Telefon:</strong> ${escapeHtml(phone.trim())}</p>` : ""}
    <p><strong>Mesaj:</strong></p>
    <p>${escapeHtml(message.trim()).replace(/\n/g, "<br>")}</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Asialux İletişim" <${SMTP_USER}>`,
      to,
      replyTo: email.trim(),
      subject: `İletişim formu: ${name.trim()}`,
      text,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form SMTP error:", err);
    return NextResponse.json(
      { success: false, message: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
