import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { authConfig } from "./auth.config"
import { db } from "@/lib/db"
import { loginSchema } from "@/lib/validation"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = loginSchema.safeParse(raw)
        if (!parsed.success) return null

        const user = await db.user.findUnique({ where: { email: parsed.data.email } })
        if (!user) return null

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, email: user.email, name: `${user.firstName} ${user.lastName}` }
      },
    }),
  ],
})
