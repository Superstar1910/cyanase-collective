import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { balanceSeries, transactions } from '../data/dashboard'

export default function Wallet() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
      <p className="text-slate-600 mb-6">
        View your transactions, add funds via mobile money, bank, or stablecoin, and withdraw anytime.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="font-semibold">UGX Wallet</h3>
            <p className="text-slate-500 text-sm">Available balance</p>
          </div>
          <div className="text-xl font-bold">UGX 2,450,000</div>
        </div>
        <div className="flex gap-3 mb-4">
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm">Add Funds</button>
          <button className="px-3 py-2 rounded-xl border border-slate-300 text-sm">Withdraw</button>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={balanceSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="d" />
              <YAxis />
              <RTooltip />
              <Line type="monotone" dataKey="v" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-6">
        <h4 className="font-semibold mb-2">Recent Transactions</h4>
        <ul className="text-sm space-y-2">
          {transactions.map((tx) => (
            <li key={tx.label} className="flex justify-between border-b py-2">
              <span>{tx.label}</span>
              <span>{tx.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
