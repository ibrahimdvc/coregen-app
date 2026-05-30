import { useState } from 'react'
import { Icon } from '../components/Icon'
import { regions } from '../data/coregen'

/* -------- Charts (inline SVG, no deps) -------- */

function AreaChart({
  series,
  labels,
  height = 200,
}: {
  series: { name: string; color: string; data: number[] }[]
  labels: string[]
  height?: number
}) {
  const w = 720
  const h = height
  const padL = 36, padR = 12, padT = 12, padB = 28
  const all = series.flatMap((s) => s.data)
  const max = Math.max(...all)
  const min = 0
  const range = max - min || 1
  const n = labels.length
  const xStep = (w - padL - padR) / (n - 1)
  const yScale = (v: number) => h - padB - ((v - min) / range) * (h - padT - padB)

  const yTicks = 4
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
      {/* grid */}
      {Array.from({ length: yTicks + 1 }).map((_, i) => {
        const v = min + (range * i) / yTicks
        const y = yScale(v)
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--c-border)" strokeWidth="1" />
            <text x={padL - 6} y={y + 3} fontSize="10" fill="var(--c-muted)" textAnchor="end">
              {Math.round(v)}
            </text>
          </g>
        )
      })}
      {labels.map((l, i) => (
        <text
          key={l}
          x={padL + i * xStep}
          y={h - 8}
          fontSize="10"
          fill="var(--c-muted)"
          textAnchor="middle"
        >
          {l}
        </text>
      ))}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => `${padL + i * xStep},${yScale(v).toFixed(1)}`)
        const d = `M${pts.join(' L')}`
        const fillD = `${d} L${padL + (n - 1) * xStep},${h - padB} L${padL},${h - padB} Z`
        return (
          <g key={si}>
            <path d={fillD} fill={s.color} opacity="0.10" />
            <path d={d} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {s.data.map((v, i) => (
              <circle key={i} cx={padL + i * xStep} cy={yScale(v)} r="2.5" fill={s.color} />
            ))}
          </g>
        )
      })}
    </svg>
  )
}

function Donut({
  data,
  total,
  size = 180,
}: {
  data: { label: string; value: number; color: string }[]
  total?: number
  size?: number
}) {
  const sum = total ?? data.reduce((a, b) => a + b.value, 0)
  const r = size / 2 - 14
  const c = 2 * Math.PI * r
  let acc = 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--c-bg-alt)" strokeWidth="14" />
        {data.map((d, i) => {
          const len = (d.value / sum) * c
          const off = (acc / sum) * c
          acc += d.value
          return (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-off}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="butt"
            />
          )
        })}
        <text x={size / 2} y={size / 2 - 4} fontSize="22" fontWeight="600" textAnchor="middle" fill="var(--c-text)" fontFamily="var(--font-mono)">
          {sum}
        </text>
        <text x={size / 2} y={size / 2 + 14} fontSize="10" textAnchor="middle" fill="var(--c-muted)">
          toplam
        </text>
      </svg>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.map((d) => (
          <div key={d.label} className="row gap-8">
            <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color }} />
            <span className="t-sm" style={{ flex: 1 }}>{d.label}</span>
            <span className="mono t-sm fw-6">{d.value}</span>
            <span className="t-xs muted mono">{Math.round((d.value / sum) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ height: 6, background: 'var(--c-bg-alt)', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color, borderRadius: 3 }} />
    </div>
  )
}

/* -------- Data -------- */

const MONTH_LABELS = ['Ara', 'Oca', 'Şub', 'Mar', 'Nis', 'May']
const CALL_SERIES = {
  name: 'Servis Çağrısı',
  color: '#1E43A6',
  data: [128, 142, 154, 138, 167, 184],
}
const CALIB_SERIES = {
  name: 'Kalibrasyon',
  color: '#22A52A',
  data: [62, 71, 88, 95, 102, 118],
}

