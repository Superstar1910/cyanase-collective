import { createContext, useContext, useMemo, useState } from 'react'

import type { Role, User } from './types'

type AuthState = {
  user: User
  setRole: (role: Role) => void
}

const AuthContext = createContext<AuthState | null>(null)

const defaultUser: User = {
  name: 'Kenneth Legesi',
  role: 'member',
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser)

  const value = useMemo<AuthState>(
    () => ({
      user,
      setRole: (role) => setUser((prev) => ({ ...prev, role })),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
