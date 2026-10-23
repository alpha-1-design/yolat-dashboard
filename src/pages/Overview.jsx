import { Card, Icon, Pill, Stat } from '../components/ui'
import { Donut, StackedBars } from '../components/Charts'
import KumasiMap from '../components/Map'
import { PRODUCTS, TEAMS, TODAY_INDEX, WEEK } from '../data'

export default function Overview({ rows, shops, retailers, onViewAll }) {
  const crates = rows.reduce((n, r) => n + r.crates, 0)
  const delivered = rows.filter((r) => r.status === 'Delivered')
  const visited = new Set(delivered.map((r) => r.shopId))
  const coverage = Math.round((visited.size / Math.max(1, shops.length)) * 100)
  const onTime = rows.length ? Math.round((rows.filter((r) => r.onTime).length / rows.length) * 1000) / 10 : 0
  const active = retailers.filter((r) => r.status === 'Active').length

  const byDay = WEEK.map((d, i) => ({
    label: d.label,
    values: TEAMS.map((t) => rows.filter((r) => r.day === i + 1 && r.team === t.id).reduce((n, r) => n + r.crates, 0)),
  }))

  const mix = PRODUCTS.map((p) => ({
    label: p.name,
    value: rows.filter((r) => r.productId === p.id).reduce((n, r) => n + r.crates, 0),
  })).filter((d) => d.value > 0)

  const today = rows.filter((r) => r.day === TODAY_INDEX + 1).sort((a, b) => a.time.localeCompare(b.time))
  const recent = [...rows].slice(-6).reverse()

  return (
    <div className="page">
      <div className="kpis">
        <Stat label="Crates this week" value={crates.toLocaleString()} delta="+8.2%" sub="vs 1,192 last week" />
        <Stat label="Stops completed" value={`${delivered.length}/${rows.length}`} sub={`${coverage}% of the shop list covered`} />
        <Stat label="On-time arrival" value={`${onTime}%`} delta="+1.1%" sub="within the 30-minute window" />
        <Stat label="Active retailers" value={active} sub={`${retailers.length} standing accounts`} />
      </div>

      <div className="grid two-one">
        <Card
          title="Crates by day"
          sub="Both teams, this week"
          action={
            <div className="legend">
              {TEAMS.map((t, i) => (
                <span key={t.id}><i style={{ background: `var(--chart-${i + 1})` }} />{t.name}</span>
              ))}
            </div>
          }
        >
          <StackedBars data={byDay} series={TEAMS.map((t) => t.name)} />
        </Card>

        <Card title="Product mix" sub="Share of crates out">
          <Donut
            data={mix}
            centerLabel={`${mix.length}`}
            centerSub="products moving"
          />
          <ul className="legend-list">
            {mix.slice(0, 4).map((d, i) => (
              <li key={d.label}><i style={{ background: `var(--chart-${i + 1})` }} />{d.label}<b>{d.value}</b></li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid two-one">
        <Card
          title="Kumasi coverage"
          sub={`Today's route · ${WEEK[Math.min(TODAY_INDEX, 6)].label} ${WEEK[Math.min(TODAY_INDEX, 6)].short}`}
          action={<span className="chip">{today.length} stops</span>}
        >
          <KumasiMap stops={today} />
        </Card>

        <Card title="Today's stops" sub="In visit order" action={<button className="link" onClick={onViewAll}>All deliveries <Icon name="arrow" size={14} /></button>}>
          {today.length === 0 ? (
            <p className="muted">No route scheduled today.</p>
          ) : (
            <ol className="stops">
              {today.map((r, i) => (
                <li key={r.id}>
                  <span className="stop-num">{i + 1}</span>
                  <div className="stop-body">
                    <strong>{r.shop}</strong>
                    <span>{r.area} · {r.time} · Team {r.team}</span>
                  </div>
                  <Pill status={r.status} />
                </li>
              ))}
            </ol>
          )}
        </Card>
      </div>

      <Card title="Recent visits" sub="Latest logged reports" action={<button className="link" onClick={onViewAll}>View all <Icon name="arrow" size={14} /></button>}>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Time</th><th>Shop</th><th>Area</th><th>Team</th><th>Product</th><th className="num">Crates</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.time}</td>
                  <td>{r.shop}{r.custom && <span className="tag">new</span>}</td>
                  <td className="muted">{r.area}</td>
                  <td>Team {r.team}</td>
                  <td className="muted">{r.product}</td>
                  <td className="num">{r.crates}</td>
                  <td><Pill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
