"use server"

import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { signIn, signOut } from "@/auth"
import { db } from "@/lib/db"
import { parseForm, type ActionState } from "@/lib/action-state"
import { loginSchema, registerSchema } from "@/lib/validation"

export async function registerAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseForm(registerSchema, formData)
  if (!parsed.success) return parsed.state
  const { firstName, lastName, email, password } = parsed.data

  const existing = await db.user.findUnique({ where: { email }, select: { id: true } })
  if (existing) return { ok: false, errors: { email: "An account with this email already exists" } }

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      passwordHash: await bcrypt.hash(password, 12),
      medical: { create: {} },
      preferences: { create: {} },
    },
  })

  // signIn throws a redirect on success, which Next.js handles
  await signIn("credentials", { email, password, redirectTo: "/dashboard" })
  return { ok: true }
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = parseForm(loginSchema, formData)
  if (!parsed.success) return parsed.state

  const next = formData.get("callbackUrl")
  const redirectTo = typeof next === "string" && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard"

  try {
    await signIn("credentials", { ...parsed.data, redirectTo })
    return { ok: true }
  } catch (error) {
    if (error instanceof AuthError) return { ok: false, message: "Incorrect email or password." }
    throw error
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" })
}
