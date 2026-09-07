"use client"

import { useEffect, useRef, type ComponentProps } from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import type { ActionState } from "@/lib/action-state"
import { cn } from "@/lib/utils"

export function SubmitButton({ children, pendingText, ...props }: ComponentProps<typeof Button> & { pendingText?: string }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending || props.disabled} {...props}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending && pendingText ? pendingText : children}
    </Button>
  )
}

export function FieldError({ state, name }: { state: ActionState; name: string }) {
  const message = state.errors?.[name]
  if (!message) return null
  return (
    <p id={`${name}-error`} className="text-sm text-destructive">
      {message}
    </p>
  )
}

export function FormMessage({ state, className }: { state: ActionState; className?: string }) {
  if (!state.message || state.ok) return null
  return <p className={cn("text-sm text-destructive", className)}>{state.message}</p>
}

export const selectClass =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"

/** Toast on success and clear the form, so the same component can be reused for many entries. */
export function useActionFeedback(state: ActionState, options: { reset?: boolean } = {}) {
  const formRef = useRef<HTMLFormElement>(null)
  const { reset = true } = options

  useEffect(() => {
    if (state.ok && state.message) {
      toast.success(state.message)
      if (reset) formRef.current?.reset()
    }
  }, [state, reset])

  return formRef
}
