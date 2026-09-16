import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Heart, Thermometer, Droplets, Moon, Gauge } from "lucide-react"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { MOOD_LABELS, startOfToday } from "@/lib/wellness"
import { SEVERITY_LABELS, SEVERITY_VARIANT, dayAndTime } from "@/lib/format"
import { DailyLogForm, DeleteButton, SymptomForm, VitalsForm } from "./forms"

export const metadata = { title: "Health Tracker · SheCare" }

const WATER_GOAL = 8

export default async function HealthTrackerPage() {
  const userId = await requireUserId()

  const [today, symptoms, latestVitals, history] = await Promise.all([
    db.dailyLog.findFirst({ where: { userId, loggedAt: { gte: startOfToday() } }, orderBy: { loggedAt: "desc" } }),
    db.symptomLog.findMany({ where: { userId }, orderBy: { loggedAt: "desc" }, take: 10 }),
    db.vitalReading.findFirst({ where: { userId }, orderBy: { recordedAt: "desc" } }),
    db.dailyLog.findMany({ where: { userId }, orderBy: { loggedAt: "desc" }, take: 20 }),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Health Tracker</h1>
          <p className="text-muted-foreground">Monitor your symptoms and wellness journey</p>
        </div>

        <Tabs defaultValue="today" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{today ? `${today.energy}/10` : "—"}</div>
                  <Progress value={today ? today.energy * 10 : 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mood</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{today ? MOOD_LABELS[today.mood] : "—"}</div>
                  <p className="text-xs text-muted-foreground mt-2">{today ? "Logged today" : "Not logged yet"}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{today?.sleepHours != null ? `${today.sleepHours}h` : "—"}</div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {today?.sleepHours != null ? (today.sleepHours >= 7 ? "Quality sleep" : "Try to rest more") : "No data"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {today?.waterGlasses != null ? `${today.waterGlasses}/${WATER_GOAL}` : "—"}
                  </div>
                  <Progress
                    value={today?.waterGlasses != null ? Math.min(100, (today.waterGlasses / WATER_GOAL) * 100) : 0}
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Log Entry</CardTitle>
                <CardDescription>Record how you&apos;re feeling today</CardDescription>
              </CardHeader>
              <CardContent>
                <DailyLogForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Tracker</CardTitle>
                <CardDescription>Log and monitor treatment side effects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Recent Symptoms</h3>
                    {symptoms.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No symptoms logged yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {symptoms.map((s) => (
                          <div key={s.id} className="flex items-center justify-between gap-2 p-3 border rounded-lg">
                            <div className="min-w-0">
                              <p className="font-medium truncate">{s.name}</p>
                              <p className="text-xs text-muted-foreground">{dayAndTime(s.loggedAt)}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant={SEVERITY_VARIANT[s.severity]}>{SEVERITY_LABELS[s.severity]}</Badge>
                              <DeleteButton id={s.id} kind="symptom" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Symptom</h3>
                    <SymptomForm />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>
                  {latestVitals ? `Last reading: ${dayAndTime(latestVitals.recordedAt)}` : "Track important health metrics"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Thermometer className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">Temperature</h3>
                        <p className="text-2xl font-bold">
                          {latestVitals?.temperature != null ? `${latestVitals.temperature}°C` : "—"}
                        </p>
                        {latestVitals?.temperature != null && (
                          <p className="text-sm text-muted-foreground">
                            {latestVitals.temperature >= 38 ? "Fever — contact your care team" : "Normal"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Heart className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">Heart Rate</h3>
                        <p className="text-2xl font-bold">
                          {latestVitals?.heartRate != null ? `${latestVitals.heartRate} BPM` : "—"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Gauge className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">Blood Pressure</h3>
                        <p className="text-2xl font-bold">
                          {latestVitals?.systolic != null && latestVitals?.diastolic != null
                            ? `${latestVitals.systolic}/${latestVitals.diastolic}`
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Log New Reading</h3>
                    <VitalsForm />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health History</CardTitle>
                <CardDescription>Your last {history.length || ""} daily entries</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your daily entries will appear here.</p>
                ) : (
                  <div className="space-y-4">
                    {history.map((h) => (
                      <div key={h.id} className="flex items-center justify-between gap-4 p-4 border rounded-lg">
                        <div className="min-w-0">
                          <h3 className="font-medium">{dayAndTime(h.loggedAt)}</h3>
                          <p className="text-sm text-muted-foreground">
                            Energy: {h.energy}/10, Mood: {MOOD_LABELS[h.mood]}
                            {h.sleepHours != null && `, Sleep: ${h.sleepHours}h`}
                          </p>
                          {h.notes && <p className="text-sm mt-1 line-clamp-2">{h.notes}</p>}
                        </div>
                        <DeleteButton id={h.id} kind="log" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
