type Props = {};
import { NewVerificationForm } from '@/components/auth/new-verification-form';
import { Suspense } from 'react';
const NewVerificationPage = (props: Props) => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
