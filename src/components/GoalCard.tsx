type GoalCardProps = {
  name: string
  target: string
  current: string
  members: number
}

export default function GoalCard({ name, target, current, members }: GoalCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="font-semibold mb-2">{name}</h4>
      <p className="text-sm text-slate-600">Target: {target}</p>
      <p className="text-sm text-slate-600 mb-2">Current: {current}</p>
      <p className="text-xs text-slate-500">Members: {members}</p>
      <button className="mt-3 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm">View Details</button>
    </div>
  )
}
