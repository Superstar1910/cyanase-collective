import type {
  AllocationSlice,
  InvestmentItem,
  PerformancePoint,
} from '../data/dashboard'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import AllocationPie from '../components/AllocationPie'
import InvestmentCard from '../components/InvestmentCard'
import { chartTheme } from '../constants/chartTheme'

type InvestmentsProps = {
  allocation: AllocationSlice[]
  investments: InvestmentItem[]
  performance: PerformancePoint[]
}

export default function Investments({ allocation, investments, performance }: InvestmentsProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Investments</h2>
      <p className="text-slate-600 mb-6">View your portfolio, returns, and reallocation opportunities.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {investments.map((investment) => (
          <InvestmentCard
            key={investment.name}
            name={investment.name}
            yield={investment.yield}
            amount={investment.amount}
          />
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h4 className="font-semibold mb-2">Allocation</h4>
          <AllocationPie data={allocation} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h4 className="font-semibold mb-2">Monthly Performance (%)</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performance}>
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
                <Line type="monotone" dataKey="y" stroke={chartTheme.series[1]} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
