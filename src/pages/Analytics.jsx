import { Card } from '../components/ui'
import { Donut, HBars, Line } from '../components/Charts'
import { PRODUCTS, TEAMS } from '../data'

export default function Analytics({ rows }) {
  const onTime = rows.length ? Math.round((rows.filter((r) => r.onTime).length / rows.length) * 1000) / 10 : 0
  const trend = [91.8, 92.6, 93.1, 92.4, 94.0, onTime]
  const labels = ['Wk 39', 'Wk 40', 'Wk 41', 'Wk 42', 'Wk 43', 'This wk']

  const byArea = Object.entries(
    rows.reduce((acc, r) => {
      acc[r.area] = (acc[r.area] || 0) + r.crates
      return acc
    }, {})
  )
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  const byTeam = TEAMS.map((t) => ({
    label: t.name,
    value: rows.filter((r) => r.team === t.id).reduce((n, r) => n + r.crates, 0),
  }))

  const mix = PRODUCTS.map((p) => ({
    label: p.name,
    value: rows.filter((r) => r.productId === p.id).reduce((n, r) => n + r.crates, 0),
  })).filter((d) => d.value > 0)

  const stopsPerTeam = TEAMS.map((t) => rows.filter((r) => r.team === t.id).length)

  return (
    <div className="page">
      <div className="grid two">
        <Card title="On-time delivery" sub="Six weeks, arrival inside the agreed window">
          <Line points={trend} labels={labels} />
        </Card>
        <Card title="Crates by team" sub="This week">
          <HBars data={byTeam} suffix=" crates" />
          <div className="analytics-foot">
            <div><span>Stops</span><strong>{stopsPerTeam[0]} / {stopsPerTeam[1]}</strong></div>
            <div><span>Avg drops per stop</span><strong>{(byTeam[0].value / Math.max(1, stopsPerTeam[0])).toFixed(1)} crates</strong></div>
          </div>
        </Card>
      </div>

      <div className="grid two-one">
        <Card title="Crates by area" sub="Where the week's volume went">
          <HBars data={byArea} suffix=" crates" />
        </Card>
        <Card title="Product mix" sub="Share of crates out">
          <Donut data={mix} centerLabel={`${rows.length}`} centerSub="stops logged" />
          <ul className="legend-list">
            {mix.map((d, i) => (
              <li key={d.label}><i style={{ background: `var(--chart-${(i % 5) + 1})` }} />{d.label}<b>{d.value}</b></li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Coverage" sub="Shops visited against the full route list">
        <div className="coverage-row">
          {TEAMS.map((t) => {
            const mine = new Set(rows.filter((r) => r.team === t.id && r.status === 'Delivered').map((r) => r.shopId))
            return (
              <div key={t.id} className="coverage-block">
                <div className="coverage-head"><strong>{t.name}</strong><span>{mine.size} shops</span></div>
                <div className="track"><div className="track-fill" style={{ width: `${Math.min(100, (mine.size / 12) * 100)}%` }} /></div>
                <p className="muted small">{t.days.length} route days a week</p>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
