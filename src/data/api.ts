import { z } from 'zod'

const BackendWalletSchema = z.object({
  walletId: z.string(),
  currency: z.string(),
  balance: z.number().or(z.string()),
})

const BackendTransactionSchema = z.object({
  walletId: z.string(),
  currency: z.string(),
  entries: z.array(
    z.object({
      id: z.string(),
      amount: z.any(),
      currency: z.string(),
      type: z.string(),
      status: z.string(),
      createdAt: z.string().or(z.date()).optional(),
      metadata: z.any().optional(),
    }),
  ),
})

export type Metric = { title: string; value: string; subtitle: string; icon: string }
export type AllocationSlice = { name: string; value: number }
export type ContributionPoint = { m: string; amt: number }
export type GoalProgressItem = { name: string; percent: number; amount: string }
export type BalancePoint = { d: string; v: number }
export type TransactionItem = { label: string; amount: string }
export type GoalCardItem = { name: string; target: string; current: string; members: number }
export type InvestmentItem = { name: string; yield: string; amount: string }
export type PerformancePoint = { m: string; y: number }
export type CommunityPostItem = { user: string; action: string }
export type EngagementPoint = { m: string; posts: number; badges: number }

export const metrics: Metric[] = [
  { title: 'Wallet Balance', value: 'UGX 2,450,000', subtitle: '+UGX 150k this month', icon: '??' },
  { title: 'Active Goals', value: '3', subtitle: '2 nearing completion', icon: '??' },
  { title: 'Investments', value: 'UGX 7,800,000', subtitle: 'Across 4 products', icon: '??' },
]

export const allocation: AllocationSlice[] = [
  { name: 'T-Bills', value: 38 },
  { name: 'Money Market', value: 29 },
  { name: 'Global ETF', value: 21 },
  { name: 'Cash', value: 12 },
]

export const contributions: ContributionPoint[] = [
  { m: 'Apr', amt: 0.9 },
  { m: 'May', amt: 1.2 },
  { m: 'Jun', amt: 0.8 },
  { m: 'Jul', amt: 1.4 },
  { m: 'Aug', amt: 1.1 },
  { m: 'Sep', amt: 1.7 },
  { m: 'Oct', amt: 1.3 },
  { m: 'Nov', amt: 1.6 },
]

export const goalProgress: GoalProgressItem[] = [
  { name: 'Education Fund', percent: 72, amount: 'UGX 3,600,000 / UGX 5,000,000' },
  { name: 'Club Expansion', percent: 40, amount: 'UGX 2,000,000 / UGX 5,000,000' },
]

export const balanceSeries: BalancePoint[] = [
  { d: 'Jun', v: 1.6 },
  { d: 'Jul', v: 1.9 },
  { d: 'Aug', v: 2.2 },
  { d: 'Sep', v: 2.05 },
  { d: 'Oct', v: 2.3 },
  { d: 'Nov', v: 2.45 },
]

export const transactions: TransactionItem[] = [
  { label: 'Deposit via MTN', amount: '+UGX 500,000' },
  { label: 'Investment allocation', amount: '-UGX 300,000' },
  { label: 'Interest earned', amount: '+UGX 45,000' },
]

export const goals: GoalCardItem[] = [
  { name: 'Education Fund', target: 'UGX 5,000,000', current: 'UGX 3,600,000', members: 5 },
  { name: 'Vacation 2026', target: 'UGX 2,000,000', current: 'UGX 500,000', members: 1 },
]

export const investments: InvestmentItem[] = [
  { name: 'Treasury Bills', yield: '12.1%', amount: 'UGX 3,000,000' },
  { name: 'Money Market Fund', yield: '10.6%', amount: 'UGX 2,200,000' },
  { name: 'Global Tech ETF', yield: '8.5%', amount: 'USD 1,500' },
]

export const performance: PerformancePoint[] = [
  { m: 'Jun', y: 0.6 },
  { m: 'Jul', y: 0.8 },
  { m: 'Aug', y: 0.4 },
  { m: 'Sep', y: 0.9 },
  { m: 'Oct', y: 0.7 },
  { m: 'Nov', y: 1.0 },
]

export const communityPosts: CommunityPostItem[] = [
  { user: 'Sarah', action: "completed the 'Investing Together' course" },
  { user: 'Kampala Investment Club', action: 'hit 80% of their Education Fund goal!' },
]

export const engagement: EngagementPoint[] = [
  { m: 'Jun', posts: 6, badges: 3 },
  { m: 'Jul', posts: 8, badges: 4 },
  { m: 'Aug', posts: 5, badges: 2 },
  { m: 'Sep', posts: 9, badges: 5 },
  { m: 'Oct', posts: 7, badges: 4 },
  { m: 'Nov', posts: 10, badges: 6 },
]

export type DashboardData = {
  metrics: Metric[]
  allocation: AllocationSlice[]
  contributions: ContributionPoint[]
  goalProgress: GoalProgressItem[]
  balanceSeries: BalancePoint[]
  transactions: TransactionItem[]
  goals: GoalCardItem[]
  investments: InvestmentItem[]
  performance: PerformancePoint[]
  communityPosts: CommunityPostItem[]
  engagement: EngagementPoint[]
}

export type DataResult<T> = {
  data: T | null
  error: string | null
}

async function fetchBackendWallet(token: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'
  const response = await fetch(`${baseUrl}/accounts/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Wallet fetch failed: ${response.status}`)
  }
  const json = await response.json()
  return BackendWalletSchema.parse(json)
}

async function fetchBackendTransactions(token: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'
  const response = await fetch(`${baseUrl}/accounts/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Transactions fetch failed: ${response.status}`)
  }
  const json = await response.json()
  return BackendTransactionSchema.parse(json)
}

export async function getDashboardData(token?: string): Promise<DataResult<DashboardData>> {
  try {
    let walletBalance = metrics[0].value
    let txList = transactions

    if (token) {
      const wallet = await fetchBackendWallet(token)
      walletBalance = `${wallet.currency} ${Number(wallet.balance).toLocaleString()}`

      const tx = await fetchBackendTransactions(token)
      txList = tx.entries.slice(0, 3).map((entry) => ({
        label: entry.type,
        amount: `${entry.type === 'collection' ? '+' : '-'}${entry.currency} ${Number(entry.amount).toLocaleString()}`,
      }))
    }

    return {
      data: {
        metrics: [
          { ...metrics[0], value: walletBalance },
          metrics[1],
          metrics[2],
        ],
        allocation,
        contributions,
        goalProgress,
        balanceSeries,
        transactions: txList,
        goals,
        investments,
        performance,
        communityPosts,
        engagement,
      },
      error: null,
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
