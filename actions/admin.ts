'use server';

import { UserRole } from '@prisma/client';

import { currentRole } from '@/lib/get-user-server';

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'allowed' };
  } else {
    return { error: 'not allowed' };
  }
};
