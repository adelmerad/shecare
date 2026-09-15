import { z } from "zod"

// HTML forms send "" for empty fields: treat them as missing
const emptyToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v)

const optionalText = (max: number) => z.preprocess(emptyToUndefined, z.string().trim().max(max).optional())
const optionalInt = (min: number, max: number) =>
  z.preprocess(emptyToUndefined, z.coerce.number().int().min(min).max(max).optional())
const optionalNumber = (min: number, max: number) =>
  z.preprocess(emptyToUndefined, z.coerce.number().min(min).max(max).optional())
const optionalDate = z.preprocess(emptyToUndefined, z.coerce.date().optional())
const checkbox = z.preprocess((v) => v === "on" || v === "true" || v === true, z.boolean())

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
})

export const passwordSchema = z
  .string()
  .min(8, "At least 8 characters")
  .max(72, "At most 72 characters")
  .regex(/[A-Za-z]/, "Include at least one letter")
  .regex(/[0-9]/, "Include at least one number")

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required").max(50),
    lastName: z.string().trim().min(1, "Last name is required").max(50),
    email: z.string().trim().toLowerCase().email("Enter a valid email"),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// ─── Health tracking ─────────────────────────────────────────────────────────

export const moodValues = ["GREAT", "GOOD", "OKAY", "LOW", "BAD"] as const
export const severityValues = ["NONE", "MILD", "MODERATE", "SEVERE"] as const

export const dailyLogSchema = z.object({
  energy: z.coerce.number().int().min(1, "1 to 10").max(10, "1 to 10"),
  mood: z.enum(moodValues, { errorMap: () => ({ message: "Choose a mood" }) }),
  sleepHours: optionalNumber(0, 24),
  waterGlasses: optionalInt(0, 30),
  notes: optionalText(2000),
})

export const symptomSchema = z.object({
  name: z.string().trim().min(1, "Symptom name is required").max(80),
  severity: z.enum(severityValues, { errorMap: () => ({ message: "Choose a severity" }) }),
  notes: optionalText(1000),
})

export const vitalsSchema = z
  .object({
    temperature: optionalNumber(30, 45),
    heartRate: optionalInt(20, 250),
    systolic: optionalInt(50, 260),
    diastolic: optionalInt(30, 160),
  })
  .refine((v) => Object.values(v).some((x) => x !== undefined), {
    message: "Enter at least one reading",
    path: ["temperature"],
  })
  .refine((v) => v.systolic === undefined || v.diastolic === undefined || v.systolic > v.diastolic, {
    message: "Systolic must be higher than diastolic",
    path: ["systolic"],
  })

// ─── Wellness ────────────────────────────────────────────────────────────────

export const journalSchema = z.object({
  feelings: z.string().trim().min(1, "Write a few words about how you feel").max(5000),
  gratitude: optionalText(2000),
  prompt: optionalText(200),
})

export const sessionSchema = z.object({
  slug: z.string().min(1).max(60),
})

// ─── Community ───────────────────────────────────────────────────────────────

export const postCategoryValues = ["SUPPORT", "QUESTION", "VICTORY"] as const

export const postSchema = z.object({
  content: z.string().trim().min(3, "Write at least a few words").max(3000),
  category: z.enum(postCategoryValues, { errorMap: () => ({ message: "Choose a category" }) }),
})

export const commentSchema = z.object({
  postId: z.string().min(1),
  content: z.string().trim().min(1, "Comment cannot be empty").max(1000),
})

// ─── Consultations ───────────────────────────────────────────────────────────

export const modeValues = ["VIDEO", "PHONE", "CHAT"] as const

export const bookingSchema = z.object({
  specialistId: z.string().min(1),
  mode: z.enum(modeValues, { errorMap: () => ({ message: "Choose a consultation type" }) }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Choose a time"),
  notes: optionalText(500),
})

// ─── Profile ─────────────────────────────────────────────────────────────────

export const personalSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  phone: optionalText(30),
  birthDate: optionalDate,
  location: optionalText(100),
  bio: optionalText(1000),
})

export const medicalSchema = z
  .object({
    diagnosis: optionalText(120),
    stage: optionalText(40),
    diagnosisDate: optionalDate,
    treatmentStart: optionalDate,
    currentTreatment: optionalText(2000),
    medications: optionalText(2000),
    allergies: optionalText(500),
    emergencyContact: optionalText(200),
    cyclesTotal: optionalInt(1, 100),
    cyclesCompleted: optionalInt(0, 100),
  })
  .refine(
    (m) => m.cyclesTotal === undefined || m.cyclesCompleted === undefined || m.cyclesCompleted <= m.cyclesTotal,
    { message: "Completed cycles cannot exceed the total", path: ["cyclesCompleted"] },
  )

export const preferencesSchema = z.object({
  appointmentReminders: checkbox,
  medicationReminders: checkbox,
  communityUpdates: checkbox,
  wellnessReminders: checkbox,
  profileVisible: checkbox,
  shareProgress: checkbox,
})

export const deleteAccountSchema = z.object({
  confirm: z.literal("DELETE", { errorMap: () => ({ message: 'Type "DELETE" to confirm' }) }),
  password: z.string().min(1, "Password is required"),
})
