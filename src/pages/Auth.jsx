import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '../api/AuthProvider.jsx'
import { isOffline } from '../api/base44Client.js'

export default function Auth() {
  const { isAuthenticated, loginViaEmailPassword, register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // Only allow in-app paths as the return destination (avoid open redirects).
  const rawReturnTo = searchParams.get('returnTo') ?? '/dashboard'
  const returnTo = rawReturnTo.startsWith('/') && !rawReturnTo.startsWith('//') ? rawReturnTo : '/dashboard'
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Signed-in users skip the form entirely.
  useEffect(() => {
    if (isAuthenticated) navigate(returnTo, { replace: true })
  }, [isAuthenticated, navigate, returnTo])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'login') {
        await loginViaEmailPassword(form.email, form.password)
      } else {
        await register(form)
      }
      navigate(returnTo, { replace: true })
    } catch (err) {
      setError(err?.message ?? 'No se pudo completar la operación.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 sm:px-6 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(43_36%_55%/0.14),transparent_55%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-xl sm:p-10">
          <div className="mb-8 flex flex-col gap-2 text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === 'login'
                ? 'Accede al panel para revisar tu plan y tus métricas.'
                : 'Empieza tu diagnóstico y recibe tu primer plan.'}
            </p>
          </div>

          <div className="mb-8 grid grid-cols-2 rounded-full border border-border bg-secondary p-1">
            {['login', 'signup'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setMode(value)
                  setError(null)
                }}
                className={`rounded-full py-2 text-sm font-semibold transition-colors ${
                  mode === value ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {value === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            ))}
          </div>

          {isOffline && (
            <p className="mb-6 rounded-xl border border-accent/40 bg-secondary px-4 py-3 text-center text-xs text-muted-foreground">
              Modo demostración: introduce cualquier email y contraseña para explorar la aplicación.
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {mode === 'signup' && (
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium">Nombre</span>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Ana García"
                  className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                  autoComplete="name"
                />
              </label>
            )}
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="tu@email.com"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                autoComplete="email"
              />
            </label>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium">Contraseña</span>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                placeholder="••••••••"
                className="rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
            </label>

            {error && (
              <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              {mode === 'login' ? 'Entrar al panel' : 'Crear cuenta y empezar'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            Al continuar aceptas los términos del servicio y la política de privacidad de El Método White.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
