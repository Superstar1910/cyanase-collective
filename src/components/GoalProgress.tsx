type GoalProgressProps = {
  name: string
  percent: number
  amount: string
}

export default function GoalProgress({ name, percent, amount }: GoalProgressProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="font-semibold mb-2">{name}</h4>
      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
        <div className="bg-brand-600 h-3 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="text-sm text-slate-600">{amount}</p>
    </div>
  )
}
