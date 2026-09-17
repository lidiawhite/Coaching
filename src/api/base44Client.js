import { createClient } from '@base44/sdk'
import { mockDb, mockUploadFile } from './mockDb.js'

/**
 * Runtime flag: inside Base44 builds the Vite plugin injects `__B44_DB__`
 * (auth/entities/integrations live through the platform). Outside Base44 —
 * including the Freebuff preview and plain local dev — we fall back to an
 * offline mock so the UI is fully explorable without the hosted backend.
 */
export const isOffline = !globalThis.__B44_DB__

export const base44 =
  globalThis.__B44_DB__ ??
  createClient({
    appId: import.meta.env.VITE_BASE44_APP_ID ?? 'local-dev',
    requiresAuth: false,
  })

export const entities = base44.entities ?? mockDb
export const integrations = base44.integrations ?? {
  Core: { UploadFile: mockUploadFile },
}
