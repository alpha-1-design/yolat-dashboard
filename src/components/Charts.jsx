const pad = { l: 34, r: 8, t: 12, b: 26 }

export function StackedBars({ data, series, height = 230 }) {
  const W = 640
  const H = height
  const max = Math.max(1, ...data.map((d) => d.values.reduce((a, b) => a + b, 0)))
  const innerW = W - pad.l - pad.r
  const innerH = H - pad.t - pad.b
  const slot = innerW / data.length
  const bw = Math.min(44, slot * 0.52)

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Crates delivered per day by team">
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <g key={f}>
          <line x1={pad.l} x2={W - pad.r} y1={pad.t + innerH * f} y2={pad.t + innerH * f} className="grid-line" />
          <text x={pad.l - 8} y={pad.t + innerH * f + 4} textAnchor="end" className="axis">
            {Math.round(max * (1 - f))}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = pad.l + slot * i + (slot - bw) / 2
        let y = pad.t + innerH
        return (
          <g key={d.label}>
            {d.values.map((v, s) => {
              const h = (v / max) * innerH
              y -= h
              return (
                <rect
                  key={s}
                  x={x}
                  y={y}
                  width={bw}
                  height={Math.max(0, h)}
                  rx={3}
                  fill={`var(--chart-${s + 1})`}
                  className="bar"
                >
                  <title>{`${d.label} · ${series[s]}: ${v} crates`}</title>
                </rect>
              )
            })}
            <text x={x + bw / 2} y={H - 6} textAnchor="middle" className="axis">{d.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

export function Donut({ data, size = 190, thickness = 22, centerLabel, centerSub }) {
  const total = data.reduce((n, d) => n + d.value, 0) || 1
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  let offset = 0
  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Share by product">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {data.map((d, i) => {
            const len = (d.value / total) * c
            const el = (
              <circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={`var(--chart-${(i % 5) + 1})`}
                strokeWidth={thickness}
                strokeDasharray={`${Math.max(0, len - 2)} ${c}`}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
              >
                <title>{`${d.label}: ${Math.round((d.value / total) * 100)}%`}</title>
              </circle>
            )
            offset += len
            return el
          })}
        </g>
      </svg>
      <div className="donut-center">
        <strong>{centerLabel}</strong>
        <span>{centerSub}</span>
      </div>
    </div>
  )
}

export function Line({ points, labels, height = 200, suffix = '%' }) {
  const W = 640
  const H = height
  const min = Math.min(...points) - 1.5
  const max = Math.max(...points) + 1.5
  const innerW = W - pad.l - pad.r
  const innerH = H - pad.t - pad.b
  const x = (i) => pad.l + (innerW / Math.max(1, points.length - 1)) * i
  const y = (v) => pad.t + innerH - ((v - min) / (max - min)) * innerH
  const d = points.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const area = `${d} L${x(points.length - 1)} ${pad.t + innerH} L${pad.l} ${pad.t + innerH} Z`

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="On-time delivery trend">
      {[0, 0.5, 1].map((f) => (
        <line key={f} x1={pad.l} x2={W - pad.r} y1={pad.t + innerH * f} y2={pad.t + innerH * f} className="grid-line" />
      ))}
      <path d={area} fill="var(--chart-soft)" />
      <path d={d} fill="none" stroke="var(--chart-1)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((v, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(v)} r={i === points.length - 1 ? 4.5 : 3} fill="var(--panel)" stroke="var(--chart-1)" strokeWidth="2" />
          <text x={x(i)} y={H - 6} textAnchor="middle" className="axis">{labels[i]}</text>
          <title>{`${labels[i]}: ${v}${suffix}`}</title>
        </g>
      ))}
      <text x={x(points.length - 1)} y={y(points[points.length - 1]) - 12} textAnchor="end" className="axis strong">
        {points[points.length - 1]}{suffix}
      </text>
    </svg>
  )
}

export function HBars({ data, suffix = '' }) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="hbars">
      {data.map((d) => (
        <div className="hbar" key={d.label}>
          <span className="hbar-label">{d.label}</span>
          <div className="track">
            <div className="track-fill" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
          <span className="hbar-value">{d.value}{suffix}</span>
        </div>
      ))}
    </div>
  )
}

export function Spark({ values, tone = 'var(--chart-1)' }) {
  const W = 92
  const H = 30
  const min = Math.min(...values)
  const max = Math.max(...values)
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * W},${H - ((v - min) / (max - min || 1)) * (H - 4) - 2}`)
    .join(' ')
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="spark">
      <polyline points={pts} fill="none" stroke={tone} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
