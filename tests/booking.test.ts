import { describe, expect, it } from "vitest"
import { checkSlot, combineDateTime, dailySlots, overlaps } from "@/lib/booking"

describe("dailySlots", () => {
  it("lists 30-minute slots that end before closing", () => {
    const slots = dailySlots(60)
    expect(slots[0]).toBe("09:00")
    expect(slots.at(-1)).toBe("16:00")
    expect(slots).not.toContain("16:30")
  })

  it("allows the last half hour for short consultations", () => {
    expect(dailySlots(30).at(-1)).toBe("16:30")
  })
})

describe("overlaps", () => {
  const t = (h: number, m = 0) => new Date(2026, 10, 1, h, m)

  it("detects overlapping appointments", () => {
    expect(overlaps(t(10), 60, t(10, 30), 30)).toBe(true)
  })

  it("treats back-to-back appointments as free", () => {
    expect(overlaps(t(10), 30, t(10, 30), 30)).toBe(false)
  })
})

describe("checkSlot", () => {
  // Wednesday 28 October 2026, 12:00
  const now = new Date(2026, 9, 28, 12, 0)

  it("accepts a valid future slot on a working day", () => {
    expect(checkSlot(combineDateTime("2026-11-01", "10:00"), 30, now)).toEqual({ ok: true })
  })

  it("rejects past times", () => {
    expect(checkSlot(combineDateTime("2026-10-28", "09:00"), 30, now).ok).toBe(false)
  })

  it("rejects the weekend (Friday and Saturday)", () => {
    expect(checkSlot(combineDateTime("2026-10-30", "10:00"), 30, now).ok).toBe(false)
    expect(checkSlot(combineDateTime("2026-10-31", "10:00"), 30, now).ok).toBe(false)
  })

  it("rejects times outside consultation hours or off the grid", () => {
    expect(checkSlot(combineDateTime("2026-11-01", "08:00"), 30, now).ok).toBe(false)
    expect(checkSlot(combineDateTime("2026-11-01", "10:15"), 30, now).ok).toBe(false)
    expect(checkSlot(combineDateTime("2026-11-01", "16:30"), 60, now).ok).toBe(false)
  })

  it("rejects bookings too far ahead", () => {
    expect(checkSlot(combineDateTime("2027-03-01", "10:00"), 30, now).ok).toBe(false)
  })
})
