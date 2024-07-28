import { currentUser } from '@/lib/get-user-server';
import UserInfo from '../_components/UserInfo';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile page for the user',
};
const ServerPage = async () => {
  const user = await currentUser();
  return (
    <div>
      <UserInfo label="Server Component" user={user} />
    </div>
  );
};

export default ServerPage;
