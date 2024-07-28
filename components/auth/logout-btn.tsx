'use client';
import { signOut } from 'next-auth/react';

type LogoutBtnProps = {
  children: React.ReactNode;
};

export const LogOutButton = ({ children }: LogoutBtnProps) => {
  const onClick = () => {
    signOut();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
