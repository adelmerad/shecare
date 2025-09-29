import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AboutSection } from "@/components/about-section"
import { CommunitySection } from "@/components/community-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <CommunitySection />
      <ContactSection />
      <Footer />
    </main>
  )
}
