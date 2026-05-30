import { useState } from 'react'
import { Icon } from '../components/Icon'
import { currentUser } from '../data/user'

type Channel = {
  id: string
  kind: 'channel' | 'dm'
  name: string
  topic?: string
  unread?: number
  mention?: boolean
  members: number
  pinned?: boolean
}

type Reaction = { emoji: string; count: number; me?: boolean }

type Msg = {
  id: string
  kind: 'msg' | 'ai' | 'system'
  author?: string
  initials?: string
  role?: string
  time: string
  text: string
  reactions?: Reaction[]
  thread?: number
  attachment?: { type: 'pdf' | 'docx' | 'xlsx'; title: string; sub: string }
  aiScope?: string
}

const CHANNELS: Channel[] = [
  { id: 'c1', kind: 'channel', name: 'teknik-operasyon', topic: 'Saha servis ekibi · 12 kişi', members: 12, unread: 3, mention: true, pinned: true },
  { id: 'c2', kind: 'channel', name: 'saha-cagrilari', topic: 'Aktif arıza & kalibrasyon koordinasyonu', members: 9, unread: 0 },
  { id: 'c3', kind: 'channel', name: 'roche-partner', topic: 'Roche ortaklık iletişimi', members: 6, unread: 8 },
  { id: 'c4', kind: 'channel', name: 'ihale-2024-3812', topic: 'Sağlık Bakanlığı paket teklifi', members: 5, unread: 0 },
  { id: 'c5', kind: 'channel', name: 'acibadem', topic: 'Acıbadem müşteri kanalı', members: 4, unread: 0 },
  { id: 'c6', kind: 'channel', name: 'genel', topic: 'Şirket geneli', members: 47, unread: 0 },
]

const DMS: Channel[] = [
  { id: 'd1', kind: 'dm', name: 'Ayşe Taş', members: 2, unread: 2 },
  { id: 'd2', kind: 'dm', name: 'Erdem Kaya', members: 2 },
  { id: 'd3', kind: 'dm', name: 'Selim Kara · Nazlı Demir', members: 3 },
]

const MEMBERS = [
  { initials: 'MY', name: 'Mehmet Yıldırım', role: 'Saha Servis', online: true },
  { initials: 'AT', name: 'Ayşe Taş', role: 'Operasyon Md.', online: true },
  { initials: 'EK', name: 'Erdem Kaya', role: 'Servis Müh.', online: true },
  { initials: 'SK', name: 'Selim Kara', role: 'Bölge Sorumlusu', online: false },
  { initials: 'ND', name: 'Nazlı Demir', role: 'Eğitim', online: true },
  { initials: 'HB', name: 'Hakan Bora', role: 'Lojistik', online: false },
]

const MESSAGES: Msg[] = [
  { id: 'm1', kind: 'system', time: '09:30', text: 'Pazartesi operasyon sync başladı · 6 katılımcı' },
  {
    id: 'm2', kind: 'msg', author: 'Ayşe Taş', initials: 'AT', role: 'Operasyon Md.', time: '09:32',
    text: 'Bu hafta öncelik Acıbadem yenilemesi. Saha ekibi haftalık çağrı raporunu öğleden önce paylaşır mı?',
    reactions: [{ emoji: '👍', count: 3, me: true }],
    thread: 2,
  },
  {
    id: 'm3', kind: 'msg', author: 'Mehmet Yıldırım', initials: 'MY', role: 'Saha Servis', time: '09:34',
    text: 'Rapor hazır, paylaşıyorum. Geçen hafta 14 çağrının 11\'i SLA içinde kapatıldı, 2\'si yedek parça bekledi, 1 tanesi UPS arızası.',
    attachment: { type: 'xlsx', title: 'Haftalık servis çağrı raporu — 22-28 May', sub: 'Drive · Operasyon · 96 KB' },
    reactions: [{ emoji: '🙏', count: 2 }, { emoji: '🔥', count: 1 }],
  },
  {
    id: 'm4', kind: 'msg', author: 'Erdem Kaya', initials: 'EK', role: 'Servis Müh.', time: '09:36',
    text: 'UPS arızası @coregen-ai bu hafta için risk analizi çıkarabilir mi? Medipol\'deki olayın benzerleri var mı?',
  },
  {
    id: 'm5', kind: 'ai', time: '09:36', aiScope: 'Drive + saha kayıtları',
    text: 'Son 90 günde 3 müşteride benzer UPS riskinin işaretleri var: **Medipol Pendik** (gerçekleşti), **Florence Şişli** (düşük tansiyon raporu), **Liv Vadi** (jeneratör test başarısız). Üçü için saha denetimi öneriyorum. Detay raporu hazırlayayım mı?',
    reactions: [{ emoji: '✅', count: 4, me: true }],
  },
  {
    id: 'm6', kind: 'msg', author: 'Ayşe Taş', initials: 'AT', role: 'Operasyon Md.', time: '09:38',
    text: 'Harika. @MY denetim planını bugün çıkarabilir misin? Yarın sahaya çıkışta başlayalım.',
  },
  {
    id: 'm7', kind: 'msg', author: 'Mehmet Yıldırım', initials: 'MY', role: 'Saha Servis', time: '09:39',
    text: 'Tamamdır, öğleden sonra paylaşırım. SF-117 v2025.1 ile gideceğim.',
    reactions: [{ emoji: '👍', count: 2 }],
    thread: 1,
  },
]

