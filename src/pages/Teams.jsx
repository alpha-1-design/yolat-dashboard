import { Card, Pill } from '../components/ui'
import { Spark } from '../components/Charts'
import { TEAMS, TODAY_INDEX, WEEK } from '../data'

const initials = (n) => n.split(' ').map((w) => w[0]).join('')

export default function Teams({ rows, shops }) {
  const dayRows = WEEK.map((d, i) => {
    const inDay = rows.filter((r) => r.day === i + 1)
    return {
      ...d,
      A: inDay.filter((r) => r.team === 'A').length,
      B: inDay.filter((r) => r.team === 'B').length,
      crates: inDay.reduce((n, r) => n + r.crates, 0),
      done: inDay.filter((r) => r.status === 'Delivered').length,
    }
  })

  return (
    <div className="page">
      <div className="grid two">
        {TEAMS.map((t) => {
          const mine = rows.filter((r) => r.team === t.id)
          const crates = mine.reduce((n, r) => n + r.crates, 0)
          const onTime = mine.length ? Math.round((mine.filter((r) => r.onTime).length / mine.length) * 100) : 0
          const list = shops.filter((s) => s.team === t.id)
          const visited = new Set(mine.filter((r) => r.status === 'Delivered').map((r) => r.shopId))
          const perDay = WEEK.map((d, i) => mine.filter((r) => r.day === i + 1).reduce((n, r) => n + r.crates, 0))

          return (
            <Card key={t.id} className="team-card">
              <div className="team-head">
                <div>
                  <span className="eyebrow">Route team</span>
                  <h2>{t.name}</h2>
                  <p>{t.days.map((d) => WEEK[d - 1].label).join(' & ')} · {list.length} shops on the list</p>
                </div>
                <div className="avatars">
                  {t.members.map((m) => (
                    <span key={m} className="avatar" title={m}>{initials(m)}</span>
                  ))}
                </div>
              </div>

              <div className="team-stats">
                <div><span>Stops</span><strong>{mine.length}</strong></div>
                <div><span>Crates</span><strong>{crates}</strong></div>
                <div><span>On time</span><strong>{onTime}%</strong></div>
                <div><span>Covered</span><strong>{visited.size}/{list.length}</strong></div>
              </div>

              <div className="spark-row">
                <span className="muted small">Crates by day</span>
                <Spark values={perDay} tone={t.id === 'A' ? 'var(--chart-1)' : 'var(--chart-2)'} />
              </div>

              <ul className="members">
                {t.members.map((m) => (
                  <li key={m}>
                    <span className="avatar sm">{initials(m)}</span>
                    <div><strong>{m}</strong><span>{m === t.lead ? 'Team lead' : 'Delivery officer'}</span></div>
                    <Pill status={mine.some((r) => r.day === TODAY_INDEX + 1) ? 'In transit' : 'Delivered'} />
                  </li>
                ))}
              </ul>
            </Card>
          )
        })}
      </div>

      <Card title="Week by day" sub="Stops logged by each team">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Day</th><th className="num">Team A</th><th className="num">Team B</th><th className="num">Crates</th><th className="num">Delivered</th><th>Status</th></tr>
            </thead>
            <tbody>
              {dayRows.map((d) => (
                <tr key={d.label} className={d.index === TODAY_INDEX ? 'today' : ''}>
                  <td>{d.label} <span className="muted">{d.short}</span></td>
                  <td className="num">{d.A || '—'}</td>
                  <td className="num">{d.B || '—'}</td>
                  <td className="num">{d.crates || '—'}</td>
                  <td className="num">{d.done || '—'}</td>
                  <td>{d.index > TODAY_INDEX ? <span className="muted">Scheduled</span> : <Pill status={d.done === d.A + d.B ? 'Delivered' : 'In transit'} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
