import { useState } from 'react'
import { Icon } from '../components/Icon'
import { meetings, type Meeting } from '../data/coregen'

const RAIL_COLOR: Record<string, string> = {
  '': 'var(--c-blue)',
  g: 'var(--c-green)',
  a: 'var(--c-warning)',
}

const MODE_CHIP: Record<NonNullable<Meeting['mode']>, string> = {
  Online: 'chip-green',
  Yerinde: 'chip-amber',
  Hibrit: 'chip-blue',
}

function TimelineItem({
  m,
  active,
  onPick,
}: {
  m: Meeting
  active: boolean
  onPick: () => void
}) {
  return (
    <div
      onClick={onPick}
      style={{
        display: 'grid',
        gridTemplateColumns: '64px 4px 1fr',
        gap: 12,
        padding: 12,
        borderRadius: 12,
        cursor: 'pointer',
        background: active ? 'var(--c-blue-50)' : 'var(--c-surface)',
        border: '1px solid ' + (active ? 'var(--c-blue-100)' : 'var(--c-border)'),
        marginBottom: 10,
        transition: 'background 0.12s, border-color 0.12s',
      }}
    >
      <div>
        <div className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{m.time}</div>
        <div className="t-xs muted">{m.dur}</div>
      </div>
      <div style={{ background: RAIL_COLOR[m.rail], borderRadius: 2 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
          {m.mode && <span className={'chip ' + MODE_CHIP[m.mode]}>{m.mode}</span>}
          <span className="t-xs muted">{m.location}</span>
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.35 }}>{m.title}</div>
        <div className="row gap-8" style={{ marginTop: 8 }}>
          <div className="avstack">
            {m.participants?.slice(0, 4).map((p) => (
              <div key={p.initials} className="avatar xs" title={p.name}>{p.initials}</div>
            ))}
            {(m.participants?.length ?? 0) > 4 && (
              <div className="avatar xs" style={{ background: 'var(--c-bg-alt)', color: 'var(--c-muted)' }}>
                +{(m.participants?.length ?? 0) - 4}
              </div>
            )}
          </div>
          {m.aiSummary && (
            <span className="chip chip-blue" style={{ marginLeft: 'auto' }}>
              <Icon name="sparkle" size={12} /> AI özet
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailPanel({ m }: { m: Meeting }) {
  return (
    <div className="card" style={{ position: 'sticky', top: 80 }}>
      <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <div className="row gap-8" style={{ width: '100%' }}>
          <span className="mono t-sm muted">{m.time} · {m.dur}</span>
          {m.mode && <span className={'chip ' + MODE_CHIP[m.mode]}>{m.mode}</span>}
          <span style={{ marginLeft: 'auto' }}>
            <button className="icon-btn"><Icon name="kebab" /></button>
          </span>
        </div>
        <div className="card-title" style={{ fontSize: 16, lineHeight: 1.3 }}>{m.title}</div>
        <div className="card-subtitle">{m.location}</div>
      </div>
      <div className="card-body">
        {m.aiSummary && (
          <div
            style={{
              background: 'linear-gradient(135deg, var(--c-blue-50), var(--c-green-50))',
              border: '1px solid var(--c-blue-100)',
              borderRadius: 12,
              padding: 12,
              marginBottom: 14,
            }}
          >
            <div className="row gap-8" style={{ marginBottom: 6 }}>
              <div
                style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: 'linear-gradient(135deg, var(--c-blue), var(--c-green))',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <Icon name="sparkle" size={14} />
              </div>
              <div className="fw-6 t-sm">AI hazırlık özeti</div>
              <span className="chip chip-blue" style={{ marginLeft: 'auto' }}>Drive · 3 kaynak</span>
            </div>
            <div className="t-sm" style={{ color: 'var(--c-text-2)', lineHeight: 1.5 }}>{m.aiSummary}</div>
          </div>
        )}

        {m.agenda && m.agenda.length > 0 && (
          <>
            <div className="fw-6 t-sm" style={{ marginBottom: 8 }}>Ajanda</div>
            <ol style={{ paddingLeft: 18, margin: 0, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {m.agenda.map((a, i) => (
                <li key={i} className="t-sm" style={{ color: 'var(--c-text-2)' }}>{a}</li>
              ))}
            </ol>
          </>
        )}

        {m.participants && m.participants.length > 0 && (
          <>
            <div className="fw-6 t-sm" style={{ marginBottom: 8 }}>Katılımcılar ({m.participants.length})</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
              {m.participants.map((p) => (
                <div key={p.initials} className="row gap-8" style={{ padding: '6px 0' }}>
                  <div className="avatar sm">{p.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="t-sm fw-6">{p.name}</div>
                    <div className="t-xs muted">{p.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {m.attachments && m.attachments.length > 0 && (
          <>
            <div className="fw-6 t-sm" style={{ marginBottom: 8 }}>Ekler</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {m.attachments.map((a, i) => (
                <div className="doc" key={i}>
                  <div className={'ico ' + a.type}>{a.type.toUpperCase()}</div>
                  <div className="meta">
                    <div className="tit">{a.title}</div>
                    <div className="sub">Drive · ek</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        style={{
          padding: '12px 18px',
          borderTop: '1px solid var(--c-border)',
          display: 'flex',
          gap: 8,
        }}
      >
        <button className="btn btn-ghost btn-sm">Notları aç</button>
        <span style={{ flex: 1 }} />
        <button className="btn btn-outline btn-sm">Ajanda düzenle</button>
        <button className="btn btn-primary btn-sm">
          <Icon name="meet" /> Katıl
        </button>
      </div>
    </div>
  )
}

export function Meetings() {
  const [selected, setSelected] = useState<Meeting>(meetings[0])
  const [range, setRange] = useState<'today' | 'week' | 'all'>('today')

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Toplantılar</div>
          <div className="page-sub">Bugün {meetings.length} toplantı · AI hazırlık özeti hepsi için hazır</div>
        </div>
        <div className="row gap-8">
          <div className="tabs">
            <div className={'tab' + (range === 'today' ? ' active' : '')} onClick={() => setRange('today')}>Bugün</div>
            <div className={'tab' + (range === 'week' ? ' active' : '')} onClick={() => setRange('week')}>Bu hafta</div>
            <div className={'tab' + (range === 'all' ? ' active' : '')} onClick={() => setRange('all')}>Tümü</div>
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-soft btn-sm"><Icon name="sparkle" /> Toplu özet</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Toplantı</button>
        </div>
      </div>

      <div className="grid grid-12">
        <div style={{ gridColumn: 'span 7' }}>
          <div className="timeline-day">29 Mayıs Perşembe · Sabah</div>
          {meetings.slice(0, 2).map((m) => (
            <TimelineItem key={m.id} m={m} active={selected.id === m.id} onPick={() => setSelected(m)} />
          ))}
          <div className="timeline-day">Öğleden sonra</div>
          {meetings.slice(2).map((m) => (
            <TimelineItem key={m.id} m={m} active={selected.id === m.id} onPick={() => setSelected(m)} />
          ))}
        </div>
        <div style={{ gridColumn: 'span 5' }}>
          <DetailPanel m={selected} />
        </div>
      </div>
    </div>
  )
}
