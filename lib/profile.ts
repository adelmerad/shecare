type ProfileFields = {
  phone?: string | null
  birthDate?: Date | null
  location?: string | null
  bio?: string | null
}

type MedicalFields = {
  diagnosis?: string | null
  stage?: string | null
  diagnosisDate?: Date | null
  treatmentStart?: Date | null
  currentTreatment?: string | null
  emergencyContact?: string | null
}

const PROFILE_KEYS: (keyof ProfileFields)[] = ["phone", "birthDate", "location", "bio"]
const MEDICAL_KEYS: (keyof MedicalFields)[] = [
  "diagnosis",
  "stage",
  "diagnosisDate",
  "treatmentStart",
  "currentTreatment",
  "emergencyContact",
]

/** Percentage of optional profile fields filled in (name and email always count as done). */
export function profileCompletion(user: ProfileFields, medical: MedicalFields | null): number {
  const filled = (v: unknown) => v !== null && v !== undefined && v !== ""
  const done = 2 + PROFILE_KEYS.filter((k) => filled(user[k])).length + MEDICAL_KEYS.filter((k) => filled(medical?.[k])).length
  const total = 2 + PROFILE_KEYS.length + MEDICAL_KEYS.length
  return Math.round((done / total) * 100)
}

/** Whole days between two dates (never negative). */
export function daysBetween(from: Date, to: Date = new Date()): number {
  const ms = to.getTime() - from.getTime()
  return Math.max(0, Math.floor(ms / 86_400_000))
}