const SERVICE_TYPE = [
  { label: 'Kalibrasyon', value: 118, color: '#1E43A6' },
  { label: 'Arıza', value: 64, color: '#E0413B' },
  { label: 'Kurulum', value: 22, color: '#22A52A' },
  { label: 'Eğitim', value: 18, color: '#F2A52F' },
  { label: 'Diğer', value: 12, color: '#94A0BA' },
]

const AI_TYPES = [
  { label: 'Drive sorgu', value: 642, color: '#1E43A6' },
  { label: 'Doküman özet', value: 318, color: '#22A52A' },
  { label: 'Görev üret', value: 184, color: '#F2A52F' },
  { label: 'Form üret', value: 140, color: '#5736B5' },
]

const TOP_USERS = [
  { name: 'Mehmet Yıldırım', initials: 'MY', role: 'Saha Servis', queries: 184, tasks: 32 },
  { name: 'Ayşe Taş', initials: 'AT', role: 'Operasyon', queries: 142, tasks: 28 },
  { name: 'Erdem Kaya', initials: 'EK', role: 'Servis Müh.', queries: 128, tasks: 24 },
  { name: 'Selim Kara', initials: 'SK', role: 'Bölge', queries: 96, tasks: 18 },
  { name: 'Nazlı Demir', initials: 'ND', role: 'Eğitim', queries: 74, tasks: 12 },
]

const KPI_CARDS = [
  { label: 'Servis Çağrısı', value: '184', delta: '+10%', trend: 'up', color: '#1E43A6' },
  { label: 'Ort. Kapanma', value: '4.2 sa', delta: '-18%', trend: 'up', color: '#22A52A' },
  { label: 'SLA Uyum', value: '94%', delta: '+2 pt', trend: 'up', color: '#22A52A' },
  { label: 'AI Sorgu', value: '1.284', delta: '+18%', trend: 'up', color: '#5736B5' },
]

/* -------- Page -------- */

