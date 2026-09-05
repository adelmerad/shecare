import type { ZodTypeAny, output } from "zod"

export type ActionState = {
  ok: boolean
  message?: string
  errors?: Record<string, string>
}

export const initialState: ActionState = { ok: false }

export type Parsed<T> = { success: true; data: T } | { success: false; state: ActionState }

/** Validate a FormData payload against a Zod schema and flatten errors per field. */
export function parseForm<S extends ZodTypeAny>(schema: S, formData: FormData): Parsed<output<S>> {
  const raw = Object.fromEntries(formData.entries())
  const result = schema.safeParse(raw)
  if (result.success) return { success: true, data: result.data }

  const errors: Record<string, string> = {}
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "form"
    if (!errors[key]) errors[key] = issue.message
  }
  return { success: false, state: { ok: false, message: "Please fix the highlighted fields.", errors } }
}
