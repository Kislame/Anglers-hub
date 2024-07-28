import ToggleFeed from './_components/ToggleFeed';
import PostsList from './_components/PostsList';
import { currentUser } from '@/lib/get-user-server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'Posts Page',
};
type PostsProps = {
  searchParams: {
    page?: string;
    tag?: string;
    feed?: string;
  };
};

async function PostsPage({ searchParams }: PostsProps) {
  const page = Number(searchParams.page) || 1;
  const tag = searchParams.tag;
  const feed = searchParams.feed;
  return (
    <div className="">
      <ToggleFeed tag={tag} feed={feed} />
      <PostsList tag={tag} feed={feed} page={page} />
    </div>
  );
}

export default PostsPage;
