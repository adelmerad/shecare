import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2, Plus } from "lucide-react"

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Stories</h1>
          <p className="text-muted-foreground">Share your journey and connect with others</p>
        </div>

        {/* Create Post */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Share Your Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Share your experience, ask a question, or offer support..."
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Badge variant="outline">Support</Badge>
                <Badge variant="outline">Question</Badge>
                <Badge variant="outline">Victory</Badge>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Share Story
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Community Posts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/woman-profile.jpg" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">Maria </h3>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <Badge variant="secondary">Victory</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Just finished my last chemo session! 🎉 It's been a long 6 months, but I'm finally done with treatment.
                To everyone still fighting - you've got this! The community here has been my lifeline through the
                hardest days.
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm">
                  <Heart className="mr-1 h-4 w-4" />
                  24 hearts
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-1 h-4 w-4" />8 comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/woman-profile-2.jpg" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold"> Bouchra </h3>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
                <Badge variant="outline">Question</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Has anyone tried meditation during treatment? My oncologist suggested it for managing anxiety, but I'm
                not sure where to start. Would love to hear your experiences!
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm">
                  <Heart className="mr-1 h-4 w-4" />
                  12 hearts
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  15 comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/woman-profile-3.jpg" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold"> Lyna </h3>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
                <Badge variant="secondary">Support</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Feeling overwhelmed today. Started my second round of treatment and the side effects are hitting harder
                this time. Just need some encouragement from this amazing community. ❤️
              </p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm">
                  <Heart className="mr-1 h-4 w-4" />
                  31 hearts
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="mr-1 h-4 w-4" />
                  22 comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
