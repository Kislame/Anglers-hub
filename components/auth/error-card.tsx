import { Header } from '@/components/auth/header';
import { BackButton } from '@/components/auth/back-button';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';

export const ErrorCard = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something Went Wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
};
