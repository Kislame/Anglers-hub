'use client';

import UserInfo from '../_components/UserInfo';
import { useCurrentUser } from '@/hooks/use-current-user';
const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      <UserInfo label="Cient Component" user={user} />
    </div>
  );
};

export default ClientPage;
