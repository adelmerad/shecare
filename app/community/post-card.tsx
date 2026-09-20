import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { PostCategory } from "@prisma/client"
import { CATEGORY_LABELS, timeAgo } from "@/lib/format"
import { DeletePostButton, LikeButton } from "./client"

export type PostView = {
  id: string
  content: string
  category: PostCategory
  createdAt: Date
  authorName: string
  authorInitials: string
  isOwn: boolean
  liked: boolean
  likeCount: number
  commentCount: number
}

export function PostCard({ post, linkToDetail = true }: { post: PostView; linkToDetail?: boolean }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback>{post.authorInitials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{post.authorName}</h3>
            <p className="text-sm text-muted-foreground">{timeAgo(post.createdAt)}</p>
          </div>
          <Badge variant={post.category === "QUESTION" ? "outline" : "secondary"}>{CATEGORY_LABELS[post.category]}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 whitespace-pre-line">{post.content}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <LikeButton postId={post.id} liked={post.liked} count={post.likeCount} />
          {linkToDetail ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={`/community/${post.id}`}>
                <MessageCircle className="mr-1 h-4 w-4" />
                {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
              </Link>
            </Button>
          ) : (
            <span className="inline-flex items-center px-3">
              <MessageCircle className="mr-1 h-4 w-4" />
              {post.commentCount} {post.commentCount === 1 ? "comment" : "comments"}
            </span>
          )}
          {post.isOwn && <DeletePostButton id={post.id} />}
        </div>
      </CardContent>
    </Card>
  )
}
