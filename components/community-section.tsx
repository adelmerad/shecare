import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote, Star, ArrowRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah M.",
    role: "Breast Cancer Survivor",
    content:
      "SheCare gave me the support I needed when I felt most alone. The community here understands what I'm going through.",
    avatar: "/smiling-woman.png",
    rating: 5,
  },
  {
    name: "Dr. Jennifer L.",
    role: "Oncologist",
    content:
      "This platform bridges the gap between appointments. I can monitor my patients' progress and provide timely support.",
    avatar: "/doctor-woman.jpg",
    rating: 5,
  },
  {
    name: "Maria R.",
    role: "Current Patient",
    content:
      "The teleconsultation feature has been a lifesaver. I can get expert advice without the stress of traveling to appointments.",
    avatar: "/hispanic-woman.jpg",
    rating: 5,
  },
]

export function CommunitySection() {
  return (
    <section id="community" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Stories of Hope and Healing</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Join thousands of women who have found strength, support, and hope through our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="h-8 w-8 text-muted-foreground/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic leading-relaxed pl-6">{testimonial.content}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Women Supported</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">500+</div>
              <p className="text-muted-foreground">Healthcare Professionals</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-chart-1 mb-2">95%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
          <Button size="lg">
            Join Our Community
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
