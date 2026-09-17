/**
 * Offline stand-in for the Base44 entity layer.
 * Backed by localStorage so the UI is fully explorable without the hosted
 * backend (e.g. Freebuff preview, local dev without env config).
 */

const STORAGE_KEY = 'metodo-white-db'

const seed = {
  Clients: [
    {
      _id: 'c1',
      name: 'Valentina Ríos',
      email: 'valentina@example.com',
      goal: 'Recomposición corporal',
      stage: 'Mesociclo 2 — Hipertrofia',
      status: 'active',
      adherence: 0.92,
      created_date: '2026-08-04',
    },
    {
      _id: 'c2',
      name: 'Mateo Salgado',
      email: 'mateo@example.com',
      goal: 'Primera media maratón',
      stage: 'Base aeróbica — Semana 5',
      status: 'active',
      adherence: 0.78,
      created_date: '2026-08-18',
    },
    {
      _id: 'c3',
      name: 'Camila Duarte',
      email: 'camila@example.com',
      goal: 'Pérdida de grasa sostenible',
      stage: 'Cutting — Semana 8',
      status: 'at_risk',
      adherence: 0.54,
      created_date: '2026-07-02',
    },
  ],
  Programs: [
    {
      _id: 'p1',
      name: 'Fuerza Inicial 12',
      type: 'Fuerza',
      weeks: 12,
      sessionsPerWeek: 4,
      description:
        'Adaptación progresiva con énfasis en patrones básicos: sentadilla, bisagra, empuje y tracción.',
    },
    {
      _id: 'p2',
      name: 'Media Maratón — Sub 2h',
      type: 'Resistencia',
      weeks: 16,
      sessionsPerWeek: 5,
      description:
        'Bloques de base aeróbica, tempo y tiradas largas con carga controlada por RPE.',
    },
    {
      _id: 'p3',
      name: 'Recomposición Premium',
      type: 'Híbrido',
      weeks: 10,
      sessionsPerWeek: 4,
      description:
        'Déficit calórico moderado + fuerza 3x/semana y acondicionamiento metcon.',
    },
  ],
  Assessments: [
    { _id: 'a1', clientId: 'c1', date: '2026-09-02', weightKg: 61.4, bodyFat: 22.1, notes: 'Buena energía, sueño estable.' },
    { _id: 'a2', clientId: 'c1', date: '2026-08-19', weightKg: 62.0, bodyFat: 22.9, notes: 'Ajuste de hidratos en días de pierna.' },
    { _id: 'a3', clientId: 'c2', date: '2026-09-05', weightKg: 74.8, bodyFat: 15.4, notes: 'Tirada larga 16 km a ritmo objetivo.' },
    { _id: 'a4', clientId: 'c3', date: '2026-09-01', weightKg: 69.2, bodyFat: 31.0, notes: 'Necesita refuerzo de adherencia y plan de comidas.' },
  ],
}

let data = seed

function loadState() {
  if (typeof window === 'undefined') return
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) data = JSON.parse(raw)
  } catch {
    /* keep seed */
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* ignore quota errors */
  }
}

loadState()

export const mockDb = new Proxy(
  {},
  {
    get(_target, entityName) {
      return {
        async filter() {
          return data[entityName] ?? []
        },
        async list() {
          return data[entityName] ?? []
        },
        async get(id) {
          return (data[entityName] ?? []).find((item) => item._id === id) ?? null
        },
        async create(payload) {
          const record = {
            _id: `${String(entityName)[0].toLowerCase()}${Math.random().toString(36).slice(2, 9)}`,
            created_date: new Date().toISOString().slice(0, 10),
            ...payload,
          }
          data[entityName] = [record, ...(data[entityName] ?? [])]
          persist()
          return record
        },
        async update(id, payload) {
          const list = data[entityName] ?? []
          const idx = list.findIndex((item) => item._id === id)
          if (idx >= 0) {
            list[idx] = { ...list[idx], ...payload }
            data[entityName] = list
            persist()
            return list[idx]
          }
          return null
        },
        async delete(id) {
          data[entityName] = (data[entityName] ?? []).filter((item) => item._id !== id)
          persist()
          return { success: true }
        },
      }
    },
  },
)

export async function mockUploadFile() {
  return { file_url: '' }
}
