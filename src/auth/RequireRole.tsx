import { useUser } from '@clerk/clerk-react'

type RequireRoleProps = {
  role: string
  children: React.ReactNode
}

export default function RequireRole({ role, children }: RequireRoleProps) {
  const { user } = useUser()
  const currentRole = (user?.publicMetadata?.role as string | undefined) ?? 'member'

  if (currentRole !== role) return null
  return <>{children}</>
}
