import { SignIn, useUser } from '@clerk/clerk-react'

type LoginProps = {
  onBack: () => void
}

export default function Login({ onBack }: LoginProps) {
  const { isLoaded } = useUser()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <button className="text-sm text-slate-300 hover:text-white" onClick={onBack}>
          Back
        </button>
        <div className="text-lg font-semibold tracking-wide">Cyanase Collective</div>
        <div className="text-sm text-slate-400">Welcome back</div>
      </header>

      <main className="mx-auto w-full max-w-md px-6 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-2 text-sm text-slate-300">
            Use your email to access your savings, goals, and investments.
          </p>

          <div className="mt-6">
            {isLoaded ? (
              <SignIn routing="hash" />
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
                Loading sign-in...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
