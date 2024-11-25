import { Resend } from 'resend';
import { siteConfig } from '../../config/site';
import type { EmailOTPType } from '../auth.types';

const resend = new Resend(process.env.RESEND_API_KEY);

export namespace EmailService {
  export async function sendOTP(
    email: string,
    otp: string,
    type: EmailOTPType,
  ) {
    const subject =
      type === 'sign-in' ? 'Your sign-in code' : 'Verify your email address';

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; color: #09090B;">
        <h1 style="margin-bottom: 24px; font-size: 24px; font-weight: 600;">${subject}</h1>
        <p style="margin-bottom: 32px; color: #71717A;">Your verification code is:</p>
        <div style="font-size: 36px; font-weight: 700; letter-spacing: 0.1em; background-color: #F4F4F5; padding: 16px; border-radius: 8px; margin-bottom: 32px;">
          ${otp}
        </div>
        <p style="color: #71717A; font-size: 14px;">This code will expire in 5 minutes.</p>
      </div>
    `;

    return sendEmail({
      to: [email],
      subject,
      html,
    });
  }

  export async function sendEmail({
    to,
    subject,
    html,
    from = `${siteConfig.name} <${siteConfig.noReplyEmail}>`,
  }: {
    to: string[];
    subject: string;
    html: string;
    from?: string;
  }) {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    if (error) {
      throw error;
    }
    return data;
  }
}
