import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

// Liveness + database check for monitoring / container health probes
export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`
    return NextResponse.json({ status: "ok", database: "up" })
  } catch {
    return NextResponse.json({ status: "error", database: "down" }, { status: 503 })
  }
}
