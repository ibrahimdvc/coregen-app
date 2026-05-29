import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { currentUser } from '../data/user'
import {
  kpis as kpisData,
  tasks as tasksData,
  meetings as meetingsData,
  documents as docsData,
  announcements as annData,
  regions,
  type KPI,
  type Meeting,
} from '../data/coregen'

function Sparkline({ data, color = '#22A52A', w = 110, h = 36 }: { data: number[]; color?: string; w?: number; h?: number }) {
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const d = `M${pts.join(' L')}`
  const fillD = `${d} L${w},${h} L0,${h} Z`
  return (
    <svg className="spark" width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={fillD} fill={color} opacity="0.10" />
      <path d={d} fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const COLORS = ['#1E43A6', '#22A52A', '#F2A52F', '#1E43A6']
const TRENDS = [
  [12, 14, 11, 16, 18, 17, 21, 22, 24, 28, 26, 31],
  [8, 11, 14, 12, 9, 10, 7, 8, 6, 5, 4, 3],
  [3, 4, 4, 5, 6, 6, 7, 8, 9, 9, 8, 9],
  [70, 75, 81, 92, 100, 110, 122, 130, 140, 156, 168, 184],
]

function StatCard({ k, idx }: { k: KPI; idx: number }) {
  return (
    <div className="stat">
      <div className="stat-label">
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: COLORS[idx] }} /> {k.label}
      </div>
      <div className="stat-value">{k.value}</div>
      <div className="stat-foot">
        <span className={'stat-delta ' + (k.trend === 'up' ? 'up' : 'down')}>
          {k.trend === 'up' ? '▲' : '▼'} {k.delta}
        </span>
        <span>· {k.sub}</span>
      </div>
      <Sparkline data={TRENDS[idx]} color={COLORS[idx]} />
    </div>
  )
}

function WelcomePanel() {
  const d = new Date()
  const dayStr = d.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })
  return (
    <div className="welcome">
      <svg className="helix" viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="2">
        <path d="M40 20 Q80 60 40 100 Q0 140 40 180" />
        <path d="M120 20 Q80 60 120 100 Q160 140 120 180" />
        {[30, 60, 90, 120, 150, 180].map((y) => (
          <line key={y} x1={60} y1={y} x2={100} y2={y} />
        ))}
        <g>
          {[30, 60, 90, 120, 150, 180].map((y) => (
            <Fragment key={'d' + y}>
              <circle cx={55} cy={y} r="3" fill="white" />
              <circle cx={105} cy={y} r="3" fill="white" />
            </Fragment>
          ))}
        </g>
      </svg>
      <div className="chip" style={{ background: 'rgba(255,255,255,0.14)', color: 'white', marginBottom: 10 }}>
        <span className="chip-dot" style={{ background: '#7CF09A' }} /> {dayStr}
      </div>
      <h1>İyi günler, {currentUser.name.split(' ')[0]}.</h1>
      <div className="sub">
        Bugün 3 saha ziyaretiniz, 2 toplantınız ve gözden geçirilmesi gereken 1 ihale teklifi var. AI asistan sabah saat 07:40
        itibarıyla Drive'daki 12 yeni belgeyi indeksledi.
      </div>
      <div className="stat-line">
        <div><div className="v">5</div><div className="l">Bugünün görevleri</div></div>
        <div><div className="v">2</div><div className="l">Yaklaşan toplantı</div></div>
        <div><div className="v">94%</div><div className="l">Servis SLA</div></div>
        <div><div className="v">12</div><div className="l">Yeni doküman</div></div>
      </div>
    </div>
  )
}

function AIQuickCard() {
  const [v, setV] = useState('')
  const presets = [
    { icon: 'doc' as const, label: "Drive'da belge ara" },
    { icon: 'task' as const, label: 'Metinden görev üret' },
    { icon: 'meet' as const, label: 'Toplantı özetle' },
    { icon: 'sparkle' as const, label: 'Servis bülteni hazırla' },
  ]
  return (
    <div className="aiquick">
      <div className="head">
        <div className="glyph"><Icon name="sparkle" /></div>
        <div style={{ flex: 1 }}>
          <div className="tit">AI Asistana sor</div>
          <div className="sub">Drive → İzinli web → İnternet sırasıyla kaynak gösterir</div>
        </div>
        <span className="scope-pill"><span className="chip-dot" /> Drive aktif</span>
      </div>
      <textarea
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Örn: 'Acıbadem ile çerçeve sözleşmenin 7. maddesini özetle'"
      />
      <div className="spread">
        <div className="actions">
          {presets.map((p) => (
            <button key={p.label} className="chip chip-outline" style={{ cursor: 'pointer' }}>
              <Icon name={p.icon} /> {p.label}
            </button>
          ))}
        </div>
        <button className="btn btn-primary">
          Sor <Icon name="arrow-right" />
        </button>
      </div>
    </div>
  )
}

