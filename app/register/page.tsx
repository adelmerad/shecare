import Link from "next/link"
import { AuthShell } from "@/components/auth-shell"
import { RegisterForm } from "./register-form"

export const metadata = { title: "Create your account · SheCare" }

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Your private space for tracking, support and care"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  )
}
