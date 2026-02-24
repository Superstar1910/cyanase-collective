import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react'
import { useEffect, useMemo, useState } from 'react'

import { navTabs, type TabKey } from './constants/navTabs'
import { getDashboardData, type DashboardData } from './data/api'
import Community from './sections/Community'
import Goals from './sections/Goals'
import Investments from './sections/Investments'
import Landing from './sections/Landing'
import Login from './sections/Login'
import Overview from './sections/Overview'
import Wallet from './sections/Wallet'
import RequireRole from './auth/RequireRole'

type LoadState = {
  data: DashboardData | null
  loading: boolean
  error: string | null
}

type ViewMode = 'landing' | 'login'

export default function App() {
  const [view, setView] = useState<ViewMode>('landing')
  const [tab, setTab] = useState<TabKey>('overview')
  const { user } = useUser()
  const [state, setState] = useState<LoadState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      const result = await getDashboardData()
      if (!isMounted) return
      setState({
        data: result.data,
        loading: false,
        error: result.error,
      })
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (state.loading) {
      return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
          Loading dashboard data...
        </div>
      )
    }

    if (state.error || !state.data) {
      return (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Unable to load dashboard data. Please try again.
        </div>
      )
    }

    return (
      <>
        {tab === 'overview' && (
          <Overview
            metrics={state.data.metrics}
            allocation={state.data.allocation}
            contributions={state.data.contributions}
            goalProgress={state.data.goalProgress}
          />
        )}
        {tab === 'wallet' && (
          <Wallet balanceSeries={state.data.balanceSeries} transactions={state.data.transactions} />
        )}
        {tab === 'goals' && <Goals goals={state.data.goals} />}
        {tab === 'investments' && (
          <Investments
            allocation={state.data.allocation}
            investments={state.data.investments}
            performance={state.data.performance}
          />
        )}
        {tab === 'community' && (
          <Community communityPosts={state.data.communityPosts} engagement={state.data.engagement} />
        )}
      </>
    )
  }, [state, tab])

  return (
    <>
      <SignedOut>
        {view === 'landing' ? (
          <Landing onGetStarted={() => setView('login')} onSignIn={() => setView('login')} />
        ) : (
          <Login onBack={() => setView('landing')} />
        )}
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <header className="sticky top-0 z-10 border-b border-slate-200 backdrop-blur bg-white/80">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
              <h1 className="font-bold text-xl text-brand-700">Cyanase Collective</h1>
              <div className="flex gap-6 text-sm">
                {navTabs.map((tabItem) => (
                  <button
                    key={tabItem.key}
                    onClick={() => setTab(tabItem.key)}
                    className={`font-medium ${tab === tabItem.key ? 'text-brand-700 border-b-2 border-brand-700 pb-1' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    {tabItem.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-xs text-slate-600">
                  <div className="font-semibold text-slate-800">{user?.fullName ?? 'Member'}</div>
                  <div className="uppercase tracking-wide">{user?.publicMetadata?.role ?? 'member'}</div>
                </div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8">
            <RequireRole role="admin">
              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                <div className="font-semibold">Admin Controls</div>
                <p className="text-sm text-amber-800">
                  This section is visible to admins only. Replace with real admin tooling when backend
                  authorization is wired.
                </p>
              </div>
            </RequireRole>
            {content}
          </main>

          <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
            Cyanase Collective (c) 2025 - Finance made social - Learn - Save - Invest - Together
          </footer>
        </div>
      </SignedIn>
    </>
  )
}
