import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = process.env.AUTH_USERNAME;
        const passwordHash = process.env.AUTH_PASSWORD_HASH;

        if (!username || !passwordHash) {
          console.error("AUTH_USERNAME or AUTH_PASSWORD_HASH not configured");
          return null;
        }

        if (credentials?.username !== username) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials?.password as string,
          passwordHash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: "1",
          name: username,
          email: `${username}@petunialab.local`,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname === "/login";
      const isApiAuth = nextUrl.pathname.startsWith("/api/auth");

      if (isApiAuth) {
        return true;
      }

      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/", nextUrl));
        }
        return true;
      }

      return isLoggedIn;
    },
  },
  trustHost: true,
});
