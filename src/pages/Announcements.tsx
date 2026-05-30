import { useState } from 'react'
import { Icon } from '../components/Icon'

type Color = 'blue' | 'green' | 'amber' | 'red'

type Announcement = {
  id: string
  category: string
  color: Color
  pinned?: boolean
  title: string
  body: string
  bullets?: string[]
  author: string
  authorInitials: string
  department: string
  date: string
  read: boolean
  readCount: number
  totalCount: number
  attachments?: { type: 'pdf' | 'docx' | 'xlsx'; title: string }[]
}

const RAIL: Record<Color, string> = {
  blue: 'var(--c-blue)',
  green: 'var(--c-green)',
  amber: 'var(--c-warning)',
  red: 'var(--c-danger)',
}

const CHIP: Record<Color, string> = {
  blue: 'chip-blue', green: 'chip-green', amber: 'chip-amber', red: 'chip-red',
}

const DATA: Announcement[] = [
  {
    id: 'a1', category: 'KALİTE', color: 'blue', pinned: true,
    title: 'ISO 13485:2016 dış denetim takvimi açıklandı',
    body: 'Yıllık dış denetim 17–19 Haziran tarihlerinde Beylikdüzü merkezde yapılacaktır. Denetim ekibi BSI temsilcilerinden oluşacak. Tüm operasyonel kayıtların güncel ve erişilebilir olduğundan emin olun.',
    bullets: [
      'Servis kayıtları (SF-117) son 12 aya kadar geriye dönük tam olmalı',
      'Eğitim sertifikaları güncel ve İK sisteminde mevcut olmalı',
      'Kalibrasyon raporları Drive üzerinde "Operasyon › 2024" altında olmalı',
    ],
    author: 'Zeynep Aydın', authorInitials: 'ZA', department: 'Kalite Yönetimi',
    date: '2 saat önce', read: false, readCount: 24, totalCount: 47,
    attachments: [{ type: 'pdf', title: 'Denetim hazırlık kontrol listesi 2025.pdf' }],
  },
  {
    id: 'a2', category: 'SAHA', color: 'green',
    title: 'Yeni reaktif stoğu Beylikdüzü deposuna ulaştı',
    body: 'Roche Cobas reaktif kalemleri için yeni sevkiyat envantere eklendi. Saha talepleriniz için lojistik paneli üzerinden çekim yapabilirsiniz. Lot eşleşmelerine dikkat edin.',
    bullets: [
      'ClinChem Multi 1/2 — 48 set',
      'PreciControl ClinChem Multi — 24 set',
      'Cobas Cleaner — 60 ünite',
    ],
    author: 'Hakan Bora', authorInitials: 'HB', department: 'Lojistik',
    date: '6 saat önce', read: false, readCount: 38, totalCount: 47,
  },
  {
    id: 'a3', category: 'İK', color: 'amber',
    title: 'Haziran ayı vardiya planı yayında',
    body: 'Anadolu yakası saha ekibi için Haziran ayı nöbet planı paylaşıldı. Değişiklik talepleri için Çarşamba mesai sonuna kadar süre vardır. İK ekibine bireysel itirazlarınızı iletebilirsiniz.',
    author: 'Bahar Yılmaz', authorInitials: 'BY', department: 'İnsan Kaynakları',
    date: 'Dün, 15:20', read: true, readCount: 45, totalCount: 47,
    attachments: [{ type: 'xlsx', title: 'Haziran vardiya planı v2.xlsx' }],
  },
  {
    id: 'a4', category: 'GÜVENLİK', color: 'red',
    title: 'Cobas e411 — UPS güvenliği kritik uyarısı',
    body: 'Medipol Pendik\'te yaşanan UPS arızası sonrası 3 müşteride benzer risk tespit edildi. Saha ekibimiz bu hafta tüm Cobas e411 sahibi müşterilerde UPS denetimi yapacak.',
    bullets: [
      'Saha ziyaretlerinde UPS kontrol prosedürü zorunlu',
      'Servis Formu SF-117 v2025.1 kullanılacak',
      'Sapma tespitinde derhal yönetime bildirin',
    ],
    author: 'Ayşe Taş', authorInitials: 'AT', department: 'Operasyon Müdürlüğü',
    date: '2 gün önce', read: false, readCount: 31, totalCount: 47,
  },
  {
    id: 'a5', category: 'EĞİTİM', color: 'blue',
    title: 'Yeni başlayanlar için Cobas sertifikasyon programı',
    body: 'Saha mühendislerimiz için yeni nesil Cobas sertifikasyon programı Temmuz başında başlayacak. 3 oturumluk online + 1 uygulamalı modül. Katılım için İK ile iletişime geçin.',
    author: 'Nazlı Demir', authorInitials: 'ND', department: 'Eğitim',
    date: '3 gün önce', read: true, readCount: 42, totalCount: 47,
  },
  {
    id: 'a6', category: 'KALİTE', color: 'blue',
    title: 'Servis Formu SF-117 v2025.1 yayında',
    body: 'Formun yeni versiyonu CV % sapma takibi ve müşteri imza bölümü güncellenerek yayınlandı. Eski versiyon 15 Haziran\'dan itibaren kabul edilmeyecek.',
    author: 'Zeynep Aydın', authorInitials: 'ZA', department: 'Kalite Yönetimi',
    date: '5 gün önce', read: true, readCount: 47, totalCount: 47,
    attachments: [{ type: 'docx', title: 'SF-117 v2025.1 (boş şablon).docx' }],
  },
]

