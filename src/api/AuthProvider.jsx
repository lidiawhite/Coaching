import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { base44, isOffline } from './base44Client.js'
import { mockDb } from './mockDb.js'

const SESSION_KEY = 'metodo-white-session'
const AuthContext = createContext(null)

/**
 * Auth provider that adapts to the runtime:
 * - Inside Base44 (platform injects `globalThis.__B44_DB__`): delegates to the SDK auth module.
 * - Offline (Freebuff preview / local dev): localStorage-backed session with demo login.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function hydrate() {
      try {
        if (!isOffline) {
          const authenticated = await base44.auth.isAuthenticated()
          const me = authenticated ? await base44.auth.me() : null
          if (!cancelled) setUser(me ?? null)
        } else if (typeof window !== 'undefined') {
          const raw = window.localStorage.getItem(SESSION_KEY)
          if (!cancelled && raw) setUser(JSON.parse(raw))
        }
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    hydrate()
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      async loginViaEmailPassword(email, password) {
        if (!isOffline) {
          await base44.auth.loginViaEmailPassword(email, password)
          const authenticated = await base44.auth.isAuthenticated()
          setUser(authenticated ? await base44.auth.me() : null)
          return
        }
        if (!email || !password) throw new Error('Introduce email y contraseña.')
        const name = email.split('@')[0]
        const nextUser = { email, full_name: name.charAt(0).toUpperCase() + name.slice(1), role: 'coach' }
        setUser(nextUser)
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
      },
      async register({ email, password, full_name }) {
        if (!isOffline) {
          // Full name is not part of the SDK register payload; keep it in the profile if provided.
          await base44.auth.register({ email, password })
          const authenticated = await base44.auth.isAuthenticated()
          setUser(authenticated ? await base44.auth.me() : null)
          return
        }
        if (!email) throw new Error('Introduce un email válido.')
        if (!password || password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')
        const name = full_name || email.split('@')[0]
        const nextUser = { email, full_name: name.charAt(0).toUpperCase() + name.slice(1), role: 'coach' }
        setUser(nextUser)
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser))
      },
      logout() {
        try {
          if (!isOffline) base44.auth.logout()
        } finally {
          window.localStorage.removeItem(SESSION_KEY)
          setUser(null)
        }
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

/** Entity accessor: platform entities when hosted, mock when offline. */
export function useEntities() {
  return isOffline ? mockDb : base44.entities
}
