import Link from "next/link"
import { AuthShell } from "@/components/auth-shell"
import { LoginForm } from "./login-form"

export const metadata = { title: "Sign in · SheCare" }

export default function LoginPage({ searchParams }: { searchParams: { callbackUrl?: string } }) {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to continue your journey"
      footer={
        <>
          New to SheCare?{" "}
          <Link href="/register" className="text-primary font-medium hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm callbackUrl={searchParams.callbackUrl} />
    </AuthShell>
  )
}
