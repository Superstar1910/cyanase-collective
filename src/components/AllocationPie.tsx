import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RTooltip,
  Legend,
} from 'recharts'

import { chartTheme } from '../constants/chartTheme'
import type { AllocationSlice } from '../data/dashboard'

type AllocationPieProps = {
  data: AllocationSlice[]
}

export default function AllocationPie({ data }: AllocationPieProps) {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} innerRadius={48}>
            {data.map((_, i) => (
              <Cell key={i} fill={chartTheme.series[i % chartTheme.series.length]} />
            ))}
          </Pie>
          <RTooltip
            formatter={(v: any) => `${v}%`}
            contentStyle={{
              backgroundColor: chartTheme.tooltipBg,
              borderColor: chartTheme.tooltipBorder,
              color: chartTheme.text,
            }}
            labelStyle={{ color: chartTheme.text }}
          />
          <Legend verticalAlign="bottom" height={24} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
