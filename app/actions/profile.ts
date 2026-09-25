"use server"

import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { signOut } from "@/auth"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { parseForm, type ActionState } from "@/lib/action-state"
import {
  changePasswordSchema,
  deleteAccountSchema,
  medicalSchema,
  personalSchema,
  preferencesSchema,
} from "@/lib/validation"

export async function updatePersonal(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = await requireUserId()
  const parsed = parseForm(personalSchema, formData)
  if (!parsed.success) return parsed.state

  // Optional fields left empty are cleared rather than kept
  const { phone, birthDate, location, bio, ...names } = parsed.data
  await db.user.update({
    where: { id },
    data: { ...names, phone: phone ?? null, birthDate: birthDate ?? null, location: location ?? null, bio: bio ?? null },
  })
  revalidatePath("/profile")
  revalidatePath("/dashboard")
  return { ok: true, message: "Personal information saved." }
}

export async function updateMedical(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(medicalSchema, formData)
  if (!parsed.success) return parsed.state

  const data = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, v ?? null]))
  await db.medicalProfile.upsert({ where: { userId }, create: { ...data, userId }, update: data })
  revalidatePath("/profile")
  revalidatePath("/dashboard")
  return { ok: true, message: "Medical information updated." }
}

export async function updatePreferences(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(preferencesSchema, formData)
  if (!parsed.success) return parsed.state

  await db.preferences.upsert({ where: { userId }, create: { ...parsed.data, userId }, update: parsed.data })
  revalidatePath("/profile")
  return { ok: true, message: "Preferences saved." }
}

export async function changePassword(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = await requireUserId()
  const parsed = parseForm(changePasswordSchema, formData)
  if (!parsed.success) return parsed.state

  const user = await db.user.findUniqueOrThrow({ where: { id }, select: { passwordHash: true } })
  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash)
  if (!valid) return { ok: false, errors: { currentPassword: "Current password is incorrect" } }

  await db.user.update({ where: { id }, data: { passwordHash: await bcrypt.hash(parsed.data.newPassword, 12) } })
  return { ok: true, message: "Password changed." }
}

export async function deleteAccount(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const id = await requireUserId()
  const parsed = parseForm(deleteAccountSchema, formData)
  if (!parsed.success) return parsed.state

  const user = await db.user.findUniqueOrThrow({ where: { id }, select: { passwordHash: true } })
  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash)
  if (!valid) return { ok: false, errors: { password: "Password is incorrect" } }

  // All related records are removed through ON DELETE CASCADE
  await db.user.delete({ where: { id } })
  await signOut({ redirectTo: "/" })
  return { ok: true }
}
