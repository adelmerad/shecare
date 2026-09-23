import Link from "next/link"
import type { Prisma, ResourceType } from "@prisma/client"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Video, FileText, Search, Clock } from "lucide-react"
import { db } from "@/lib/db"
import { RESOURCE_TYPE_LABELS } from "@/lib/format"
import { cn } from "@/lib/utils"

export const metadata = { title: "Resources · SheCare" }
export const dynamic = "force-dynamic"

const TYPES: { type: ResourceType; icon: typeof BookOpen; title: string; description: string; unit: string }[] = [
  { type: "ARTICLE", icon: BookOpen, title: "Treatment Guides", description: "Comprehensive treatment information", unit: "Articles" },
  { type: "VIDEO", icon: Video, title: "Video Library", description: "Educational videos and webinars", unit: "Videos" },
  { type: "PDF", icon: FileText, title: "Downloadable PDFs", description: "Printable guides and checklists", unit: "Downloads" },
]

const TYPE_ICON: Record<ResourceType, typeof BookOpen> = { ARTICLE: BookOpen, VIDEO: Video, PDF: FileText }

function minutesLabel(type: ResourceType, minutes: number) {
  if (type === "VIDEO") return `${minutes} min watch`
  return `${minutes} min read`
}

export default async function ResourcesPage({ searchParams }: { searchParams: { q?: string; type?: string } }) {
  const q = searchParams.q?.trim().slice(0, 100) || ""
  const type = TYPES.find((t) => t.type === searchParams.type)?.type

  const where: Prisma.ResourceWhereInput = {
    ...(type && { type }),
    ...(q && {
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { summary: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    }),
  }
  const filtering = Boolean(q || type)

  const [counts, featured, recent, results] = await Promise.all([
    db.resource.groupBy({ by: ["type"], _count: { _all: true } }),
    filtering ? [] : db.resource.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" }, take: 4 }),
    filtering ? [] : db.resource.findMany({ where: { featured: false }, orderBy: { createdAt: "desc" }, take: 5 }),
    filtering ? db.resource.findMany({ where, orderBy: { createdAt: "desc" } }) : [],
  ])
  const countFor = (t: ResourceType) => counts.find((c) => c.type === t)?._count._all ?? 0

  const typeHref = (t?: ResourceType) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (t && t !== type) params.set("type", t)
    const s = params.toString()
    return s ? `/resources?${s}` : "/resources"
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Educational Resources</h1>
          <p className="text-muted-foreground">Comprehensive information to support your journey</p>
        </div>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <form className="flex space-x-2" action="/resources">
              {type && <input type="hidden" name="type" value={type} />}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input name="q" defaultValue={q} placeholder="Search resources..." className="pl-10" aria-label="Search" />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {TYPES.map(({ type: t, icon: Icon, title, description, unit }) => (
            <Link key={t} href={typeHref(t)} aria-current={type === t ? "true" : undefined}>
              <Card className={cn("h-full hover:shadow-md transition-shadow", type === t && "border-primary ring-1 ring-primary")}>
                <CardHeader className="text-center">
                  <Icon className="h-12 w-12 text-primary mx-auto mb-2" />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary" className="w-full justify-center">
                    {countFor(t)} {unit}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filtering ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {results.length} result{results.length === 1 ? "" : "s"}
                {q && <span className="text-muted-foreground font-normal"> for “{q}”</span>}
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/resources">Clear filters</Link>
              </Button>
            </div>
            {results.length === 0 && <p className="text-muted-foreground">No resources match your search.</p>}
            {results.map((r) => (
              <ResourceRow key={r.id} resource={r} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Featured Resources</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((r) => (
                <Card key={r.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{r.title}</CardTitle>
                        <CardDescription>{r.summary}</CardDescription>
                      </div>
                      <Badge variant="secondary">{RESOURCE_TYPE_LABELS[r.type]}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{minutesLabel(r.type, r.minutes)}</span>
                    </div>
                    <p className="text-sm mb-4">{r.description}</p>
                    <Button asChild variant="outline" className="w-full bg-transparent">
                      <Link href={`/resources/${r.slug}`}>{r.type === "VIDEO" ? "Watch Video" : "Read"}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
              <div className="space-y-4">
                {recent.map((r) => (
                  <ResourceRow key={r.id} resource={r} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

function ResourceRow({ resource: r }: { resource: { slug: string; title: string; summary: string; type: ResourceType } }) {
  const Icon = TYPE_ICON[r.type]
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4 min-w-0">
            <div className="w-12 h-12 shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="min-w-0">
              <h3 className="font-medium">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.summary}</p>
            </div>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href={`/resources/${r.slug}`}>Open</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
