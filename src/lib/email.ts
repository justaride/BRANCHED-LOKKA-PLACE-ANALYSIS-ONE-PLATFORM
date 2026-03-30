import { Resend } from 'resend';

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is required');
  return new Resend(key);
}

export async function sendOTPEmail(email: string, code: string): Promise<void> {
  const resend = getResend();
  await resend.emails.send({
    from: 'Løkka Gårdeierforening <noreply@naturalstateproject.com>',
    to: email,
    subject: `Din innloggingskode: ${code}`,
    html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a;">Løkka Gårdeierforening</h2>
        <p>Din innloggingskode er:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p style="color: #666; font-size: 14px;">Koden er gyldig i 10 minutter.</p>
      </div>
    `,
  });
}
