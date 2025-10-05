import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Settings, Shield, Heart, Calendar, Award } from "lucide-react"

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/woman-profile.jpg" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold">Sarah Johnson</h2>
                  <p className="text-muted-foreground">Member since March 2024</p>
                  <Badge variant="secondary" className="mt-2">
                    Active Treatment
                  </Badge>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Completion</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-primary" />
                    <span>45 days on platform</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>12 consultations completed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Wellness Champion badge</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="medical">Medical Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="Sarah" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Johnson" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="sarah.johnson@email.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="birthdate">Date of Birth</Label>
                        <Input id="birthdate" type="date" defaultValue="1985-06-15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="San Francisco, CA" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us a bit about yourself..."
                        defaultValue="Mother of two, yoga enthusiast, and breast cancer warrior. I believe in the power of community and positive thinking."
                      />
                    </div>

                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>Keep your medical details up to date for better care</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="diagnosis">Diagnosis</Label>
                        <Input id="diagnosis" defaultValue="Invasive Ductal Carcinoma" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stage">Stage</Label>
                        <Input id="stage" defaultValue="Stage II" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="diagnosisDate">Diagnosis Date</Label>
                        <Input id="diagnosisDate" type="date" defaultValue="2024-01-15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="treatmentStart">Treatment Start Date</Label>
                        <Input id="treatmentStart" type="date" defaultValue="2024-02-01" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentTreatment">Current Treatment</Label>
                      <Textarea
                        id="currentTreatment"
                        placeholder="Describe your current treatment plan..."
                        defaultValue="Currently undergoing chemotherapy (AC-T protocol). Completed 4 cycles of AC, starting Taxol next week."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="medications">Current Medications</Label>
                      <Textarea
                        id="medications"
                        placeholder="List your current medications..."
                        defaultValue="Ondansetron 8mg (as needed for nausea), Lorazepam 0.5mg (for anxiety), Multivitamin"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies</Label>
                      <Input id="allergies" placeholder="List any allergies..." defaultValue="Penicillin" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        placeholder="Name and phone number"
                        defaultValue="Michael Johnson - (555) 987-6543"
                      />
                    </div>

                    <Button>Update Medical Info</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      App Preferences
                    </CardTitle>
                    <CardDescription>Customize your SheCare experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Appointment Reminders</p>
                            <p className="text-sm text-muted-foreground">Get notified about upcoming consultations</p>
                          </div>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Medication Reminders</p>
                            <p className="text-sm text-muted-foreground">Daily reminders for your medications</p>
                          </div>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Community Updates</p>
                            <p className="text-sm text-muted-foreground">New posts and messages from the community</p>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Wellness Reminders</p>
                            <p className="text-sm text-muted-foreground">
                              Daily wellness check-ins and meditation reminders
                            </p>
                          </div>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Display Preferences</h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="theme">Theme</Label>
                          <select id="theme" className="w-full p-2 border rounded-md">
                            <option>Light</option>
                            <option>Dark</option>
                            <option>System</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <select id="language" className="w-full p-2 border rounded-md">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <Button>Save Preferences</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacy & Security
                    </CardTitle>
                    <CardDescription>Manage your privacy settings and account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Privacy Settings</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Visibility</p>
                            <p className="text-sm text-muted-foreground">
                              Allow other community members to see your profile
                            </p>
                          </div>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Share Treatment Progress</p>
                            <p className="text-sm text-muted-foreground">
                              Share your progress with the community for support
                            </p>
                          </div>
                          <input type="checkbox" className="toggle" />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Analytics</p>
                            <p className="text-sm text-muted-foreground">
                              Help improve SheCare by sharing anonymous usage data
                            </p>
                          </div>
                          <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Account Security</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Enable Two-Factor Authentication
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          Download My Data
                        </Button>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-3 text-red-600">Danger Zone</h3>
                      <Button variant="destructive" className="w-full">
                        Delete Account
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        This action cannot be undone. All your data will be permanently deleted.
                      </p>
                    </div>
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
