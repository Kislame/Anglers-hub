'use server';

import { db } from '@/lib/db';

export const deletePost = async (catchId: string) => {
  try {
    await db.catch.delete({
      where: { id: catchId },
    });
    return { success: 'Catch post deleted successfully' };
  } catch (error) {
    console.error('Error deleting catch post:', error);
    return { error: 'Failed to delete catch post' };
  }
};
