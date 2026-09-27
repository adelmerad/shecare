import Link from "next/link"
import { differenceInCalendarDays, startOfMonth } from "date-fns"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Heart, MessageCircle, BookOpen, Phone, Activity } from "lucide-react"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { wellnessScore, MOOD_LABELS } from "@/lib/wellness"
import { CATEGORY_LABELS, MODE_LABELS, SEVERITY_LABELS, dayAndTime, timeAgo } from "@/lib/format"
import { daysBetween } from "@/lib/profile"

export const metadata = { title: "Dashboard · SheCare" }

type ActivityItem = { at: Date; label: string; tag: string }

export default async function DashboardPage() {
  const userId = await requireUserId()
  const now = new Date()

  const [user, latestLog, previousLog, postsThisMonth, upcoming, recentSymptoms, recentJournal, recentPosts, recentLogs] =
    await Promise.all([
      db.user.findUniqueOrThrow({ where: { id: userId }, include: { medical: true } }),
      db.dailyLog.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" } }),
      db.dailyLog.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" }, skip: 1 }),
      db.post.count({ where: { authorId: userId, createdAt: { gte: startOfMonth(now) } } }),
      db.appointment.findMany({
        where: { userId, status: "SCHEDULED", startsAt: { gte: now } },
        orderBy: { startsAt: "asc" },
        take: 3,
        include: { specialist: { select: { name: true } } },
      }),
      db.symptomLog.findMany({ where: { userId }, orderBy: { loggedAt: "desc" }, take: 3 }),
      db.journalEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3, select: { createdAt: true } }),
      db.post.findMany({ where: { authorId: userId }, orderBy: { createdAt: "desc" }, take: 3, select: { createdAt: true, category: true } }),
      db.dailyLog.findMany({ where: { userId }, orderBy: { loggedAt: "desc" }, take: 3, select: { loggedAt: true, mood: true } }),
    ])

  const m = user.medical
  const score = latestLog ? wellnessScore(latestLog) : null
  const scoreDelta = latestLog && previousLog ? Math.round((wellnessScore(latestLog) - wellnessScore(previousLog)) * 10) / 10 : null
  const treatmentDays = m?.treatmentStart ? daysBetween(m.treatmentStart, now) : null
  const next = upcoming[0]
  const cycles = m?.cyclesTotal ? { done: m.cyclesCompleted ?? 0, total: m.cyclesTotal } : null

  const activity: ActivityItem[] = [
    ...recentLogs.map((l) => ({ at: l.loggedAt, label: `Logged daily check-in (${MOOD_LABELS[l.mood].toLowerCase()})`, tag: "Health" })),
    ...recentSymptoms.map((s) => ({ at: s.loggedAt, label: `Logged ${s.name.toLowerCase()} (${SEVERITY_LABELS[s.severity].toLowerCase()})`, tag: "Health" })),
    ...recentJournal.map((j) => ({ at: j.createdAt, label: "Wrote a journal entry", tag: "Wellness" })),
    ...recentPosts.map((p) => ({ at: p.createdAt, label: `Shared a ${CATEGORY_LABELS[p.category].toLowerCase()} story`, tag: "Community" })),
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 5)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user.firstName}</h1>
          <p className="text-muted-foreground">Here&apos;s your health journey overview</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treatment Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{treatmentDays ?? "—"}</div>
              <p className="text-xs text-muted-foreground">
                {treatmentDays === null ? (
                  <Link href="/profile" className="underline">
                    Add your treatment start date
                  </Link>
                ) : (
                  "Since treatment started"
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{score ?? "—"}</div>
              <p className="text-xs text-muted-foreground">
                {scoreDelta === null
                  ? score === null
                    ? "Log your first check-in"
                    : "From your latest check-in"
                  : `${scoreDelta >= 0 ? "+" : ""}${scoreDelta} from previous check-in`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{postsThisMonth}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{next ? differenceInCalendarDays(next.startsAt, now) : "—"}</div>
              <p className="text-xs text-muted-foreground">
                {next ? (differenceInCalendarDays(next.startsAt, now) === 0 ? "Today" : "Days away") : "None scheduled"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Treatment Progress</CardTitle>
              <CardDescription>{m?.currentTreatment || "Your current treatment cycle overview"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cycles ? (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>
                      Cycle {cycles.done} of {cycles.total}
                    </span>
                    <span>{Math.round((cycles.done / cycles.total) * 100)}%</span>
                  </div>
                  <Progress value={(cycles.done / cycles.total) * 100} className="h-2" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Add your treatment cycles in your{" "}
                  <Link href="/profile" className="underline">
                    medical profile
                  </Link>{" "}
                  to follow your progress.
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Upcoming</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {upcoming.length === 0 && <p>No appointments scheduled</p>}
                    {upcoming.map((a) => (
                      <p key={a.id}>
                        • {a.specialist.name} ({MODE_LABELS[a.mode].toLowerCase()}) — {dayAndTime(a.startsAt)}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recent Symptoms</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    {recentSymptoms.length === 0 && <p>No symptoms logged</p>}
                    {recentSymptoms.map((s) => (
                      <p key={s.id}>
                        • {s.name} — {SEVERITY_LABELS[s.severity]}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/consultations">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Consultation
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/health-tracker">
                  <Activity className="mr-2 h-4 w-4" />
                  Log Symptoms
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/community">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Join the Community
                </Link>
              </Button>
              <Button asChild className="w-full justify-start bg-transparent" variant="outline">
                <Link href="/resources">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Resources
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {activity.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your activity will appear here once you start tracking.</p>
            ) : (
              <div className="space-y-4">
                {activity.map((a, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{a.label}</p>
                      <p className="text-xs text-muted-foreground">{timeAgo(a.at)}</p>
                    </div>
                    <Badge variant={a.tag === "Community" ? "outline" : "secondary"}>{a.tag}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
