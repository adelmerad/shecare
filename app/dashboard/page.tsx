import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, Heart, MessageCircle, BookOpen, Phone, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, Sarah</h1>
          <p className="text-muted-foreground">Here's your health journey overview</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Treatment Days</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.2</div>
              <p className="text-xs text-muted-foreground">+0.5 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Community Posts</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Days away</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Treatment Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Treatment Progress</CardTitle>
              <CardDescription>Your current treatment cycle overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Chemotherapy Cycle 3 of 6</span>
                  <span>50%</span>
                </div>
                <Progress value={50} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Upcoming</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Blood test - Tomorrow</p>
                    <p>• Oncologist visit - Friday</p>
                    <p>• Chemo session - Next week</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recent</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Completed chemo cycle 2</p>
                    <p>• Updated treatment plan</p>
                    <p>• Wellness check completed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Schedule Consultation
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Activity className="mr-2 h-4 w-4" />
                Log Symptoms
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <MessageCircle className="mr-2 h-4 w-4" />
                Join Community Chat
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                Browse Resources
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Completed wellness check</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="secondary">Health</Badge>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Shared story in community</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <Badge variant="outline">Community</Badge>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Consultation with Dr. Merad</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
                <Badge variant="secondary">Medical</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