function TodayTasksCard({ onOpen }: { onOpen: () => void }) {
  const tasks = tasksData.filter((t) => ['todo', 'progress'].includes(t.status)).slice(0, 5)
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Bugünün görevleri</div>
          <div className="card-subtitle">{tasks.length} aktif · 2 yüksek öncelikli</div>
        </div>
        <div className="card-actions">
          <button className="btn btn-ghost btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-soft btn-sm" onClick={onOpen}>Tümünü gör <Icon name="arrow-right" /></button>
        </div>
      </div>
      <div className="card-body">
        {tasks.map((t) => (
          <div className="task-row" key={t.id}>
            <div className={'task-check' + ((t.status as string) === 'done' ? ' checked' : '')}>
              {(t.status as string) === 'done' && <Icon name="check" />}
            </div>
            <div>
              <div className="task-title">{t.title}</div>
              <div className="task-meta">
                <span className="mono">{t.id}</span>
                <span className="sep">·</span>
                <Icon name="clock" size={12} />
                <span>{t.due}</span>
                <span className="sep">·</span>
                <span className={'chip ' + (t.priority === 'high' ? 'chip-red' : t.priority === 'med' ? 'chip-amber' : 'chip-gray')}>
                  <span className="chip-dot" />
                  {t.priority === 'high' ? 'Yüksek' : t.priority === 'med' ? 'Orta' : 'Düşük'}
                </span>
              </div>
            </div>
            <div className="avstack">
              {t.assignees.map((a) => <div key={a} className="avatar sm">{a}</div>)}
            </div>
            <button className="icon-btn"><Icon name="kebab" /></button>
          </div>
        ))}
      </div>
    </div>
  )
}

function MeetingRow({ m }: { m: Meeting }) {
  return (
    <div className="meeting">
      <div className="time">{m.time}<br /><span className="muted">{m.dur}</span></div>
      <div className={'meeting-rail ' + (m.rail || '')} />
      <div className="body">
        <div className="tit">{m.title}</div>
        <div className="sub">{m.sub}</div>
      </div>
      <button className="btn btn-ghost btn-sm">Aç</button>
    </div>
  )
}

function MeetingsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Bugünkü ajanda</div>
          <div className="card-subtitle">29 Mayıs Perşembe · {meetingsData.length} toplantı</div>
        </div>
        <div className="card-actions">
          <button className="btn btn-ghost btn-sm">Takvim</button>
        </div>
      </div>
      <div className="card-body">
        <div className="timeline-day">Sabah</div>
        {meetingsData.slice(0, 2).map((m) => <MeetingRow key={m.id} m={m} />)}
        <div className="timeline-day">Öğleden sonra</div>
        {meetingsData.slice(2).map((m) => <MeetingRow key={m.id} m={m} />)}
      </div>
    </div>
  )
}

function DocsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Son dokümanlar</div>
          <div className="card-subtitle">Drive ile senkron · 12 yeni indeks bugün</div>
        </div>
        <button className="btn btn-ghost btn-sm">Tümü</button>
      </div>
      <div className="card-body">
        {docsData.map((d, i) => (
          <div className="doc" key={i}>
            <div className={'ico ' + d.type}>{d.type.toUpperCase()}</div>
            <div className="meta">
              <div className="tit">{d.title}</div>
              <div className="sub">{d.sub} · {d.updated}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AnnouncementsCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Şirket duyuruları</div>
          <div className="card-subtitle">3 okunmamış</div>
        </div>
        <button className="btn btn-ghost btn-sm">Tümü</button>
      </div>
      <div className="card-body">
        {annData.map((a, i) => (
          <div
            className="ann"
            key={i}
            style={{
              borderLeftColor:
                a.tagColor === 'green' ? 'var(--c-green)' : a.tagColor === 'amber' ? 'var(--c-warning)' : 'var(--c-blue)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className={'chip chip-' + a.tagColor}>{a.tag}</span>
              <span className="t-xs muted">{a.m}</span>
            </div>
            <div className="h">{a.h}</div>
            <div className="b">{a.b}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServiceMapCard() {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Bölge servis durumu</div>
          <div className="card-subtitle">Aktif cihaz / Uptime — son 30 gün</div>
        </div>
        <div className="card-actions">
          <span className="chip chip-green"><span className="chip-dot" /> 92.4% ortalama</span>
        </div>
      </div>
      <div className="card-body">
        {regions.map((r) => (
          <div
            key={r.r}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 80px 64px',
              alignItems: 'center',
              gap: 12,
              padding: '8px 0',
              borderBottom: '1px solid var(--c-border)',
            }}
          >
            <div className="t-sm fw-6">{r.r}</div>
            <div className={'progress ' + (r.p > 92 ? 'green' : r.p > 88 ? '' : 'amber')}>
              <i style={{ width: r.p + '%' }} />
            </div>
            <div className="mono t-sm" style={{ textAlign: 'right' }}>{r.p}%</div>
            <div className="t-xs muted" style={{ textAlign: 'right' }}>{r.d} cihaz</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Genel bakış</div>
          <div className="page-sub">Operasyonun tek bakışta özeti — saha, görev, doküman ve AI aktivitesi.</div>
        </div>
        <div className="row gap-8">
          <div className="tabs">
            <div className="tab active">Kişisel</div>
            <div className="tab">Ekip</div>
            <div className="tab">Şirket</div>
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="arrow-down" /> Rapor indir</button>
        </div>
      </div>

      <div className="grid grid-12">
        <div style={{ gridColumn: 'span 8' }}><WelcomePanel /></div>
        <div style={{ gridColumn: 'span 4' }}><AIQuickCard /></div>
      </div>

      <div className="stat-row" style={{ marginTop: 16 }}>
        {kpisData.map((k, i) => <StatCard k={k} idx={i} key={i} />)}
      </div>

      <div className="grid grid-12" style={{ marginTop: 16 }}>
        <div style={{ gridColumn: 'span 8' }}><TodayTasksCard onOpen={() => navigate('/tasks')} /></div>
        <div style={{ gridColumn: 'span 4' }}><MeetingsCard /></div>
      </div>

      <div className="grid grid-12" style={{ marginTop: 16 }}>
        <div style={{ gridColumn: 'span 5' }}><DocsCard /></div>
        <div style={{ gridColumn: 'span 4' }}><AnnouncementsCard /></div>
        <div style={{ gridColumn: 'span 3' }}><ServiceMapCard /></div>
      </div>
    </div>
  )
}
