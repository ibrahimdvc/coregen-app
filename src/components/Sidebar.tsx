import { NavLink } from 'react-router-dom'
import { Icon, CoregenMark } from './Icon'
import { currentUser } from '../data/user'

const items = [
  { to: '/', label: 'Dashboard', icon: 'dash' as const, end: true },
  { to: '/ai', label: 'AI Chat', icon: 'ai' as const, count: '3', dot: true },
  { to: '/tasks', label: 'Görevler', icon: 'task' as const, count: '12' },
  { to: '/meetings', label: 'Toplantılar', icon: 'meet' as const },
  { to: '/team', label: 'Ekip Sohbeti', icon: 'chat' as const, count: '5' },
  { to: '/docs', label: 'Dokümanlar', icon: 'doc' as const },
  { to: '/announce', label: 'Duyurular', icon: 'ann' as const },
]
const adminItems = [
  { to: '/analytics', label: 'Analitik', icon: 'chart' as const },
  { to: '/admin', label: 'Yönetim', icon: 'shield' as const },
  { to: '/settings', label: 'Ayarlar', icon: 'gear' as const },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <CoregenMark size={34} />
        <div className="brand-meta">
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em' }}>COREGEN</div>
          <div className="subline">AI Workspace</div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Çalışma Alanı</div>
        <nav className="nav">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              <Icon name={it.icon} />
              <span className="nav-label">{it.label}</span>
              {it.dot && <span className="nav-dot" title="AI yeni cevap üretti" />}
              {it.count && <span className="nav-count">{it.count}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Yönetim</div>
        <nav className="nav">
          {adminItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
            >
              <Icon name={it.icon} />
              <span className="nav-label">{it.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">{currentUser.initials}</div>
          <div className="user-meta">
            <div className="user-name">{currentUser.name}</div>
            <div className="user-role">{currentUser.role}</div>
          </div>
          <Icon name="kebab" />
        </div>
      </div>
    </aside>
  )
}
