import { useState } from 'react'
import { Icon } from '../components/Icon'

type DocType = 'pdf' | 'docx' | 'xlsx'
type Doc = {
  id: string
  type: DocType
  title: string
  folder: string
  size: string
  updated: string
  owner: string
  ownerInitials: string
  tags: string[]
  snippet: string
  pages?: number
}

const FOLDERS = [
  { id: 'all', label: 'Tüm dokümanlar', icon: 'drive' as const, count: 184 },
  { id: 'servis', label: 'Servis Dokümanları', icon: 'doc' as const, count: 64 },
  { id: 'sozlesme', label: 'Sözleşmeler', icon: 'doc' as const, count: 28 },
  { id: 'operasyon', label: 'Operasyon', icon: 'doc' as const, count: 41 },
  { id: 'teknik', label: 'Teknik Referans', icon: 'doc' as const, count: 22 },
  { id: 'form', label: 'Formlar', icon: 'doc' as const, count: 17 },
  { id: 'bulten', label: 'Bültenler', icon: 'ann' as const, count: 12 },
]

const DOCS: Doc[] = [
  {
    id: 'd1', type: 'pdf', title: 'Cobas 6000 — Servis El Kitabı v4.2', folder: 'servis',
    size: '12 MB', updated: '2 saat önce', owner: 'Ayşe Taş', ownerInitials: 'AT',
    tags: ['Roche', 'Servis'], pages: 248,
    snippet: 'Bölüm 3.4 — Reaktif değişimi sonrası tam profil kalibrasyon. Stand-by süresi minimum 5 dk olmalıdır. Tüm test panellerinin "Calibration → Full Profile" üzerinden çalıştırılması zorunludur…',
  },
  {
    id: 'd2', type: 'docx', title: 'Acıbadem Sağlık Grubu — Çerçeve Sözleşme', folder: 'sozlesme',
    size: '184 KB', updated: 'Dün, 16:40', owner: 'Selim Kara', ownerInitials: 'SK',
    tags: ['Müşteri', '2024'], pages: 18,
    snippet: '7.3 Kalibrasyon raporları en geç 24 saat içerisinde laboratuvar sorumlusuna iletilecektir. 7.4 Cihaz duruşlarının raporlanması anlık olarak yapılmalıdır…',
  },
  {
    id: 'd3', type: 'xlsx', title: '2025 Kalibrasyon Takvimi — Q2', folder: 'operasyon',
    size: '96 KB', updated: '3 gün önce', owner: 'Mehmet Yıldırım', ownerInitials: 'MY',
    tags: ['Takvim', 'Q2'], pages: 8,
    snippet: '247 aktif cihaz · 4 bölge · 12 hastane grubuna yayılı kalibrasyon takvimi. Nisan-Haziran döneminde 96 planlı kalibrasyon var.',
  },
  {
    id: 'd4', type: 'pdf', title: 'Sysmex XN serisi — Hata Kodları Kataloğu', folder: 'teknik',
    size: '8 MB', updated: '1 hafta önce', owner: 'Erdem Kaya', ownerInitials: 'EK',
    tags: ['Sysmex', 'Hata Kodu'], pages: 142,
    snippet: '4E-12 hata kodu reagent transfer hattında tıkanma şüphesini gösterir. Çözüm adımları: 1) cihazı stand-by\'a alın, 2) reagent probe temizliği…',
  },
  {
    id: 'd5', type: 'pdf', title: 'Roche FSN-2025-04 Servis Bülteni', folder: 'bulten',
    size: '2.4 MB', updated: '4 gün önce', owner: 'Ayşe Taş', ownerInitials: 'AT',
    tags: ['Roche', 'Bülten', 'Acil'], pages: 12,
    snippet: 'Bu bülten, reaktif kaset değişimi sonrası uygulanacak güncellenmiş kalibrasyon adımlarını kapsar. Tüm Cobas 6000/8000 sahiplerine 30 gün içinde bildirim zorunludur.',
  },
  {
    id: 'd6', type: 'docx', title: 'Servis Formu SF-117 (boş şablon)', folder: 'form',
    size: '48 KB', updated: '2 hafta önce', owner: 'Nazlı Demir', ownerInitials: 'ND',
    tags: ['Form', 'Şablon'], pages: 1,
    snippet: 'Saha kalibrasyon servis formu — versiyon 2025.1. Lot numaraları, kalibratör adımları, CV % sapma, müşteri imzası bölümlerini içerir.',
  },
  {
    id: 'd7', type: 'pdf', title: 'PreciControl ClinChem Multi — Ürün Bilgi Notu', folder: 'servis',
    size: '1.8 MB', updated: '5 gün önce', owner: 'Erdem Kaya', ownerInitials: 'EK',
    tags: ['Roche', 'Kontrol'], pages: 8,
    snippet: 'Kontrol setinin önerilen kullanım sıklığı her reaktif değişimi sonrası ve haftada bir tam profilde. Lot numaralarının takibi için SF-117 formuna işlenmelidir.',
  },
  {
    id: 'd8', type: 'xlsx', title: 'Yedek parça envanteri — Q2', folder: 'operasyon',
    size: '212 KB', updated: '6 gün önce', owner: 'Hakan Bora', ownerInitials: 'HB',
    tags: ['Lojistik', 'Stok'], pages: 4,
    snippet: 'Filtre, prob, tüp seti ve diğer 64 SKU için Beylikdüzü ve Kartal depo karşılaştırması. Toplam değer: 1.8M TL.',
  },
  {
    id: 'd9', type: 'pdf', title: '2024/3812 Teknik Şartname', folder: 'sozlesme',
    size: '4.2 MB', updated: '1 hafta önce', owner: 'Selim Kara', ownerInitials: 'SK',
    tags: ['İhale', 'Şartname'], pages: 67,
    snippet: 'Sağlık Bakanlığı 2024/3812 — Biyokimya + Hematoloji paketi. 14 kalem cihaz, ölçüm aralıkları ve sertifika gereklilikleri.',
  },
]

