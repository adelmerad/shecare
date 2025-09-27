"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">SheCare</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link href="/health-tracker" className="text-muted-foreground hover:text-foreground transition-colors">
              Health Tracker
            </Link>
            <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <Link href="/consultations" className="text-muted-foreground hover:text-foreground transition-colors">
              Consultations
            </Link>
            <Link href="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Button>Get Started</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
              <Link href="/dashboard" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/health-tracker" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Health Tracker
              </Link>
              <Link href="/community" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Community
              </Link>
              <Link href="/consultations" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Consultations
              </Link>
              <Link href="/resources" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                Resources
              </Link>
              <a href="#about" className="block px-3 py-2 text-muted-foreground hover:text-foreground">
                About
              </a>
              <div className="px-3 py-2">
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
