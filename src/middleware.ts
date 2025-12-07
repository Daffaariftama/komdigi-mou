import { authConfig } from "~/server/auth/config";
import NextAuth from "next-auth";

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ["/admin/:path*"],
};
