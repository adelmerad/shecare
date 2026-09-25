"use client"

import { useFormState } from "react-dom"
import { Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { FieldError, FormMessage, SubmitButton, useActionFeedback } from "@/components/form"
import { initialState, type ActionState } from "@/lib/action-state"
import {
  changePassword,
  deleteAccount,
  updateMedical,
  updatePersonal,
  updatePreferences,
} from "@/app/actions/profile"

function Field({
  state,
  name,
  label,
  ...props
}: { state: ActionState; name: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} aria-invalid={!!state.errors?.[name]} {...props} />
      <FieldError state={state} name={name} />
    </div>
  )
}

function Area({
  state,
  name,
  label,
  ...props
}: { state: ActionState; name: string; label: string } & React.ComponentProps<typeof Textarea>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea id={name} name={name} aria-invalid={!!state.errors?.[name]} {...props} />
      <FieldError state={state} name={name} />
    </div>
  )
}

export type PersonalValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  location: string
  bio: string
}

export function PersonalForm({ values }: { values: PersonalValues }) {
  const [state, action] = useFormState(updatePersonal, initialState)
  useActionFeedback(state, { reset: false })

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field state={state} name="firstName" label="First Name" defaultValue={values.firstName} />
        <Field state={state} name="lastName" label="Last Name" defaultValue={values.lastName} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" value={values.email} disabled readOnly />
        <p className="text-xs text-muted-foreground">Your email is used to sign in and cannot be changed here.</p>
      </div>
      <Field state={state} name="phone" label="Phone Number" type="tel" defaultValue={values.phone} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field state={state} name="birthDate" label="Date of Birth" type="date" defaultValue={values.birthDate} />
        <Field state={state} name="location" label="Location" defaultValue={values.location} placeholder="Algiers" />
      </div>
      <Area state={state} name="bio" label="Bio" defaultValue={values.bio} placeholder="Tell us a bit about yourself..." />
      <FormMessage state={state} />
      <SubmitButton pendingText="Saving...">Save Changes</SubmitButton>
    </form>
  )
}

export type MedicalValues = Record<
  | "diagnosis"
  | "stage"
  | "diagnosisDate"
  | "treatmentStart"
  | "currentTreatment"
  | "medications"
  | "allergies"
  | "emergencyContact"
  | "cyclesTotal"
  | "cyclesCompleted",
  string
>

export function MedicalForm({ values }: { values: MedicalValues }) {
  const [state, action] = useFormState(updateMedical, initialState)
  useActionFeedback(state, { reset: false })

  return (
    <form action={action} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field state={state} name="diagnosis" label="Diagnosis" defaultValue={values.diagnosis} />
        <Field state={state} name="stage" label="Stage" defaultValue={values.stage} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field state={state} name="diagnosisDate" label="Diagnosis Date" type="date" defaultValue={values.diagnosisDate} />
        <Field state={state} name="treatmentStart" label="Treatment Start Date" type="date" defaultValue={values.treatmentStart} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field state={state} name="cyclesTotal" label="Treatment cycles (total)" type="number" min={1} defaultValue={values.cyclesTotal} />
        <Field state={state} name="cyclesCompleted" label="Cycles completed" type="number" min={0} defaultValue={values.cyclesCompleted} />
      </div>
      <Area state={state} name="currentTreatment" label="Current Treatment" defaultValue={values.currentTreatment} placeholder="Describe your current treatment plan..." />
      <Area state={state} name="medications" label="Current Medications" defaultValue={values.medications} placeholder="List your current medications..." />
      <Field state={state} name="allergies" label="Allergies" defaultValue={values.allergies} placeholder="List any allergies..." />
      <Field state={state} name="emergencyContact" label="Emergency Contact" defaultValue={values.emergencyContact} placeholder="Name and phone number" />
      <FormMessage state={state} />
      <SubmitButton pendingText="Saving...">Update Medical Info</SubmitButton>
    </form>
  )
}

export type PreferenceValues = Record<
  | "appointmentReminders"
  | "medicationReminders"
  | "communityUpdates"
  | "wellnessReminders"
  | "profileVisible"
  | "shareProgress",
  boolean
>

const PREFERENCE_ROWS: { name: keyof PreferenceValues; title: string; description: string; group: "notifications" | "privacy" }[] = [
  { name: "appointmentReminders", title: "Appointment Reminders", description: "Get notified about upcoming consultations", group: "notifications" },
  { name: "medicationReminders", title: "Medication Reminders", description: "Daily reminders for your medications", group: "notifications" },
  { name: "communityUpdates", title: "Community Updates", description: "New posts and messages from the community", group: "notifications" },
  { name: "wellnessReminders", title: "Wellness Reminders", description: "Daily wellness check-ins and meditation reminders", group: "notifications" },
  { name: "profileVisible", title: "Profile Visibility", description: "Show your name on community posts (otherwise you appear as “Community member”)", group: "privacy" },
  { name: "shareProgress", title: "Share Treatment Progress", description: "Share your progress with the community for support", group: "privacy" },
]

export function PreferencesForm({ values, group }: { values: PreferenceValues; group: "notifications" | "privacy" }) {
  const [state, action] = useFormState(updatePreferences, initialState)
  useActionFeedback(state, { reset: false })

  return (
    <form action={action} className="space-y-3">
      {PREFERENCE_ROWS.map((row) =>
        row.group === group ? (
          <label key={row.name} className="flex items-center justify-between gap-4 cursor-pointer">
            <div>
              <p className="font-medium">{row.title}</p>
              <p className="text-sm text-muted-foreground">{row.description}</p>
            </div>
            <input type="checkbox" name={row.name} defaultChecked={values[row.name]} className="h-5 w-5 accent-primary" />
          </label>
        ) : (
          // Keep the other group's values so saving one tab does not reset the other
          values[row.name] && <input key={row.name} type="hidden" name={row.name} value="on" />
        ),
      )}
      <FormMessage state={state} />
      <SubmitButton pendingText="Saving...">Save {group === "privacy" ? "Privacy Settings" : "Preferences"}</SubmitButton>
    </form>
  )
}

export function PasswordForm() {
  const [state, action] = useFormState(changePassword, initialState)
  const formRef = useActionFeedback(state)

  return (
    <form ref={formRef} action={action} className="space-y-3" noValidate>
      <Field state={state} name="currentPassword" label="Current password" type="password" autoComplete="current-password" />
      <Field state={state} name="newPassword" label="New password" type="password" autoComplete="new-password" />
      <Field state={state} name="confirmPassword" label="Confirm new password" type="password" autoComplete="new-password" />
      <FormMessage state={state} />
      <SubmitButton variant="outline" pendingText="Updating...">
        Change Password
      </SubmitButton>
    </form>
  )
}

export function ExportButton() {
  return (
    <Button asChild variant="outline" className="w-full justify-start bg-transparent">
      <a href="/api/me/export" download>
        <Download className="mr-2 h-4 w-4" />
        Download My Data (JSON)
      </a>
    </Button>
  )
}

export function DeleteAccountForm() {
  const [state, action] = useFormState(deleteAccount, initialState)

  return (
    <form action={action} className="space-y-3" noValidate>
      <Field state={state} name="password" label="Password" type="password" autoComplete="current-password" />
      <Field state={state} name="confirm" label='Type "DELETE" to confirm' autoComplete="off" />
      <FormMessage state={state} />
      <SubmitButton variant="destructive" className="w-full" pendingText="Deleting...">
        Delete Account
      </SubmitButton>
      <p className="text-xs text-muted-foreground">
        This action cannot be undone. All your data will be permanently deleted.
      </p>
    </form>
  )
}
