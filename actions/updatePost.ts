'use server';

import * as z from 'zod';
import { UpdateCatchSchema } from '@/schemas';
import { getHumanReadableAddress } from '@/lib/getLocation';
import { currentUser } from '@/lib/get-user-server';
import { db } from '@/lib/db';
import { error } from 'console';

export const updatePost = async (values: z.infer<typeof UpdateCatchSchema>) => {
  const validatedFields = UpdateCatchSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'invalid fields!!' };
  }

  const {
    description,
    originalDescription,
    imageUrl,
    originalImageUrl,
    catchId,
    userId,
  } = validatedFields.data;
  console.log('new fields: ', validatedFields.data);

  const user = await currentUser();
  if (!user) {
    return { error: 'user not found!!' };
  }

  if (user.id !== userId) {
    return { error: 'user not found!!' };
  }

  const currentCatch = await db.catch.findUnique({
    where: { id: catchId },
    include: { tags: { include: { tag: true } } },
  });

  if (!currentCatch) {
    return { error: `Catch Post with ID ${catchId} not found` };
  }

  let updates: { description?: string; imageUrl?: string } = {};

  if (description !== originalDescription) updates.description = description;

  if (imageUrl !== originalImageUrl) updates.imageUrl = imageUrl;

  try {
    await db.catch.update({
      where: { id: catchId }, // Specify the catch post you want to update
      data: {
        ...updates, // Include only if updated
      },
    });
  } catch (error) {
    console.error('Error updating catch:', error);
    return { error: 'something went wrong' };
  }

  return { success: 'your catch was updated' };
};
