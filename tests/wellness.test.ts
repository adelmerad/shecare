import { describe, expect, it } from "vitest"
import { averageScore, dayStreak, findSession, wellnessScore } from "@/lib/wellness"

describe("wellnessScore", () => {
  it("averages mood and energy on a 10-point scale", () => {
    expect(wellnessScore({ mood: "GREAT", energy: 10 })).toBe(10)
    expect(wellnessScore({ mood: "GOOD", energy: 7 })).toBe(7.5)
    expect(wellnessScore({ mood: "BAD", energy: 1 })).toBe(1.5)
  })
})

describe("averageScore", () => {
  it("returns null without logs", () => {
    expect(averageScore([])).toBeNull()
  })

  it("rounds to one decimal", () => {
    expect(averageScore([{ mood: "GOOD", energy: 7 }, { mood: "OKAY", energy: 5 }])).toBe(6.5)
  })
})

describe("dayStreak", () => {
  const now = new Date(2026, 9, 28, 15, 0)
  const at = (daysBack: number) => new Date(2026, 9, 28 - daysBack, 10, 0)

  it("counts consecutive days ending today", () => {
    expect(dayStreak([at(0), at(1), at(2), at(4)], now)).toBe(3)
  })

  it("keeps the streak alive when today is not logged yet", () => {
    expect(dayStreak([at(1), at(2)], now)).toBe(2)
  })

  it("counts several activities on the same day once", () => {
    expect(dayStreak([at(0), at(0), at(0)], now)).toBe(1)
  })

  it("is zero after a missed day", () => {
    expect(dayStreak([at(2), at(3)], now)).toBe(0)
  })
})

describe("findSession", () => {
  it("finds known sessions and rejects unknown slugs", () => {
    expect(findSession("box-breathing")?.type).toBe("BREATHING")
    expect(findSession("not-a-session")).toBeUndefined()
  })
})
