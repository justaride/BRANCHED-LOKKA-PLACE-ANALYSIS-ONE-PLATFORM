import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is required');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function sendOTPEmail(
  to: string,
  code: string,
  tenantName: string
): Promise<boolean> {
  const from = process.env.AUTH_FROM_EMAIL || 'noreply@naturalstate.no';

  try {
    const { error } = await getResend().emails.send({
      from: `Natural State <${from}>`,
      to,
      subject: `${code} - Din innloggingskode for ${tenantName}`,
      text: [
        `Hei,`,
        ``,
        `Din innloggingskode for ${tenantName} er: ${code}`,
        ``,
        `Koden er gyldig i 5 minutter.`,
        ``,
        `Hvis du ikke ba om denne koden, kan du trygt ignorere denne e-posten.`,
        ``,
        `Med vennlig hilsen,`,
        `Natural State`,
      ].join('\n'),
    });

    if (error) {
      console.error('Failed to send OTP email:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error sending OTP email:', err);
    return false;
  }
}
