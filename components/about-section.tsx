import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Target, Users2, Lightbulb, ArrowRight } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">
              Bridging the Gap in
              <span className="text-primary block">Breast Cancer Care</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Women battling breast cancer often face fragmented support systems, limited access to specialized care,
              and emotional isolation. SheCare addresses these challenges by providing an integrated platform that
              combines medical expertise, mental health support, and community connection.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our mission is to empower women through their cancer journey with comprehensive, accessible, and
              personalized care that addresses both physical and emotional needs.
            </p>
            <Button size="lg">
              Learn About Our Mission
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A world where every woman facing breast cancer has access to comprehensive, integrated support
                      that addresses her medical, emotional, and social needs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Community First</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We believe in the power of shared experiences and peer support. Our platform fosters meaningful
                      connections between survivors, patients, and caregivers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-chart-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-chart-1/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-5 w-5 text-chart-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Leveraging cutting-edge technology to make healthcare more accessible, personalized, and effective
                      for women battling breast cancer.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
