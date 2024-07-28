'use client';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';

const AdminPage = () => {
  const onClickServerAction = () => {
    admin().then((data) => {
      if (data.error) toast.error('not allowed');
      else {
        toast.success('allowed');
      }
    });
  };
  const onApiClick = () => {
    fetch('/api/admin').then((res) => {
      if (res.ok) toast.success('Allowed');
      else {
        toast.error('Not allowed');
      }
    });
  };
  const role = useCurrentRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="you are allowed to see this content" />
        </RoleGate>
        <div className="flex justify-between items-center rounded-md shadow-md p-3">
          <p>Admin only Api Route</p>
          <Button onClick={onApiClick}>click to test</Button>
        </div>
        <div className="flex justify-between items-center rounded-md shadow-md p-3">
          <p>Admin only Server Action</p>
          <Button onClick={onClickServerAction}>click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
