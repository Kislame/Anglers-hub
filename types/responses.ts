import { db } from '@/lib/db';
import { User } from '@prisma/client';

export type CatchResponse = {
  id: string;
  userId: string;
  description: string;
  imageUrl: string;
  location: string;
  tags: String[];
  favoritedBy?: Favorite[];
  createdAt: string; // Converted to ISO string
  updatedAt: string; // Converted to ISO string
  user: { id: string; name: string | null; image: string | null };
  reviewsCount: number;
  favoriteCount?: number;
  isFavorited?: boolean;
};

export type Tag = {
  id: string;
  name: string;
};

type CatchTag = {
  catchId: string;
  tagId: string;
  tag: Tag;
};

type Favorite = {
  catchId: string;
  userId: string;
  catch?: CatchResponse;
  user?: User;
};

export type GetAllPostsResponse = {
  catches: CatchResponse[];
  catchesCount: number;
};
