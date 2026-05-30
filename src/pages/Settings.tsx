import { useState, type ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { currentUser } from '../data/user'

type Section = 'profile' | 'notifications' | 'preferences' | 'security' | 'integrations'

const SECTIONS: { id: Section; label: string; icon: 'gear' | 'bell' | 'globe' | 'shield' | 'drive' }[] = [
  { id: 'profile', label: 'Profil', icon: 'gear' },
  { id: 'notifications', label: 'Bildirimler', icon: 'bell' },
  { id: 'preferences', label: 'Tercihler', icon: 'globe' },
  { id: 'security', label: 'Güvenlik', icon: 'shield' },
  { id: 'integrations', label: 'Entegrasyonlar', icon: 'drive' },
]

function Field({
  label,
  desc,
  children,
  cols = 1,
}: {
  label: string
  desc?: string
  children: ReactNode
  cols?: 1 | 2
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'flex-start', padding: '14px 0', borderBottom: '1px solid var(--c-border)' }}>
      <div>
        <div className="t-sm fw-6">{label}</div>
        {desc && <div className="t-xs muted" style={{ marginTop: 4, lineHeight: 1.5 }}>{desc}</div>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: cols === 2 ? '1fr 1fr' : '1fr', gap: 12, maxWidth: 480 }}>
        {children}
      </div>
    </div>
  )
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <div className="row gap-8">
      <button
        onClick={() => onChange(!value)}
        style={{
          width: 36,
          height: 20,
          borderRadius: 10,
          background: value ? 'var(--c-blue)' : 'var(--c-border-strong)',
          position: 'relative',
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
      {label && <span className="t-sm">{label}</span>}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid var(--c-border)',
  borderRadius: 8,
  background: 'var(--c-surface-2)',
  fontSize: 13,
  outline: 'none',
}

function ProfileSection() {
  const [name, setName] = useState(currentUser.name)
  const [role, setRole] = useState(currentUser.role)
  return (
    <div>
      <Field label="Profil fotoğrafı" desc="Sohbet ve toplantılarda gösterilir.">
        <div className="row gap-12">
          <div className="avatar lg">{currentUser.initials}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button className="btn btn-outline btn-sm">Fotoğraf yükle</button>
            <span className="t-xs muted">PNG/JPG · maks. 2 MB</span>
          </div>
        </div>
      </Field>
      <Field label="Ad Soyad">
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
      </Field>
      <Field label="Rol / Pozisyon" desc="Yönetici tarafından atanır.">
        <input value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle} disabled />
      </Field>
      <Field label="E-posta" desc="Bildirimler ve giriş için kullanılır.">
        <input defaultValue="mehmet.yildirim@coregen.com.tr" style={inputStyle} />
      </Field>
      <Field label="Telefon">
        <input defaultValue="+90 532 *** ** 47" style={inputStyle} />
      </Field>
      <Field label="Konum" cols={2}>
        <input defaultValue="İstanbul Anadolu" style={inputStyle} />
        <select defaultValue="Saha" style={inputStyle}>
          <option>Saha</option>
          <option>Ofis</option>
          <option>Hibrit</option>
        </select>
      </Field>
    </div>
  )
}

function NotificationsSection() {
  const [s, setS] = useState({
    email: true, push: true, mention: true, ai: true, daily: false, weekly: true,
    quietHours: true, sound: false,
  })
  const upd = (k: keyof typeof s) => (v: boolean) => setS((p) => ({ ...p, [k]: v }))
  return (
    <div>
      <Field label="E-posta bildirimleri" desc="Önemli olaylar için e-posta al.">
        <Toggle value={s.email} onChange={upd('email')} label="Tüm e-posta bildirimleri" />
      </Field>
      <Field label="Push bildirimleri" desc="Tarayıcı ve mobil push.">
        <Toggle value={s.push} onChange={upd('push')} />
      </Field>
      <Field label="@mention'lar" desc="Birisi seni etiketlediğinde anında bildir.">
        <Toggle value={s.mention} onChange={upd('mention')} />
      </Field>
      <Field label="AI yanıt bildirimleri" desc="@coregen-ai çağrıların yanıtlandığında bildir.">
        <Toggle value={s.ai} onChange={upd('ai')} />
      </Field>
      <Field label="Günlük özet" desc="Her sabah 08:00'de günlük özet e-postası.">
        <Toggle value={s.daily} onChange={upd('daily')} />
      </Field>
      <Field label="Haftalık rapor" desc="Cuma akşamı haftalık performans özeti.">
        <Toggle value={s.weekly} onChange={upd('weekly')} />
      </Field>
      <Field label="Sessiz saatler" desc="20:00–07:00 arası push bildirimleri sustur.">
        <Toggle value={s.quietHours} onChange={upd('quietHours')} />
      </Field>
      <Field label="Bildirim sesi">
        <Toggle value={s.sound} onChange={upd('sound')} />
      </Field>
    </div>
  )
}

function PreferencesSection() {
  return (
    <div>
      <Field label="Dil" desc="Arayüz dili.">
        <select defaultValue="tr" style={inputStyle}>
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>
      </Field>
      <Field label="Zaman dilimi">
        <select defaultValue="ist" style={inputStyle}>
          <option value="ist">(GMT+3) İstanbul</option>
          <option value="ank">(GMT+3) Ankara</option>
        </select>
      </Field>
      <Field label="Tarih biçimi">
        <select defaultValue="tr" style={inputStyle}>
          <option value="tr">31 May 2026</option>
          <option value="iso">2026-05-31</option>
          <option value="us">May 31, 2026</option>
        </select>
      </Field>
      <Field label="Tema" desc="Sağ alt köşedeki ✨ butonundan da değiştirebilirsin.">
        <div className="t-sm muted">Tema paneli üzerinden yönetiliyor.</div>
      </Field>
      <Field label="Başlangıç sayfası">
        <select defaultValue="dashboard" style={inputStyle}>
          <option value="dashboard">Dashboard</option>
          <option value="tasks">Görevler</option>
          <option value="ai">AI Chat</option>
          <option value="team">Ekip Sohbeti</option>
        </select>
      </Field>
    </div>
  )
}

