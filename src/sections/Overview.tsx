import {
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import AllocationPie from '../components/AllocationPie'
import GoalProgress from '../components/GoalProgress'
import MetricCard from '../components/MetricCard'
import {
  allocation,
  contributions,
  goalProgress,
  metrics,
} from '../data/dashboard'

export default function Overview() {
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis />
                <RTooltip />
                <Bar dataKey="amt" />
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