const CATEGORIES = ['Tümü', 'KALİTE', 'SAHA', 'İK', 'GÜVENLİK', 'EĞİTİM']

function AnnouncementCard({ a, onMarkRead }: { a: Announcement; onMarkRead: (id: string) => void }) {
  const pct = Math.round((a.readCount / a.totalCount) * 100)
  return (
    <div
      className="card"
      style={{
        borderLeft: '3px solid ' + RAIL[a.color],
        marginBottom: 14,
        opacity: a.read ? 0.82 : 1,
      }}
    >
      <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8, paddingBottom: 6 }}>
        <div className="row gap-8" style={{ width: '100%', flexWrap: 'wrap' }}>
          <span className={'chip ' + CHIP[a.color]}>{a.category}</span>
          {a.pinned && <span className="chip chip-amber"><Icon name="flag" size={12} /> Sabitlendi</span>}
          {!a.read && <span className="chip chip-red"><span className="chip-dot" /> Okunmadı</span>}
          <span className="t-xs muted" style={{ marginLeft: 'auto' }}>{a.date}</span>
        </div>
        <div className="card-title" style={{ fontSize: 16, lineHeight: 1.3 }}>{a.title}</div>
      </div>
      <div className="card-body" style={{ paddingTop: 4 }}>
        <div className="t-sm" style={{ color: 'var(--c-text-2)', lineHeight: 1.55, marginBottom: a.bullets ? 10 : 0 }}>
          {a.body}
        </div>
        {a.bullets && (
          <ul style={{ paddingLeft: 18, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {a.bullets.map((b, i) => (
              <li key={i} className="t-sm" style={{ color: 'var(--c-text-2)' }}>{b}</li>
            ))}
          </ul>
        )}
        {a.attachments && a.attachments.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
            {a.attachments.map((att, i) => (
              <div
                key={i}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px', borderRadius: 8,
                  background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)',
                  cursor: 'pointer',
                }}
              >
                <div className={'doc'} style={{ padding: 0 }}>
                  <div className={'ico ' + att.type} style={{ width: 24, height: 24, fontSize: 9 }}>{att.type.toUpperCase()}</div>
                </div>
                <span className="t-xs">{att.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="row gap-8" style={{ paddingTop: 10, borderTop: '1px solid var(--c-border)' }}>
          <div className="avatar sm">{a.authorInitials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="t-sm fw-6">{a.author}</div>
            <div className="t-xs muted">{a.department}</div>
          </div>
          <div style={{ minWidth: 140 }}>
            <div className="t-xs muted row gap-6" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
              <span>Okunma</span>
              <span className="mono">{a.readCount}/{a.totalCount}</span>
            </div>
            <div className={'progress ' + (pct > 80 ? 'green' : pct > 50 ? '' : 'amber')}>
              <i style={{ width: pct + '%' }} />
            </div>
          </div>
          {!a.read ? (
            <button className="btn btn-primary btn-sm" onClick={() => onMarkRead(a.id)}>
              <Icon name="check" /> Anladım
            </button>
          ) : (
            <span className="chip chip-green"><Icon name="check" size={12} /> Okundu</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Announcements() {
  const [items, setItems] = useState<Announcement[]>(DATA)
  const [filter, setFilter] = useState<string>('Tümü')
  const [unreadOnly, setUnreadOnly] = useState(false)

  const markRead = (id: string) =>
    setItems((arr) => arr.map((a) => (a.id === id ? { ...a, read: true, readCount: a.readCount + 1 } : a)))

  const filtered = items
    .filter((a) => filter === 'Tümü' || a.category === filter)
    .filter((a) => !unreadOnly || !a.read)
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned))

  const unread = items.filter((a) => !a.read).length

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Duyurular</div>
          <div className="page-sub">{unread} okunmamış · 47 kişiye yayın · ortalama %78 okunma oranı</div>
        </div>
        <div className="row gap-8">
          <div className="tabs">
            <div className={'tab' + (!unreadOnly ? ' active' : '')} onClick={() => setUnreadOnly(false)}>Tümü</div>
            <div className={'tab' + (unreadOnly ? ' active' : '')} onClick={() => setUnreadOnly(true)}>
              Okunmamış {unread > 0 && <span className="mono" style={{ marginLeft: 4 }}>({unread})</span>}
            </div>
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-soft btn-sm"><Icon name="sparkle" /> AI ile özetle</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Duyuru oluştur</button>
        </div>
      </div>

      <div className="row gap-6" style={{ marginBottom: 16, flexWrap: 'wrap' }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={'chip ' + (filter === c ? 'chip-blue' : 'chip-outline')}
            style={{ cursor: 'pointer', fontSize: 11.5 }}
          >
            {c}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <span className="t-xs muted">{filtered.length} duyuru</span>
      </div>

      {filtered.length === 0 ? (
        <div className="card">
          <div className="card-body" style={{ padding: 40, textAlign: 'center' }}>
            <div className="t-lg fw-6">Hiç duyuru yok</div>
            <div className="muted t-sm" style={{ marginTop: 6 }}>Seçili filtrede gösterilecek duyuru bulunmuyor.</div>
          </div>
        </div>
      ) : (
        filtered.map((a) => <AnnouncementCard key={a.id} a={a} onMarkRead={markRead} />)
      )}
    </div>
  )
}
