"use client"

import { useState, useTransition } from "react"
import { useFormState } from "react-dom"
import { Brain, Check, Heart, Leaf, Music, Play, Trash2, Wind } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { FieldError, FormMessage, SubmitButton, useActionFeedback } from "@/components/form"
import { initialState } from "@/lib/action-state"
import { JOURNAL_PROMPTS, type GuidedSession } from "@/lib/wellness"
import { completeSession, deleteJournalEntry, saveJournalEntry } from "@/app/actions/wellness"

const ICONS = { brain: Brain, leaf: Leaf, heart: Heart, music: Music, wind: Wind }

export function SessionCard({ session, doneToday }: { session: GuidedSession; doneToday: boolean }) {
  const [pending, startTransition] = useTransition()
  const Icon = ICONS[session.icon]

  const complete = () =>
    startTransition(async () => {
      const result = await completeSession(session.slug)
      if (result.ok) toast.success(result.message)
      else toast.error(result.message)
    })

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Icon className="h-8 w-8 text-primary" />
          <Badge variant="secondary">{session.durationMin} min</Badge>
        </div>
        <CardTitle className="text-lg">{session.title}</CardTitle>
        <CardDescription>{session.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full" onClick={complete} disabled={pending} variant={doneToday ? "outline" : "default"}>
          {doneToday ? <Check className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {pending ? "Saving..." : doneToday ? "Done today · log again" : "Mark as completed"}
        </Button>
      </CardContent>
    </Card>
  )
}

export function JournalForm() {
  const [state, action] = useFormState(saveJournalEntry, initialState)
  const formRef = useActionFeedback(state)
  const [prompt, setPrompt] = useState(JOURNAL_PROMPTS[0])

  const nextPrompt = () => {
    const others = JOURNAL_PROMPTS.filter((p) => p !== prompt)
    setPrompt(others[Math.floor(Math.random() * others.length)])
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Reflection</CardTitle>
          <CardDescription>Express your thoughts and feelings — only you can see them</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={action} className="space-y-4" noValidate>
            <input type="hidden" name="prompt" value={prompt} />
            <div>
              <h4 className="font-medium mb-2">How are you feeling today?</h4>
              <Textarea
                name="feelings"
                className="min-h-[100px]"
                placeholder="Write about your emotions, experiences, or anything on your mind..."
                aria-invalid={!!state.errors?.feelings}
              />
              <FieldError state={state} name="feelings" />
            </div>
            <div>
              <h4 className="font-medium mb-2">What are you grateful for?</h4>
              <Textarea name="gratitude" className="min-h-[80px]" placeholder="List three things you're grateful for today..." />
            </div>
            <FormMessage state={state} />
            <SubmitButton className="w-full" pendingText="Saving...">
              Save Entry
            </SubmitButton>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Journal Prompt</CardTitle>
          <CardDescription>A guided question for deeper reflection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-lg bg-primary/5">
            <p className="font-medium">{prompt}</p>
          </div>
          <p className="text-sm text-muted-foreground">The prompt is saved with your entry.</p>
          <Button variant="outline" className="w-full bg-transparent" onClick={nextPrompt} type="button">
            Get New Prompt
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export function DeleteJournalButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Delete entry"
      disabled={pending}
      onClick={() => {
        if (confirm("Delete this journal entry?")) startTransition(() => deleteJournalEntry(id))
      }}
    >
      <Trash2 className="h-4 w-4 text-muted-foreground" />
    </Button>
  )
}
