type MetricCardProps = {
  title: string
  value: string
  subtitle: string
  icon: string
}

export default function MetricCard({ title, value, subtitle, icon }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  )
}
