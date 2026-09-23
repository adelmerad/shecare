import { format } from "date-fns"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, Video, Phone, MessageSquare, Star } from "lucide-react"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { MODE_LABELS, dayAndTime, formatDzd } from "@/lib/format"
import { BookDialog, CancelAppointmentButton } from "./client"

export const metadata = { title: "Consultations · SheCare" }

const MODE_INFO = [
  { mode: "VIDEO", icon: Video, title: "Video Consultation", description: "Face-to-face consultation from home" },
  { mode: "PHONE", icon: Phone, title: "Phone Consultation", description: "Quick consultation over the phone" },
  { mode: "CHAT", icon: MessageSquare, title: "Chat Consultation", description: "Text-based consultation" },
] as const

function specialistInitials(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export default async function ConsultationsPage() {
  const userId = await requireUserId()
  const now = new Date()

  const [specialists, upcoming, past] = await Promise.all([
    db.specialist.findMany({ orderBy: { rating: "desc" } }),
    db.appointment.findMany({
      where: { userId, status: "SCHEDULED", startsAt: { gte: now } },
      orderBy: { startsAt: "asc" },
      include: { specialist: true },
    }),
    db.appointment.findMany({
      where: { userId, OR: [{ startsAt: { lt: now } }, { status: { not: "SCHEDULED" } }] },
      orderBy: { startsAt: "desc" },
      take: 5,
      include: { specialist: { select: { name: true } } },
    }),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Medical Consultations</h1>
          <p className="text-muted-foreground">Connect with specialized healthcare professionals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {MODE_INFO.map(({ mode, icon: Icon, title, description }) => (
            <Card key={mode}>
              <CardHeader className="text-center">
                <Icon className="h-12 w-12 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-sm text-muted-foreground">
                  {specialists.filter((s) => s.modes.includes(mode)).length} specialists available
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Specialists</CardTitle>
                <CardDescription>Choose from our network of breast cancer specialists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {specialists.map((s) => (
                  <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback>{specialistInitials(s.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{s.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {s.specialty} • {s.yearsExperience} years experience
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center" aria-label={`Rated ${s.rating} out of 5`}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < Math.round(s.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">
                          {s.rating.toFixed(1)} ({s.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center mt-2 gap-2">
                        {s.modes.map((m) => (
                          <Badge key={m} variant="outline">
                            {MODE_LABELS[m]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <p className="font-semibold">{formatDzd(s.priceDzd)}</p>
                      <p className="text-sm text-muted-foreground">{s.durationMin} min</p>
                      <BookDialog
                        specialist={{ id: s.id, name: s.name, priceDzd: s.priceDzd, durationMin: s.durationMin, modes: s.modes }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No upcoming appointments.</p>}
                {upcoming.map((a) => {
                  const end = new Date(a.startsAt.getTime() + a.specialist.durationMin * 60_000)
                  return (
                    <div key={a.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{a.specialist.name}</h4>
                        <Badge variant="secondary">{MODE_LABELS[a.mode]}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(a.startsAt, "EEEE, MMM d")}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {format(a.startsAt, "h:mm a")} - {format(end, "h:mm a")}
                        </span>
                      </div>
                      <CancelAppointmentButton id={a.id} />
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {past.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Past & Cancelled</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {past.map((a) => (
                    <div key={a.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{a.specialist.name}</p>
                        <p className="text-muted-foreground">{dayAndTime(a.startsAt)}</p>
                      </div>
                      <Badge variant="outline">{a.status === "CANCELLED" ? "Cancelled" : "Completed"}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Support</CardTitle>
                <CardDescription>If you have an urgent medical concern, do not wait for an appointment</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="destructive" className="w-full">
                  <a href="tel:14">
                    <Phone className="mr-2 h-4 w-4" />
                    Call emergency services (14)
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Protection Civile — available 24/7
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
