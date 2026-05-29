import { Icon } from '../components/Icon'

export function Placeholder({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <div className="page-title">{title}</div>
          <div className="page-sub">{sub}</div>
        </div>
      </div>
      <div className="card">
        <div className="card-body" style={{ padding: 40, textAlign: 'center' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: 'var(--c-blue-50)',
              color: 'var(--c-blue)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <Icon name="sparkle" />
          </div>
          <div className="t-lg fw-6">Bu modül için tasarım hazırlanıyor</div>
          <div className="muted t-sm" style={{ maxWidth: 420, margin: '8px auto 0' }}>
            İlk teslimatta <strong>Dashboard</strong>, <strong>AI Chat</strong> ve{' '}
            <strong>Görevler</strong> ekranlarına odaklandık. Sol menüden bu üç ekranı
            gezebilirsiniz; geri kalan modüller (Toplantılar, Ekip Sohbeti, Dokümanlar,
            Duyurular, Analitik, Yönetim) bir sonraki turda aynı sistem üzerine kurulacak.
          </div>
        </div>
      </div>
    </div>
  )
}
