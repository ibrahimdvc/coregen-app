import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Density = 'compact' | 'regular' | 'comfy'
export type Tweaks = {
  density: Density
  primary: string
  accent: string
  fontFamily: string
  dark: boolean
}

const DEFAULTS: Tweaks = {
  density: 'regular',
  primary: '#1E43A6',
  accent: '#22A52A',
  fontFamily: 'IBM Plex Sans',
  dark: false,
}

type Ctx = { t: Tweaks; set: <K extends keyof Tweaks>(k: K, v: Tweaks[K]) => void }
const TweaksCtx = createContext<Ctx | null>(null)

export function TweaksProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState<Tweaks>(DEFAULTS)

  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--c-blue', t.primary)
    r.style.setProperty('--c-green', t.accent)
    r.style.setProperty('--font-sans', `'${t.fontFamily}', system-ui, sans-serif`)

    if (t.density === 'compact') {
      r.style.setProperty('--r-lg', '12px')
      document.body.style.fontSize = '13px'
    } else if (t.density === 'comfy') {
      r.style.setProperty('--r-lg', '20px')
      document.body.style.fontSize = '15px'
    } else {
      r.style.setProperty('--r-lg', '16px')
      document.body.style.fontSize = '14px'
    }

    if (t.dark) {
      document.body.classList.add('dark-mode')
      r.style.setProperty('--c-bg', '#0B1430')
      r.style.setProperty('--c-bg-alt', '#13204A')
      r.style.setProperty('--c-surface', '#0F1A3D')
      r.style.setProperty('--c-surface-2', '#13204A')
      r.style.setProperty('--c-border', '#1E2D5E')
      r.style.setProperty('--c-border-strong', '#2A3A75')
      r.style.setProperty('--c-text', '#E7ECF8')
      r.style.setProperty('--c-text-2', '#B5C0DC')
      r.style.setProperty('--c-muted', '#7B8AAF')
      r.style.setProperty('--c-muted-2', '#54648C')
      r.style.setProperty('--c-blue-50', 'rgba(30,67,166,0.16)')
      r.style.setProperty('--c-blue-100', 'rgba(30,67,166,0.28)')
      r.style.setProperty('--c-green-50', 'rgba(34,165,42,0.16)')
    } else {
      document.body.classList.remove('dark-mode')
      r.style.setProperty('--c-bg', '#F4F6FB')
      r.style.setProperty('--c-bg-alt', '#EEF1F7')
      r.style.setProperty('--c-surface', '#FFFFFF')
      r.style.setProperty('--c-surface-2', '#F8FAFD')
      r.style.setProperty('--c-border', '#E5EAF1')
      r.style.setProperty('--c-border-strong', '#D9E1EA')
      r.style.setProperty('--c-text', '#0E1A36')
      r.style.setProperty('--c-text-2', '#2C3A5A')
      r.style.setProperty('--c-muted', '#6B7896')
      r.style.setProperty('--c-muted-2', '#94A0BA')
      r.style.setProperty('--c-blue-50', '#EEF2FB')
      r.style.setProperty('--c-blue-100', '#DDE5F5')
      r.style.setProperty('--c-green-50', '#E8F7E9')
    }
  }, [t])

  const set: Ctx['set'] = (k, v) => setT((p) => ({ ...p, [k]: v }))
  return <TweaksCtx.Provider value={{ t, set }}>{children}</TweaksCtx.Provider>
}

export function useTweaks() {
  const c = useContext(TweaksCtx)
  if (!c) throw new Error('useTweaks must be inside TweaksProvider')
  return c
}
