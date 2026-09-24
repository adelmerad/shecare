import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { RESOURCE_TYPE_LABELS } from "@/lib/format"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const r = await db.resource.findUnique({ where: { slug: params.slug }, select: { title: true, summary: true } })
  return r ? { title: `${r.title} · SheCare`, description: r.summary } : {}
}

export default async function ResourcePage({ params }: { params: { slug: string } }) {
  const resource = await db.resource.findUnique({ where: { slug: params.slug } })
  if (!resource) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article className="container mx-auto px-4 py-8 mt-16 max-w-3xl">
        <Link href="/resources" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-1 h-4 w-4" />
          All resources
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{RESOURCE_TYPE_LABELS[resource.type]}</Badge>
          <span className="inline-flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            {resource.minutes} min
          </span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{resource.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{resource.summary}</p>

        <div className="space-y-4 leading-relaxed">
          {resource.content.split(/\n{2,}/).map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="text-xl font-semibold pt-4">
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i} className="whitespace-pre-line">
                {block}
              </p>
            ),
          )}
        </div>

        {resource.url && (
          <Button asChild className="mt-8">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              Open source
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}

        <p className="mt-12 text-sm text-muted-foreground border-t pt-4">
          This content is for general information and does not replace advice from your medical team.
        </p>
      </article>
    </main>
  )
}
