import { LoginForm } from '@/components/auth/login-form';
import { Suspense } from 'react';
type Props = {};

const LoginPage = (props: Props) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <LoginForm />;
    </Suspense>
  );
};

export default LoginPage;
