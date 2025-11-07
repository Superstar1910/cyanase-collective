
import { useState } from 'react'
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend
} from 'recharts'

export default function App() {
  const [tab, setTab] = useState<'overview'|'wallet'|'goals'|'investments'|'community'>('overview')

  const navTabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'wallet', label: 'Wallet' },
    { key: 'goals', label: 'Goals' },
    { key: 'investments', label: 'Investments' },
    { key: 'community', label: 'Community' }
  ] as const

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-10 border-b border-slate-200 backdrop-blur bg-white/80">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-bold text-xl text-indigo-700">Cyanase Collective</h1>
          <div className="flex gap-6 text-sm">
            {navTabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as any)}
                className={`font-medium ${tab === t.key ? 'text-indigo-700 border-b-2 border-indigo-700 pb-1' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm shadow-sm">Add Funds</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'overview' && <Overview />}
        {tab === 'wallet' && <Wallet />}
        {tab === 'goals' && <Goals />}
        {tab === 'investments' && <Investments />}
        {tab === 'community' && <Community />}
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        Cyanase Collective © 2025 • Finance made social • Learn • Save • Invest • Together
      </footer>
    </div>
  )
}

function Overview() {
  const alloc = [
    { name: 'T-Bills', value: 38 },
    { name: 'Money Market', value: 29 },
    { name: 'Global ETF', value: 21 },
    { name: 'Cash', value: 12 },
  ]
  const contrib = [
    { m: 'Apr', amt: 0.9 },
    { m: 'May', amt: 1.2 },
    { m: 'Jun', amt: 0.8 },
    { m: 'Jul', amt: 1.4 },
    { m: 'Aug', amt: 1.1 },
    { m: 'Sep', amt: 1.7 },
    { m: 'Oct', amt: 1.3 },
    { m: 'Nov', amt: 1.6 },
  ]
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Your Dashboard</h2>
      <p className="text-slate-600 mb-6">Track your financial journey — balances, progress, goals, and investments at a glance.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <MetricCard title="Wallet Balance" value="UGX 2,450,000" subtitle="+UGX 150k this month" icon="💰" />
        <MetricCard title="Active Goals" value="3" subtitle="2 nearing completion" icon="🎯" />
        <MetricCard title="Investments" value="UGX 7,800,000" subtitle="Across 4 products" icon="📈" />
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h4 className="font-semibold mb-2">Portfolio Allocation</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={alloc} dataKey="value" nameKey="name" outerRadius={80} innerRadius={48}>
                  {alloc.map((_, i) => (<Cell key={i} />))}
                </Pie>
                <RTooltip formatter={(v: any) => `${v}%`} />
                <Legend verticalAlign="bottom" height={24} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h4 className="font-semibold mb-2">Monthly Contributions (UGX millions)</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contrib}>
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
        <GoalProgress name="Education Fund" percent={72} amount="UGX 3,600,000 / UGX 5,000,000" />
        <GoalProgress name="Club Expansion" percent={40} amount="UGX 2,000,000 / UGX 5,000,000" />
      </div>
    </section>
  )
}

function Wallet() {
  const balanceSeries = [
    { d: 'Jun', v: 1.6 },
    { d: 'Jul', v: 1.9 },
    { d: 'Aug', v: 2.2 },
    { d: 'Sep', v: 2.05 },
    { d: 'Oct', v: 2.3 },
    { d: 'Nov', v: 2.45 },
  ]
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Wallet</h2>
      <p className="text-slate-600 mb-6">View your transactions, add funds via mobile money, bank, or stablecoin, and withdraw anytime.</p>
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
          <li className="flex justify-between border-b py-2"><span>Deposit via MTN</span><span>+UGX 500,000</span></li>
          <li className="flex justify-between border-b py-2"><span>Investment allocation</span><span>-UGX 300,000</span></li>
          <li className="flex justify-between border-b py-2"><span>Interest earned</span><span>+UGX 45,000</span></li>
        </ul>
      </div>
    </section>
  )
}

function Goals() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>
      <p className="text-slate-600 mb-6">Create goal-based saving plans for you or your club and track progress together.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <GoalCard name="Education Fund" target="UGX 5,000,000" current="UGX 3,600,000" members={5} />
        <GoalCard name="Vacation 2026" target="UGX 2,000,000" current="UGX 500,000" members={1} />
      </div>
      <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm">+ New Goal</button>
    </section>
  )
}

function Investments() {
  const perf = [
    { m: 'Jun', y: 0.6 },
    { m: 'Jul', y: 0.8 },
    { m: 'Aug', y: 0.4 },
    { m: 'Sep', y: 0.9 },
    { m: 'Oct', y: 0.7 },
    { m: 'Nov', y: 1.0 },
  ]
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Investments</h2>
      <p className="text-slate-600 mb-6">View your portfolio, returns, and reallocation opportunities.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <InvestmentCard name="Treasury Bills" yield="12.1%" amount="UGX 3,000,000" />
        <InvestmentCard name="Money Market Fund" yield="10.6%" amount="UGX 2,200,000" />
        <InvestmentCard name="Global Tech ETF" yield="8.5%" amount="USD 1,500" />
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-1">
          <h4 className="font-semibold mb-2">Allocation</h4>
          <AllocationPie />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <h4 className="font-semibold mb-2">Monthly Performance (%)</h4>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={perf}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis />
                <RTooltip />
                <Line type="monotone" dataKey="y" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}

function Community() {
  const activity = [
    { m: 'Jun', posts: 6, badges: 3 },
    { m: 'Jul', posts: 8, badges: 4 },
    { m: 'Aug', posts: 5, badges: 2 },
    { m: 'Sep', posts: 9, badges: 5 },
    { m: 'Oct', posts: 7, badges: 4 },
    { m: 'Nov', posts: 10, badges: 6 },
  ]
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Community</h2>
      <p className="text-slate-600 mb-6">See what others are learning and investing in. Share progress, earn badges, and connect.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <CommunityPost user="Sarah" action="completed the 'Investing Together' course" />
        <CommunityPost user="Kampala Investment Club" action="hit 80% of their Education Fund goal!" />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mt-6">
        <h4 className="font-semibold mb-2">Engagement (last 6 months)</h4>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="m" />
              <YAxis />
              <Legend />
              <RTooltip />
              <Bar dataKey="posts" />
              <Bar dataKey="badges" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <button className="mt-6 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm">Join Discussion</button>
    </section>
  )
}

// UI Components
function MetricCard({ title, value, subtitle, icon }: { title: string, value: string, subtitle: string, icon: string }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  )
}

function GoalProgress({ name, percent, amount }: { name: string, percent: number, amount: string }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="font-semibold mb-2">{name}</h4>
      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
        <div className="bg-indigo-600 h-3 rounded-full" style={{ width: `${percent}%` }}></div>
      </div>
      <p className="text-sm text-slate-600">{amount}</p>
    </div>
  )
}

function GoalCard({ name, target, current, members }: { name: string, target: string, current: string, members: number }){
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

function InvestmentCard({ name, yield: y, amount }: { name: string, yield: string, amount: string }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h4 className="font-semibold mb-2">{name}</h4>
      <p className="text-sm text-slate-600 mb-1">Est. Yield: {y}</p>
      <p className="text-sm text-slate-600 mb-3">Amount: {amount}</p>
      <button className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-sm w-full">Manage</button>
    </div>
  )
}

function CommunityPost({ user, action }: { user: string, action: string }){
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-left">
      <p className="text-slate-800 text-sm"><b>{user}</b> {action}</p>
    </div>
  )
}

function AllocationPie(){
  const data = [
    { name: 'T-Bills', value: 38 },
    { name: 'Money Market', value: 29 },
    { name: 'Global ETF', value: 21 },
    { name: 'Cash', value: 12 },
  ]
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} innerRadius={48}>
            {data.map((_, i) => (<Cell key={i} />))}
          </Pie>
          <RTooltip formatter={(v: any) => `${v}%`} />
          <Legend verticalAlign="bottom" height={24} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
