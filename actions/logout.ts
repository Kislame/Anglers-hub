'use server';
import { signOut } from '@/auth';
export const logout = async () => {
  //do some server stuff
  //do some server stuff
  await signOut();
};
