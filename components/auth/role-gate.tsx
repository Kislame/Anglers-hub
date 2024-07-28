'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import { FormError } from '../form-error';

type Props = {
  children: React.ReactNode;
  allowedRole: UserRole;
};
export const RoleGate = ({ children, allowedRole }: Props) => {
  const role = useCurrentRole();

  if (role !== allowedRole)
    return (
      <FormError message="you dont have permission to view this content" />
    );

  return <>{children}</>;
};
