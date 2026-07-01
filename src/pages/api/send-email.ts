export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

const blockedDomains = ['example.com', 'test.com', 'spam.com', 'fake.com', 'tempmail.com', 'mailinator.com'];
const personalEmailDomains = [
  'aol.com', 'gmail.com', 'googlemail.com', 'hotmail.com', 'icloud.com',
  'live.com', 'me.com', 'msn.com', 'outlook.com', 'proton.me',
  'protonmail.com', 'yahoo.com', 'ymail.com', 'zoho.com',
];
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

const workEmailSchema = z.email("Enter a valid work email address").max(100, "Email is too long").refine((value) => {
  const domain = value.split('@')[1]?.toLowerCase();
  return Boolean(domain && !blockedDomains.includes(domain) && !personalEmailDomains.includes(domain));
}, "Please use your organization email. Personal and disposable email addresses are not accepted.");

const earlyAccessSchema = z.object({
  formType: z.literal('early-access'),
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: workEmailSchema,
  organization: z.string().trim().min(1, "Organization is required").max(150, "Organization is too long"),
  role: z.string().trim().min(1, "Role is required").max(120, "Role is too long"),
  industry: z.enum(['Defense', 'Fintech', 'Healthcare', 'Government', 'Critical infrastructure', 'Enterprise technology', 'Other']),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '501-1,000', '1,001+']),
  secretsSetup: z.enum(['None / manual processes', 'Environment files', 'Cloud-provider secrets service', 'Third-party SaaS', 'Self-hosted solution', 'Mixed environment', 'Other']),
  protectionGoals: z.string().trim().min(1, "Protection goals are required").max(2000, "Protection goals are too long"),
  message: z.string().trim().max(2000, "Additional message is too long").optional(),
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
  return `<!doctype html>
  <html>
    <body style="margin:0;background:#f9fafb;color:#111827;">
      <div style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 16px;font:700 13px/1 Arial,sans-serif;letter-spacing:.15em;text-transform:uppercase;color:#ca8a04;">
              Canopryx / Contact
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border:1px solid #e5e7eb;border-top:4px solid #eab308;border-radius:6px;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:32px 32px 24px;border-bottom:1px solid #f3f4f6;">
                    <div style="margin-bottom:8px;font:700 11px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#6b7280;">New Message</div>
                    <h1 style="margin:0;font:600 22px/1.3 Arial,sans-serif;color:#111827;">${subject}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                      <tr>
                        <td style="width:100px;padding:20px 16px 20px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;font:700 11px/1.5 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">From</td>
                        <td style="padding:17px 0 20px;border-bottom:1px solid #f3f4f6;font:600 15px/1.6 Arial,sans-serif;color:#111827;">${name}</td>
                      </tr>
                      <tr>
                        <td style="width:100px;padding:20px 16px 20px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;font:700 11px/1.5 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">Email</td>
                        <td style="padding:17px 0 20px;border-bottom:1px solid #f3f4f6;font:500 15px/1.6 Arial,sans-serif;word-break:break-word;">
                          <a href="mailto:${email}" style="color:#ca8a04;text-decoration:none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px 34px;">
                    <div style="margin-bottom:12px;font:700 11px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">Message</div>
                    <div style="font:400 15px/1.75 Arial,sans-serif;color:#374151;white-space:pre-wrap;">${message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 2px 0;font:400 12px/1.6 Arial,sans-serif;color:#6b7280;">
              Reply directly to this email to respond.
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>`;
}