export function Analytics() {
  const [range, setRange] = useState<'30g' | '90g' | '12a'>('90g')
  const total = SERVICE_TYPE.reduce((a, b) => a + b.value, 0)

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Analitik</div>
          <div className="page-sub">Operasyon, AI ve servis performans göstergeleri — son 6 ay</div>
        </div>
        <div className="row gap-8">
          <div className="tabs">
            <div className={'tab' + (range === '30g' ? ' active' : '')} onClick={() => setRange('30g')}>30 gün</div>
            <div className={'tab' + (range === '90g' ? ' active' : '')} onClick={() => setRange('90g')}>90 gün</div>
            <div className={'tab' + (range === '12a' ? ' active' : '')} onClick={() => setRange('12a')}>12 ay</div>
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-soft btn-sm"><Icon name="sparkle" /> Otomatik içgörü</button>
          <button className="btn btn-primary btn-sm"><Icon name="arrow-down" /> Rapor indir</button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="stat-row">
        {KPI_CARDS.map((k, i) => (
          <div className="stat" key={i}>
            <div className="stat-label">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: k.color }} /> {k.label}
            </div>
            <div className="stat-value">{k.value}</div>
            <div className="stat-foot">
              <span className={'stat-delta ' + (k.trend === 'up' ? 'up' : 'down')}>
                {k.trend === 'up' ? '▲' : '▼'} {k.delta}
              </span>
              <span>· önceki döneme göre</span>
            </div>
          </div>
        ))}
      </div>

      {/* Time series + Service type donut */}
      <div className="grid grid-12" style={{ marginTop: 16 }}>
        <div style={{ gridColumn: 'span 8' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Servis çağrısı + kalibrasyon trendi</div>
                <div className="card-subtitle">Aylık · son 6 ay</div>
              </div>
              <div className="card-actions row gap-8">
                <span className="row gap-6 t-xs"><span style={{ width: 8, height: 8, borderRadius: 2, background: '#1E43A6' }} /> Çağrı</span>
                <span className="row gap-6 t-xs"><span style={{ width: 8, height: 8, borderRadius: 2, background: '#22A52A' }} /> Kalibrasyon</span>
              </div>
            </div>
            <div className="card-body">
              <AreaChart series={[CALL_SERIES, CALIB_SERIES]} labels={MONTH_LABELS} />
            </div>
          </div>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Servis tipi dağılımı</div>
                <div className="card-subtitle">Mayıs · {total} servis kaydı</div>
              </div>
            </div>
            <div className="card-body">
              <Donut data={SERVICE_TYPE} />
            </div>
          </div>
        </div>
      </div>

      {/* Region + AI usage */}
      <div className="grid grid-12" style={{ marginTop: 16 }}>
        <div style={{ gridColumn: 'span 7' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Bölge bazlı uptime</div>
                <div className="card-subtitle">Aktif cihaz başına ortalama çalışma süresi</div>
              </div>
              <span className="chip chip-green"><span className="chip-dot" /> 92.4% ortalama</span>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {regions.map((r) => (
                <div
                  key={r.r}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr 60px 56px',
                    gap: 12,
                    alignItems: 'center',
                  }}
                >
                  <span className="t-sm fw-6">{r.r}</span>
                  <MiniBar value={r.p} max={100} color={r.p > 92 ? '#22A52A' : r.p > 88 ? '#1E43A6' : '#F2A52F'} />
                  <span className="mono t-sm" style={{ textAlign: 'right' }}>{r.p}%</span>
                  <span className="t-xs muted" style={{ textAlign: 'right' }}>{r.d} cihaz</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ gridColumn: 'span 5' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">AI kullanım dağılımı</div>
                <div className="card-subtitle">Son 30 gün · 1.284 sorgu</div>
              </div>
              <span className="chip chip-blue">+18% MoM</span>
            </div>
            <div className="card-body">
              <Donut data={AI_TYPES} />
            </div>
          </div>
        </div>
      </div>

      {/* Top users */}
      <div className="grid grid-12" style={{ marginTop: 16 }}>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">En aktif kullanıcılar</div>
                <div className="card-subtitle">AI sorgu sayısı + tamamlanan görev — son 30 gün</div>
              </div>
              <button className="btn btn-ghost btn-sm">Tümü</button>
            </div>
            <div className="card-body" style={{ padding: '0 18px 14px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '34px 1fr 90px 1fr 80px 80px',
                  gap: 14,
                  padding: '8px 0',
                  borderBottom: '1px solid var(--c-border)',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  color: 'var(--c-muted-2)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                }}
              >
                <span></span>
                <span>Kullanıcı</span>
                <span style={{ textAlign: 'right' }}>AI sorgu</span>
                <span></span>
                <span style={{ textAlign: 'right' }}>Görev</span>
                <span style={{ textAlign: 'right' }}>Skor</span>
              </div>
              {TOP_USERS.map((u, i) => {
                const maxQ = Math.max(...TOP_USERS.map((x) => x.queries))
                const score = Math.round((u.queries * 0.6 + u.tasks * 2) * 10) / 10
                return (
                  <div
                    key={u.initials}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '34px 1fr 90px 1fr 80px 80px',
                      gap: 14,
                      alignItems: 'center',
                      padding: '10px 0',
                      borderBottom: i < TOP_USERS.length - 1 ? '1px solid var(--c-border)' : 0,
                    }}
                  >
                    <span className="mono t-xs muted" style={{ textAlign: 'center', fontWeight: 700 }}>#{i + 1}</span>
                    <div className="row gap-8">
                      <div className="avatar sm">{u.initials}</div>
                      <div>
                        <div className="t-sm fw-6">{u.name}</div>
                        <div className="t-xs muted">{u.role}</div>
                      </div>
                    </div>
                    <span className="mono t-sm" style={{ textAlign: 'right' }}>{u.queries}</span>
                    <MiniBar value={u.queries} max={maxQ} color="#1E43A6" />
                    <span className="mono t-sm" style={{ textAlign: 'right' }}>{u.tasks}</span>
                    <span className="t-sm fw-6 mono" style={{ textAlign: 'right', color: 'var(--c-green-600)' }}>
                      {score}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
