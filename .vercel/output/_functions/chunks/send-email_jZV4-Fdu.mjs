import { Resend } from 'resend';

const prerender = false;
const resend = new Resend(undefined                              );
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data;
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { data: resendData, error } = await resend.emails.send({
      // Resend provides a testing domain (onboarding@resend.dev) out of the box,
      // but to send to addresses other than your verified domain in production,
      // you will need to add a domain to Resend.
      from: "Olvara Contact Form <onboarding@resend.dev>",
      to: ["yaseenzaman1312@proton.me"],
      subject: `New Contact Request: ${subject || "No Subject"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    });
    if (error) {
      console.error("Resend Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true, data: resendData }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error("API Error:", e);
    return new Response(JSON.stringify({ error: e.message || "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
