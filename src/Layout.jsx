import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Activity, Dumbbell, LayoutDashboard, LogIn } from 'lucide-react'
import { useAuth } from './api/AuthProvider.jsx'

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-accent-foreground ring-1 ring-accent/60">
        <Activity className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-lg font-bold tracking-tight">El Método White</span>
        <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Coaching premium</span>
      </span>
    </Link>
  )
}

const navItems = [
  { to: '/dashboard', label: 'Panel', icon: LayoutDashboard, requiresAuth: true },
  { to: '/auth', label: 'Acceder', icon: LogIn, requiresAuth: false },
]

export default function Layout() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const sectionLinks = [
    { to: '/#programa', label: 'Programa' },
    { to: '/#metodo', label: 'Método' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems
              .filter((item) => (item.requiresAuth ? isAuthenticated : !isAuthenticated))
              .map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
          </nav>
        </div>
      </header>

      <main key={location.pathname} className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/80 bg-secondary/40">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4 text-accent" />
            <span>© {new Date().getFullYear()} El Método White · Coaching nutricional y deportivo</span>
          </div>
          <div className="flex items-center gap-6">
            {sectionLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="transition-colors hover:text-foreground">
                {label}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? '/dashboard' : '/auth'}
              className="transition-colors hover:text-foreground"
            >
              Acceso clientes
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
