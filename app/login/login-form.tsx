"use client"

import { useFormState } from "react-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldError, FormMessage, SubmitButton } from "@/components/form"
import { initialState } from "@/lib/action-state"
import { loginAction } from "@/app/actions/auth"

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, action] = useFormState(loginAction, initialState)

  return (
    <form action={action} className="space-y-4" noValidate>
      {callbackUrl && <input type="hidden" name="callbackUrl" value={callbackUrl} />}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!state.errors?.email} />
        <FieldError state={state} name="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={!!state.errors?.password}
        />
        <FieldError state={state} name="password" />
      </div>
      <FormMessage state={state} />
      <SubmitButton className="w-full" pendingText="Signing in...">
        Sign in
      </SubmitButton>
    </form>
  )
}