function renderEarlyAccessEmail({
  name, email, organization, role, industry, companySize, secretsSetup, protectionGoals, message,
}: {
  name: string; email: string; organization: string; role: string; industry: string;
  companySize: string; secretsSetup: string; protectionGoals: string; message: string;
}) {
  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="width:140px;padding:16px 16px 16px 0;border-bottom:1px solid #f3f4f6;vertical-align:top;font:700 11px/1.5 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">${label}</td>
      <td style="padding:14px 0 16px;border-bottom:1px solid #f3f4f6;font:500 14px/1.6 Arial,sans-serif;color:#111827;word-break:break-word;">${value}</td>
    </tr>`;

  return `<!doctype html>
  <html>
    <body style="margin:0;background:#f9fafb;color:#111827;">
      <div style="padding:40px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;border-collapse:collapse;">
          <tr>
            <td style="padding:0 0 16px;font:700 13px/1 Arial,sans-serif;letter-spacing:.15em;text-transform:uppercase;color:#9333ea;">
              Canopryx / Early Access
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;border:1px solid #e5e7eb;border-top:4px solid #a855f7;border-radius:6px;overflow:hidden;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:32px 32px 24px;border-bottom:1px solid #f3f4f6;">
                    <div style="margin-bottom:8px;font:700 11px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#6b7280;">New Request</div>
                    <h1 style="margin:0;font:600 22px/1.3 Arial,sans-serif;color:#111827;">${organization}</h1>
                    <p style="margin:8px 0 0;font:400 15px/1.6 Arial,sans-serif;color:#4b5563;">${name} wants to start a conversation about Canopryx.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 32px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                      ${detailRow('Applicant', name)}
                      ${detailRow('Work Email', `<a href="mailto:${email}" style="color:#9333ea;text-decoration:none;">${email}</a>`)}
                      ${detailRow('Role / Title', role)}
                      ${detailRow('Industry', industry)}
                      ${detailRow('Company Size', companySize)}
                      ${detailRow('Current Setup', secretsSetup)}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 32px;">
                    <div style="margin-bottom:12px;font:700 11px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">Protection Goals</div>
                    <div style="font:400 15px/1.75 Arial,sans-serif;color:#374151;white-space:pre-wrap;">${protectionGoals}</div>
                  </td>
                </tr>
                ${message ? `
                <tr>
                  <td style="padding:0 32px 34px;">
                    <div style="padding:20px;background:#f9fafb;border:1px solid #f3f4f6;border-radius:6px;">
                      <div style="margin-bottom:10px;font:700 11px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#9ca3af;">Additional Context</div>
                      <div style="font:400 14px/1.6 Arial,sans-serif;color:#4b5563;white-space:pre-wrap;">${message}</div>
                    </div>
                  </td>
                </tr>` : ''}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 2px 0;font:400 12px/1.6 Arial,sans-serif;color:#6b7280;">
              Reply directly to this email to contact the applicant.
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>`;
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

    const isEarlyAccess = typeof rawData === 'object' && rawData !== null && 'formType' in rawData && rawData.formType === 'early-access';
    const parsed = isEarlyAccess ? earlyAccessSchema.safeParse(rawData) : contactSchema.safeParse(rawData);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues.map(i => i.message).join(", ");
      return jsonResponse({ error: errorMsg }, 400);
    }

    const resend = new Resend(apiKey);
    const emailOptions = 'formType' in parsed.data
      ? {
          from: contactSender,
          to: [contactRecipient],
          replyTo: parsed.data.email,
          subject: `Early Access Request: ${parsed.data.organization}`,
          html: renderEarlyAccessEmail({
            name: escapeHtml(parsed.data.name),
            email: escapeHtml(parsed.data.email),
            organization: escapeHtml(parsed.data.organization),
            role: escapeHtml(parsed.data.role),
            industry: escapeHtml(parsed.data.industry),
            companySize: escapeHtml(parsed.data.companySize),
            secretsSetup: escapeHtml(parsed.data.secretsSetup),
            protectionGoals: escapeHtml(parsed.data.protectionGoals),
            message: parsed.data.message ? escapeHtml(parsed.data.message) : '',
          }),
        }
      : {
          from: contactSender,
          to: [contactRecipient],
          replyTo: parsed.data.email,
          subject: `New Contact Request: ${parsed.data.subject || 'No Subject'}`,
          html: renderContactEmail({
            name: escapeHtml(parsed.data.name),
            email: escapeHtml(parsed.data.email),
            subject: parsed.data.subject ? escapeHtml(parsed.data.subject) : 'N/A',
            message: escapeHtml(parsed.data.message),
          }),
        };
    const { data: resendData, error } = await resend.emails.send(emailOptions);

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
