type LandingProps = {
  onGetStarted: () => void
  onSignIn: () => void
}

export default function Landing({ onGetStarted, onSignIn }: LandingProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-wide">Cyanase Collective</div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-slate-200 hover:text-white" onClick={onSignIn}>Sign in</button>
          <button className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white" onClick={onGetStarted}>
            Get started
          </button>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 pt-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <span className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200">
            Learn. Save. Invest. Together.
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl">
            The simplest way for everyday Ugandans to build wealth together.
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-300">
            Cyanase Collective helps individuals save consistently, learn investing step-by-step, and
            allocate to local and global products with mobile money, bank transfers, and stablecoins.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white"
              onClick={onGetStarted}
            >
              Start saving now
            </button>
            <button
              className="rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white"
              onClick={onSignIn}
            >
              Sign in
            </button>
          </div>
          <div className="mt-8 grid gap-4 text-sm text-slate-200 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg font-semibold">UGX-first</div>
              <p className="mt-2 text-slate-300">Save in UGX, allocate to funds and ETFs without friction.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg font-semibold">Community-ready</div>
              <p className="mt-2 text-slate-300">Move from solo saving to clubs when you are ready.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-lg font-semibold">Verified rails</div>
              <p className="mt-2 text-slate-300">Secure collections and payouts via compliant PSP partners.</p>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-400">Onboarding</div>
            <div className="mt-3 text-2xl font-semibold">Start in minutes</div>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>1. Verify your identity</li>
              <li>2. Link mobile money or bank</li>
              <li>3. Pick a goal and start saving</li>
              <li>4. Allocate to local or global products</li>
            </ul>
          </div>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-400">Proof of value</div>
            <div className="mt-3 text-2xl font-semibold">Why Cyanase</div>
            <p className="mt-3 text-sm text-slate-300">
              We combine education, disciplined saving, and secure allocation so that anyone can
              build wealth — without needing a finance background.
            </p>
          </div>
        </aside>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 text-center text-xs text-slate-500">
        Cyanase Collective - Built for learning, saving, and investing together.
      </footer>
    </div>
  )
}
