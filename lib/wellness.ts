import type { Mood, SessionType } from "@prisma/client"

export const MOOD_LABELS: Record<Mood, string> = {
  GREAT: "Great",
  GOOD: "Good",
  OKAY: "Okay",
  LOW: "Low",
  BAD: "Bad",
}

const MOOD_SCORES: Record<Mood, number> = { GREAT: 10, GOOD: 8, OKAY: 6, LOW: 4, BAD: 2 }

/** Wellness score out of 10, weighting mood and energy equally (one decimal). */
export function wellnessScore(log: { energy: number; mood: Mood }): number {
  return Math.round(((MOOD_SCORES[log.mood] + log.energy) / 2) * 10) / 10
}

export function averageScore(logs: { energy: number; mood: Mood }[]): number | null {
  if (logs.length === 0) return null
  const total = logs.reduce((sum, l) => sum + wellnessScore(l), 0)
  return Math.round((total / logs.length) * 10) / 10
}

export function scoreLabel(score: number): string {
  if (score >= 8) return "Great progress today!"
  if (score >= 6) return "You're doing well."
  if (score >= 4) return "Take it gently today."
  return "Be kind to yourself — consider reaching out."
}

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

/**
 * Number of consecutive days with at least one activity, ending today
 * (or yesterday, so a streak is not lost before the user logs today).
 */
export function dayStreak(dates: Date[], now: Date = new Date()): number {
  const days = new Set(dates.map(dayKey))
  const cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1)

  let streak = 0
  while (days.has(dayKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function startOfToday(now: Date = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function daysAgo(n: number, now: Date = new Date()): Date {
  const d = startOfToday(now)
  d.setDate(d.getDate() - n)
  return d
}

// ─── Guided session catalog ──────────────────────────────────────────────────

export type GuidedSession = {
  slug: string
  type: SessionType
  title: string
  description: string
  durationMin: number
  icon: "brain" | "leaf" | "heart" | "music" | "wind"
}

export const GUIDED_SESSIONS: GuidedSession[] = [
  { slug: "morning-mindfulness", type: "MEDITATION", title: "Morning Mindfulness", description: "Start your day with calm and focus", durationMin: 5, icon: "brain" },
  { slug: "anxiety-relief", type: "MEDITATION", title: "Anxiety Relief", description: "Guided meditation for managing worry", durationMin: 10, icon: "leaf" },
  { slug: "self-compassion", type: "MEDITATION", title: "Self-Compassion", description: "Practice kindness toward yourself", durationMin: 15, icon: "heart" },
  { slug: "body-scan", type: "MEDITATION", title: "Body Scan", description: "Release tension and promote healing", durationMin: 20, icon: "brain" },
  { slug: "sleep-preparation", type: "MEDITATION", title: "Sleep Preparation", description: "Wind down for restful sleep", durationMin: 12, icon: "leaf" },
  { slug: "gratitude-practice", type: "MEDITATION", title: "Gratitude Practice", description: "Cultivate appreciation and joy", durationMin: 8, icon: "heart" },
  { slug: "breathing-478", type: "BREATHING", title: "4-7-8 Breathing", description: "Inhale 4s, hold 7s, exhale 8s — a calming technique for stress relief", durationMin: 3, icon: "wind" },
  { slug: "box-breathing", type: "BREATHING", title: "Box Breathing", description: "Inhale, hold, exhale, hold — 4 seconds each, for balance and focus", durationMin: 4, icon: "wind" },
  { slug: "peaceful-piano", type: "MUSIC", title: "Peaceful Piano", description: "Gentle melodies for relaxation", durationMin: 30, icon: "music" },
  { slug: "nature-sounds", type: "MUSIC", title: "Nature Sounds", description: "Ocean waves and forest ambience", durationMin: 45, icon: "music" },
  { slug: "uplifting-instrumentals", type: "MUSIC", title: "Uplifting Instrumentals", description: "Positive energy and hope", durationMin: 25, icon: "music" },
]

export function findSession(slug: string): GuidedSession | undefined {
  return GUIDED_SESSIONS.find((s) => s.slug === slug)
}

export const JOURNAL_PROMPTS = [
  "What gave you strength today?",
  "How has your perspective changed recently?",
  "What would you tell someone facing similar challenges?",
  "What are you looking forward to?",
  "Describe a small moment that made you smile this week.",
  "Who has supported you lately, and how?",
  "What does your body need from you today?",
  "What is one thing you are proud of?",
]
