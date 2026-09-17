import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Dumbbell, HeartPulse, Sparkles, UtensilsCrossed } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

const stats = [
  { value: '+2.400', label: 'planes entregados' },
  { value: '94%', label: 'adherencia media' },
  { value: '12', label: 'semanas medias de programa' },
  { value: '4.9/5', label: 'valoración de clientes' },
]

const pillars = [
  {
    icon: UtensilsCrossed,
    title: 'Nutrición periodizada',
    description:
      'Planes que respiran con tu entrenamiento: hidratos y proteína ajustados a cada fase del ciclo.',
  },
  {
    icon: Dumbbell,
    title: 'Entrenamiento medido',
    description:
      'Carga por RPE, progresiones semanales y test de fuerza cada mesociclo. Nada de sensaciones.',
  },
  {
    icon: HeartPulse,
    title: 'Adherencia real',
    description:
      'Seguimiento semanal, ajustes con datos y hábitos que sobreviven al verano y a las vacaciones.',
  },
  {
    icon: Sparkles,
    title: 'Acompañamiento 1:1',
    description:
      'Revisión quincenal con tu coach, videollamada mensual y canal directo para dudas rápidas.',
  },
]

const methodSteps = [
  {
    number: '01',
    title: 'Diagnóstico',
    description:
      'Analítica, composición corporal, historial deportivo y estilo de vida. Empezamos por la verdad.',
  },
  {
    number: '02',
    title: 'Diseño',
    description:
      'Plan de alimentación y entrenamiento construidos sobre tus datos, tus horarios y tus gustos.',
  },
  {
    number: '03',
    title: 'Ejecución guiada',
    description:
      'Check-ins semanales, ajustes finos y métricas visibles: carga, composición, energía y sueño.',
  },
  {
    number: '04',
    title: 'Autonomía',
    description:
      'Aprendes a gestionar tu cuerpo: mantenimiento, transiciones de fase y decisiones sin depender de nadie.',
  },
]

const testimonials = [
  {
    quote:
      'Llevaba años girando en círculos. En cuatro meses gané 3 kg de masa magra y por fin entiendo qué comer en cada día de entreno.',
    name: 'Valentina R.',
    role: 'Recomposición corporal',
  },
  {
    quote:
      'Bajé de 2h04 a 1h52 en la media maratón sin lesionarme. El bloqueo de fuerza fue la clave que no veía.',
    name: 'Mateo S.',
    role: 'Media maratón — Sub 2h',
  },
  {
    quote:
      'No es una dieta, es un sistema. Perdí 7 kg en 12 semanas y la adherencia se volvió automática.',
    name: 'Camila D.',
    role: 'Pérdida de grasa sostenible',
  },
]

export default function Landing() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(43_36%_55%/0.18),transparent_55%)]"
        />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-28">
          <motion.div initial="hidden" animate="visible" className="flex flex-col gap-6">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/40 bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-accent-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Coaching nutricional &amp; deportivo
            </motion.p>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              Tu cuerpo, gobernado por <span className="italic text-accent">método</span>, no por moda.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="max-w-xl text-lg leading-relaxed text-muted-foreground"
            >
              Un sistema de coaching premium que une nutrición periodizada y entrenamiento medido para
              construir resultados que se sostienen. Diagnóstico, plan, ejecución — y nada de humo.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-4">
              <Link
                to="/auth"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Empezar mi plan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#metodo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold transition-colors hover:border-accent/60 hover:text-accent-foreground"
              >
                Conocer el método
              </a>
            </motion.div>
            <motion.dl variants={fadeUp} custom={4} className="mt-4 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-heading text-2xl font-bold">{value}</dd>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border/70 px-6 py-4">
                <p className="font-heading text-sm font-bold tracking-wide">Panel del cliente</p>
                <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Semana 8
                </span>
              </div>
              <div className="space-y-4 p-6">
                {[
                  { label: 'Peso', value: '61.4 kg', delta: '−0.6 esta semana', positive: true },
                  { label: 'Grasa corporal', value: '22.1 %', delta: '−0.8 % vs. agosto', positive: true },
                  { label: 'Adherencia', value: '92 %', delta: 'Check-in puntual', positive: true },
                  { label: 'Sentadilla', value: '92.5 kg', delta: '+7.5 kg en el ciclo', positive: true },
                ].map(({ label, value, delta }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-2xl border border-border/70 bg-background px-5 py-4"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
                      <p className="font-heading text-xl font-bold">{value}</p>
                    </div>
                    <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                      {delta}
                    </span>
                  </div>
                ))}
                <div className="rounded-2xl bg-primary px-5 py-4 text-primary-foreground">
                  <p className="text-xs uppercase tracking-wider opacity-70">Próxima revisión</p>
                  <p className="font-heading text-lg font-bold">Videollamada · viernes 18:00</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section id="programa" className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Los pilares</p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Cuatro palancas, un solo resultado
          </h2>
          <p className="text-muted-foreground">
            Cada plan se apoya en los mismos cimientos. La diferencia está en cómo se ajustan a ti.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-xl"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-heading text-xl font-bold">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Method */}
      <section id="metodo" className="border-y border-border/70 bg-secondary/40">
        <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">El método</p>
            <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              De la evaluación a tu autonomía
            </h2>
            <p className="text-muted-foreground">
              Un proceso de cuatro fases diseñado para que el resultado no dependa del plan, sino de ti.
              Sin trucos, sin atajos, sin rebotes.
            </p>
            <ul className="mt-2 space-y-3">
              {['Sin dietas de choque ni rebotes', 'Progresión guiada por datos', 'Acompañamiento humano, siempre'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {methodSteps.map(({ number, title, description }, index) => (
              <motion.li
                key={number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="flex flex-col gap-2 rounded-3xl border border-border bg-card p-6"
              >
                <span className="font-heading text-3xl font-black text-accent/70">{number}</span>
                <h3 className="font-heading text-lg font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Testimonios</p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Resultados que se pueden medir
          </h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role }, index) => (
            <motion.figure
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-8"
            >
              <blockquote className="font-heading text-lg leading-relaxed">“{quote}”</blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border/70 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{name}</span>
                  <span className="block text-xs text-muted-foreground">{role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/70 bg-primary text-primary-foreground">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Empieza hoy tu primera semana
          </h2>
          <p className="max-w-xl text-primary-foreground/80">
            Crea tu cuenta, recibe tu diagnóstico y accede al panel donde vivirá tu plan. El primer paso
            es el más fácil.
          </p>
          <Link
            to="/auth"
            className="group inline-flex items-center gap-2 rounded-full bg-primary-foreground px-8 py-4 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Crear mi cuenta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}
