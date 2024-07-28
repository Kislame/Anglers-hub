'use server';
import * as z from 'zod';
import { NewPasswordSchema } from '@/schemas';
import { getResetPasswordTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'missing token' };
  }

  const validatedFeilds = NewPasswordSchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      error: 'invalid field',
    };
  }

  const { password } = validatedFeilds.data;

  const exisitingToken = await getResetPasswordTokenByToken(token);
  if (!exisitingToken) {
    return { error: 'invalid token' };
  }

  const hasExpired = new Date(exisitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'token has expired' };
  }

  const existinUser = await getUserByEmail(exisitingToken.email);

  if (!existinUser) {
    return { error: 'email does not exist' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existinUser.id,
    },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: exisitingToken.id },
  });

  return { success: 'password updated' };
};
