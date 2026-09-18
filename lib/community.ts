import type { Prisma } from "@prisma/client"

export const PAGE_SIZE = 10

/** Author fields needed to render a post or comment, honouring the profile visibility setting. */
export const authorSelect = {
  id: true,
  firstName: true,
  lastName: true,
  preferences: { select: { profileVisible: true } },
} satisfies Prisma.UserSelect

type Author = Prisma.UserGetPayload<{ select: typeof authorSelect }>

export function displayName(author: Author, viewerId: string): string {
  if (author.id === viewerId) return "You"
  if (author.preferences && !author.preferences.profileVisible) return "Community member"
  return `${author.firstName} ${author.lastName.charAt(0)}.`
}

export function displayInitials(author: Author): string {
  if (author.preferences && !author.preferences.profileVisible) return "SC"
  return `${author.firstName.charAt(0)}${author.lastName.charAt(0)}`.toUpperCase()
}
