"use client"

import { useFormState } from "react-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldError, FormMessage, SubmitButton } from "@/components/form"
import { initialState } from "@/lib/action-state"
import { registerAction } from "@/app/actions/auth"

export function RegisterForm() {
  const [state, action] = useFormState(registerAction, initialState)
  const invalid = (name: string) => !!state.errors?.[name]

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" required aria-invalid={invalid("firstName")} />
          <FieldError state={state} name="firstName" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" required aria-invalid={invalid("lastName")} />
          <FieldError state={state} name="lastName" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required aria-invalid={invalid("email")} />
        <FieldError state={state} name="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={invalid("password")}
        />
        <p className="text-xs text-muted-foreground">At least 8 characters, with a letter and a number.</p>
        <FieldError state={state} name="password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          aria-invalid={invalid("confirmPassword")}
        />
        <FieldError state={state} name="confirmPassword" />
      </div>
      <FormMessage state={state} />
      <SubmitButton className="w-full" pendingText="Creating account...">
        Create account
      </SubmitButton>
      <p className="text-xs text-muted-foreground text-center">
        Your health data is private and only visible to you.
      </p>
    </form>
  )
}
