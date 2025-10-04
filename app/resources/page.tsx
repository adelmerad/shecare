import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Video, FileText, Download, Search, Clock } from "lucide-react"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Educational Resources</h1>
          <p className="text-muted-foreground">Comprehensive information to support your journey</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search resources..." className="pl-10" />
              </div>
              <Button>Search</Button>
            </div>
          </CardContent>
        </Card>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Treatment Guides</CardTitle>
              <CardDescription>Comprehensive treatment information</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="w-full justify-center">
                25 Articles
              </Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Video className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Video Library</CardTitle>
              <CardDescription>Educational videos and webinars</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="w-full justify-center">
                18 Videos
              </Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle>Downloadable PDFs</CardTitle>
              <CardDescription>Printable guides and checklists</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="w-full justify-center">
                12 Downloads
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Featured Resources */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Featured Resources</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Understanding Your Diagnosis</CardTitle>
                    <CardDescription>A comprehensive guide to breast cancer types and stages</CardDescription>
                  </div>
                  <Badge variant="secondary">Article</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>15 min read</span>
                </div>
                <p className="text-sm mb-4">
                  Learn about different types of breast cancer, staging systems, and what your diagnosis means for your
                  treatment plan.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read Article
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Chemotherapy: What to Expect</CardTitle>
                    <CardDescription>Preparing for and managing chemotherapy treatment</CardDescription>
                  </div>
                  <Badge variant="secondary">Video</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>22 min watch</span>
                </div>
                <p className="text-sm mb-4">
                  Dr. Sarah Mitchell explains the chemotherapy process, side effects, and tips for managing treatment.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Watch Video
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Nutrition During Treatment</CardTitle>
                    <CardDescription>Maintaining proper nutrition throughout your journey</CardDescription>
                  </div>
                  <Badge variant="secondary">PDF</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Download className="h-4 w-4 mr-1" />
                  <span>2.3 MB download</span>
                </div>
                <p className="text-sm mb-4">
                  A complete nutrition guide with meal plans, recipes, and tips for managing treatment-related appetite
                  changes.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">Managing Side Effects</CardTitle>
                    <CardDescription>Practical strategies for common treatment side effects</CardDescription>
                  </div>
                  <Badge variant="secondary">Article</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>12 min read</span>
                </div>
                <p className="text-sm mb-4">
                  Evidence-based approaches to managing fatigue, nausea, neuropathy, and other common side effects.
                </p>
                <Button variant="outline" className="w-full bg-transparent">
                  Read Article
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Resources */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Video className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mindfulness and Meditation for Cancer Patients</h3>
                        <p className="text-sm text-muted-foreground">
                          Learn relaxation techniques to manage stress and anxiety
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">New</Badge>
                      <Button size="sm" variant="outline">
                        Watch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Insurance and Financial Resources Guide</h3>
                        <p className="text-sm text-muted-foreground">
                          Navigate insurance coverage and find financial assistance programs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">New</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="mr-1 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
