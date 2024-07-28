'use server';
import { db } from '@/lib/db';
import { Favorite, Catch } from '@prisma/client';

export const addToFavorite = async (userId: string, catchId: string) => {
  if (!userId && !catchId) {
    return null;
  }

  try {
    // Check if the favorite already exists
    //if it exist we delete it.
    const existingFavorite = await db.favorite.findFirst({
      where: {
        userId,
        catchId,
      },
    });

    if (existingFavorite) {
      await db.favorite.delete({
        where: {
          catchId_userId: {
            catchId,
            userId,
          },
        },
      });
      return { deleted: 'removed from favorite' };
    }

    // Create a new favorite entry
    const favorite = await db.favorite.create({
      data: {
        userId,
        catchId,
      },
    });

    if (favorite) {
      return { sucess: 'added to favorite' };
    }
  } catch (error) {
    console.error('error adding favorite: ', error);
  }
};
