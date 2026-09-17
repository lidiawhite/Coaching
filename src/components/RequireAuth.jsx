import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../api/AuthProvider.jsx'

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          <p className="font-heading text-sm tracking-[0.3em] text-muted-foreground uppercase">Cargando</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    const returnTo = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/auth?returnTo=${returnTo}`} replace />
  }

  return children
}
