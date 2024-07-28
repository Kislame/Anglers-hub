import { CatchResponse } from '@/types/responses';
import { db } from '@/lib/db';
import getFormattedDate from './getFormattedDate';
export type postRes = Promise<{
  createdAt: string;
  updatedAt: string;
  user: {
    image: string | null;
    id: string;
    name: string | null;
  };
  tags: string[];
  reviewsCount: number;
  _count: {
    reviews: number;
  };
  id: string;
  userId: string;
  description: string;
  imageUrl: string;
  location: string;
} | null>;
const getPost = async (id: string): Promise<postRes> => {
  const catchPost = await db.catch.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      tags: {
        include: {
          tag: true,
        },
      },
      _count: {
        select: { reviews: true },
      },
    },
  });

  if (!catchPost) {
    return null;
  }
  return {
    ...catchPost,
    createdAt: getFormattedDate(catchPost.createdAt.toISOString()),
    updatedAt: getFormattedDate(catchPost.updatedAt.toISOString()),
    user: catchPost.user,
    tags: catchPost.tags.map((tag) => tag.tag.name),
    reviewsCount: catchPost._count.reviews,
  };
};

export default getPost;
