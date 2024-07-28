import PostPreview from '@/components/post/PostPreview';
import getAllPosts from '@/data/getPosts';
import Pagination from '@/components/pagination/pagination';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts',
  description: 'All users Posts ',
};

type Props = {
  page: number;
  tag?: string;
  feed?: string;
};

const PostsList = async ({ page, feed, tag }: Props) => {
  const postsData = getAllPosts({ feed, tag, page });
  const posts = await postsData;
  if (!posts) {
    return <p>no posts found.</p>;
  }

  return (
    <div className="space-y-6 mt-8">
      {posts.catches.map((item) => (
        <PostPreview catchItem={item} key={item.id} />
      ))}
      <Pagination page={page} count={posts.catchesCount} />
    </div>
  );
};

export default PostsList;
