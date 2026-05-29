import { useState } from 'react'
import { Icon } from '../components/Icon'
import { tasks as tasksData, type Task, type Status } from '../data/coregen'

const TAG_CHIP: Record<string, string> = {
  Kalibrasyon: 'chip-blue',
  Arıza: 'chip-red',
  İhale: 'chip-amber',
  Eğitim: 'chip-green',
  Satış: 'chip-blue',
  Lojistik: 'chip-gray',
  Bildirim: 'chip-gray',
  Kurulum: 'chip-green',
}

const PRIORITY_LABEL = { high: 'Yüksek', med: 'Orta', low: 'Düşük' } as const
const STATUS_LABEL: Record<Status, string> = {
  todo: 'Yapılacak',
  progress: 'Devam ediyor',
  review: 'İnceleme',
  done: 'Tamamlandı',
  blocked: 'Engellendi',
}
const STATUS_CHIP: Record<Status, string> = {
  todo: 'chip-gray',
  progress: 'chip-blue',
  review: 'chip-amber',
  done: 'chip-green',
  blocked: 'chip-red',
}

function priorityChip(p: Task['priority']) {
  return p === 'high' ? 'chip-red' : p === 'med' ? 'chip-amber' : 'chip-gray'
}

function TaskCard({ t, onOpen }: { t: Task; onOpen: (t: Task) => void }) {
  const tagCls = TAG_CHIP[t.tag] || 'chip-gray'
  return (
    <div className="kanban-card" onClick={() => onOpen(t)}>
      <div className="row1">
        <span className="code">{t.id}</span>
        <span className={'chip ' + tagCls}>{t.tag}</span>
        <span style={{ marginLeft: 'auto' }}>
          <span className={'chip ' + priorityChip(t.priority)}>
            <span className="chip-dot" />
            {PRIORITY_LABEL[t.priority]}
          </span>
        </span>
      </div>
      <div className="tit">{t.title}</div>
      <div className="sub">{t.sub}</div>
      <div className="row3">
        <div className="meta">
          <Icon name="clock" size={12} /> {t.due}
          {t.device !== '—' && (
            <>
              <span style={{ color: 'var(--c-border-strong)' }}>·</span>
              <span className="mono">{t.device}</span>
            </>
          )}
        </div>
        <div className="avstack">
          {t.assignees.map((a) => <div key={a} className="avatar xs">{a}</div>)}
        </div>
      </div>
    </div>
  )
}

function KanbanColumn({
  status,
  label,
  color,
  tasks,
  onOpen,
}: {
  status: Status
  label: string
  color: string
  tasks: Task[]
  onOpen: (t: Task) => void
}) {
  return (
    <div className="col-board">
      <div className="col-head">
        <span className="dot" style={{ background: color }} />
        <span className="t">{label}</span>
        <span className="c">{tasks.length}</span>
        <button className="icon-btn" style={{ width: 24, height: 24, color: 'var(--c-muted)' }}>
          <Icon name="plus" />
        </button>
      </div>
      {tasks.map((t) => <TaskCard key={t.id} t={t} onOpen={onOpen} />)}
      {status !== 'done' && (
        <div className="add-task">
          <Icon name="plus" /> Görev ekle
        </div>
      )}
    </div>
  )
}

