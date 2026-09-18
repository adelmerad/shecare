import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from "lucide-react"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import {
  GUIDED_SESSIONS,
  MOOD_LABELS,
  averageScore,
  dayStreak,
  daysAgo,
  scoreLabel,
  startOfToday,
  wellnessScore,
} from "@/lib/wellness"
import { dayAndTime } from "@/lib/format"
import { DeleteJournalButton, JournalForm, SessionCard } from "./client"

export const metadata = { title: "Wellness · SheCare" }

export default async function WellnessPage() {
  const userId = await requireUserId()
  const weekAgo = daysAgo(6)
  const today = startOfToday()

  const [latestLog, weekLogs, weekSessions, weekJournal, recentJournal, activity] = await Promise.all([
    db.dailyLog.findFirst({ where: { userId }, orderBy: { loggedAt: "desc" } }),
    db.dailyLog.findMany({ where: { userId, loggedAt: { gte: weekAgo } }, select: { energy: true, mood: true } }),
    db.wellnessSession.findMany({ where: { userId, completedAt: { gte: weekAgo } }, select: { slug: true, completedAt: true } }),
    db.journalEntry.count({ where: { userId, createdAt: { gte: weekAgo } } }),
    db.journalEntry.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 5 }),
    // Dates of any wellness activity in the last 60 days, for the streak
    Promise.all([
      db.dailyLog.findMany({ where: { userId, loggedAt: { gte: daysAgo(60) } }, select: { loggedAt: true } }),
      db.wellnessSession.findMany({ where: { userId, completedAt: { gte: daysAgo(60) } }, select: { completedAt: true } }),
      db.journalEntry.findMany({ where: { userId, createdAt: { gte: daysAgo(60) } }, select: { createdAt: true } }),
    ]),
  ])

  const score = latestLog ? wellnessScore(latestLog) : null
  const average = averageScore(weekLogs)
  const doneToday = new Set(weekSessions.filter((s) => s.completedAt >= today).map((s) => s.slug))
  const streak = dayStreak([
    ...activity[0].map((a) => a.loggedAt),
    ...activity[1].map((a) => a.completedAt),
    ...activity[2].map((a) => a.createdAt),
  ])

  const byType = (type: string) => GUIDED_SESSIONS.filter((s) => s.type === type)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mental Wellness Hub</h1>
          <p className="text-muted-foreground">Tools and resources for emotional well-being during your journey</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Your Wellness Score
            </CardTitle>
            <CardDescription>Based on your latest health tracker entry (mood and energy)</CardDescription>
          </CardHeader>
          <CardContent>
            {score === null || !latestLog ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-muted-foreground">Log how you feel today to see your wellness score.</p>
                <Button asChild>
                  <Link href="/health-tracker">Log today</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">{score}/10</div>
                    <p className="text-sm text-muted-foreground">{scoreLabel(score)}</p>
                  </div>
                  <div className="w-32">
                    <Progress value={score * 10} className="h-3" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold">Mood</div>
                    <Badge variant="secondary">{MOOD_LABELS[latestLog.mood]}</Badge>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Energy</div>
                    <Badge variant="secondary">{latestLog.energy}/10</Badge>
                  </div>
                  <div>
                    <div className="text-lg font-semibold">Logged</div>
                    <Badge variant="outline">{dayAndTime(latestLog.loggedAt)}</Badge>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="meditation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="journaling">Journaling</TabsTrigger>
            <TabsTrigger value="music">Music</TabsTrigger>
          </TabsList>

          <TabsContent value="meditation">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {byType("MEDITATION").map((s) => (
                <SessionCard key={s.slug} session={s} doneToday={doneToday.has(s.slug)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="breathing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {byType("BREATHING").map((s) => (
                <SessionCard key={s.slug} session={s} doneToday={doneToday.has(s.slug)} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="journaling" className="space-y-6">
            <JournalForm />
            {recentJournal.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Entries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentJournal.map((j) => (
                    <div key={j.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">{dayAndTime(j.createdAt)}</p>
                          {j.prompt && <p className="text-sm italic text-muted-foreground mt-1">{j.prompt}</p>}
                        </div>
                        <DeleteJournalButton id={j.id} />
                      </div>
                      <p className="mt-2 whitespace-pre-line">{j.feelings}</p>
                      {j.gratitude && (
                        <p className="mt-2 text-sm">
                          <span className="font-medium">Grateful for: </span>
                          {j.gratitude}
                        </p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="music">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {byType("MUSIC").map((s) => (
                <SessionCard key={s.slug} session={s} doneToday={doneToday.has(s.slug)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Wellness Journey</CardTitle>
            <CardDescription>Your activity over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{weekSessions.length}</div>
                <p className="text-sm text-muted-foreground">Sessions this week</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{weekJournal}</div>
                <p className="text-sm text-muted-foreground">Journal entries this week</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{average ?? "—"}</div>
                <p className="text-sm text-muted-foreground">Average wellness score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{streak}</div>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
