import type {
  AllocationSlice,
  ContributionPoint,
  GoalProgressItem,
  Metric,
} from '../data/dashboard'

import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import AllocationPie from '../components/AllocationPie'
import GoalProgress from '../components/GoalProgress'
import MetricCard from '../components/MetricCard'
import { chartTheme } from '../constants/chartTheme'

type OverviewProps = {
  metrics: Metric[]
  allocation: AllocationSlice[]
  contributions: ContributionPoint[]
  goalProgress: GoalProgressItem[]
}

export default function Overview({ metrics, allocation, contributions, goalProgress }: OverviewProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Your Dashboard</h2>
      <p className="text-slate-600 mb-6">
        Track your financial journey - balances, progress, goals, and investments at a glance.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            subtitle={metric.subtitle}
            icon={metric.icon}
          />
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h4 className="font-semibold mb-2">Portfolio Allocation</h4>
          <AllocationPie data={allocation} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h4 className="font-semibold mb-2">Monthly Contributions (UGX millions)</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contributions}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                <XAxis dataKey="m" tick={{ fill: chartTheme.axis }} axisLine={{ stroke: chartTheme.grid }} />
                <YAxis tick={{ fill: chartTheme.axis }} axisLine={{ stroke: chartTheme.grid }} />
                <RTooltip
                  contentStyle={{
                    backgroundColor: chartTheme.tooltipBg,
                    borderColor: chartTheme.tooltipBorder,
                    color: chartTheme.text,
                  }}
                  labelStyle={{ color: chartTheme.text }}
                />
                <Bar dataKey="amt" fill={chartTheme.series[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {goalProgress.map((goal) => (
          <GoalProgress
            key={goal.name}
            name={goal.name}
            percent={goal.percent}
            amount={goal.amount}
          />
        ))}
      </div>
    </section>
  )
}
