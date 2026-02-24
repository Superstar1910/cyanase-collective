type LoginProps = {
  onBack: () => void
  onSuccess: () => void
}

export default function Login({ onBack, onSuccess }: LoginProps) {
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

          <form
            className="mt-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault()
              onSuccess()
            }}
          >
            <label className="block text-sm text-slate-300">
              Email
              <input
                type="email"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white"
                placeholder="you@example.com"
              />
            </label>

            <label className="block text-sm text-slate-300">
              Password
              <input
                type="password"
                required
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white"
                placeholder="••••••••"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
            >
              Continue
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-400">
            Forgot your password? Contact support.
          </div>
        </div>
      </main>
    </div>
  )
}
