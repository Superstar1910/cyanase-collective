import { useEffect, useMemo, useState } from 'react'

import { navTabs, type TabKey } from './constants/navTabs'
import { getDashboardData, type DashboardData } from './data/api'
import Community from './sections/Community'
import Goals from './sections/Goals'
import Investments from './sections/Investments'
import Overview from './sections/Overview'
import Wallet from './sections/Wallet'

type LoadState = {
  data: DashboardData | null
  loading: boolean
  error: string | null
}

export default function App() {
  const [tab, setTab] = useState<TabKey>('overview')
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
          <button className="px-3 py-2 rounded-xl bg-brand-600 text-white text-sm shadow-sm">Add Funds</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{content}</main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        Cyanase Collective (c) 2025 - Finance made social - Learn - Save - Invest - Together
      </footer>
    </div>
  )
}
