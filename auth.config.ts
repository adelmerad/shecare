import type { NextAuthConfig } from "next-auth"

// Edge-safe config shared with the middleware (no Prisma, no bcrypt here)
export const PROTECTED_PREFIXES = [
  "/dashboard",
  "/health-tracker",
  "/wellness",
  "/community",
  "/consultations",
  "/profile",
]

export const authConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtected = PROTECTED_PREFIXES.some((p) => nextUrl.pathname.startsWith(p))
      const isAuthPage = nextUrl.pathname === "/login" || nextUrl.pathname === "/register"

      if (isProtected) return isLoggedIn
      if (isAuthPage && isLoggedIn) return Response.redirect(new URL("/dashboard", nextUrl))
      return true
    },
    jwt({ token, user }) {
      if (user?.id) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token.id && session.user) session.user.id = token.id as string
      return session
    },
  },
} satisfies NextAuthConfig
