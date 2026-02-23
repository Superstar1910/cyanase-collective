import type {
  AllocationSlice,
  BalancePoint,
  CommunityPostItem,
  ContributionPoint,
  EngagementPoint,
  GoalCardItem,
  GoalProgressItem,
  InvestmentItem,
  Metric,
  PerformancePoint,
  TransactionItem,
} from './dashboard'

import {
  allocation,
  balanceSeries,
  communityPosts,
  contributions,
  engagement,
  goalProgress,
  goals,
  investments,
  metrics,
  performance,
  transactions,
} from './dashboard'

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

export async function getDashboardData(): Promise<DataResult<DashboardData>> {
  try {
    return {
      data: {
        metrics,
        allocation,
        contributions,
        goalProgress,
        balanceSeries,
        transactions,
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
