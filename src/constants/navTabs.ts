export type TabKey = 'overview' | 'wallet' | 'goals' | 'investments' | 'community'

export const navTabs: ReadonlyArray<{ key: TabKey; label: string }> = [
  { key: 'overview', label: 'Overview' },
  { key: 'wallet', label: 'Wallet' },
  { key: 'goals', label: 'Goals' },
  { key: 'investments', label: 'Investments' },
  { key: 'community', label: 'Community' },
]
