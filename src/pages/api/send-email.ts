export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

const blockedDomains = ['example.com', 'test.com', 'spam.com', 'fake.com', 'tempmail.com', 'mailinator.com'];
const defaultContactRecipient = 'contact@canopryx.com';

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.email("Invalid email address").max(100, "Email is too long").refine((val) => {
    const domain = val.split('@')[1]?.toLowerCase();
    return Boolean(domain && !blockedDomains.includes(domain));
  }, "Please use a valid email address. Dummy domains are not permitted."),
  subject: z.string().trim().max(150, "Subject is too long").refine(
    (value) => !/[\r\n]/.test(value),
    "Subject contains invalid characters",
  ).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message is too long"),
  website: z.string().max(0).optional(),
});

const jsonResponse = (body: Record<string, unknown>, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderContactEmail({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return `
    <div style="margin:0;padding:32px 18px;background-color:#f7faf5;background-image:radial-gradient(circle at top left, rgba(107,198,142,0.18), transparent 28%),linear-gradient(180deg, #f7faf5 0%, #edf5ed 100%);color:#102418;">
      <div style="max-width:720px;margin:0 auto;">
        <div style="margin-bottom:16px;">
          <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:#e7f6ec;border:1px solid rgba(29,124,73,0.14);font:700 11px/1 'Outfit','Plus Jakarta Sans',Arial,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#1d7c49;">
            Canopryx Contact Form
          </div>
        </div>

        <div style="background:#ffffff;border:1px solid rgba(16,36,24,0.08);border-radius:28px;box-shadow:0 14px 36px rgba(18,48,31,0.08);overflow:hidden;">
          <div style="padding:28px 28px 22px;background:linear-gradient(135deg, #102418 0%, #105233 62%, #1d7c49 100%);">
            <div style="font:700 14px/1.2 'Outfit','Plus Jakarta Sans',Arial,sans-serif;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.72);margin-bottom:12px;">
              New Inquiry
            </div>
            <h1 style="margin:0;font:700 32px/1.1 'Outfit','Plus Jakarta Sans',Arial,sans-serif;color:#ffffff;">
              New contact form submission
            </h1>
            <p style="margin:12px 0 0;font:500 15px/1.7 'Plus Jakarta Sans',Arial,sans-serif;color:rgba(255,255,255,0.82);">
              A visitor submitted the website contact form. Details are below.
            </p>
          </div>

          <div style="padding:28px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;margin:0 0 24px;">
              <tr>
                <td style="width:33.33%;padding:0 12px 12px 0;vertical-align:top;">
                  <div style="padding:16px 18px;background:#f7faf5;border:1px solid rgba(16,36,24,0.08);border-radius:18px;">
                    <div style="font:700 11px/1 'Outfit','Plus Jakarta Sans',Arial,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#365243;margin-bottom:10px;">Name</div>
                    <div style="font:600 16px/1.5 'Plus Jakarta Sans',Arial,sans-serif;color:#102418;">${name}</div>
                  </div>
                </td>
                <td style="width:33.33%;padding:0 12px 12px 0;vertical-align:top;">
                  <div style="padding:16px 18px;background:#f7faf5;border:1px solid rgba(16,36,24,0.08);border-radius:18px;">
                    <div style="font:700 11px/1 'Outfit','Plus Jakarta Sans',Arial,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#365243;margin-bottom:10px;">Email</div>
                    <div style="font:600 16px/1.5 'Plus Jakarta Sans',Arial,sans-serif;color:#102418;word-break:break-word;">
                      <a href="mailto:${email}" style="color:#1d7c49;text-decoration:none;">${email}</a>
                    </div>
                  </div>
                </td>
                <td style="width:33.33%;padding:0 0 12px;vertical-align:top;">
                  <div style="padding:16px 18px;background:#f7faf5;border:1px solid rgba(16,36,24,0.08);border-radius:18px;">
                    <div style="font:700 11px/1 'Outfit','Plus Jakarta Sans',Arial,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#365243;margin-bottom:10px;">Subject</div>
                    <div style="font:600 16px/1.5 'Plus Jakarta Sans',Arial,sans-serif;color:#102418;">${subject}</div>
                  </div>
                </td>
              </tr>
            </table>

            <div style="padding:22px 22px 24px;background:linear-gradient(180deg, rgba(247,250,245,0.94) 0%, rgba(237,245,237,0.94) 100%);border:1px solid rgba(16,36,24,0.08);border-radius:22px;">
              <div style="font:700 11px/1 'Outfit','Plus Jakarta Sans',Arial,sans-serif;letter-spacing:0.16em;text-transform:uppercase;color:#365243;margin-bottom:14px;">Message</div>
              <div style="font:500 16px/1.8 'Plus Jakarta Sans',Arial,sans-serif;color:#102418;white-space:pre-wrap;">${message}</div>
            </div>

            <div style="margin-top:22px;padding-top:18px;border-top:1px solid rgba(16,36,24,0.08);font:500 13px/1.7 'Plus Jakarta Sans',Arial,sans-serif;color:#365243;">
              Reply directly to this email to continue the conversation with the sender.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  const apiKey = (typeof process !== 'undefined' ? process.env.RESEND_API_KEY : undefined) || import.meta.env.RESEND_API_KEY;
  const contactRecipient =
    (typeof process !== 'undefined' ? process.env.CONTACT_TO_EMAIL : undefined) ||
    import.meta.env.CONTACT_TO_EMAIL ||
    defaultContactRecipient;
  const contactSender =
    (typeof process !== 'undefined' ? process.env.CONTACT_FROM_EMAIL : undefined) ||
    import.meta.env.CONTACT_FROM_EMAIL ||
    'Canopryx Contact Form <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('Contact email service is not configured.');
    return jsonResponse({ error: 'Email service is temporarily unavailable.' }, 503);
  }

  try {
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > 12_000) {
      return jsonResponse({ error: 'Request is too large.' }, 413);
    }

    const rawData: unknown = await request.json();

    if (
      typeof rawData === 'object' &&
      rawData !== null &&
      'website' in rawData &&
      typeof rawData.website === 'string' &&
      rawData.website.length > 0
    ) {
      return jsonResponse({ success: true }, 200);
    }

    const parsed = contactSchema.safeParse(rawData);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map(i => i.message).join(", ");
      return jsonResponse({ error: errorMsg }, 400);
    }

    const { name, email, subject, message } = parsed.data;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = subject ? escapeHtml(subject) : 'N/A';
    const safeMessage = escapeHtml(message);

    const resend = new Resend(apiKey);
    const { data: resendData, error } = await resend.emails.send({
      from: contactSender,
      to: [contactRecipient],
      replyTo: email,
      subject: `New Contact Request: ${subject || 'No Subject'}`,
      html: renderContactEmail({
        name: safeName,
        email: safeEmail,
        subject: safeSubject,
        message: safeMessage,
      }),
    });

    if (error) {
      console.error('Resend Error:', error);
      return jsonResponse({ error: 'We could not send your message. Please try again.' }, 502);
    }

    return jsonResponse({ success: true, id: resendData?.id }, 200);
  } catch (error: unknown) {
    console.error('Contact API error:', error);
    return jsonResponse({ error: 'Unable to process your request.' }, 500);
  }
};
