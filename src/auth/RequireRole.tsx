import type { ReactNode } from 'react'

import { useAuth } from './AuthContext'
import type { Role } from './types'

type RequireRoleProps = {
  role: Role
  children: ReactNode
}

export default function RequireRole({ role, children }: RequireRoleProps) {
  const { user } = useAuth()
  if (user.role !== role) return null
  return <>{children}</>
}
