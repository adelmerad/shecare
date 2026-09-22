"use client"

import { useEffect, useState, useTransition } from "react"
import { useFormState } from "react-dom"
import { format } from "date-fns"
import type { ConsultationMode } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldError, FormMessage, SubmitButton, selectClass } from "@/components/form"
import { initialState } from "@/lib/action-state"
import { MODE_LABELS, formatDzd } from "@/lib/format"
import { MAX_DAYS_AHEAD, combineDateTime, dailySlots, isWorkDay } from "@/lib/booking"
import { bookAppointment, cancelAppointment, takenSlots } from "@/app/actions/consultations"
import { toast } from "sonner"

type Specialist = {
  id: string
  name: string
  priceDzd: number
  durationMin: number
  modes: ConsultationMode[]
}

export function BookDialog({ specialist, defaultMode }: { specialist: Specialist; defaultMode?: ConsultationMode }) {
  const [open, setOpen] = useState(false)
  const [state, action] = useFormState(bookAppointment, initialState)
  const [date, setDate] = useState("")
  const [taken, setTaken] = useState<string[]>([])

  useEffect(() => {
    if (state.ok) {
      toast.success(state.message)
      setOpen(false)
      setDate("")
    }
  }, [state])

  useEffect(() => {
    if (!date) return
    let cancelled = false
    takenSlots(specialist.id, date).then((t) => !cancelled && setTaken(t))
    return () => {
      cancelled = true
    }
  }, [date, specialist.id])

  const today = new Date()
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + MAX_DAYS_AHEAD)
  const chosenDay = date ? combineDateTime(date, "00:00") : null
  const closedDay = chosenDay !== null && !isWorkDay(chosenDay)
  const slots = date
    ? dailySlots(specialist.durationMin).filter((t) => combineDateTime(date, t) > today && !taken.includes(t))
    : []

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="mt-2">
          Book Now
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book with {specialist.name}</DialogTitle>
          <DialogDescription>
            {specialist.durationMin} min · {formatDzd(specialist.priceDzd)} · Sunday to Thursday, 9:00–17:00
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4" noValidate>
          <input type="hidden" name="specialistId" value={specialist.id} />
          <div className="space-y-2">
            <Label htmlFor={`mode-${specialist.id}`}>Consultation type</Label>
            <select
              id={`mode-${specialist.id}`}
              name="mode"
              defaultValue={defaultMode && specialist.modes.includes(defaultMode) ? defaultMode : specialist.modes[0]}
              className={selectClass}
            >
              {specialist.modes.map((m) => (
                <option key={m} value={m}>
                  {MODE_LABELS[m]}
                </option>
              ))}
            </select>
            <FieldError state={state} name="mode" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`date-${specialist.id}`}>Date</Label>
              <Input
                id={`date-${specialist.id}`}
                name="date"
                type="date"
                value={date}
                min={format(today, "yyyy-MM-dd")}
                max={format(maxDate, "yyyy-MM-dd")}
                onChange={(e) => setDate(e.target.value)}
              />
              <FieldError state={state} name="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`time-${specialist.id}`}>Time</Label>
              <select
                id={`time-${specialist.id}`}
                name="time"
                defaultValue=""
                key={date}
                className={selectClass}
                disabled={!date || closedDay || slots.length === 0}
              >
                <option value="" disabled>
                  {!date ? "Pick a date first" : closedDay ? "Closed this day" : slots.length ? "Choose" : "Fully booked"}
                </option>
                {!closedDay &&
                  slots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
              </select>
              <FieldError state={state} name="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`notes-${specialist.id}`}>Notes for the specialist (optional)</Label>
            <Textarea id={`notes-${specialist.id}`} name="notes" placeholder="What would you like to discuss?" />
          </div>
          <FormMessage state={state} />
          <DialogFooter>
            <SubmitButton pendingText="Booking...">Confirm booking</SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function CancelAppointmentButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition()
  return (
    <Button
      size="sm"
      variant="outline"
      className="w-full mt-3 bg-transparent"
      disabled={pending}
      onClick={() => {
        if (!confirm("Cancel this appointment?")) return
        startTransition(async () => {
          await cancelAppointment(id)
          toast.success("Appointment cancelled.")
        })
      }}
    >
      {pending ? "Cancelling..." : "Cancel appointment"}
    </Button>
  )
}
