import { useState } from 'react'
import { useTweaks, type Density } from '../context/TweaksContext'

const PRIMARY_OPTIONS = ['#1E43A6', '#0E1A36', '#2F7CCF', '#5736B5']
const ACCENT_OPTIONS = ['#22A52A', '#0F8A5B', '#F2A52F', '#22A5A5']
const FONT_OPTIONS = ['IBM Plex Sans', 'Manrope', 'DM Sans', 'Geist', 'Public Sans']
const DENSITIES: Density[] = ['compact', 'regular', 'comfy']

export function ThemePanel() {
  const { t, set } = useTweaks()
  const [open, setOpen] = useState(false)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Tema ayarları"
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          width: 44,
          height: 44,
          borderRadius: 22,
          background: 'linear-gradient(135deg, var(--c-blue), var(--c-green))',
          color: 'white',
          boxShadow: '0 8px 24px rgba(14,26,54,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          zIndex: 200,
        }}
      >
        ✨
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        width: 280,
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        borderRadius: 14,
        boxShadow: '0 24px 48px rgba(14,26,54,0.18)',
        zIndex: 200,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '12px 14px',
          borderBottom: '1px solid var(--c-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600 }}>Tema ayarları</div>
        <button onClick={() => setOpen(false)} className="icon-btn" style={{ width: 24, height: 24 }}>✕</button>
      </div>

      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Section label="Görünüm">
          <Toggle label="Koyu mod" value={t.dark} onChange={(v) => set('dark', v)} />
          <Segmented
            label="Yoğunluk"
            value={t.density}
            options={DENSITIES}
            onChange={(v) => set('density', v)}
          />
        </Section>

        <Section label="Marka">
          <ColorRow label="Birincil" value={t.primary} options={PRIMARY_OPTIONS} onChange={(v) => set('primary', v)} />
          <ColorRow label="Vurgu" value={t.accent} options={ACCENT_OPTIONS} onChange={(v) => set('accent', v)} />
        </Section>

        <Section label="Tipografi">
          <Row label="Font">
            <select
              value={t.fontFamily}
              onChange={(e) => set('fontFamily', e.target.value)}
              style={{
                width: '100%',
                height: 28,
                padding: '0 8px',
                border: '1px solid var(--c-border)',
                borderRadius: 6,
                background: 'var(--c-surface-2)',
                fontSize: 12,
              }}
            >
              {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Row>
        </Section>
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--c-muted-2)',
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 12, color: 'var(--c-text-2)' }}>{label}</div>
      {children}
    </div>
  )
}

function Toggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 12, color: 'var(--c-text-2)' }}>{label}</div>
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: value ? 'var(--c-blue)' : 'var(--c-border-strong)',
          position: 'relative',
          transition: 'background 0.15s',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: value ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: 'white',
            transition: 'left 0.15s',
          }}
        />
      </button>
    </div>
  )
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: readonly T[]
  onChange: (v: T) => void
}) {
  return (
    <Row label={label}>
      <div style={{ display: 'flex', background: 'var(--c-bg-alt)', borderRadius: 6, padding: 2, gap: 2 }}>
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            style={{
              flex: 1,
              padding: '4px 6px',
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 600,
              background: value === o ? 'var(--c-surface)' : 'transparent',
              color: value === o ? 'var(--c-text)' : 'var(--c-muted)',
              boxShadow: value === o ? '0 1px 2px rgba(14,26,54,0.08)' : 'none',
            }}
          >
            {o}
          </button>
        ))}
      </div>
    </Row>
  )
}

function ColorRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <Row label={label}>
      <div style={{ display: 'flex', gap: 6 }}>
        {options.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: c,
              border: value === c ? '2px solid var(--c-text)' : '2px solid var(--c-border)',
              cursor: 'pointer',
            }}
            title={c}
          />
        ))}
      </div>
    </Row>
  )
}
