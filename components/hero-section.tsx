import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Heart } from "lucide-react"

export function HeroSection() {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Your Digital Companion Through
            <span className="text-primary block">Breast Cancer Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-3xl mx-auto mb-8">
            Comprehensive support platform combining medical care, mental health support, and community connection for
            women battling breast cancer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Learn More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Medical Support</h3>
            <p className="text-muted-foreground">
              24/7 access to healthcare professionals and personalized treatment tracking
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mental Wellness</h3>
            <p className="text-muted-foreground">
              Comprehensive mental health support and wellness tools for emotional healing
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-chart-1/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-chart-1" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-muted-foreground">
              Connect with other survivors and share your journey in a supportive environment
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
