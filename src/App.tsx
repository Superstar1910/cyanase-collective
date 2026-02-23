import { useState } from 'react'

import { navTabs, type TabKey } from './constants/navTabs'
import Community from './sections/Community'
import Goals from './sections/Goals'
import Investments from './sections/Investments'
import Overview from './sections/Overview'
import Wallet from './sections/Wallet'

export default function App() {
  const [tab, setTab] = useState<TabKey>('overview')

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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'overview' && <Overview />}
        {tab === 'wallet' && <Wallet />}
        {tab === 'goals' && <Goals />}
        {tab === 'investments' && <Investments />}
        {tab === 'community' && <Community />}
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        Cyanase Collective (c) 2025 - Finance made social - Learn - Save - Invest - Together
      </footer>
    </div>
  )
}
