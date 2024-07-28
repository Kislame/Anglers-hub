import NextAuth, { Session } from 'next-auth';
import authConfig from '@/auth.config';
const { auth } = NextAuth(authConfig);
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/routes';
import { NextRequest } from 'next/server';

export default auth(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    // req.auth
    const { nextUrl } = req;
    // console.log(nextUrl);
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    if (isApiAuthRoute) return;
    if (isAuthRoute) {
      if (isLoggedIn) {
        //nextUrl is used to create an absolute url like localhost:3000/settigs
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }
    if (!isLoggedIn && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallBackUrl = encodeURIComponent(callbackUrl);
      return Response.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl)
      );
    }
    return;
  }
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
