"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutAction } from "@/app/actions/auth"
import { cn } from "@/lib/utils"

type Props = {
  links: { href: string; label: string }[]
  user: { name: string; email: string } | null
}

export function NavigationMenu({ links, user }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const linkClass = (href: string) =>
    cn(
      "transition-colors hover:text-foreground",
      pathname.startsWith(href) ? "text-foreground font-medium" : "text-muted-foreground",
    )

  return (
    <>
      <div className="hidden lg:flex items-center gap-6">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className={linkClass(l.href)}>
            {l.label}
          </Link>
        ))}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                {user.name.split(" ")[0] || "Account"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">My profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <form action={logoutAction} className="w-full">
                  <button type="submit" className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="lg:hidden">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-16 bg-card border-b border-border">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={cn("block px-3 py-2", linkClass(l.href))}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-muted-foreground">
                  My profile
                </Link>
                <form action={logoutAction} className="px-3 py-2">
                  <Button type="submit" variant="outline" className="w-full">
                    Sign out
                  </Button>
                </form>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-3 py-2">
                <Button asChild variant="outline">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
