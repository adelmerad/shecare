import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Brain, Leaf, Music, Book, Play } from "lucide-react"

export default function WellnessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Mental Wellness Hub</h1>
          <p className="text-muted-foreground">Tools and resources for emotional well-being during your journey</p>
        </div>

        {/* Wellness Score */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Today's Wellness Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-primary">8.2/10</div>
                <p className="text-sm text-muted-foreground">Great progress today!</p>
              </div>
              <div className="w-32">
                <Progress value={82} className="h-3" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold">Mood</div>
                <Badge variant="secondary">Good</Badge>
              </div>
              <div>
                <div className="text-lg font-semibold">Stress</div>
                <Badge variant="outline">Low</Badge>
              </div>
              <div>
                <div className="text-lg font-semibold">Energy</div>
                <Badge variant="secondary">High</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="meditation" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="journaling">Journaling</TabsTrigger>
            <TabsTrigger value="music">Music Therapy</TabsTrigger>
          </TabsList>

          <TabsContent value="meditation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Brain className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">5 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Morning Mindfulness</CardTitle>
                  <CardDescription>Start your day with calm and focus</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Leaf className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">10 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Anxiety Relief</CardTitle>
                  <CardDescription>Guided meditation for managing worry</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Heart className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">15 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Self-Compassion</CardTitle>
                  <CardDescription>Practice kindness toward yourself</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Brain className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">20 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Body Scan</CardTitle>
                  <CardDescription>Release tension and promote healing</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Leaf className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">12 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Sleep Preparation</CardTitle>
                  <CardDescription>Wind down for restful sleep</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Heart className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">8 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Gratitude Practice</CardTitle>
                  <CardDescription>Cultivate appreciation and joy</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Session
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breathing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>4-7-8 Breathing</CardTitle>
                  <CardDescription>A calming technique for stress relief</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">4</div>
                    <p className="text-muted-foreground">Inhale for 4 seconds</p>
                  </div>
                  <Button className="w-full">Start Breathing Exercise</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Box Breathing</CardTitle>
                  <CardDescription>Equal counts for balance and focus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">4</div>
                      <p className="text-sm text-muted-foreground">Inhale</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4</div>
                      <p className="text-sm text-muted-foreground">Hold</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4</div>
                      <p className="text-sm text-muted-foreground">Exhale</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">4</div>
                      <p className="text-sm text-muted-foreground">Hold</p>
                    </div>
                  </div>
                  <Button className="w-full">Start Box Breathing</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="journaling" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Daily Reflection
                  </CardTitle>
                  <CardDescription>Express your thoughts and feelings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">How are you feeling today?</h4>
                      <textarea
                        className="w-full p-3 border rounded-md min-h-[100px] resize-none"
                        placeholder="Write about your emotions, experiences, or anything on your mind..."
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">What are you grateful for?</h4>
                      <textarea
                        className="w-full p-3 border rounded-md min-h-[80px] resize-none"
                        placeholder="List three things you're grateful for today..."
                      />
                    </div>
                  </div>
                  <Button className="w-full">Save Entry</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Journal Prompts</CardTitle>
                  <CardDescription>Guided questions for deeper reflection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">What gave you strength today?</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">How has your perspective changed recently?</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">What would you tell someone facing similar challenges?</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">What are you looking forward to?</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Get New Prompt
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Music className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">30 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Peaceful Piano</CardTitle>
                  <CardDescription>Gentle melodies for relaxation</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Play Playlist
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Music className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">45 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Nature Sounds</CardTitle>
                  <CardDescription>Ocean waves and forest ambience</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Play Playlist
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Music className="h-8 w-8 text-primary" />
                    <Badge variant="secondary">25 min</Badge>
                  </div>
                  <CardTitle className="text-lg">Uplifting Instrumentals</CardTitle>
                  <CardDescription>Positive energy and hope</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Play Playlist
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Progress Tracking */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Wellness Journey</CardTitle>
            <CardDescription>Track your mental wellness activities over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <p className="text-sm text-muted-foreground">Meditation sessions this week</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5</div>
                <p className="text-sm text-muted-foreground">Journal entries this week</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8.1</div>
                <p className="text-sm text-muted-foreground">Average wellness score</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">7</div>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
