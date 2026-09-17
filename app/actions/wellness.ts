"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { parseForm, type ActionState } from "@/lib/action-state"
import { journalSchema } from "@/lib/validation"
import { findSession } from "@/lib/wellness"

export async function saveJournalEntry(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(journalSchema, formData)
  if (!parsed.success) return parsed.state

  await db.journalEntry.create({ data: { ...parsed.data, userId } })
  revalidatePath("/wellness")
  revalidatePath("/dashboard")
  return { ok: true, message: "Journal entry saved." }
}

export async function deleteJournalEntry(id: string) {
  const userId = await requireUserId()
  await db.journalEntry.deleteMany({ where: { id, userId } })
  revalidatePath("/wellness")
}

export async function completeSession(slug: string): Promise<ActionState> {
  const userId = await requireUserId()
  const session = findSession(slug)
  if (!session) return { ok: false, message: "Unknown session." }

  await db.wellnessSession.create({
    data: { userId, slug, type: session.type, durationMin: session.durationMin },
  })
  revalidatePath("/wellness")
  revalidatePath("/dashboard")
  return { ok: true, message: `${session.title} completed. Well done!` }
}
