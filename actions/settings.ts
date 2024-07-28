'use server';

import bcrypt from 'bcryptjs';

import { sendVerificationEmail } from '@/lib/mail';

import * as z from 'zod';

import { db } from '@/lib/db';
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/get-user-server';
import { SettingsSchema } from '@/schemas';
import { generateVerificationToken } from '@/data/tokens';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  console.log(values);
  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthroized' };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: 'Unauthroized' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email Already in use' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: 'Verfication email sent' };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return { error: 'incorrect password' };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;

    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated succesfully' };
};
