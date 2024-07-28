import { NewPasswordForm } from '@/components/auth/new-password-form';
import { Suspense } from 'react';
type Props = {};

const NewPasswordPage = (props: Props) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
