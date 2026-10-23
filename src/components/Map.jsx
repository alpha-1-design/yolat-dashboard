import { AREAS } from '../data'

const W = 640
const H = 400

export default function KumasiMap({ stops }) {
  const points = stops.map((s, i) => {
    const area = AREAS.find((a) => a.name === s.area) || { x: 50, y: 50 }
    const dx = ((i * 37) % 19) - 9
    const dy = ((i * 53) % 17) - 8
    return { x: (area.x / 100) * W + dx * 3, y: (area.y / 100) * H + dy * 2.4, s, i }
  })

  const route = [...points].sort((a, b) => a.s.time.localeCompare(b.s.time))

  return (
    <div className="map-panel">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Schematic map of today's route across Kumasi">
        <defs>
          <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="var(--map-dot)" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#dots)" />
        <path d="M-20 300 C 120 250, 240 330, 380 268 S 600 210, 680 240" className="map-road" />
        <path d="M120 -20 C 160 120, 250 160, 360 180 S 520 260, 560 420" className="map-road faint" />

        {AREAS.map((a) => (
          <text key={a.name} x={(a.x / 100) * W} y={(a.y / 100) * H + 26} className="map-label" textAnchor="middle">
            {a.name.toUpperCase()}
          </text>
        ))}

        {route.length > 1 && (
          <polyline
            points={route.map((p) => `${p.x},${p.y}`).join(' ')}
            className="map-route"
            fill="none"
          />
        )}

        {points.map((p) => (
          <g key={p.s.id}>
            <circle cx={p.x} cy={p.y} r="13" className="map-pin-halo" />
            <circle cx={p.x} cy={p.y} r="9.5" className="map-pin" />
            <text x={p.x} y={p.y + 3.4} textAnchor="middle" className="map-pin-num">{p.i + 1}</text>
            <title>{`${p.i + 1}. ${p.s.shop} — ${p.s.area} · ${p.s.time}`}</title>
          </g>
        ))}
      </svg>
      <div className="map-foot">
        <span className="map-legend"><i /> {stops.length} stops · today</span>
        <span className="map-note">Schematic view, not to scale</span>
      </div>
    </div>
  )
}
