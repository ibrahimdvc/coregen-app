import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Topbar } from './components/Topbar'
import { ThemePanel } from './components/ThemePanel'
import { TweaksProvider } from './context/TweaksContext'
import { Dashboard } from './pages/Dashboard'
import { AIChat } from './pages/AIChat'
import { Tasks } from './pages/Tasks'
import { Meetings } from './pages/Meetings'
import { Documents } from './pages/Documents'
import { Announcements } from './pages/Announcements'
import { Analytics } from './pages/Analytics'
import { Team } from './pages/Team'
import { Admin } from './pages/Admin'
import { Settings } from './pages/Settings'
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
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/team" element={<Team />} />
          <Route path="/docs" element={<Documents />} />
          <Route path="/announce" element={<Announcements />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
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
