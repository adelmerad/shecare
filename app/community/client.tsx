"use client"

import { useEffect, useState, useTransition } from "react"
import { useFormState } from "react-dom"
import { Heart, Plus, Send, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FieldError, FormMessage, SubmitButton, useActionFeedback } from "@/components/form"
import { initialState } from "@/lib/action-state"
import { CATEGORY_LABELS } from "@/lib/format"
import { postCategoryValues } from "@/lib/validation"
import { addComment, createPost, deleteComment, deletePost, toggleLike } from "@/app/actions/community"
import { cn } from "@/lib/utils"

export function CreatePostForm() {
  const [state, action] = useFormState(createPost, initialState)
  const formRef = useActionFeedback(state)

  return (
    <form ref={formRef} action={action} className="space-y-4" noValidate>
      <Textarea
        name="content"
        placeholder="What's on your mind? Share your experience, ask a question, or offer support..."
        className="min-h-[100px]"
        aria-invalid={!!state.errors?.content}
      />
      <FieldError state={state} name="content" />
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">Category</legend>
          {postCategoryValues.map((c, i) => (
            <label key={c} className="cursor-pointer">
              <input type="radio" name="category" value={c} defaultChecked={i === 0} className="peer sr-only" />
              <span className="inline-flex rounded-md border px-3 py-1 text-sm peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring">
                {CATEGORY_LABELS[c]}
              </span>
            </label>
          ))}
        </fieldset>
        <SubmitButton pendingText="Sharing...">
          <Plus className="mr-2 h-4 w-4" />
          Share Story
        </SubmitButton>
      </div>
      <FieldError state={state} name="category" />
      <FormMessage state={state} />
    </form>
  )
}

export function LikeButton({ postId, liked, count }: { postId: string; liked: boolean; count: number }) {
  const [, startTransition] = useTransition()
  // Update the UI immediately; the server action revalidates the real count
  const [optimistic, setOptimistic] = useState({ liked, count })
  useEffect(() => setOptimistic({ liked, count }), [liked, count])

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-pressed={optimistic.liked}
      onClick={() => {
        setOptimistic((s) => ({ liked: !s.liked, count: s.count + (s.liked ? -1 : 1) }))
        startTransition(() => toggleLike(postId))
      }}
    >
      <Heart className={cn("mr-1 h-4 w-4", optimistic.liked && "fill-primary text-primary")} />
      {optimistic.count} {optimistic.count === 1 ? "heart" : "hearts"}
    </Button>
  )
}

export function DeletePostButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this post? Comments will be removed too.")) startTransition(() => deletePost(id))
      }}
    >
      <Trash2 className="mr-1 h-4 w-4" />
      Delete
    </Button>
  )
}

export function CommentForm({ postId }: { postId: string }) {
  const [state, action] = useFormState(addComment, initialState)
  const formRef = useActionFeedback(state)

  return (
    <form ref={formRef} action={action} className="space-y-2" noValidate>
      <input type="hidden" name="postId" value={postId} />
      <div className="flex gap-2">
        <Textarea name="content" placeholder="Write a kind word..." className="min-h-[44px]" aria-label="Comment" />
        <SubmitButton size="icon" aria-label="Send comment">
          <Send className="h-4 w-4" />
        </SubmitButton>
      </div>
      <FieldError state={state} name="content" />
      <FormMessage state={state} />
    </form>
  )
}

export function DeleteCommentButton({ id, postId }: { id: string; postId: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Delete comment"
      disabled={pending}
      onClick={() => startTransition(() => deleteComment(id, postId))}
    >
      <Trash2 className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}
