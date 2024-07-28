import { Resend } from 'resend';

const domain = process.env.NEXT_PUBLIC_APP_URL;

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA CODE!',
    html: `<p>Your 2FA CODE: ${token}.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmlink = `${domain}/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Confirm Your Email!',
    html: `<p>Click <a href="${confirmlink}">here</a> to confirm email.</p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetlink = `${domain}/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'reset your password!',
    html: `<p>Click <a href="${resetlink}">here</a> to reset password.</p>`,
  });
};
