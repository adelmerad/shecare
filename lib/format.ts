import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from "date-fns"
import type { ConsultationMode, PostCategory, ResourceType, Severity } from "@prisma/client"

export const SEVERITY_LABELS: Record<Severity, string> = {
  NONE: "None",
  MILD: "Mild",
  MODERATE: "Moderate",
  SEVERE: "Severe",
}

export const SEVERITY_VARIANT: Record<Severity, "outline" | "secondary" | "destructive"> = {
  NONE: "outline",
  MILD: "secondary",
  MODERATE: "destructive",
  SEVERE: "destructive",
}

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  SUPPORT: "Support",
  QUESTION: "Question",
  VICTORY: "Victory",
}

export const MODE_LABELS: Record<ConsultationMode, string> = {
  VIDEO: "Video",
  PHONE: "Phone",
  CHAT: "Chat",
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  ARTICLE: "Article",
  VIDEO: "Video",
  PDF: "PDF",
}

export function timeAgo(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

/** "Today, 2:30 PM" / "Yesterday, 9:15 AM" / "Mar 3, 11:45 AM" */
export function dayAndTime(date: Date): string {
  const time = format(date, "h:mm a")
  if (isToday(date)) return `Today, ${time}`
  if (isYesterday(date)) return `Yesterday, ${time}`
  if (isTomorrow(date)) return `Tomorrow, ${time}`
  return `${format(date, "MMM d")}, ${time}`
}

export function initials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

export function formatDzd(amount: number): string {
  return `${amount.toLocaleString("fr-DZ")} DA`
}

export function toDateInput(date: Date | null | undefined): string {
  return date ? format(date, "yyyy-MM-dd") : ""
}
