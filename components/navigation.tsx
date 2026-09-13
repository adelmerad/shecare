import Link from "next/link"
import { Heart } from "lucide-react"
import { auth } from "@/auth"
import { NavigationMenu } from "@/components/navigation-menu"

export const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/health-tracker", label: "Health Tracker" },
  { href: "/wellness", label: "Wellness" },
  { href: "/community", label: "Community" },
  { href: "/consultations", label: "Consultations" },
  { href: "/resources", label: "Resources" },
]

export async function Navigation() {
  const session = await auth()
  const user = session?.user ? { name: session.user.name ?? "", email: session.user.email ?? "" } : null

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SheCare</span>
          </Link>
          <NavigationMenu links={NAV_LINKS} user={user} />
        </div>
      </div>
    </nav>
  )
}
