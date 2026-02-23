import GoalCard from '../components/GoalCard'
import { goals } from '../data/dashboard'

export default function Goals() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>
      <p className="text-slate-600 mb-6">
        Create goal-based saving plans for you or your club and track progress together.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <GoalCard
            key={goal.name}
            name={goal.name}
            target={goal.target}
            current={goal.current}
            members={goal.members}
          />
        ))}
      </div>
      <button className="mt-6 px-4 py-2 bg-brand-600 text-white rounded-xl text-sm">+ New Goal</button>
    </section>
  )
}
