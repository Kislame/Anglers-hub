import { Navbar } from './_components/navbar';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';
import { EdgeStoreProvider } from '@/lib/edgestore';

type Props = { children: React.ReactNode };

const ProtectedLayout = async ({ children }: Props) => {
  const session = await auth();
  return (
    <>
      <SessionProvider session={session}>
        <Navbar />
        <main className="flex flex-col items-center justify-center mt-12">
          <Toaster />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
      </SessionProvider>
    </>
  );
};

export default ProtectedLayout;
