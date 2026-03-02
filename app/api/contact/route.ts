import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getBaseUrl } from "@/lib/seo";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT) || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
/** Alıcı e-posta (form mesajlarının gideceği adres). Boşsa SMTP_USER kullanılır. */
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || SMTP_USER;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

/** Formu dolduran kişiye giden otomatik yanıt e-postası metinleri */
const AUTO_REPLY: Record<string, { subject: string; greeting: string; body: string; closing: string }> = {
  tr: {
    subject: "Asialux - Mesajınız Alındı",
    greeting: "Merhaba",
    body: "İletişim formu üzerinden gönderdiğiniz mesajınız tarafımıza ulaşmıştır. Talebiniz en kısa sürede değerlendirilecek ve size dönüş yapılacaktır.",
    closing: "Saygılarımızla,\nAsialux Lighting Design",
  },
  en: {
    subject: "Asialux - Your Message Has Been Received",
    greeting: "Hello",
    body: "We have received your message submitted through our contact form. Your request will be reviewed as soon as possible and we will get back to you.",
    closing: "Best regards,\nAsialux Lighting Design",
  },
  ar: {
    subject: "أسيا لوكس - تم استلام رسالتك",
    greeting: "مرحباً",
    body: "لقد استلمنا رسالتك المرسلة عبر نموذج الاتصال. سيتم مراجعة طلبك في أقرب وقت وسنتواصل معك.",
    closing: "مع أطيب التحيات،\nأسيا لوكس للتصميم الإضاءة",
  },
  de: {
    subject: "Asialux - Ihre Nachricht wurde empfangen",
    greeting: "Hallo",
    body: "Wir haben Ihre über das Kontaktformular gesendete Nachricht erhalten. Ihre Anfrage wird so schnell wie möglich bearbeitet und wir werden uns bei Ihnen melden.",
    closing: "Mit freundlichen Grüßen,\nAsialux Lighting Design",
  },
  ru: {
    subject: "Asialux - Ваше сообщение получено",
    greeting: "Здравствуйте",
    body: "Мы получили ваше сообщение, отправленное через форму обратной связи. Ваш запрос будет рассмотрен в ближайшее время, и мы свяжемся с вами.",
    closing: "С уважением,\nAsialux Lighting Design",
  },
};

async function verifyRecaptcha(token: string): Promise<boolean> {
  if (!RECAPTCHA_SECRET_KEY) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      }),
    });
    const data = await res.json();
    return data.success === true && (data.score ?? 0) >= 0.5;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { success: false, message: "SMTP ayarları eksik." },
      { status: 500 }
    );
  }

  let body: { name?: string; email?: string; phone?: string; message?: string; locale?: string; recaptchaToken?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Geçersiz istek." },
      { status: 400 }
    );
  }

  const { name, email, phone, message, locale = "tr", recaptchaToken } = body;
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { success: false, message: "Ad, e-posta ve mesaj zorunludur." },
      { status: 400 }
    );
  }

  if (RECAPTCHA_SECRET_KEY) {
    if (!recaptchaToken?.trim()) {
      return NextResponse.json(
        { success: false, message: "Güvenlik doğrulaması eksik. Lütfen sayfayı yenileyip tekrar deneyin." },
        { status: 400 }
      );
    }
    const verified = await verifyRecaptcha(recaptchaToken);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: "Güvenlik doğrulaması başarısız. Lütfen tekrar deneyin." },
        { status: 400 }
      );
    }
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

  const autoReply = AUTO_REPLY[locale] ?? AUTO_REPLY.tr;
  const baseUrl = getBaseUrl();
  const autoReplyText = [
    `${autoReply.greeting} ${name.trim()},`,
    "",
    autoReply.body,
    "",
    "—",
    autoReply.closing,
    "",
    "Asialux Lighting Design",
    baseUrl,
    "bilgi@asialux.com.tr | +90 212 244 06 05",
  ].join("\n");

  const autoReplyHtml = `
    <p>${autoReply.greeting} ${escapeHtml(name.trim())},</p>
    <p>${autoReply.body.replace(/\n/g, "<br>")}</p>
    <p>—</p>
    <p>${autoReply.closing.replace(/\n/g, "<br>")}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
    <p style="color:#666;font-size:14px">
      <strong>Asialux Lighting Design</strong><br />
      <a href="${escapeHtml(baseUrl)}">${escapeHtml(baseUrl.replace(/^https?:\/\//, ""))}</a><br />
      bilgi@asialux.com.tr | +90 212 244 06 05
    </p>
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

    await transporter.sendMail({
      from: `"Asialux" <${SMTP_USER}>`,
      to: email.trim(),
      subject: autoReply.subject,
      text: autoReplyText,
      html: autoReplyHtml,
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
