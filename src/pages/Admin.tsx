import { useState } from 'react'
import { Icon } from '../components/Icon'

type Role = 'Yönetici' | 'Operasyon' | 'Saha' | 'Eğitim' | 'Lojistik' | 'Finans'

type User = {
  id: string
  initials: string
  name: string
  email: string
  role: Role
  department: string
  status: 'active' | 'invited' | 'suspended'
  lastSeen: string
}

const USERS: User[] = [
  { id: 'u1', initials: 'AT', name: 'Ayşe Taş', email: 'ayse.tas@coregen.com.tr', role: 'Yönetici', department: 'Operasyon', status: 'active', lastSeen: 'Şimdi' },
  { id: 'u2', initials: 'MY', name: 'Mehmet Yıldırım', email: 'mehmet.yildirim@coregen.com.tr', role: 'Saha', department: 'Teknik Operasyon', status: 'active', lastSeen: '5 dk önce' },
  { id: 'u3', initials: 'EK', name: 'Erdem Kaya', email: 'erdem.kaya@coregen.com.tr', role: 'Saha', department: 'Teknik Operasyon', status: 'active', lastSeen: '12 dk önce' },
  { id: 'u4', initials: 'SK', name: 'Selim Kara', email: 'selim.kara@coregen.com.tr', role: 'Operasyon', department: 'Satış', status: 'active', lastSeen: '1 saat önce' },
  { id: 'u5', initials: 'ND', name: 'Nazlı Demir', email: 'nazli.demir@coregen.com.tr', role: 'Eğitim', department: 'Müşteri Başarı', status: 'active', lastSeen: '2 saat önce' },
  { id: 'u6', initials: 'HB', name: 'Hakan Bora', email: 'hakan.bora@coregen.com.tr', role: 'Lojistik', department: 'Tedarik', status: 'active', lastSeen: 'Dün' },
  { id: 'u7', initials: 'NB', name: 'Nazım Berk', email: 'nazim.berk@coregen.com.tr', role: 'Finans', department: 'Finans', status: 'active', lastSeen: 'Dün' },
  { id: 'u8', initials: 'ZA', name: 'Zeynep Aydın', email: 'zeynep.aydin@coregen.com.tr', role: 'Yönetici', department: 'Kalite', status: 'active', lastSeen: '3 saat önce' },
  { id: 'u9', initials: 'BY', name: 'Bahar Yılmaz', email: 'bahar.yilmaz@coregen.com.tr', role: 'Operasyon', department: 'İnsan Kaynakları', status: 'active', lastSeen: '4 saat önce' },
  { id: 'u10', initials: 'KÇ', name: 'Kerem Çelik', email: 'kerem.celik@coregen.com.tr', role: 'Saha', department: 'Teknik Operasyon', status: 'invited', lastSeen: '—' },
  { id: 'u11', initials: 'GÖ', name: 'Gül Öztürk', email: 'gul.ozturk@coregen.com.tr', role: 'Saha', department: 'Teknik Operasyon', status: 'suspended', lastSeen: '2 hafta önce' },
]

const ROLE_CHIP: Record<Role, string> = {
  Yönetici: 'chip-red',
  Operasyon: 'chip-blue',
  Saha: 'chip-green',
  Eğitim: 'chip-amber',
  Lojistik: 'chip-gray',
  Finans: 'chip-blue',
}

const STATUS_LABEL = { active: 'Aktif', invited: 'Davetli', suspended: 'Askıda' } as const
const STATUS_CHIP = { active: 'chip-green', invited: 'chip-amber', suspended: 'chip-red' } as const

/* -------- Subviews -------- */