function TaskDrawer({ t, onClose }: { t: Task | null; onClose: () => void }) {
  if (!t) return null
  return (
    <div className="drawer-mask" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <span className="mono t-sm muted">{t.id}</span>
          <span className={'chip ' + priorityChip(t.priority)}>
            <span className="chip-dot" />
            {PRIORITY_LABEL[t.priority]} öncelik
          </span>
          <span className="chip chip-outline">{t.tag}</span>
          <button className="icon-btn" style={{ marginLeft: 'auto' }} onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 6, letterSpacing: '-0.005em' }}>{t.title}</div>
          <div className="muted t-sm" style={{ marginBottom: 18 }}>{t.sub}</div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div className="field">
              <label>Durum</label>
              <div className="row gap-8">
                <span className={'chip ' + STATUS_CHIP[t.status]}>
                  <span className="chip-dot" />
                  {STATUS_LABEL[t.status]}
                </span>
              </div>
            </div>
            <div className="field">
              <label>Son tarih</label>
              <div className="val mono">{t.due}</div>
            </div>
            <div className="field">
              <label>Cihaz</label>
              <div className="val">{t.device}</div>
            </div>
            <div className="field">
              <label>Atanan</label>
              <div className="avstack">
                {t.assignees.map((a) => <div key={a} className="avatar sm">{a}</div>)}
                <div className="avatar sm" style={{ background: 'var(--c-bg-alt)', color: 'var(--c-muted)' }}>+</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ borderRadius: 12, marginBottom: 16 }}>
            <div className="card-header" style={{ padding: '12px 14px' }}>
              <div className="row gap-8">
                <Icon name="sparkle" />
                <div className="card-title t-sm">AI önerisi</div>
              </div>
              <span className="chip chip-blue">Drive · 2 kaynak</span>
            </div>
            <div className="card-body" style={{ padding: '0 14px 14px', fontSize: 12.5, lineHeight: 1.55, color: 'var(--c-text-2)' }}>
              Geçmiş benzer çağrılara göre bu görev ortalama <strong>2 sa 40 dk</strong> sürer. Servis Formu SF-117 ön
              doldurulmuş halde hazır; <span className="cite">1</span> numaralı kaynaktaki adım 3'te belirtilen reaktif lot
              doğrulamasını atlamamayı öneririm.
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                <button className="btn btn-soft btn-sm">Formu üret</button>
                <button className="btn btn-ghost btn-sm">Kaynakları gör</button>
              </div>
            </div>
          </div>

          <div className="field">
            <label>Açıklama</label>
            <textarea
              rows={3}
              defaultValue={`Cihaz: ${t.device}. Reaktif lot doğrulaması + tam profil kalibrasyon. PreciControl ClinChem Multi 1/2 koşumu sonrası sapma kontrolü yapılacak.`}
            />
          </div>

          <div className="field">
            <label>Yorumlar (2)</label>
            <div style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: '1px solid var(--c-border)' }}>
              <div className="avatar sm">AT</div>
              <div>
                <div className="t-sm"><strong>Ayşe Taş</strong> <span className="muted t-xs">· dün 16:40</span></div>
                <div className="t-sm" style={{ marginTop: 2 }}>
                  Lot numaralarını sabah erkenden doğrulayalım, kasetler yeni geldi.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: '1px solid var(--c-border)' }}>
              <div className="avatar sm">MY</div>
              <div>
                <div className="t-sm"><strong>Mehmet Yıldırım</strong> <span className="muted t-xs">· bugün 09:12</span></div>
                <div className="t-sm" style={{ marginTop: 2 }}>
                  Bakırköy laboratuvar sorumlusu ile 15:30'da görüşeceğim, ardından servise geçiyorum.
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input
                placeholder="Yorum ekle veya @ ile çağır…"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 8,
                  border: '1px solid var(--c-border)',
                  background: 'var(--c-surface-2)',
                }}
              />
              <button className="btn btn-primary btn-sm">Gönder</button>
            </div>
          </div>
        </div>
        <div className="drawer-foot">
          <button className="btn btn-ghost">Arşivle</button>
          <span style={{ flex: 1 }} />
          <button className="btn btn-outline">Düzenle</button>
          <button className="btn btn-success"><Icon name="check" /> Tamamlandı işaretle</button>
        </div>
      </div>
    </div>
  )
}

export function Tasks() {
  const [active, setActive] = useState<Task | null>(null)
  const cols: { key: Status; label: string; color: string }[] = [
    { key: 'todo', label: 'Yapılacak', color: '#94A0BA' },
    { key: 'progress', label: 'Devam ediyor', color: '#1E43A6' },
    { key: 'review', label: 'İnceleme', color: '#F2A52F' },
    { key: 'blocked', label: 'Engellendi', color: '#E0413B' },
    { key: 'done', label: 'Tamamlandı', color: '#22A52A' },
  ]

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Görevler</div>
          <div className="page-sub">Saha servisi, ihale ve operasyon görevleri — tek bir akışta.</div>
        </div>
        <div className="row gap-8">
          <div className="tabs">
            <div className="tab active">Kanban</div>
            <div className="tab">Liste</div>
            <div className="tab">Zaman çizelgesi</div>
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-soft btn-sm"><Icon name="sparkle" /> Metinden görev üret</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Yeni görev</button>
        </div>
      </div>

      <div className="row gap-8" style={{ marginBottom: 14, flexWrap: 'wrap' }}>
        <span className="chip chip-outline">Tüm projeler ▾</span>
        <span className="chip chip-outline">Sorumlu: Herkes ▾</span>
        <span className="chip chip-outline">Etiket: Tümü ▾</span>
        <span className="chip chip-outline">Cihaz: Tümü ▾</span>
        <span style={{ flex: 1 }} />
        <span className="t-xs muted">{tasksData.length} görev · 4 yüksek öncelikli</span>
      </div>

      <div className="kanban">
        {cols.map((c) => (
          <KanbanColumn
            key={c.key}
            status={c.key}
            label={c.label}
            color={c.color}
            tasks={tasksData.filter((t) => t.status === c.key)}
            onOpen={setActive}
          />
        ))}
      </div>

      <TaskDrawer t={active} onClose={() => setActive(null)} />
    </div>
  )
}
