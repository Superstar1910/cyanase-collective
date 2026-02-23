import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from 'recharts'

import CommunityPost from '../components/CommunityPost'
import { communityPosts, engagement } from '../data/dashboard'

export default function Community() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Community</h2>
      <p className="text-slate-600 mb-6">
        See what others are learning and investing in. Share progress, earn badges, and connect.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {communityPosts.map((post) => (
          <CommunityPost key={post.user} user={post.user} action={post.action} />
        ))}
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mt-6">
        <h4 className="font-semibold mb-2">Engagement (last 6 months)</h4>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagement}>
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
