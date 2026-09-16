"use client"

import { useFormState } from "react-dom"
import { useTransition } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FieldError, FormMessage, SubmitButton, selectClass, useActionFeedback } from "@/components/form"
import { initialState } from "@/lib/action-state"
import { MOOD_LABELS } from "@/lib/wellness"
import { SEVERITY_LABELS } from "@/lib/format"
import { moodValues, severityValues } from "@/lib/validation"
import { deleteDailyLog, deleteSymptom, logSymptom, saveDailyLog, saveVitals } from "@/app/actions/health"

export function DailyLogForm() {
  const [state, action] = useFormState(saveDailyLog, initialState)
  const formRef = useActionFeedback(state)

  return (
    <form ref={formRef} action={action} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="energy">Energy Level (1-10)</Label>
          <Input id="energy" name="energy" type="number" min="1" max="10" placeholder="7" aria-invalid={!!state.errors?.energy} />
          <FieldError state={state} name="energy" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mood">Mood</Label>
          <select id="mood" name="mood" defaultValue="" className={selectClass} aria-invalid={!!state.errors?.mood}>
            <option value="" disabled>
              How do you feel?
            </option>
            {moodValues.map((m) => (
              <option key={m} value={m}>
                {MOOD_LABELS[m]}
              </option>
            ))}
          </select>
          <FieldError state={state} name="mood" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sleepHours">Sleep (hours)</Label>
          <Input id="sleepHours" name="sleepHours" type="number" step="0.5" min="0" max="24" placeholder="7.5" />
          <FieldError state={state} name="sleepHours" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="waterGlasses">Water (glasses)</Label>
          <Input id="waterGlasses" name="waterGlasses" type="number" min="0" max="30" placeholder="6" />
          <FieldError state={state} name="waterGlasses" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" placeholder="Any symptoms, side effects, or observations..." />
        <FieldError state={state} name="notes" />
      </div>
      <FormMessage state={state} />
      <SubmitButton pendingText="Saving...">
        <Plus className="mr-2 h-4 w-4" />
        Save Entry
      </SubmitButton>
    </form>
  )
}

export function SymptomForm() {
  const [state, action] = useFormState(logSymptom, initialState)
  const formRef = useActionFeedback(state)

  return (
    <form ref={formRef} action={action} className="space-y-3" noValidate>
      <Input name="name" placeholder="Symptom name" aria-label="Symptom name" aria-invalid={!!state.errors?.name} />
      <FieldError state={state} name="name" />
      <select name="severity" defaultValue="" className={selectClass} aria-label="Severity">
        <option value="" disabled>
          Severity Level
        </option>
        {severityValues.map((s) => (
          <option key={s} value={s}>
            {SEVERITY_LABELS[s]}
          </option>
        ))}
      </select>
      <FieldError state={state} name="severity" />
      <Textarea name="notes" placeholder="Additional notes..." aria-label="Notes" />
      <FormMessage state={state} />
      <SubmitButton className="w-full" pendingText="Logging...">
        Log Symptom
      </SubmitButton>
    </form>
  )
}

export function VitalsForm() {
  const [state, action] = useFormState(saveVitals, initialState)
  const formRef = useActionFeedback(state)

  return (
    <form ref={formRef} action={action} className="space-y-3" noValidate>
      <div className="grid grid-cols-2 gap-2">
        <Input name="temperature" type="number" step="0.1" placeholder="Temperature (°C)" aria-label="Temperature" />
        <Input name="heartRate" type="number" placeholder="Heart Rate (BPM)" aria-label="Heart rate" />
      </div>
      <FieldError state={state} name="temperature" />
      <FieldError state={state} name="heartRate" />
      <div className="grid grid-cols-2 gap-2">
        <Input name="systolic" type="number" placeholder="Blood Pressure (Sys)" aria-label="Systolic" />
        <Input name="diastolic" type="number" placeholder="Blood Pressure (Dia)" aria-label="Diastolic" />
      </div>
      <FieldError state={state} name="systolic" />
      <FieldError state={state} name="diastolic" />
      <FormMessage state={state} />
      <SubmitButton className="w-full" pendingText="Saving...">
        Save Vitals
      </SubmitButton>
    </form>
  )
}

export function DeleteButton({ id, kind }: { id: string; kind: "symptom" | "log" }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Delete"
      disabled={pending}
      onClick={() => startTransition(() => (kind === "symptom" ? deleteSymptom(id) : deleteDailyLog(id)))}
    >
      <Trash2 className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}
