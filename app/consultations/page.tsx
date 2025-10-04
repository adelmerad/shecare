import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, Phone, MessageSquare, Star } from "lucide-react"

export default function ConsultationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Medical Consultations</h1>
          <p className="text-muted-foreground">Connect with specialized healthcare professionals</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Video className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Video Consultation</CardTitle>
              <CardDescription>Face-to-face consultation from home</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Schedule Video Call</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <Phone className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Phone Consultation</CardTitle>
              <CardDescription>Quick consultation over the phone</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Schedule Call
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <MessageSquare className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Chat Consultation</CardTitle>
              <CardDescription>Text-based consultation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-transparent" variant="outline">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Doctors */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Available Specialists</CardTitle>
                <CardDescription>Choose from our network of breast cancer specialists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?key=dr1" />
                    <AvatarFallback>DS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">Dr. Sarah kadouche</h3>
                    <p className="text-sm text-muted-foreground">Oncologist • 15 years experience</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">(127 reviews)</span>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="secondary">Available Today</Badge>
                      <Badge variant="outline">Video</Badge>
                      <Badge variant="outline">Phone</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$150</p>
                    <p className="text-sm text-muted-foreground">30 min</p>
                    <Button size="sm" className="mt-2">
                      Book Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?key=dr2" />
                    <AvatarFallback>JC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">Dr. Mehdi Makhlouf</h3>
                    <p className="text-sm text-muted-foreground">Surgical Oncologist • 12 years experience</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">(89 reviews)</span>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="secondary">Available Tomorrow</Badge>
                      <Badge variant="outline">Video</Badge>
                      <Badge variant="outline">Chat</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$175</p>
                    <p className="text-sm text-muted-foreground">45 min</p>
                    <Button size="sm" className="mt-2">
                      Book Now
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?key=dr3" />
                    <AvatarFallback>ER</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">Dr. Rania Manel</h3>
                    <p className="text-sm text-muted-foreground">Medical Oncologist • 18 years experience</p>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-2">(203 reviews)</span>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                      <Badge variant="outline">Next Week</Badge>
                      <Badge variant="outline">Video</Badge>
                      <Badge variant="outline">Phone</Badge>
                      <Badge variant="outline">Chat</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$200</p>
                    <p className="text-sm text-muted-foreground">60 min</p>
                    <Button size="sm" className="mt-2">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Dr. Sarah Kadouche</h4>
                    <Badge variant="secondary">Video</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Tomorrow</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>2:30 PM - 3:00 PM</span>
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    Join Call
                  </Button>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Dr. Rania Manel</h4>
                    <Badge variant="outline">Phone</Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Next Friday</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2 mt-1">
                    <Clock className="h-4 w-4" />
                    <span>10:00 AM - 11:00 AM</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                    Reschedule
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-red-600">Emergency Support</CardTitle>
                <CardDescription>24/7 emergency consultation available</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency Consultation
                </Button>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Available 24/7 for urgent medical concerns
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
