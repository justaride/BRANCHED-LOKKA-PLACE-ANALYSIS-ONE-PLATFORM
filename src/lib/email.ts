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

export type EmailResult = {
  success: boolean;
  errorType?: 'api-error' | 'network-error' | 'config-error';
};

export async function sendOTPEmail(
  to: string,
  code: string,
  tenantName: string
): Promise<EmailResult> {
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
      console.error('[OTP Email] Resend API error', {
        to,
        tenantName,
        errorName: error.name,
        errorMessage: error.message,
      });
      return { success: false, errorType: 'api-error' };
    }

    return { success: true };
  } catch (err) {
    console.error('[OTP Email] Network/config error', {
      to,
      tenantName,
      error: err instanceof Error ? err.message : String(err),
    });
    return { success: false, errorType: 'network-error' };
  }
}
