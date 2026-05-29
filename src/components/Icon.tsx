type IconName =
  | 'dash' | 'ai' | 'task' | 'meet' | 'chat' | 'doc' | 'ann' | 'chart'
  | 'shield' | 'gear' | 'search' | 'bell' | 'plus' | 'send' | 'paperclip'
  | 'image' | 'mic' | 'sparkle' | 'check' | 'clock' | 'flag'
  | 'arrow-up' | 'arrow-down' | 'arrow-right' | 'kebab' | 'filter'
  | 'drive' | 'pdf-mark' | 'globe'

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const s = {
    width: size,
    height: size,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'dash': return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
    case 'ai': return <svg {...s} viewBox="0 0 24 24"><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/><circle cx="12" cy="12" r="4"/></svg>
    case 'task': return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h6M8 17h4"/></svg>
    case 'meet': return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/><circle cx="12" cy="14" r="1.5"/></svg>
    case 'chat': return <svg {...s} viewBox="0 0 24 24"><path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 5"/><circle cx="9" cy="12" r="1"/><circle cx="13" cy="12" r="1"/><circle cx="17" cy="12" r="1"/></svg>
    case 'doc': return <svg {...s} viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>
    case 'ann': return <svg {...s} viewBox="0 0 24 24"><path d="M3 11v2l13 5V6L3 11zM18 9v6a3 3 0 0 0 0-6z"/></svg>
    case 'chart': return <svg {...s} viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg>
    case 'shield': return <svg {...s} viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z"/></svg>
    case 'gear': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>
    case 'search': return <svg {...s} viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    case 'bell': return <svg {...s} viewBox="0 0 24 24"><path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16l-2-2zM10 21a2 2 0 0 0 4 0"/></svg>
    case 'plus': return <svg {...s} viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
    case 'send': return <svg {...s} viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
    case 'paperclip': return <svg {...s} viewBox="0 0 24 24"><path d="M21 12.5L12.5 21a5 5 0 0 1-7-7L14 5.5a3.5 3.5 0 0 1 5 5L10.5 19a2 2 0 1 1-3-3l8-8"/></svg>
    case 'image': return <svg {...s} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 16l-5-5-9 9"/></svg>
    case 'mic': return <svg {...s} viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>
    case 'sparkle': return <svg {...s} viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17z"/></svg>
    case 'check': return <svg {...s} viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>
    case 'clock': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
    case 'flag': return <svg {...s} viewBox="0 0 24 24"><path d="M4 21V4M4 4h12l-2 4 2 4H4"/></svg>
    case 'arrow-up': return <svg {...s} viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    case 'arrow-down': return <svg {...s} viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    case 'arrow-right': return <svg {...s} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    case 'kebab': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    case 'filter': return <svg {...s} viewBox="0 0 24 24"><path d="M3 5h18l-7 9v6l-4-2v-4L3 5z"/></svg>
    case 'drive': return <svg {...s} viewBox="0 0 24 24"><path d="M8 4h8l5 9-4 7H7L3 13l5-9zM8 4l5 9h8M16 4l-5 9-4 7"/></svg>
    case 'pdf-mark': return <svg {...s} viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg>
    case 'globe': return <svg {...s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>
    default: return null
  }
}

export function CoregenMark({ size = 34 }: { size?: number }) {
  const rings = Array.from({ length: 7 }).flatMap((_, ring) => {
    const r = 5 + ring * 1.6
    const dots = 6 + ring * 2
    return Array.from({ length: dots }).map((__, i) => {
      const a = (i / dots) * Math.PI * 2
      const cx = 17 + Math.cos(a) * r
      const cy = 22 + Math.sin(a) * r * 0.55
      const op = 0.25 + (cy / 40) * 0.7
      return <circle key={`${ring}-${i}`} cx={cx} cy={cy} r="1.05" fill="url(#cg-globe)" opacity={op} />
    })
  })
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <radialGradient id="cg-globe" cx="0.35" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#3A6BD9" />
          <stop offset="1" stopColor="#1E43A6" />
        </radialGradient>
      </defs>
      {rings}
      <g stroke="#22A52A" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.95">
        <path d="M22 8 Q26 12 22 16 Q18 20 22 24 Q26 28 22 32" />
        <path d="M28 8 Q24 12 28 16 Q32 20 28 24 Q24 28 28 32" />
        <line x1="22" y1="10" x2="28" y2="10" />
        <line x1="22" y1="16" x2="28" y2="16" />
        <line x1="22" y1="22" x2="28" y2="22" />
        <line x1="22" y1="28" x2="28" y2="28" />
      </g>
    </svg>
  )
}
