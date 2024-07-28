'use server';

import * as z from 'zod';
import { CatchSchema } from '@/schemas';
import { getHumanReadableAddress } from '@/lib/getLocation';
import { currentUser } from '@/lib/get-user-server';
import { db } from '@/lib/db';

export const post = async (values: z.infer<typeof CatchSchema>) => {
  const validatedFields = CatchSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'invalid fields!!' };
  }

  const { description, imageUrl, location, tags } = validatedFields.data;

  console.log(validatedFields.data);

  const user = await currentUser();

  if (!user) {
    return { error: 'Unauthroized' };
  }

  try {
    const [lat, lng] = values.location.split(',').map(Number);
    const address: string = await getHumanReadableAddress(lat, lng);

    await db.catch.create({
      data: {
        description: description,
        imageUrl: imageUrl,
        location: address,
        userId: user?.id as string, // Ensure you are passing the correct userId
        tags: {
          create: tags?.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.name },
                create: { name: tag.name },
              },
            },
          })),
        },
      },
    });
  } catch (error) {
    console.error('Error updating catch:', error);
    return { error: 'something went wrong' };
  }

  return { success: 'your catch was posted' };
};
