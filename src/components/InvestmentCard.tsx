type InvestmentCardProps = {
  name: string
  yield: string
  amount: string
}

export default function InvestmentCard({ name, yield: y, amount }: InvestmentCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="font-semibold mb-2">{name}</h4>
      <p className="text-sm text-slate-600 mb-1">Est. Yield: {y}</p>
      <p className="text-sm text-slate-600 mb-3">Amount: {amount}</p>
      <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm w-full">Manage</button>
    </div>
  )
}
