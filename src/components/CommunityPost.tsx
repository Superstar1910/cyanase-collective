type CommunityPostProps = {
  user: string
  action: string
}

export default function CommunityPost({ user, action }: CommunityPostProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm text-left">
      <p className="text-slate-800 text-sm"><b>{user}</b> {action}</p>
    </div>
  )
}
