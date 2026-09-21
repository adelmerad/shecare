// Consultation slots: weekdays (Sun–Thu, Algerian work week), 09:00–17:00, every 30 minutes
export const OPENING_HOUR = 9
export const CLOSING_HOUR = 17
export const SLOT_STEP_MIN = 30
export const MAX_DAYS_AHEAD = 60
const WORK_DAYS = new Set([0, 1, 2, 3, 4])

export function isWorkDay(date: Date): boolean {
  return WORK_DAYS.has(date.getDay())
}

/** All start times ("HH:mm") where a consultation of `durationMin` fits before closing. */
export function dailySlots(durationMin: number): string[] {
  const slots: string[] = []
  for (let m = OPENING_HOUR * 60; m + durationMin <= CLOSING_HOUR * 60; m += SLOT_STEP_MIN) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`)
  }
  return slots
}

export function combineDateTime(date: string, time: string): Date {
  const [y, mo, d] = date.split("-").map(Number)
  const [h, mi] = time.split(":").map(Number)
  return new Date(y, mo - 1, d, h, mi)
}

export function overlaps(aStart: Date, aMin: number, bStart: Date, bMin: number): boolean {
  const aEnd = aStart.getTime() + aMin * 60_000
  const bEnd = bStart.getTime() + bMin * 60_000
  return aStart.getTime() < bEnd && bStart.getTime() < aEnd
}

export type SlotCheck = { ok: true } | { ok: false; reason: string }

/** Business rules that do not need the database. */
export function checkSlot(startsAt: Date, durationMin: number, now: Date = new Date()): SlotCheck {
  if (Number.isNaN(startsAt.getTime())) return { ok: false, reason: "Invalid date or time." }
  if (startsAt.getTime() <= now.getTime()) return { ok: false, reason: "Choose a time in the future." }

  const limit = new Date(now)
  limit.setDate(limit.getDate() + MAX_DAYS_AHEAD)
  if (startsAt > limit) return { ok: false, reason: `Bookings open up to ${MAX_DAYS_AHEAD} days ahead.` }

  if (!isWorkDay(startsAt)) return { ok: false, reason: "Specialists are available Sunday to Thursday." }

  const time = `${String(startsAt.getHours()).padStart(2, "0")}:${String(startsAt.getMinutes()).padStart(2, "0")}`
  if (!dailySlots(durationMin).includes(time)) return { ok: false, reason: "This time is outside consultation hours." }

  return { ok: true }
}
