import { Card, Pill, Stat } from '../components/ui'
import { Bar } from '../components/ui'
import { relativeDate } from '../data'

export default function Retailers({ retailers }) {
  const active = retailers.filter((r) => r.status === 'Active')
  const weekly = retailers.reduce((n, r) => n + r.crates, 0)
  const today = retailers.filter((r) => r.next === 0).length
  const top = Math.max(...retailers.map((r) => r.crates))

  return (
    <div className="page">
      <div className="split-note">
        <div>
          <span className="eyebrow">Route shops</span>
          <p>Visited by a team on a set day. Each stop is one logged report.</p>
        </div>
        <div>
          <span className="eyebrow">Retailers</span>
          <p>Standing accounts. They take supply regularly, so the dashboard treats them apart from the route.</p>
        </div>
      </div>

      <div className="kpis">
        <Stat label="Retailer accounts" value={retailers.length} sub={`${active.length} active, ${retailers.length - active.length} paused`} />
        <Stat label="Weekly supply" value={`${weekly} crates`} delta="+4.1%" sub="committed standing orders" />
        <Stat label="Due today" value={today} sub="scheduled restocks" />
        <Stat label="Largest account" value={`${top} crates`} sub="per week" />
      </div>

      <Card title="Retailer accounts" sub="Supply is logged by the wholesale side, not by the retailer.">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Retailer</th><th>Area</th><th className="num">Crates / week</th><th>Last supply</th><th>Next supply</th><th>Standing order</th></tr>
            </thead>
            <tbody>
              {retailers.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td className="muted">{r.area}</td>
                  <td className="num">{r.crates}</td>
                  <td className="muted">{relativeDate(r.last)}</td>
                  <td>{r.next === 0 ? <span className="tag today">today</span> : relativeDate(r.next)}</td>
                  <td>
                    <div className="supply">
                      <Bar value={r.crates} max={top} tone={r.status === 'Paused' ? 'muted' : ''} />
                      <Pill status={r.status} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-foot">
          <span>{active.length} active accounts</span>
          <span><b>{weekly}</b> crates committed each week</span>
        </div>
      </Card>
    </div>
  )
}
