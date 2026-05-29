import { Fragment, useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from '../components/Icon'
import { currentUser } from '../data/user'
import {
  chats,
  initialConversation,
  suggested,
  type AIMsg,
  type Message,
  type Source,
  type UserMsg,
} from '../data/coregen'

function renderInline(line: string): ReactNode[] {
  const parts: ReactNode[] = []
  const regex = /\*\*([^*]+)\*\*|§(\d+)§/g
  let last = 0
  let m: RegExpExecArray | null
  let idx = 0
  while ((m = regex.exec(line))) {
    if (m.index > last) parts.push(line.slice(last, m.index))
    if (m[1]) parts.push(<strong key={idx++}>{m[1]}</strong>)
    else if (m[2]) parts.push(<span key={idx++} className="cite" title={`Kaynak ${m[2]}`}>{m[2]}</span>)
    last = regex.lastIndex
  }
  if (last < line.length) parts.push(line.slice(last))
  return parts
}

function renderRichText(text: string): ReactNode[] {
  const lines = text.split('\n')
  const out: ReactNode[] = []
  let listBuffer: string[] = []
  const flushList = () => {
    if (listBuffer.length) {
      out.push(
        <ol key={'ol' + out.length} style={{ paddingLeft: 20, margin: '8px 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {listBuffer.map((l, i) => <li key={i}>{renderInline(l)}</li>)}
        </ol>,
      )
      listBuffer = []
    }
  }
  for (const line of lines) {
    const m = line.match(/^(\d+)\.\s+(.*)$/)
    if (m) { listBuffer.push(m[2]); continue }
    flushList()
    if (line.trim() === '') { out.push(<div key={out.length} style={{ height: 6 }} />); continue }
    out.push(<div key={out.length} style={{ marginBottom: 6 }}>{renderInline(line)}</div>)
  }
  flushList()
  return out
}

function ChatList({ activeId, onPick }: { activeId: string; onPick: (id: string) => void }) {
  const groups = [
    { label: 'Bugün', items: chats.today },
    { label: 'Bu hafta', items: chats.week },
    { label: 'Daha eski', items: chats.older },
  ]
  return (
    <div className="chat-list">
      <div className="chat-list-head">
        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 10 }}>
          <Icon name="plus" /> Yeni sohbet
        </button>
        <div className="chat-search">
          <Icon name="search" />
          <input placeholder="Sohbet ara…" />
        </div>
      </div>
      <div className="chat-list-body">
        {groups.map((g) => (
          <Fragment key={g.label}>
            <div className="chat-group-label">{g.label}</div>
            {g.items.map((it) => (
              <div
                key={it.id}
                className={'chat-item' + (it.id === activeId ? ' active' : '')}
                onClick={() => onPick(it.id)}
              >
                <div className="ci"><Icon name="sparkle" /></div>
                <div className="info">
                  <div className="ct">{it.t}</div>
                  <div className="cm">{it.m}</div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function SourcesPanel({ sources }: { sources: Source[] }) {
  return (
    <div className="chat-side">
      <div className="chat-side-head">
        <div className="chat-side-tit">Kaynaklar</div>
        <div className="chat-side-sub">Bu yanıt {sources.length} kaynak ile desteklendi</div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          <span className="chip chip-blue"><Icon name="drive" /> Drive · {sources.length}</span>
          <span className="chip chip-gray"><Icon name="globe" /> Web · 0</span>
        </div>
      </div>
      <div className="chat-side-body">
        {sources.map((s) => (
          <div className="src-card" key={s.n}>
            <div className="h">
              <span className="n">§{s.n}§</span>
              <div className="t">{s.t}</div>
            </div>
            <div className="path">{s.path}</div>
            <div className="snip">"{s.snip}"</div>
            <div className="foot">
              <span className="chip chip-outline mono">{s.page}</span>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto', padding: '4px 8px' }}>
                Drive'da aç <Icon name="arrow-right" />
              </button>
            </div>
          </div>
        ))}
        <div style={{ padding: '10px 4px', fontSize: 11, color: 'var(--c-muted)' }}>
          <strong style={{ color: 'var(--c-text-2)' }}>Kaynak hiyerarşisi:</strong> Drive belgeleri → İzinli web siteleri →
          Genel internet. AI yalnızca açıkça bulunan bilgiyle yanıt verir, kaynaklar gösterilmeden cevap üretmez.
        </div>
      </div>
    </div>
  )
}

function MessageAIView({ m }: { m: AIMsg }) {
  return (
    <div className="chat-msg">
      <div className="av ai"><Icon name="sparkle" /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="meta">
          <strong style={{ color: 'var(--c-text)' }}>Coregen AI</strong>
          <span className="scope-pill"><span className="chip-dot" /> {m.scope}</span>
          <span>· {m.time}</span>
        </div>
        <div className="bubble">
          {renderRichText(m.text)}
          <div className="sources">
            {m.sources.map((s) => (
              <div className="src-row" key={s.n}>
                <span className="n">§{s.n}§</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.t}</span>
                <span className="muted t-xs mono">{s.page}</span>
              </div>
            ))}
          </div>
          <div className="actions">
            <button>📋 Kopyala</button>
            <button>↻ Yeniden üret</button>
            <button>📤 Göreve dönüştür</button>
            <button>👍</button>
            <button>👎</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MessageUserView({ m }: { m: UserMsg }) {
  return (
    <div className="chat-msg user">
      <div className="av you">{currentUser.initials}</div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <div className="meta"><span>{m.time}</span></div>
        <div className="bubble">{m.text}</div>
      </div>
    </div>
  )
}

function MessageTyping() {
  return (
    <div className="chat-msg">
      <div className="av ai"><Icon name="sparkle" /></div>
      <div>
        <div className="meta"><strong style={{ color: 'var(--c-text)' }}>Coregen AI</strong> <span>aranıyor…</span></div>
        <div className="bubble" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="typing"><span /><span /><span /></div>
          <span className="t-sm muted">Drive indeksinde 4 belge taranıyor</span>
        </div>
      </div>
    </div>
  )
}

function ChatComposer({ onSend, suggestions }: { onSend: (text: string) => void; suggestions: string[] }) {
  const [v, setV] = useState('')
  const ref = useRef<HTMLTextAreaElement>(null)
  const handle = () => {
    const t = v.trim()
    if (!t) return
    onSend(t)
    setV('')
    if (ref.current) ref.current.style.height = 'auto'
  }
  return (
    <div className="chat-input-wrap">
      <div className="suggest-row">
        {suggestions.map((s, i) => (
          <button key={i} className="suggest" onClick={() => onSend(s)}>{s}</button>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          ref={ref}
          value={v}
          onChange={(e) => {
            setV(e.target.value)
            e.target.style.height = 'auto'
            e.target.style.height = Math.min(160, e.target.scrollHeight) + 'px'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              handle()
            }
          }}
          placeholder="Coregen AI'a bir şey sorun — Drive belgeleri, sözleşmeler veya prosedürler hakkında…"
        />
        <div className="toolbar">
          <button className="icon-btn" title="Dosya ekle"><Icon name="paperclip" /></button>
          <button className="icon-btn" title="Görsel ekle"><Icon name="image" /></button>
          <button className="icon-btn" title="Sesli"><Icon name="mic" /></button>
          <span className="chip chip-blue" style={{ marginLeft: 6 }}><Icon name="drive" /> Drive · Servis Dokümanları</span>
          <span className="spacer" />
          <span className="t-xs muted">Shift+Enter ile yeni satır</span>
          <button className={'send' + (v.trim() ? '' : ' disabled')} onClick={handle}>
            Gönder <Icon name="send" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function AIChat() {
  const [activeChat, setActiveChat] = useState('c1')
  const [msgs, setMsgs] = useState<Message[]>(initialConversation)
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [msgs, typing])

  const lastSources = (() => {
    for (let i = msgs.length - 1; i >= 0; i--) {
      const m = msgs[i]
      if (m.who === 'ai') return m.sources
    }
    return []
  })()

  const send = (text: string) => {
    const now = new Date()
    const time = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    setMsgs((m) => [...m, { who: 'you', text, time }])
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [
        ...m,
        {
          who: 'ai',
          scope: 'Drive (2 kaynak)',
          time,
          text: `Talebiniz alındı. **Drive indeksinde** ilgili belgeleri taradım §1§ §2§.\n\nKısa cevap: Bu kapsamda yapılan son güncelleme **FSN-2025-04** bültenidir; belgenin 2. bölümü doğrudan sorunuzu karşılıyor. Aşağıdaki kaynak panelinden tam metne erişebilirsiniz.\n\nDevamında **ne yapmak istersiniz** — özet çıkarayım mı, göreve mi dönüştüreyim, yoksa müşteri bildirim taslağı mı üreteyim?`,
          sources: [
            { n: 1, t: 'Roche FSN-2025-04 Servis Bülteni.pdf', path: 'Drive › Servis Dokümanları › Bültenler', snip: 'Bu bülten, reaktif kaset değişimi sonrası uygulanacak güncellenmiş kalibrasyon adımlarını kapsar…', page: 'Sayfa 2' },
            { n: 2, t: 'Cobas 6000 — Servis El Kitabı v4.2.pdf', path: 'Drive › Servis Dokümanları › Roche', snip: 'Tam profil kalibrasyon prosedürü için bölüm 3.4 referans alınmalıdır…', page: 'Sayfa 47' },
          ],
        },
      ])
    }, 1400)
  }

  return (
    <div className="chat-layout">
      <ChatList activeId={activeChat} onPick={setActiveChat} />
      <div className="chat-main">
        <div className="chat-head">
          <div className="avatar" style={{ background: 'linear-gradient(135deg, var(--c-blue), var(--c-green))' }}>
            <Icon name="sparkle" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="tit">Cobas 6000 kalibrasyon prosedürü</div>
            <div className="sub">3 mesaj · Drive kapsamı: <span className="mono">Servis Dokümanları</span> · Hafıza: aktif</div>
          </div>
          <span className="scope-pill"><Icon name="drive" /> Drive öncelikli</span>
          <button className="btn btn-outline btn-sm"><Icon name="filter" /> Kapsam</button>
          <button className="icon-btn"><Icon name="kebab" /></button>
        </div>
        <div className="chat-scroll" ref={scrollRef}>
          {msgs.map((m, i) =>
            m.who === 'ai' ? <MessageAIView m={m} key={i} /> : <MessageUserView m={m} key={i} />,
          )}
          {typing && <MessageTyping />}
        </div>
        <ChatComposer onSend={send} suggestions={suggested} />
      </div>
      <SourcesPanel sources={lastSources} />
    </div>
  )
}
