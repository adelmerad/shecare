"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { parseForm, type ActionState } from "@/lib/action-state"
import { commentSchema, postSchema } from "@/lib/validation"

export async function createPost(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const authorId = await requireUserId()
  const parsed = parseForm(postSchema, formData)
  if (!parsed.success) return parsed.state

  await db.post.create({ data: { ...parsed.data, authorId } })
  revalidatePath("/community")
  revalidatePath("/dashboard")
  return { ok: true, message: "Your story has been shared." }
}

export async function deletePost(id: string) {
  const authorId = await requireUserId()
  await db.post.deleteMany({ where: { id, authorId } })
  revalidatePath("/community")
}

export async function toggleLike(postId: string) {
  const userId = await requireUserId()
  const key = { postId_userId: { postId, userId } }

  const existing = await db.postLike.findUnique({ where: key })
  if (existing) {
    await db.postLike.delete({ where: key })
  } else {
    // upsert is idempotent if the user double-clicks
    await db.postLike.upsert({ where: key, create: { postId, userId }, update: {} })
  }
  revalidatePath("/community")
  revalidatePath(`/community/${postId}`)
}

export async function addComment(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const authorId = await requireUserId()
  const parsed = parseForm(commentSchema, formData)
  if (!parsed.success) return parsed.state

  const post = await db.post.findUnique({ where: { id: parsed.data.postId }, select: { id: true } })
  if (!post) return { ok: false, message: "This post no longer exists." }

  await db.comment.create({ data: { ...parsed.data, authorId } })
  revalidatePath(`/community/${post.id}`)
  revalidatePath("/community")
  return { ok: true, message: "Comment added." }
}

export async function deleteComment(id: string, postId: string) {
  const authorId = await requireUserId()
  await db.comment.deleteMany({ where: { id, authorId } })
  revalidatePath(`/community/${postId}`)
}
