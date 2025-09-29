import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get in touch with our team to learn more about how SheCare can support you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>We're here to answer any questions you may have about our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="First Name" />
                  <Input placeholder="Last Name" />
                </div>
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Phone Number" type="tel" />
                <Textarea placeholder="How can we help you?" rows={4} />
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our dedicated support team is available to help you navigate your journey with SheCare. Whether you're a
                patient, caregiver, or healthcare professional, we're here to support you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">support@shecare.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">1-800-SHECARE</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-chart-1/10 rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium">Support Hours</p>
                  <p className="text-muted-foreground">24/7 Emergency Support</p>
                  <p className="text-muted-foreground text-sm">General Support: Mon-Fri 8AM-8PM EST</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-chart-2/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-muted-foreground">Boston, MA</p>
                  <p className="text-muted-foreground text-sm">Serving patients nationwide</p>
                </div>
              </div>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2 text-primary">Emergency Support</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're experiencing a medical emergency, please call 911 immediately. For urgent but non-emergency
                  support, our crisis team is available 24/7.
                </p>
                <Button variant="outline" size="sm">
                  Access Crisis Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
