import crypto from 'crypto';
import { v4 as uuid } from 'uuid';
import { getVerificationTokenByEmail } from './verification-token';
import { db } from '@/lib/db';
import { getResetPasswordTokenByEmail } from './password-reset-token';
import { getTwoFactorTokenByEmail } from './two-factor-token';
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
  const exisitingToken = await getTwoFactorTokenByEmail(email);
  if (exisitingToken) {
    await db.twoFactorToken.delete({
      where: { id: exisitingToken.id },
    });
  }
  const twoFactorToken = await db.twoFactorToken.create({
    data: { email, token, expires },
  });
  return twoFactorToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getResetPasswordTokenByEmail(email);
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  //we check if already sent a verification token
  const exisitingToken = await getVerificationTokenByEmail(email);
  if (exisitingToken) {
    await db.verificationToken.delete({
      where: { id: exisitingToken.id },
    });
  }

  //if we have,  we can gonna remove it and generate a new one that
  // that expires an hour from now

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  return verificationToken;
};
