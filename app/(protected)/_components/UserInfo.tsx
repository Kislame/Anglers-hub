import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { type DefaultSession } from 'next-auth';

import { Badge } from '@/components/ui/badge';
import { User } from 'next-auth';

type Props = {
  user?: DefaultSession['user'] & {
    role: 'ADMIN' | 'USER';
    isTwoFactorEnabled: boolean;
  };
  label: string;
};

const UserInfo = ({ user, label }: Props) => {
  return (
    <Card className="max-w-[600px] shadow-md w-[360px]">
      <CardHeader>
        <p className="text-center text-2xl">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium ">Id</p>
          <p className="truncate text-xs max-w-28 font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium ">Name</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium ">Email</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg shadow-sm p-3">
          <p className="text-sm font-medium ">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}>
            {user?.isTwoFactorEnabled ? 'ON' : 'OFF'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
