"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { parseForm, type ActionState } from "@/lib/action-state"
import { dailyLogSchema, symptomSchema, vitalsSchema } from "@/lib/validation"

function refresh() {
  revalidatePath("/health-tracker")
  revalidatePath("/dashboard")
  revalidatePath("/wellness")
}

export async function saveDailyLog(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(dailyLogSchema, formData)
  if (!parsed.success) return parsed.state

  await db.dailyLog.create({ data: { ...parsed.data, userId } })
  refresh()
  return { ok: true, message: "Entry saved." }
}

export async function logSymptom(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(symptomSchema, formData)
  if (!parsed.success) return parsed.state

  await db.symptomLog.create({ data: { ...parsed.data, userId } })
  refresh()
  return { ok: true, message: "Symptom logged." }
}

export async function saveVitals(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(vitalsSchema, formData)
  if (!parsed.success) return parsed.state

  await db.vitalReading.create({ data: { ...parsed.data, userId } })
  refresh()
  return { ok: true, message: "Vitals saved." }
}

export async function deleteSymptom(id: string) {
  const userId = await requireUserId()
  // Scoped by userId so a user can only delete their own records
  await db.symptomLog.deleteMany({ where: { id, userId } })
  refresh()
}

export async function deleteDailyLog(id: string) {
  const userId = await requireUserId()
  await db.dailyLog.deleteMany({ where: { id, userId } })
  refresh()
}
