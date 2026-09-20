import Link from "next/link"
import type { PostCategory } from "@prisma/client"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { PAGE_SIZE, authorSelect, displayInitials, displayName } from "@/lib/community"
import { CATEGORY_LABELS } from "@/lib/format"
import { postCategoryValues } from "@/lib/validation"
import { CreatePostForm } from "./client"
import { PostCard } from "./post-card"
import { cn } from "@/lib/utils"

export const metadata = { title: "Community · SheCare" }

type SearchParams = { category?: string; page?: string }

export default async function CommunityPage({ searchParams }: { searchParams: SearchParams }) {
  const userId = await requireUserId()

  const category = postCategoryValues.find((c) => c === searchParams.category) as PostCategory | undefined
  const page = Math.max(1, Number.parseInt(searchParams.page ?? "1", 10) || 1)
  const where = category ? { category } : {}

  const [posts, total] = await Promise.all([
    db.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: {
        author: { select: authorSelect },
        likes: { where: { userId }, select: { userId: true } },
        _count: { select: { likes: true, comments: true } },
      },
    }),
    db.post.count({ where }),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const href = (params: { category?: string; page?: number }) => {
    const q = new URLSearchParams()
    if (params.category) q.set("category", params.category)
    if (params.page && params.page > 1) q.set("page", String(params.page))
    const s = q.toString()
    return s ? `/community?${s}` : "/community"
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Community Stories</h1>
          <p className="text-muted-foreground">Share your journey and connect with others</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Share Your Story</CardTitle>
          </CardHeader>
          <CardContent>
            <CreatePostForm />
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button asChild size="sm" variant={!category ? "default" : "outline"}>
            <Link href={href({})}>All</Link>
          </Button>
          {postCategoryValues.map((c) => (
            <Button key={c} asChild size="sm" variant={category === c ? "default" : "outline"}>
              <Link href={href({ category: c })}>{CATEGORY_LABELS[c]}</Link>
            </Button>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No stories yet. Be the first to share yours.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((p) => (
              <PostCard
                key={p.id}
                post={{
                  id: p.id,
                  content: p.content,
                  category: p.category,
                  createdAt: p.createdAt,
                  authorName: displayName(p.author, userId),
                  authorInitials: displayInitials(p.author),
                  isOwn: p.authorId === userId,
                  liked: p.likes.length > 0,
                  likeCount: p._count.likes,
                  commentCount: p._count.comments,
                }}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="flex items-center justify-between mt-8" aria-label="Pagination">
            <Button asChild variant="outline" size="sm" className={cn(page <= 1 && "pointer-events-none opacity-50")}>
              <Link href={href({ category, page: page - 1 })}>Previous</Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              asChild
              variant="outline"
              size="sm"
              className={cn(page >= totalPages && "pointer-events-none opacity-50")}
            >
              <Link href={href({ category, page: page + 1 })}>Next</Link>
            </Button>
          </nav>
        )}
      </div>
    </main>
  )
}
