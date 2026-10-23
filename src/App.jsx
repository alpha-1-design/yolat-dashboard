import { useEffect, useMemo, useState } from 'react'
import { CURRENT_USER, PRODUCTS, RETAILERS, SHOPS, TODAY_INDEX, WEEK, WEEK_LABEL, buildReports } from './data'
import { Icon, Logo } from './components/ui'
import LogVisit from './components/LogVisit'
import Overview from './pages/Overview'
import Teams from './pages/Teams'
import Deliveries from './pages/Deliveries'
import Retailers from './pages/Retailers'
import Products from './pages/Products'
import Analytics from './pages/Analytics'

const NAV = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'teams', label: 'Teams', icon: 'teams' },
  { id: 'deliveries', label: 'Shop deliveries', icon: 'truck' },
  { id: 'retailers', label: 'Retailers', icon: 'store' },
  { id: 'products', label: 'Products', icon: 'box' },
  { id: 'analytics', label: 'Analytics', icon: 'chart' },
]

const HEADINGS = {
  overview: ['Overview', 'The week at a glance, and today’s route across Kumasi.'],
  teams: ['Teams', 'Two route teams, one shared record of the week.'],
  deliveries: ['Shop deliveries', 'Every visit the teams log when they get back.'],
  retailers: ['Retailers', 'Standing supply accounts, kept apart from the route shops.'],
  products: ['Products', 'Stock in the cold room and what left the depot.'],
  analytics: ['Analytics', 'Coverage, punctuality and where the volume goes.'],
}

const THEMES = [
  { id: 'mono', label: 'Paper', bg: '#fbfbf9', line: '#e6e4de', accent: '#141413' },
  { id: 'ink', label: 'Ink', bg: '#0b0b0c', line: '#26262a', accent: '#f4f3ee' },
  { id: 'ocean', label: 'Ocean', bg: '#081120', line: '#1c2b45', accent: '#6aa0ff' },
  { id: 'gold', label: 'Gold', bg: '#0c0b09', line: '#29241c', accent: '#d8b26a' },
  { id: 'cloud', label: 'Cloud', bg: '#eef1f5', line: '#dde3ea', accent: '#2f4f8f' },
]

export default function App() {
  const [page, setPage] = useState('overview')
  const [theme, setTheme] = useState('mono')
  const [themeOpen, setThemeOpen] = useState(false)
  const [rows, setRows] = useState(buildReports)
  const [customShops, setCustomShops] = useState([])
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')

  const shops = useMemo(() => [...SHOPS, ...customShops], [customShops])
  const [title, sub] = HEADINGS[page]

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (!themeOpen) return
    const close = (e) => {
      if (!e.target.closest('.theme-wrap')) setThemeOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [themeOpen])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 3200)
    return () => clearTimeout(t)
  }, [toast])

  function saveVisit(v) {
    let shopId = v.shopId
    let custom = false
    if (!shopId) {
      const existing = shops.find((s) => s.name.toLowerCase() === v.shopName.toLowerCase() && s.area === v.area)
      if (existing) {
        shopId = existing.id
      } else {
        shopId = `c${customShops.length + 1}`
        custom = true
        setCustomShops((prev) => [...prev, { id: shopId, name: v.shopName, area: v.area, team: v.team, day: TODAY_INDEX + 1 }])
      }
    }
    const product = PRODUCTS.find((p) => p.id === v.productId) || PRODUCTS[0]
    const day = WEEK[Math.min(TODAY_INDEX, 6)]
    setRows((prev) => [
      ...prev,
      {
        id: `d${Date.now()}`,
        shopId,
        shop: v.shopName,
        area: v.area,
        team: v.team,
        day: TODAY_INDEX + 1,
        date: day.short,
        iso: day.iso,
        time: v.time,
        productId: product.id,
        product: product.name,
        crates: v.crates,
        status: v.status,
        onTime: true,
        custom,
        note: v.note,
      },
    ])
    setToast(`${v.shopName} · ${v.crates} crates logged`)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <Logo />
          <div>
            <div className="brand-name">Yolat</div>
            <div className="brand-sub">Delivery operations</div>
          </div>
        </div>

        <nav className="nav">
          {NAV.map((n) => (
            <button key={n.id} className={page === n.id ? 'on' : ''} onClick={() => setPage(n.id)}>
              <Icon name={n.icon} />
              <span>{n.label}</span>
            </button>
          ))}
        </nav>

        <div className="side-foot">
          <div className="user">
            <span className="avatar">{CURRENT_USER.name.split(' ').map((w) => w[0]).join('')}</span>
            <div>
              <strong>{CURRENT_USER.name}</strong>
              <span>{CURRENT_USER.role}</span>
            </div>
          </div>
          <div className="demo-badge"><i />Demo · sample data</div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="titles">
            <h1>{title}</h1>
            <p>{sub}</p>
          </div>
          <div className="top-actions">
            <span className="chip hide-sm">{WEEK_LABEL}</span>
            <div className="theme-wrap">
              <button className="icon-btn" aria-label="Change theme" onClick={() => setThemeOpen((v) => !v)}>
                <Icon name="palette" />
              </button>
              {themeOpen && (
                <div className="theme-menu">
                  <p>Theme</p>
                  {THEMES.map((t) => (
                    <button key={t.id} className={theme === t.id ? 'on' : ''} onClick={() => { setTheme(t.id); setThemeOpen(false) }}>
                      <span className="swatch" style={{ background: t.bg, borderColor: t.line }}>
                        <i style={{ background: t.accent }} />
                      </span>
                      {t.label}
                      {theme === t.id && <Icon name="check" size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="btn primary" onClick={() => setOpen(true)}>
              <Icon name="plus" size={16} />
              <span className="hide-sm">Log a visit</span>
              <span className="show-sm">Log</span>
            </button>
          </div>
        </header>

        <div className="page-body">
          {page === 'overview' && <Overview rows={rows} shops={shops} retailers={RETAILERS} onViewAll={() => setPage('deliveries')} />}
          {page === 'teams' && <Teams rows={rows} shops={shops} />}
          {page === 'deliveries' && <Deliveries rows={rows} onLog={() => setOpen(true)} />}
          {page === 'retailers' && <Retailers retailers={RETAILERS} />}
          {page === 'products' && <Products />}
          {page === 'analytics' && <Analytics rows={rows} />}
        </div>
      </main>

      <LogVisit open={open} onClose={() => setOpen(false)} onSave={saveVisit} shops={shops} />

      {toast && (
        <div className="toast">
          <span className="toast-dot" />
          {toast}
        </div>
      )}
    </div>
  )
}
