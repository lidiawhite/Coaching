import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarCheck, Flame, ShieldAlert, Users } from 'lucide-react'
import { useAuth, useEntities } from '../api/AuthProvider.jsx'

const card = 'rounded-3xl border border-border bg-card p-6'

function StatCard({ icon: Icon, label, value, note, tone = 'neutral' }) {
  const tones = {
    neutral: 'bg-secondary text-muted-foreground',
    positive: 'bg-emerald-100 text-emerald-700',
    negative: 'bg-amber-100 text-amber-700',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={card}
    >
      <div className="flex items-start justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-accent">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        {note != null && (
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${tones[tone]}`}>
            {note}
          </span>
        )}
      </div>
      <p className="mt-4 font-heading text-3xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
    </motion.div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    active: 'bg-emerald-100 text-emerald-800',
    at_risk: 'bg-amber-100 text-amber-800',
    paused: 'bg-neutral-200 text-neutral-700',
  }
  const labels = {
    active: 'Activo',
    at_risk: 'En riesgo',
    paused: 'En pausa',
  }
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles[status] ?? styles.paused}`}>
      {labels[status] ?? status}
    </span>
  )
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const entities = useEntities()

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => entities.Clients.filter({}),
  })
  const { data: programs = [] } = useQuery({
    queryKey: ['programs'],
    queryFn: () => entities.Programs.filter({}),
  })
  const { data: assessments = [] } = useQuery({
    queryKey: ['assessments'],
    queryFn: () => entities.Assessments.filter({}),
  })

  const stats = useMemo(() => {
    const active = clients.filter((c) => c.status === 'active').length
    const atRisk = clients.filter((c) => c.status === 'at_risk').length
    // Only count clients that actually report adherence data.
    const tracked = clients.filter((c) => typeof c.adherence === 'number')
    const avgAdherence = tracked.length
      ? tracked.reduce((sum, c) => sum + c.adherence, 0) / tracked.length
      : 0
    return { active, atRisk, avgAdherence, trackedCount: tracked.length }
  }, [clients])

  const recentAssessments = useMemo(
    () => [...assessments].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '')).slice(0, 4),
    [assessments],
  )

  if (isLoading) {
    return (
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-32 sm:px-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Panel del coach</p>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Hola, {user?.full_name ?? 'Coach'}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Resumen de tu cartera de clientes y del estado de sus programas.
          </p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-destructive/50 hover:text-destructive"
        >
          Cerrar sesión
        </button>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Clientes activos" value={String(stats.active)} note="de tu cartera" />
        <StatCard
          icon={Flame}
          label="Adherencia media"
          value={`${Math.round(stats.avgAdherence * 100)}%`}
          note={`${stats.trackedCount} seguidos`}
        />
        <StatCard icon={CalendarCheck} label="Programas en catálogo" value={String(programs.length)} note="biblioteca" />
        <StatCard
          icon={ShieldAlert}
          label="Clientes en riesgo"
          value={String(stats.atRisk)}
          note={stats.atRisk > 0 ? 'requieren seguimiento' : 'al día'}
          tone={stats.atRisk > 0 ? 'negative' : 'positive'}
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className={card}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-heading text-xl font-bold">Clientes</h2>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">{clients.length} en total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 pr-4 font-medium">Cliente</th>
                  <th className="pb-3 pr-4 font-medium">Etapa</th>
                  <th className="pb-3 pr-4 font-medium">Adherencia</th>
                  <th className="pb-3 font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id} className="border-b border-border/60 last:border-0 hover:bg-secondary/50">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-heading text-xs font-bold text-primary-foreground">
                          {client.name?.charAt(0) ?? '?'}
                        </span>
                        <div>
                          <p className="font-semibold">{client.name}</p>
                          <p className="text-xs text-muted-foreground">{client.goal}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-muted-foreground">{client.stage}</td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${Math.round((client.adherence ?? 0) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold">{Math.round((client.adherence ?? 0) * 100)}%</span>
                      </div>
                    </td>
                    <td className="py-4">
                      <StatusBadge status={client.status} />
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-muted-foreground">
                      Aún no hay clientes. Empieza añadiendo el primero.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className={card}>
            <h2 className="mb-5 font-heading text-xl font-bold">Últimas valoraciones</h2>
            <ul className="flex flex-col gap-4">
              {recentAssessments.map(({ _id, date, notes, weightKg }) => (
                <li key={_id} className="rounded-2xl border border-border/70 bg-background p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{date}</span>
                    <span className="text-xs font-semibold">{weightKg} kg</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{notes}</p>
                </li>
              ))}
              {recentAssessments.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">Sin valoraciones registradas.</li>
              )}
            </ul>
          </div>

          <div className={card}>
            <h2 className="mb-5 font-heading text-xl font-bold">Biblioteca de programas</h2>
            <ul className="flex flex-col gap-3">
              {programs.map(({ _id, name, type, weeks, sessionsPerWeek }) => (
                <li
                  key={_id}
                  className="group flex items-center justify-between rounded-2xl border border-border/70 bg-background p-4 transition-colors hover:border-accent/50"
                >
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-muted-foreground">
                      {type} · {weeks} semanas · {sessionsPerWeek}/sem
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-accent" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
