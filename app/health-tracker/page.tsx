import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Activity, Heart, Thermometer, Droplets, Moon, Plus } from "lucide-react"

export default function HealthTrackerPage() {
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
            {/* Today's Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7/10</div>
                  <Progress value={70} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mood</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Good</div>
                  <p className="text-xs text-muted-foreground mt-2">Feeling positive</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.5h</div>
                  <p className="text-xs text-muted-foreground mt-2">Quality sleep</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6/8</div>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Quick Log */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Log Entry</CardTitle>
                <CardDescription>Record how you're feeling today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="energy">Energy Level (1-10)</Label>
                    <Input id="energy" type="number" min="1" max="10" placeholder="7" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mood">Mood</Label>
                    <Input id="mood" placeholder="Good, tired, anxious..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Any symptoms, side effects, or observations..." />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Save Entry
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Symptom Tracker</CardTitle>
                <CardDescription>Log and monitor treatment side effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Common Symptoms</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Fatigue</span>
                        <Badge variant="secondary">Mild</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Nausea</span>
                        <Badge variant="outline">None</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Headache</span>
                        <Badge variant="destructive">Moderate</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Loss of Appetite</span>
                        <Badge variant="secondary">Mild</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Add New Symptom</h3>
                    <div className="space-y-3">
                      <Input placeholder="Symptom name" />
                      <select className="w-full p-2 border rounded-md">
                        <option>Severity Level</option>
                        <option>None</option>
                        <option>Mild</option>
                        <option>Moderate</option>
                        <option>Severe</option>
                      </select>
                      <Textarea placeholder="Additional notes..." />
                      <Button className="w-full">Log Symptom</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>Track important health metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Thermometer className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">Temperature</h3>
                        <p className="text-2xl font-bold">37°C</p>
                        <p className="text-sm text-muted-foreground">Normal</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Heart className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <h3 className="font-medium">Heart Rate</h3>
                        <p className="text-2xl font-bold">72 BPM</p>
                        <p className="text-sm text-muted-foreground">Resting</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Log New Reading</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Temperature" />
                        <Input placeholder="Heart Rate" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Blood Pressure (Sys)" />
                        <Input placeholder="Blood Pressure (Dia)" />
                      </div>
                      <Button className="w-full">Save Vitals</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Health History</CardTitle>
                <CardDescription>View your tracking history and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Today, 2:30 PM</h3>
                      <p className="text-sm text-muted-foreground">Energy: 7/10, Mood: Good, Mild fatigue</p>
                    </div>
                    <Badge variant="secondary">Complete</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Yesterday, 9:15 AM</h3>
                      <p className="text-sm text-muted-foreground">Energy: 5/10, Mood: Tired, Moderate nausea</p>
                    </div>
                    <Badge variant="secondary">Complete</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">2 days ago, 11:45 AM</h3>
                      <p className="text-sm text-muted-foreground">Energy: 8/10, Mood: Great, No symptoms</p>
                    </div>
                    <Badge variant="secondary">Complete</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
