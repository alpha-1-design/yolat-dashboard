import { useEffect } from 'react'

export function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="var(--logo-bg, #141413)" />
      <path d="M20 18 L32 34 L44 18" fill="none" stroke="var(--logo-ink, #f7f6f2)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 34 L32 47" fill="none" stroke="var(--logo-ink, #f7f6f2)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="32" cy="48" r="2.6" fill="#d8b26a" />
    </svg>
  )
}

const PATHS = {
  overview: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  teams: 'M8 11a3 3 0 100-6 3 3 0 000 6zM2 20v-1a5 5 0 0110 0v1M17 11a2.5 2.5 0 100-5M16 20v-1a5 5 0 00-3-4.5',
  truck: 'M2 7h11v9H2zM13 10h4l3 3v3h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z',
  store: 'M3 9l1.5-5h13L19 9M4 9v11h14V9M9 20v-6h4v6',
  box: 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM20 20l-4-4',
  palette: 'M12 3a9 9 0 100 18h1.5a2 2 0 001.5-3.3 2 2 0 011.5-3.2H18a3 3 0 003-3A8.5 8.5 0 0012 3z',
  download: 'M12 4v11M7 11l5 5 5-5M4 20h16',
  check: 'M5 13l4 4L19 7',
  x: 'M6 6l12 12M18 6L6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  pin: 'M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
}

export function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[name] || PATHS.overview} />
    </svg>
  )
}

export function Stat({ label, value, sub, delta, tone }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-row">
        <div className="stat-value">{value}</div>
        {delta ? <span className={'delta ' + (delta.startsWith('-') ? 'down' : '')}>{delta}</span> : null}
      </div>
      <div className="stat-sub">{sub}</div>
    </div>
  )
}

const PILL_TONES = {
  Delivered: 'ok',
  Active: 'ok',
  'In transit': 'info',
  Pending: 'warn',
  Paused: 'warn',
  Missed: 'bad',
}

export function Pill({ status }) {
  return <span className={'pill ' + (PILL_TONES[status] || 'warn')}><i />{status}</span>
}

export function Card({ title, sub, action, children, className = '' }) {
  return (
    <section className={'card ' + className}>
      {(title || action) && (
        <header className="card-head">
          <div>
            {title && <h2>{title}</h2>}
            {sub && <p>{sub}</p>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  )
}

export function Modal({ open, onClose, title, sub, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="scrim" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            {sub && <p>{sub}</p>}
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.value} className={o.value === value ? 'on' : ''} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

export function Empty({ children }) {
  return <div className="empty">{children}</div>
}

export function Bar({ value, max = 100, tone }) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100))
  return (
    <div className="track" aria-hidden="true">
      <div className={'track-fill ' + (tone || '')} style={{ width: pct + '%' }} />
    </div>
  )
}
