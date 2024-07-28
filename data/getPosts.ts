import { currentUser } from './../lib/get-user-server';
import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { GetAllPostsResponse } from '@/types/responses';
import getFormattedDate from './getFormattedDate';
import { PAGE_LIMIT } from '@/lib/utils';

type Props = {
  page?: number;
  tag?: string;
  feed?: string;
  author?: string;
  favorited?: string;
  pageSize?: number;
};

const getAllPosts = async (
  params: Props
): Promise<GetAllPostsResponse | null> => {
  const { pageSize = PAGE_LIMIT, page = 1 } = params;

  const limit = pageSize;
  const offset = (page - 1) * PAGE_LIMIT;

  const user = await currentUser();
  const userId = user?.id;

  let query: any = {};

  if (params.tag) {
    query = {
      tags: {
        some: {
          tag: {
            name: params.tag,
          },
        },
      },
    };
  }

  if (params.author) {
    query = {
      user: {
        id: params.author,
      },
    };
  }

  if (params.feed === 'mycatch') {
    query = {
      userId: userId,
    };
  }

  if (params.feed === 'followed') {
    query = {
      user: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    };
  }

  if (params.feed === 'favorited') {
    query = {
      favoritedBy: {
        some: {
          userId: userId,
        },
      },
    };
  }

  const catchesCount = await db.catch.count({
    where: query,
  });
  try {
    const data = await db.catch.findMany({
      where: query,
      skip: offset,
      take: limit,
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
        favoritedBy: true,

        _count: {
          select: { reviews: true, favoritedBy: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (!data) return null;

    return {
      catches: data.map((catchItem) => ({
        ...catchItem,
        createdAt: getFormattedDate(catchItem.createdAt.toISOString()),
        updatedAt: getFormattedDate(catchItem.updatedAt.toISOString()),
        user: catchItem.user,
        tags: catchItem.tags.map((tag) => tag.tag.name),
        reviewsCount: catchItem._count.reviews,
        favoriteCount: catchItem._count.favoritedBy,

        isFavorited: catchItem.favoritedBy.some((fav) => fav.userId === userId),
      })),
      catchesCount,
    };
  } catch (error) {
    console.error('error in getting posts: ', error);
    throw error;
  }
};

export default getAllPosts;

function userMapper(user: User, following: boolean = false) {
  const { id, name, email, image } = user;
  return {
    id,
    name,
    email,
    image: image,
    following,
  };
}
