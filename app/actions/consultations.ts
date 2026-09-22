"use server"

import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { parseForm, type ActionState } from "@/lib/action-state"
import { bookingSchema } from "@/lib/validation"
import { checkSlot, combineDateTime, overlaps } from "@/lib/booking"

class BookingConflict extends Error {}

export async function bookAppointment(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const userId = await requireUserId()
  const parsed = parseForm(bookingSchema, formData)
  if (!parsed.success) return parsed.state
  const { specialistId, mode, date, time, notes } = parsed.data

  const specialist = await db.specialist.findUnique({ where: { id: specialistId } })
  if (!specialist) return { ok: false, message: "This specialist is not available." }
  if (!specialist.modes.includes(mode)) {
    return { ok: false, errors: { mode: `${specialist.name} does not offer this consultation type` } }
  }

  const startsAt = combineDateTime(date, time)
  const slot = checkSlot(startsAt, specialist.durationMin)
  if (!slot.ok) return { ok: false, errors: { time: slot.reason } }

  try {
    // Serializable transaction: two users cannot book the same slot concurrently
    await db.$transaction(
      async (tx) => {
        const dayStart = new Date(startsAt.getFullYear(), startsAt.getMonth(), startsAt.getDate())
        const dayEnd = new Date(dayStart)
        dayEnd.setDate(dayEnd.getDate() + 1)

        const sameDay = await tx.appointment.findMany({
          where: {
            status: "SCHEDULED",
            startsAt: { gte: dayStart, lt: dayEnd },
            OR: [{ specialistId }, { userId }],
          },
          include: { specialist: { select: { durationMin: true } } },
        })

        const clash = sameDay.some((a) =>
          overlaps(a.startsAt, a.specialist.durationMin, startsAt, specialist.durationMin),
        )
        if (clash) throw new BookingConflict()

        await tx.appointment.create({ data: { userId, specialistId, mode, startsAt, notes } })
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    )
  } catch (error) {
    const isSerializationFailure = error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034"
    if (error instanceof BookingConflict || isSerializationFailure) {
      return { ok: false, errors: { time: "This slot was just taken or overlaps another appointment." } }
    }
    throw error
  }

  revalidatePath("/consultations")
  revalidatePath("/dashboard")
  return { ok: true, message: `Booked with ${specialist.name}.` }
}

export async function cancelAppointment(id: string) {
  const userId = await requireUserId()
  await db.appointment.updateMany({
    where: { id, userId, status: "SCHEDULED", startsAt: { gt: new Date() } },
    data: { status: "CANCELLED" },
  })
  revalidatePath("/consultations")
  revalidatePath("/dashboard")
}

/** Start times already taken for a specialist on a given day (used by the booking form). */
export async function takenSlots(specialistId: string, date: string): Promise<string[]> {
  await requireUserId()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return []

  const dayStart = combineDateTime(date, "00:00")
  const dayEnd = new Date(dayStart)
  dayEnd.setDate(dayEnd.getDate() + 1)

  const appointments = await db.appointment.findMany({
    where: { specialistId, status: "SCHEDULED", startsAt: { gte: dayStart, lt: dayEnd } },
    select: { startsAt: true },
  })
  return appointments.map(
    (a) => `${String(a.startsAt.getHours()).padStart(2, "0")}:${String(a.startsAt.getMinutes()).padStart(2, "0")}`,
  )
}
