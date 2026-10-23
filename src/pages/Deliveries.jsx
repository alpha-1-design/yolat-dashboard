import { useMemo, useState } from 'react'
import { Card, Empty, Icon, Pill, Segmented } from '../components/ui'

function toCsv(rows) {
  const head = ['Date', 'Time', 'Shop', 'Area', 'Team', 'Product', 'Crates', 'Status']
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`
  const lines = rows.map((r) => [r.date, r.time, r.shop, r.area, 'Team ' + r.team, r.product, r.crates, r.status].map(esc).join(','))
  return [head.join(','), ...lines].join('\r\n')
}

export default function Deliveries({ rows, onLog }) {
  const [q, setQ] = useState('')
  const [team, setTeam] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return [...rows]
      .reverse()
      .filter((r) => team === 'all' || r.team === team)
      .filter((r) => status === 'all' || r.status === status)
      .filter((r) => !needle || `${r.shop} ${r.area} ${r.product}`.toLowerCase().includes(needle))
  }, [rows, q, team, status])

  const crates = filtered.reduce((n, r) => n + r.crates, 0)

  function download() {
    const blob = new Blob([toCsv(filtered)], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'yolat-deliveries.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page">
      <Card
        title="Shop deliveries"
        sub="Every route visit logged by the teams. Shops are visited on a schedule; retailers below hold standing accounts."
        action={
          <div className="row-actions">
            <button className="btn ghost" onClick={download}><Icon name="download" size={16} />Export CSV</button>
            <button className="btn primary" onClick={onLog}><Icon name="plus" size={16} />Log a visit</button>
          </div>
        }
      >
        <div className="filters">
          <div className="search">
            <Icon name="search" size={16} />
            <input placeholder="Search shop, area or product…" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Segmented
            label="Team"
            value={team}
            onChange={setTeam}
            options={[{ value: 'all', label: 'All teams' }, { value: 'A', label: 'Team A' }, { value: 'B', label: 'Team B' }]}
          />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="select">
            <option value="all">Every status</option>
            <option>Delivered</option>
            <option>In transit</option>
            <option>Pending</option>
          </select>
        </div>

        <p className="notice">
          <Icon name="pin" size={15} />
          Went somewhere new? Choose <b>“Somewhere not on the list”</b> in Log a visit — the place joins the route from then on.
        </p>

        {filtered.length === 0 ? (
          <Empty>
            <p>Nothing matches that filter.</p>
            <button className="btn ghost" onClick={() => { setQ(''); setTeam('all'); setStatus('all') }}>Clear filters</button>
          </Empty>
        ) : (
          <>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th><th>Time</th><th>Shop</th><th>Area</th><th>Team</th>
                    <th>Product</th><th className="num">Crates</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td className="muted">{r.date}</td>
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
            <div className="table-foot">
              <span>{filtered.length} visits</span>
              <span><b>{crates}</b> crates</span>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
