import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { ThemePanel } from './components/ThemePanel'
import { TweaksProvider } from './context/TweaksContext'
import { Dashboard } from './pages/Dashboard'
import { AIChat } from './pages/AIChat'
import { Tasks } from './pages/Tasks'
import { Placeholder } from './pages/Placeholder'

const CRUMBS: Record<string, string[]> = {
  '/': ['COREGEN', 'Çalışma Alanı', 'Genel bakış'],
  '/ai': ['COREGEN', 'AI Chat', 'Cobas 6000 kalibrasyon'],
  '/tasks': ['COREGEN', 'Görevler', 'Kanban'],
  '/meetings': ['COREGEN', 'Toplantılar'],
  '/team': ['COREGEN', 'Ekip Sohbeti'],
  '/docs': ['COREGEN', 'Dokümanlar'],
  '/announce': ['COREGEN', 'Duyurular'],
  '/analytics': ['COREGEN', 'Analitik'],
  '/admin': ['COREGEN', 'Yönetim'],
  '/settings': ['COREGEN', 'Ayarlar'],
}

function Shell() {
  const { pathname } = useLocation()
  const crumbs = CRUMBS[pathname] || ['COREGEN', pathname]
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Topbar crumbs={crumbs} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ai" element={<AIChat />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/meetings" element={<Placeholder title="Toplantılar" sub="AI özet, ajanda ve katılım takibi" />} />
          <Route path="/team" element={<Placeholder title="Ekip Sohbeti" sub="Kanal ve birebir mesajlaşma + AI mention" />} />
          <Route path="/docs" element={<Placeholder title="Dokümanlar" sub="Drive ile senkron belge merkezi" />} />
          <Route path="/announce" element={<Placeholder title="Duyurular" sub="Kurumsal iletişim ve okunma takibi" />} />
          <Route path="/analytics" element={<Placeholder title="Analitik" sub="Kullanım, AI, görev ve servis raporları" />} />
          <Route path="/admin" element={<Placeholder title="Yönetim" sub="Kullanıcı, rol, Drive kaynakları ve sistem ayarları" />} />
          <Route path="/settings" element={<Placeholder title="Ayarlar" sub="Profil, bildirim, dil" />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <TweaksProvider>
      <BrowserRouter>
        <Shell />
        <ThemePanel />
      </BrowserRouter>
    </TweaksProvider>
  )
}
