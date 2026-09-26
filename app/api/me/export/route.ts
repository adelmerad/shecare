import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

// GDPR-style export: everything stored about the signed-in user, as JSON
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      medical: true,
      preferences: true,
      dailyLogs: { orderBy: { loggedAt: "desc" } },
      symptoms: { orderBy: { loggedAt: "desc" } },
      vitals: { orderBy: { recordedAt: "desc" } },
      journal: { orderBy: { createdAt: "desc" } },
      sessions: { orderBy: { completedAt: "desc" } },
      posts: { include: { comments: true }, orderBy: { createdAt: "desc" } },
      comments: { orderBy: { createdAt: "desc" } },
      appointments: { include: { specialist: { select: { name: true, specialty: true } } } },
    },
  })
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // Never export the password hash
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...data } = user
  const filename = `shecare-export-${new Date().toISOString().slice(0, 10)}.json`
  return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), user: data }, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}
