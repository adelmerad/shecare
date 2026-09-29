import { describe, expect, it } from "vitest"
import {
  dailyLogSchema,
  deleteAccountSchema,
  medicalSchema,
  preferencesSchema,
  registerSchema,
  vitalsSchema,
} from "@/lib/validation"
import { parseForm } from "@/lib/action-state"
import { profileCompletion } from "@/lib/profile"

function form(data: Record<string, string>) {
  const fd = new FormData()
  for (const [k, v] of Object.entries(data)) fd.append(k, v)
  return fd
}

describe("registerSchema", () => {
  const valid = { firstName: "Sarah", lastName: "Amrani", email: " Sarah@Mail.DZ ", password: "secret123", confirmPassword: "secret123" }

  it("normalises the email", () => {
    expect(registerSchema.parse(valid).email).toBe("sarah@mail.dz")
  })

  it("requires a letter and a number in the password", () => {
    expect(registerSchema.safeParse({ ...valid, password: "12345678", confirmPassword: "12345678" }).success).toBe(false)
    expect(registerSchema.safeParse({ ...valid, password: "abcdefgh", confirmPassword: "abcdefgh" }).success).toBe(false)
  })

  it("reports mismatched passwords on confirmPassword", () => {
    const result = parseForm(registerSchema, form({ ...valid, confirmPassword: "other123" }))
    expect(result.success).toBe(false)
    if (!result.success) expect(result.state.errors?.confirmPassword).toBe("Passwords do not match")
  })
})

describe("dailyLogSchema", () => {
  it("coerces numbers and treats empty optional fields as missing", () => {
    const result = parseForm(dailyLogSchema, form({ energy: "7", mood: "GOOD", sleepHours: "", waterGlasses: "6", notes: "" }))
    expect(result).toEqual({ success: true, data: { energy: 7, mood: "GOOD", waterGlasses: 6 } })
  })

  it("rejects energy outside 1-10", () => {
    expect(dailyLogSchema.safeParse({ energy: "11", mood: "GOOD" }).success).toBe(false)
  })
})

describe("vitalsSchema", () => {
  it("needs at least one reading", () => {
    expect(vitalsSchema.safeParse({ temperature: "", heartRate: "" }).success).toBe(false)
  })

  it("checks systolic is above diastolic", () => {
    expect(vitalsSchema.safeParse({ systolic: "70", diastolic: "90" }).success).toBe(false)
    expect(vitalsSchema.safeParse({ systolic: "120", diastolic: "80" }).success).toBe(true)
  })
})

describe("medicalSchema", () => {
  it("does not allow more completed cycles than planned", () => {
    expect(medicalSchema.safeParse({ cyclesTotal: "6", cyclesCompleted: "7" }).success).toBe(false)
  })
})

describe("preferencesSchema", () => {
  it("maps unchecked boxes to false", () => {
    const result = parseForm(preferencesSchema, form({ appointmentReminders: "on" }))
    expect(result.success && result.data.appointmentReminders).toBe(true)
    expect(result.success && result.data.communityUpdates).toBe(false)
  })
})

describe("deleteAccountSchema", () => {
  it("requires typing DELETE", () => {
    expect(deleteAccountSchema.safeParse({ confirm: "delete", password: "x" }).success).toBe(false)
    expect(deleteAccountSchema.safeParse({ confirm: "DELETE", password: "x" }).success).toBe(true)
  })
})

describe("profileCompletion", () => {
  it("counts filled optional fields", () => {
    expect(profileCompletion({}, null)).toBe(17)
    expect(profileCompletion({ phone: "0555", location: "Algiers" }, { diagnosis: "IDC", stage: "" })).toBe(42)
  })
})
