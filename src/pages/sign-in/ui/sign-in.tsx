import { SignInForm } from "@/features/auth/ui/sign-in-form"

export function SignIn() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 bg-background">
      <SignInForm />
    </div>
  )
}