/* -------- Subviews -------- */

function ChannelList({
  active,
  onPick,
}: {
  active: string
  onPick: (id: string) => void
}) {
  const allChannels = [...CHANNELS]
  return (
    <div
      style={{
        background: 'var(--c-surface)',
        borderRight: '1px solid var(--c-border)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div style={{ padding: 14, borderBottom: '1px solid var(--c-border)' }}>
        <div className="row gap-8" style={{ marginBottom: 10 }}>
          <div className="fw-6 t-sm" style={{ flex: 1 }}>Çalışma alanları</div>
          <button className="icon-btn" style={{ width: 26, height: 26 }}><Icon name="plus" size={14} /></button>
        </div>
        <div className="chat-search">
          <Icon name="search" />
          <input placeholder="Kanal veya kişi ara…" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
        <div className="chat-group-label">Kanallar</div>
        {allChannels.map((c) => (
          <div
            key={c.id}
            onClick={() => onPick(c.id)}
            className={'chat-item' + (active === c.id ? ' active' : '')}
            style={{ padding: '8px 10px' }}
          >
            <div className="ci" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>#</div>
            <div className="info">
              <div className="ct row gap-6">
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.name}
                </span>
                {c.mention && <span className="chip chip-red" style={{ fontSize: 9, padding: '1px 6px' }}>@</span>}
                {c.unread ? <span className="nav-count">{c.unread}</span> : null}
              </div>
              <div className="cm">{c.topic}</div>
            </div>
          </div>
        ))}

        <div className="chat-group-label">Direkt mesajlar</div>
        {DMS.map((c) => (
          <div
            key={c.id}
            onClick={() => onPick(c.id)}
            className={'chat-item' + (active === c.id ? ' active' : '')}
            style={{ padding: '8px 10px' }}
          >
            <div className="avatar xs">{c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}</div>
            <div className="info">
              <div className="ct row gap-6">
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {c.name}
                </span>
                {c.unread ? <span className="nav-count">{c.unread}</span> : null}
              </div>
              <div className="cm">{c.members} kişi</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function renderText(text: string) {
  // highlight @mentions
  const parts: React.ReactNode[] = []
  const re = /(@[\w-]+)/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <span
        key={i++}
        style={{
          background: 'var(--c-blue-50)',
          color: 'var(--c-blue)',
          padding: '0 4px',
          borderRadius: 4,
          fontWeight: 600,
        }}
      >
        {m[1]}
      </span>,
    )
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function MessageItem({ m }: { m: Msg }) {
  if (m.kind === 'system') {
    return (
      <div className="timeline-day" style={{ margin: '12px 0', justifyContent: 'center' }}>
        <span style={{ color: 'var(--c-muted)', textTransform: 'none', letterSpacing: 0 }}>{m.text}</span>
      </div>
    )
  }
  const isAI = m.kind === 'ai'
  return (
    <div style={{ display: 'flex', gap: 12, padding: '10px 22px' }}>
      <div
        className={'av ' + (isAI ? 'ai' : 'you')}
        style={{
          width: 36, height: 36, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, flexShrink: 0,
          color: 'white',
          background: isAI
            ? 'linear-gradient(135deg, var(--c-blue), var(--c-green))'
            : 'linear-gradient(135deg, #2C3A5A, #6B7896)',
        }}
      >
        {isAI ? <Icon name="sparkle" size={16} /> : m.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="row gap-6" style={{ marginBottom: 4 }}>
          <strong className="t-sm" style={{ color: isAI ? 'var(--c-blue)' : 'var(--c-text)' }}>
            {isAI ? 'Coregen AI' : m.author}
          </strong>
          {isAI ? (
            <span className="scope-pill"><span className="chip-dot" /> {m.aiScope}</span>
          ) : (
            <span className="t-xs muted">{m.role}</span>
          )}
          <span className="t-xs muted">· {m.time}</span>
        </div>
        <div className="t-sm" style={{ color: 'var(--c-text-2)', lineHeight: 1.55 }}>
          {renderText(m.text)}
        </div>
        {m.attachment && (
          <div
            style={{
              marginTop: 8,
              padding: 8,
              background: 'var(--c-surface-2)',
              border: '1px solid var(--c-border)',
              borderRadius: 10,
              display: 'inline-flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <div className={'doc'} style={{ padding: 0 }}>
              <div className={'ico ' + m.attachment.type}>{m.attachment.type.toUpperCase()}</div>
            </div>
            <div>
              <div className="t-sm fw-6">{m.attachment.title}</div>
              <div className="t-xs muted">{m.attachment.sub}</div>
            </div>
          </div>
        )}
        {(m.reactions?.length || m.thread) && (
          <div className="row gap-6" style={{ marginTop: 6 }}>
            {m.reactions?.map((r, i) => (
              <span
                key={i}
                className={'chip ' + (r.me ? 'chip-blue' : 'chip-outline')}
                style={{ cursor: 'pointer', padding: '2px 8px' }}
              >
                {r.emoji} <span className="mono">{r.count}</span>
              </span>
            ))}
            {m.thread ? (
              <span className="chip chip-outline" style={{ cursor: 'pointer' }}>
                💬 {m.thread} yanıt
              </span>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

function RightPanel({ ch }: { ch: Channel }) {
  return (
    <div
      style={{
        background: 'var(--c-surface)',
        borderLeft: '1px solid var(--c-border)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
    >
      <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--c-border)' }}>
        <div className="fw-6 t-sm">Kanal bilgisi</div>
        <div className="t-xs muted">{ch.kind === 'channel' ? '#' + ch.name : ch.name}</div>
      </div>
      <div style={{ padding: 14, overflowY: 'auto', flex: 1 }}>
        {ch.topic && (
          <div style={{ marginBottom: 14 }}>
            <div className="t-xs muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontWeight: 600 }}>
              Konu
            </div>
            <div className="t-sm">{ch.topic}</div>
          </div>
        )}

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
            <div className="fw-6 t-sm">AI günlük özet</div>
          </div>
          <div className="t-sm" style={{ color: 'var(--c-text-2)', lineHeight: 1.5 }}>
            Bugün 7 mesaj. Ana konular: <strong>UPS güvenlik denetimi</strong>, haftalık çağrı raporu, Acıbadem yenilemesi.
            1 aksiyon @MY\'a atandı.
          </div>
          <button className="btn btn-soft btn-sm" style={{ marginTop: 8 }}>Tam özet</button>
        </div>

        <div className="t-xs muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontWeight: 600 }}>
          Üyeler ({ch.members})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {MEMBERS.slice(0, ch.members).map((u) => (
            <div className="row gap-8" key={u.initials} style={{ padding: '4px 0' }}>
              <div style={{ position: 'relative' }}>
                <div className="avatar sm">{u.initials}</div>
                <span
                  style={{
                    position: 'absolute',
                    right: -2,
                    bottom: -2,
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: u.online ? 'var(--c-green)' : 'var(--c-muted-2)',
                    border: '2px solid var(--c-surface)',
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="t-sm fw-6">{u.name}</div>
                <div className="t-xs muted">{u.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Team() {
  const [active, setActive] = useState('c1')
  const [draft, setDraft] = useState('')
  const channel = [...CHANNELS, ...DMS].find((c) => c.id === active) || CHANNELS[0]

  return (
    <div className="chat-layout" style={{ gridTemplateColumns: '260px 1fr 280px' }}>
      <ChannelList active={active} onPick={setActive} />
      <div className="chat-main">
        <div className="chat-head">
          <div
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--c-bg-alt)', color: 'var(--c-text-2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-mono)', fontWeight: 700,
            }}
          >
            {channel.kind === 'channel' ? '#' : '@'}
          </div>
          <div style={{ flex: 1 }}>
            <div className="tit">{channel.kind === 'channel' ? channel.name : channel.name}</div>
            <div className="sub">{channel.topic || `${channel.members} kişi`}</div>
          </div>
          <span className="scope-pill"><Icon name="ai" size={12} /> AI aktif</span>
          <button className="btn btn-outline btn-sm"><Icon name="search" /> Ara</button>
          <button className="icon-btn"><Icon name="kebab" /></button>
        </div>

        <div className="chat-scroll" style={{ padding: 0 }}>
          {MESSAGES.map((m) => <MessageItem key={m.id} m={m} />)}
        </div>

        <div className="chat-input-wrap">
          <div className="chat-input" style={{ maxWidth: '100%' }}>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`#${channel.name} kanalına mesaj yaz · @ ile çağır, @coregen-ai ile AI'a sor`}
              style={{ minHeight: 24 }}
            />
            <div className="toolbar">
              <button className="icon-btn" title="Dosya ekle"><Icon name="paperclip" /></button>
              <button className="icon-btn" title="Görsel"><Icon name="image" /></button>
              <button className="icon-btn" title="Sesli"><Icon name="mic" /></button>
              <span className="chip chip-outline" style={{ marginLeft: 6 }}>
                <span className="mono">@coregen-ai</span> · soru sor
              </span>
              <span className="spacer" />
              <span className="t-xs muted">{currentUser.initials} olarak yazıyorsun</span>
              <button className={'send' + (draft.trim() ? '' : ' disabled')}>
                Gönder <Icon name="send" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <RightPanel ch={channel} />
    </div>
  )
}
