import { format } from "date-fns"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Shield, Heart, Calendar, MessageCircle } from "lucide-react"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { initials, toDateInput } from "@/lib/format"
import { daysBetween, profileCompletion } from "@/lib/profile"
import {
  DeleteAccountForm,
  ExportButton,
  MedicalForm,
  PasswordForm,
  PersonalForm,
  PreferencesForm,
} from "./forms"

export const metadata = { title: "My Profile · SheCare" }

const DEFAULT_PREFERENCES = {
  appointmentReminders: true,
  medicationReminders: true,
  communityUpdates: false,
  wellnessReminders: true,
  profileVisible: true,
  shareProgress: false,
}

export default async function ProfilePage() {
  const id = await requireUserId()

  const user = await db.user.findUniqueOrThrow({
    where: { id },
    include: {
      medical: true,
      preferences: true,
      _count: { select: { posts: true } },
    },
  })
  const consultations = await db.appointment.count({
    where: { userId: id, status: { not: "CANCELLED" }, startsAt: { lt: new Date() } },
  })

  const m = user.medical
  const completion = profileCompletion(user, m)
  const inTreatment = m?.cyclesTotal != null && (m.cyclesCompleted ?? 0) < m.cyclesTotal
  const p = user.preferences ?? DEFAULT_PREFERENCES
  const prefs = {
    appointmentReminders: p.appointmentReminders,
    medicationReminders: p.medicationReminders,
    communityUpdates: p.communityUpdates,
    wellnessReminders: p.wellnessReminders,
    profileVisible: p.profileVisible,
    shareProgress: p.shareProgress,
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl">{initials(user.firstName, user.lastName)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">Member since {format(user.createdAt, "MMMM yyyy")}</p>
                  {inTreatment && (
                    <Badge variant="secondary" className="mt-2">
                      Active Treatment
                    </Badge>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Completion</span>
                    <span className="text-sm font-medium">{completion}%</span>
                  </div>
                  <Progress value={completion} className="h-2" />
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>{daysBetween(user.createdAt)} days on platform</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{consultations} consultations completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span>{user._count.posts} community stories shared</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="medical">Medical</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PersonalForm
                      values={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phone: user.phone ?? "",
                        birthDate: toDateInput(user.birthDate),
                        location: user.location ?? "",
                        bio: user.bio ?? "",
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>Private to you — used to personalise your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MedicalForm
                      values={{
                        diagnosis: m?.diagnosis ?? "",
                        stage: m?.stage ?? "",
                        diagnosisDate: toDateInput(m?.diagnosisDate),
                        treatmentStart: toDateInput(m?.treatmentStart),
                        currentTreatment: m?.currentTreatment ?? "",
                        medications: m?.medications ?? "",
                        allergies: m?.allergies ?? "",
                        emergencyContact: m?.emergencyContact ?? "",
                        cyclesTotal: m?.cyclesTotal?.toString() ?? "",
                        cyclesCompleted: m?.cyclesCompleted?.toString() ?? "",
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Notifications
                    </CardTitle>
                    <CardDescription>Choose what SheCare reminds you about</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PreferencesForm values={prefs} group="notifications" />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>Control what the community can see</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PreferencesForm values={prefs} group="privacy" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <PasswordForm />
                    <ExportButton />
                  </CardContent>
                </Card>

                <Card className="border-destructive/50">
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                    <CardDescription>Permanently delete your account and all your data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DeleteAccountForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