const TAG_TO_CHIP: Record<string, string> = {
  Roche: 'chip-blue', Sysmex: 'chip-blue', Servis: 'chip-gray', Müşteri: 'chip-amber',
  Form: 'chip-green', Şablon: 'chip-gray', Bülten: 'chip-amber', Acil: 'chip-red',
  Lojistik: 'chip-gray', Stok: 'chip-gray', İhale: 'chip-amber', Şartname: 'chip-blue',
  Kontrol: 'chip-green', Takvim: 'chip-blue', Q2: 'chip-gray', '2024': 'chip-gray',
  'Hata Kodu': 'chip-red',
}

function FolderTree({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  return (
    <div
      style={{
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--r-lg)',
        padding: 12,
        position: 'sticky',
        top: 80,
      }}
    >
      <div className="row gap-8" style={{ padding: '4px 6px 10px', borderBottom: '1px solid var(--c-border)', marginBottom: 8 }}>
        <Icon name="drive" />
        <div className="fw-6 t-sm" style={{ flex: 1 }}>Drive</div>
        <span className="chip chip-green"><span className="chip-dot" /> Senkron</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {FOLDERS.map((f) => (
          <div
            key={f.id}
            onClick={() => onPick(f.id)}
            className={'nav-item' + (active === f.id ? ' active' : '')}
            style={{ padding: '8px 10px', fontSize: 12.5 }}
          >
            <Icon name={f.icon} />
            <span className="nav-label">{f.label}</span>
            <span className="nav-count">{f.count}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--c-border)' }}>
        <button className="btn btn-soft btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          <Icon name="plus" /> Drive klasörü bağla
        </button>
      </div>
    </div>
  )
}

function DocRow({ d, active, onPick }: { d: Doc; active: boolean; onPick: () => void }) {
  return (
    <div
      onClick={onPick}
      style={{
        display: 'grid',
        gridTemplateColumns: '40px 1fr auto auto auto',
        gap: 14,
        alignItems: 'center',
        padding: '10px 14px',
        borderRadius: 10,
        cursor: 'pointer',
        background: active ? 'var(--c-blue-50)' : 'transparent',
        border: '1px solid ' + (active ? 'var(--c-blue-100)' : 'transparent'),
        transition: 'background 0.12s',
      }}
    >
      <div className={'doc'} style={{ padding: 0 }}>
        <div className={'ico ' + d.type}>{d.type.toUpperCase()}</div>
      </div>
      <div style={{ minWidth: 0 }}>
        <div className="t-sm fw-6" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {d.title}
        </div>
        <div className="t-xs muted row gap-6" style={{ marginTop: 2 }}>
          <span>{d.size}</span>
          <span style={{ color: 'var(--c-border-strong)' }}>·</span>
          <span>{d.updated}</span>
          {d.tags.slice(0, 2).map((t) => (
            <span key={t} className={'chip ' + (TAG_TO_CHIP[t] || 'chip-gray')} style={{ fontSize: 10 }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="avatar xs" title={d.owner}>{d.ownerInitials}</div>
      <span className="t-xs muted mono">{d.pages ?? '—'} s.</span>
      <button className="icon-btn"><Icon name="kebab" /></button>
    </div>
  )
}

function PreviewPanel({ d }: { d: Doc }) {
  return (
    <div className="card" style={{ position: 'sticky', top: 80 }}>
      <div className="card-header" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
        <div className="row gap-8" style={{ width: '100%' }}>
          <div className={'doc'} style={{ padding: 0 }}>
            <div className={'ico ' + d.type} style={{ width: 44, height: 44, fontSize: 12 }}>{d.type.toUpperCase()}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="card-title" style={{ fontSize: 14.5, lineHeight: 1.3 }}>{d.title}</div>
            <div className="card-subtitle">{d.size} · {d.pages ?? '—'} sayfa</div>
          </div>
          <button className="icon-btn"><Icon name="kebab" /></button>
        </div>
        <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
          {d.tags.map((t) => (
            <span key={t} className={'chip ' + (TAG_TO_CHIP[t] || 'chip-gray')}>{t}</span>
          ))}
        </div>
      </div>
      <div className="card-body">
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
            <div className="fw-6 t-sm">AI özet</div>
          </div>
          <div className="t-sm" style={{ color: 'var(--c-text-2)', lineHeight: 1.55 }}>{d.snippet}</div>
          <div className="row gap-6" style={{ marginTop: 10 }}>
            <button className="btn btn-soft btn-sm">Tam özet üret</button>
            <button className="btn btn-ghost btn-sm">Soru sor</button>
          </div>
        </div>

        <div className="fw-6 t-sm" style={{ marginBottom: 8 }}>Detaylar</div>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', rowGap: 8, columnGap: 12, marginBottom: 14 }}>
          <span className="t-xs muted">Sahip</span>
          <span className="t-sm row gap-6"><div className="avatar xs">{d.ownerInitials}</div>{d.owner}</span>
          <span className="t-xs muted">Klasör</span>
          <span className="t-sm mono">Drive › {FOLDERS.find((f) => f.id === d.folder)?.label}</span>
          <span className="t-xs muted">Boyut</span>
          <span className="t-sm mono">{d.size}</span>
          <span className="t-xs muted">Güncellendi</span>
          <span className="t-sm">{d.updated}</span>
          <span className="t-xs muted">Sayfa</span>
          <span className="t-sm mono">{d.pages ?? '—'}</span>
        </div>
      </div>
      <div
        style={{
          padding: '12px 18px',
          borderTop: '1px solid var(--c-border)',
          display: 'flex',
          gap: 8,
        }}
      >
        <button className="btn btn-ghost btn-sm">İndir</button>
        <span style={{ flex: 1 }} />
        <button className="btn btn-outline btn-sm">Paylaş</button>
        <button className="btn btn-primary btn-sm">
          <Icon name="drive" /> Drive'da aç
        </button>
      </div>
    </div>
  )
}

export function Documents() {
  const [folder, setFolder] = useState('all')
  const [selected, setSelected] = useState<Doc>(DOCS[0])
  const visible = folder === 'all' ? DOCS : DOCS.filter((d) => d.folder === folder)

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Dokümanlar</div>
          <div className="page-sub">Drive ile gerçek zamanlı senkron · 184 dosya · 12 yeni indeks bugün</div>
        </div>
        <div className="row gap-8">
          <div className="tabs">
            <div className="tab active">Tümü</div>
            <div className="tab">Son açılanlar</div>
            <div className="tab">Favoriler</div>
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-soft btn-sm"><Icon name="sparkle" /> Drive'da AI ara</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Yükle</button>
        </div>
      </div>

      <div className="grid grid-12">
        <div style={{ gridColumn: 'span 3' }}>
          <FolderTree active={folder} onPick={setFolder} />
        </div>

        <div style={{ gridColumn: 'span 5' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">
                  {FOLDERS.find((f) => f.id === folder)?.label}
                </div>
                <div className="card-subtitle">{visible.length} dosya</div>
              </div>
              <div className="card-actions">
                <span className="chip chip-outline">
                  <Icon name="search" size={12} /> Drive'da ara
                </span>
                <button className="btn btn-ghost btn-sm">Ad ↓</button>
              </div>
            </div>
            <div className="card-body" style={{ padding: '0 6px 6px' }}>
              {visible.map((d) => (
                <DocRow key={d.id} d={d} active={selected.id === d.id} onPick={() => setSelected(d)} />
              ))}
              {visible.length === 0 && (
                <div style={{ padding: 40, textAlign: 'center' }} className="muted t-sm">
                  Bu klasörde doküman yok.
                </div>
              )}
            </div>
          </div>
        </div>

        <div style={{ gridColumn: 'span 4' }}>
          <PreviewPanel d={selected} />
        </div>
      </div>
    </div>
  )
}