function SecuritySection() {
  const [tfa, setTfa] = useState(true)
  const [bio, setBio] = useState(false)
  return (
    <div>
      <Field label="Şifre" desc="Son değişiklik: 3 ay önce">
        <button className="btn btn-outline btn-sm" style={{ alignSelf: 'flex-start' }}>Şifreyi değiştir</button>
      </Field>
      <Field label="İki adımlı doğrulama (2FA)" desc="Authenticator uygulaması ile.">
        <Toggle value={tfa} onChange={setTfa} label={tfa ? 'Aktif' : 'Devre dışı'} />
      </Field>
      <Field label="Biyometrik giriş" desc="Touch ID / Face ID ile uygulamaya giriş.">
        <Toggle value={bio} onChange={setBio} />
      </Field>
      <Field label="Aktif oturumlar" desc="Bu hesaba bağlı cihazlar.">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { d: 'MacBook Pro · Safari', loc: 'İstanbul · şu an', current: true },
            { d: 'iPhone 14 · COREGEN app', loc: 'İstanbul · 2 saat önce' },
            { d: 'Chrome · Windows', loc: 'Ankara · 4 gün önce' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                padding: 10,
                background: 'var(--c-surface-2)',
                border: '1px solid var(--c-border)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ flex: 1 }}>
                <div className="t-sm fw-6">{s.d}</div>
                <div className="t-xs muted">{s.loc}</div>
              </div>
              {s.current ? (
                <span className="chip chip-green"><span className="chip-dot" /> Bu cihaz</span>
              ) : (
                <button className="btn btn-ghost btn-sm">Çıkış yaptır</button>
              )}
            </div>
          ))}
        </div>
      </Field>
    </div>
  )
}

function IntegrationsSection() {
  const items = [
    { name: 'Google Drive', desc: 'Belge senkronizasyonu · 184 dosya', icon: 'drive' as const, status: 'Bağlı', color: 'chip-green' },
    { name: 'Google Workspace SSO', desc: 'Tek tıkla giriş · coregen.com.tr', icon: 'shield' as const, status: 'Bağlı', color: 'chip-green' },
    { name: 'Google Calendar', desc: 'Toplantı senkronizasyonu', icon: 'meet' as const, status: 'Bağlı', color: 'chip-green' },
    { name: 'Slack', desc: 'Bildirim köprüsü (opsiyonel)', icon: 'chat' as const, status: 'Bağlı değil', color: 'chip-gray' },
    { name: 'Logo Tiger ERP', desc: 'Servis kayıtları + fatura senkronu', icon: 'doc' as const, status: 'Bağlı değil', color: 'chip-gray' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((it) => (
        <div
          key={it.name}
          style={{
            padding: 14,
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: 40, height: 40, borderRadius: 8,
              background: 'var(--c-blue-50)', color: 'var(--c-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Icon name={it.icon} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="t-sm fw-6">{it.name}</div>
            <div className="t-xs muted">{it.desc}</div>
          </div>
          <span className={'chip ' + it.color}>
            {it.color === 'chip-green' && <span className="chip-dot" />}
            {it.status}
          </span>
          <button className="btn btn-outline btn-sm">
            {it.color === 'chip-green' ? 'Yönet' : 'Bağla'}
          </button>
        </div>
      ))}
    </div>
  )
}

export function Settings() {
  const [section, setSection] = useState<Section>('profile')

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">Ayarlar</div>
          <div className="page-sub">Profil, bildirim, dil ve güvenlik tercihlerin</div>
        </div>
        <div className="row gap-8">
          <button className="btn btn-ghost btn-sm">İptal</button>
          <button className="btn btn-primary btn-sm"><Icon name="check" /> Kaydet</button>
        </div>
      </div>

      <div className="grid grid-12" style={{ alignItems: 'flex-start' }}>
        <div style={{ gridColumn: 'span 3' }}>
          <div
            style={{
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--r-lg)',
              padding: 8,
              position: 'sticky',
              top: 80,
            }}
          >
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                onClick={() => setSection(s.id)}
                className={'nav-item' + (section === s.id ? ' active' : '')}
                style={{ padding: '10px 12px' }}
              >
                <Icon name={s.icon} />
                <span className="nav-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ gridColumn: 'span 9' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">{SECTIONS.find((s) => s.id === section)?.label}</div>
                <div className="card-subtitle">
                  {section === 'profile' && 'Görünür profilini düzenle.'}
                  {section === 'notifications' && 'Hangi olaylar için bildirim al.'}
                  {section === 'preferences' && 'Dil, zaman dilimi ve görünüm.'}
                  {section === 'security' && 'Şifre, 2FA ve oturum kontrolü.'}
                  {section === 'integrations' && 'Bağlı ve önerilen entegrasyonlar.'}
                </div>
              </div>
            </div>
            <div className="card-body" style={{ paddingTop: 4 }}>
              {section === 'profile' && <ProfileSection />}
              {section === 'notifications' && <NotificationsSection />}
              {section === 'preferences' && <PreferencesSection />}
              {section === 'security' && <SecuritySection />}
              {section === 'integrations' && <IntegrationsSection />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
