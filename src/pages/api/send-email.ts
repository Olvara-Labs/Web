export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  // Initialize Resend inside the request handler to ensure env vars are loaded.
  // We check both process.env (Vercel Node.js standard) and import.meta.env (Astro Dev Server).
  const apiKey = (typeof process !== 'undefined' ? process.env.RESEND_API_KEY : undefined) || import.meta.env.RESEND_API_KEY;
  const resend = new Resend(apiKey);

  try {
    const data = await request.json();
    const { name, email, subject, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Attempt to send email
    const { data: resendData, error } = await resend.emails.send({
      // Resend provides a testing domain (onboarding@resend.dev) out of the box,
      // but to send to addresses other than your verified domain in production,
      // you will need to add a domain to Resend.
      from: 'Olvara Contact Form <olvaralabs@proton.me>',
      to: ['yaseenzaman1312@proton.me'],
      subject: `New Contact Request: ${subject || 'No Subject'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    console.error('API Error:', e);
    return new Response(JSON.stringify({ error: e.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
