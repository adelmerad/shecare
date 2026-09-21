import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { db } from "@/lib/db"
import { requireUserId } from "@/lib/session"
import { authorSelect, displayInitials, displayName } from "@/lib/community"
import { timeAgo } from "@/lib/format"
import { CommentForm, DeleteCommentButton } from "../client"
import { PostCard } from "../post-card"

export const metadata = { title: "Story · SheCare" }

export default async function PostPage({ params }: { params: { id: string } }) {
  const userId = await requireUserId()

  const post = await db.post.findUnique({
    where: { id: params.id },
    include: {
      author: { select: authorSelect },
      likes: { where: { userId }, select: { userId: true } },
      comments: { orderBy: { createdAt: "asc" }, include: { author: { select: authorSelect } } },
      _count: { select: { likes: true, comments: true } },
    },
  })
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8 mt-16 max-w-3xl space-y-6">
        <Link href="/community" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to community
        </Link>

        <PostCard
          linkToDetail={false}
          post={{
            id: post.id,
            content: post.content,
            category: post.category,
            createdAt: post.createdAt,
            authorName: displayName(post.author, userId),
            authorInitials: displayInitials(post.author),
            isOwn: post.authorId === userId,
            liked: post.likes.length > 0,
            likeCount: post._count.likes,
            commentCount: post._count.comments,
          }}
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Comments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {post.comments.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet. Offer some support!</p>
            )}
            {post.comments.map((c) => (
              <div key={c.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{displayInitials(c.author)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 rounded-lg bg-muted px-3 py-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {displayName(c.author, userId)}{" "}
                      <span className="font-normal text-muted-foreground">· {timeAgo(c.createdAt)}</span>
                    </p>
                    {c.authorId === userId && <DeleteCommentButton id={c.id} postId={post.id} />}
                  </div>
                  <p className="text-sm whitespace-pre-line">{c.content}</p>
                </div>
              </div>
            ))}
            <CommentForm postId={post.id} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