function UsersTab() {
  const [q, setQ] = useState('')
  const list = USERS.filter((u) => (u.name + u.email + u.department).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Kullanıcılar</div>
          <div className="card-subtitle">{USERS.length} aktif lisans · {USERS.filter((u) => u.status === 'invited').length} davet bekliyor</div>
        </div>
        <div className="card-actions">
          <div className="chat-search" style={{ minWidth: 220 }}>
            <Icon name="search" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="İsim, e-posta, departman…" />
          </div>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Filtre</button>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Kullanıcı davet et</button>
        </div>
      </div>
      <div className="card-body" style={{ padding: '0 18px 14px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 1fr 130px 130px 80px',
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
          <span>Departman</span>
          <span>Rol</span>
          <span>Son giriş</span>
          <span></span>
        </div>
        {list.map((u, i) => (
          <div
            key={u.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 1fr 130px 130px 80px',
              gap: 14,
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < list.length - 1 ? '1px solid var(--c-border)' : 0,
            }}
          >
            <div className="avatar sm">{u.initials}</div>
            <div style={{ minWidth: 0 }}>
              <div className="t-sm fw-6">{u.name}</div>
              <div className="t-xs muted" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {u.email}
              </div>
            </div>
            <div>
              <div className="t-sm">{u.department}</div>
              <div className="t-xs muted">
                <span className={'chip ' + STATUS_CHIP[u.status]} style={{ fontSize: 10 }}>
                  <span className="chip-dot" /> {STATUS_LABEL[u.status]}
                </span>
              </div>
            </div>
            <span className={'chip ' + ROLE_CHIP[u.role]}>{u.role}</span>
            <span className="t-xs muted">{u.lastSeen}</span>
            <div className="row gap-6" style={{ justifyContent: 'flex-end' }}>
              <button className="icon-btn" title="Düzenle"><Icon name="gear" size={14} /></button>
              <button className="icon-btn" title="Diğer"><Icon name="kebab" /></button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div style={{ padding: 30, textAlign: 'center' }} className="muted t-sm">Eşleşen kullanıcı yok.</div>
        )}
      </div>
    </div>
  )
}

function RolesTab() {
  const roles: { name: Role; desc: string; users: number; perms: string[] }[] = [
    { name: 'Yönetici', desc: 'Tüm sistem ayarlarına erişir, kullanıcı yönetir.', users: 2, perms: ['Tüm yetkiler', 'Faturalama', 'Audit log'] },
    { name: 'Operasyon', desc: 'Görev, toplantı, müşteri kayıtları üzerinde tam yetkili.', users: 3, perms: ['Görev', 'Toplantı', 'Müşteri', 'Drive (okuma)'] },
    { name: 'Saha', desc: 'Atanan görevler, servis formları, kendi raporları.', users: 4, perms: ['Görev (atanan)', 'Servis formu', 'Drive (servis dok.)'] },
    { name: 'Eğitim', desc: 'Eğitim modülü, sertifikasyon programları.', users: 1, perms: ['Eğitim', 'Drive (eğitim klasörü)'] },
    { name: 'Lojistik', desc: 'Yedek parça, depo, sevkiyat.', users: 1, perms: ['Lojistik', 'Drive (depo)'] },
    { name: 'Finans', desc: 'Sözleşme, fatura, raporlar.', users: 1, perms: ['Finans', 'Drive (sözleşmeler)'] },
  ]
  return (
    <div className="grid grid-12" style={{ gap: 14 }}>
      {roles.map((r) => (
        <div key={r.name} className="card" style={{ gridColumn: 'span 6' }}>
          <div className="card-header">
            <div>
              <div className="row gap-8">
                <span className={'chip ' + ROLE_CHIP[r.name]}>{r.name}</span>
                <span className="t-xs muted">{r.users} kullanıcı</span>
              </div>
              <div className="card-subtitle" style={{ marginTop: 6 }}>{r.desc}</div>
            </div>
            <button className="icon-btn"><Icon name="kebab" /></button>
          </div>
          <div className="card-body">
            <div className="t-xs muted" style={{ textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, fontWeight: 600 }}>
              İzinler
            </div>
            <div className="row gap-6" style={{ flexWrap: 'wrap' }}>
              {r.perms.map((p) => <span key={p} className="chip chip-outline">{p}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DriveTab() {
  const sources = [
    { name: 'Drive › Servis Dokümanları', sync: 'Senkron · 2 dk önce', files: 64, status: 'ok' },
    { name: 'Drive › Sözleşmeler', sync: 'Senkron · 12 dk önce', files: 28, status: 'ok' },
    { name: 'Drive › Operasyon', sync: 'Senkron · 4 dk önce', files: 41, status: 'ok' },
    { name: 'Drive › Teknik Referans', sync: 'Senkron · 1 saat önce', files: 22, status: 'ok' },
    { name: 'Drive › Formlar', sync: 'İndeksleniyor · 18/40', files: 17, status: 'sync' },
    { name: 'Drive › Bültenler', sync: 'Senkron · 8 dk önce', files: 12, status: 'ok' },
  ]
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">Drive kaynakları</div>
          <div className="card-subtitle">AI yanıtlarında kullanılan belge klasörleri</div>
        </div>
        <div className="card-actions">
          <span className="chip chip-green"><span className="chip-dot" /> 5/6 senkron</span>
          <button className="btn btn-primary btn-sm"><Icon name="plus" /> Klasör bağla</button>
        </div>
      </div>
      <div className="card-body" style={{ padding: '0 18px 14px' }}>
        {sources.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '36px 1fr 200px 80px 80px',
              gap: 14,
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: i < sources.length - 1 ? '1px solid var(--c-border)' : 0,
            }}
          >
            <div
              className={'doc'}
              style={{
                width: 36, height: 36, borderRadius: 8, padding: 0,
                background: 'var(--c-blue-50)', color: 'var(--c-blue)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Icon name="drive" />
            </div>
            <div>
              <div className="t-sm fw-6 mono">{s.name}</div>
              <div className="t-xs muted">{s.sync}</div>
            </div>
            <span className={'chip ' + (s.status === 'ok' ? 'chip-green' : 'chip-amber')}>
              <span className="chip-dot" />
              {s.status === 'ok' ? 'Aktif' : 'İndeksleniyor'}
            </span>
            <span className="mono t-sm" style={{ textAlign: 'right' }}>{s.files}</span>
            <div className="row gap-6" style={{ justifyContent: 'flex-end' }}>
              <button className="icon-btn"><Icon name="kebab" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SystemTab() {
  return (
    <div className="grid grid-12" style={{ gap: 14 }}>
      <div className="card" style={{ gridColumn: 'span 6' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Faturalama</div>
            <div className="card-subtitle">Kurumsal · 12 lisans · yıllık</div>
          </div>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 10, fontSize: 13 }}>
            <span className="muted">Plan</span><span className="fw-6">Kurumsal AI</span>
            <span className="muted">Kullanıcı</span><span>11 aktif / 12 lisans</span>
            <span className="muted">Sonraki ödeme</span><span className="mono">14 Tem 2026 · 18.400 TL</span>
            <span className="muted">Fatura adresi</span><span>Coregen Tıbbi Cihazlar A.Ş.</span>
          </div>
          <div className="row gap-6" style={{ marginTop: 14 }}>
            <button className="btn btn-outline btn-sm">Faturalar</button>
            <button className="btn btn-primary btn-sm">Lisans ekle</button>
          </div>
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 6' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Güvenlik</div>
            <div className="card-subtitle">Kurum genelinde uygulanan politikalar</div>
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Setting label="2FA zorunluluğu" desc="Tüm kullanıcılar için uygulamaya giriş 2FA gerektirir" value />
          <Setting label="SSO (Google Workspace)" desc="coregen.com.tr alanı bağlı" value />
          <Setting label="Tek seferlik bağlantı süresi" desc="30 dakika sonra otomatik çıkış" badge="30 dk" />
          <Setting label="IP allowlist" desc="Sadece kurum ağından girişe izin ver" />
        </div>
      </div>

      <div className="card" style={{ gridColumn: 'span 12' }}>
        <div className="card-header">
          <div>
            <div className="card-title">Audit log (son 24 saat)</div>
            <div className="card-subtitle">Yönetici ve sistem aksiyonları</div>
          </div>
          <button className="btn btn-ghost btn-sm">Tümü</button>
        </div>
        <div className="card-body" style={{ padding: '0 18px 14px' }}>
          {[
            { who: 'Ayşe Taş', what: 'Yeni Drive klasörü bağladı: Formlar', when: '09:42' },
            { who: 'Sistem', what: 'Otomatik yedekleme tamamlandı (1.2 GB)', when: '07:00' },
            { who: 'Zeynep Aydın', what: 'SF-117 v2025.1 yayınladı', when: 'Dün, 16:18' },
            { who: 'Ayşe Taş', what: 'Kerem Çelik kullanıcısını davet etti (Saha)', when: 'Dün, 11:04' },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 100px',
                gap: 14,
                padding: '10px 0',
                borderBottom: i < 3 ? '1px solid var(--c-border)' : 0,
                fontSize: 12.5,
              }}
            >
              <span className="fw-6">{r.who}</span>
              <span style={{ color: 'var(--c-text-2)' }}>{r.what}</span>
              <span className="mono muted t-xs" style={{ textAlign: 'right' }}>{r.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Setting({ label, desc, value, badge }: { label: string; desc: string; value?: boolean; badge?: string }) {
  const [on, setOn] = useState(!!value)
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 0',
        borderBottom: '1px solid var(--c-border)',
      }}
    >
      <div style={{ flex: 1 }}>
        <div className="t-sm fw-6">{label}</div>
        <div className="t-xs muted">{desc}</div>
      </div>
      {badge && <span className="chip chip-outline mono">{badge}</span>}
      <button
        onClick={() => setOn(!on)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: on ? 'var(--c-blue)' : 'var(--c-border-strong)',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 18 : 2,
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

/* -------- Page -------- */

export function Admin() {
  const [tab, setTab] = useState<'users' | 'roles' | 'drive' | 'system'>('users')

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Yönetim</div>
          <div className="page-sub">Kullanıcılar, roller, Drive kaynakları ve sistem politikaları</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-soft btn-sm"><Icon name="sparkle" /> AI ile politika öner</button>
          <button className="btn btn-outline btn-sm"><Icon name="arrow-down" /> Audit log indir</button>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: 16, display: 'inline-flex' }}>
        <div className={'tab' + (tab === 'users' ? ' active' : '')} onClick={() => setTab('users')}>Kullanıcılar</div>
        <div className={'tab' + (tab === 'roles' ? ' active' : '')} onClick={() => setTab('roles')}>Roller</div>
        <div className={'tab' + (tab === 'drive' ? ' active' : '')} onClick={() => setTab('drive')}>Drive kaynakları</div>
        <div className={'tab' + (tab === 'system' ? ' active' : '')} onClick={() => setTab('system')}>Sistem</div>
      </div>

      {tab === 'users' && <UsersTab />}
      {tab === 'roles' && <RolesTab />}
      {tab === 'drive' && <DriveTab />}
      {tab === 'system' && <SystemTab />}
    </div>
  )
}
