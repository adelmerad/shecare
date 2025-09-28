import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stethoscope, Activity, MessageCircle, Brain, BookOpen, Phone, Calendar, BarChart3 } from "lucide-react"

const features = [
  {
    icon: Stethoscope,
    title: "Teleconsultation",
    description: "Connect with oncologists and specialists from the comfort of your home",
    color: "text-primary",
  },
  {
    icon: Activity,
    title: "Health Tracking",
    description: "Monitor symptoms, medications, and treatment progress with intelligent insights",
    color: "text-accent",
  },
  {
    icon: MessageCircle,
    title: "Story Sharing",
    description: "Share your journey and connect with other survivors in a safe community",
    color: "text-chart-1",
  },
  {
    icon: Brain,
    title: "Mental Wellness",
    description: "Access meditation, therapy sessions, and emotional support tools",
    color: "text-chart-2",
  },
  {
    icon: BookOpen,
    title: "Educational Content",
    description: "Stay informed with the latest research and treatment information",
    color: "text-chart-3",
  },
  {
    icon: Phone,
    title: "Emergency Support",
    description: "24/7 crisis support and immediate access to healthcare professionals",
    color: "text-destructive",
  },
  {
    icon: Calendar,
    title: "Appointment Management",
    description: "Schedule and manage all your medical appointments in one place",
    color: "text-chart-4",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Visualize your health journey with comprehensive progress reports",
    color: "text-chart-5",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Comprehensive Care Platform</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Everything you need to navigate your breast cancer journey with confidence and support
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
