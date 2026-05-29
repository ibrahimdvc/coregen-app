import { Fragment } from 'react'
import { Icon } from './Icon'

export function Topbar({ crumbs }: { crumbs: string[] }) {
  return (
    <div className="topbar">
      <div className="crumb">
        {crumbs.map((c, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="sep">/</span>}
            <span className={i === crumbs.length - 1 ? 'cur' : ''}>{c}</span>
          </Fragment>
        ))}
      </div>
      <div className="command-bar" onClick={() => alert('Komut paleti yakında')}>
        <Icon name="search" />
        <span>Komut, doküman veya kişi ara…</span>
        <span className="kbd">⌘K</span>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button className="icon-btn" title="AI Quick Action">
          <Icon name="sparkle" />
        </button>
        <button className="icon-btn" title="Bildirimler">
          <Icon name="bell" />
          <span className="badge">4</span>
        </button>
        <button className="btn btn-outline btn-sm" style={{ marginLeft: 4 }}>
          <Icon name="plus" /> Yeni
        </button>
      </div>
    </div>
  )
}
