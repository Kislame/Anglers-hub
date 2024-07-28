import getPost from '@/data/getPost';
import { currentUser } from '@/lib/get-user-server';
import { redirect } from 'next/navigation';
import { UpdateForm } from '@/components/editor/UpdateForm';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const catchPostData = getPost(id);
  const catchPost = await catchPostData;
  if (!catchPost) {
    return {
      title: 'post not found',
    };
  }
  return {
    title: 'Edit Post Page',
    description: `this is the edit page of post ID ${catchPost.id}`,
  };
}

const EditPost = async ({ params }: Props) => {
  const user = await currentUser();
  const catchPostData = getPost(params.id);
  const catchPost = await catchPostData;

  if (!(catchPost && user && catchPost.userId === user.id)) {
    notFound();
  }

  return (
    <section>
      <UpdateForm postData={catchPost} />
    </section>
  );
};

export default EditPost;
