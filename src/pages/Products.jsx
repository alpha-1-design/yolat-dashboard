import { Card, Stat, Bar } from '../components/ui'
import { PRODUCTS } from '../data'

export default function Products() {
  const stock = PRODUCTS.reduce((n, p) => n + p.stock, 0)
  const out = PRODUCTS.reduce((n, p) => n + p.dispatched, 0)
  const back = PRODUCTS.reduce((n, p) => n + p.returned, 0)

  return (
    <div className="page">
      <div className="kpis">
        <Stat label="Crates in stock" value={stock.toLocaleString()} sub="across six products" />
        <Stat label="Dispatched this week" value={out.toLocaleString()} delta="+6.4%" sub="from the cold room" />
        <Stat label="Returns" value={back} sub="damaged or short-dated" />
        <Stat label="Stock cover" value="6.2 days" sub="at this week's run rate" />
      </div>

      <Card title="Products" sub="Stock, movement and days of cover.">
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Product</th><th className="num">In stock</th><th>Level</th><th className="num">Dispatched</th><th className="num">Returned</th><th className="num">Cover</th></tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => {
                const cover = (p.stock / Math.max(1, p.dispatched / 5)).toFixed(1)
                return (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="num">{p.stock}</td>
                    <td className="cell-bar">
                      <Bar value={p.stock} max={Math.max(...PRODUCTS.map((x) => x.stock))} tone={p.stock < 120 ? 'warn' : ''} />
                    </td>
                    <td className="num">{p.dispatched}</td>
                    <td className="num muted">{p.returned}</td>
                    <td className="num">{cover} days</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid two">
        <Card title="Cold room" sub="Bulk stock held at the depot">
          <ul className="kv">
            <li><span>Plain 500ml</span><b>412 crates</b></li>
            <li><span>Yoghurt Drink 250ml</span><b>508 crates</b></li>
            <li><span>Family Pack 2L</span><b>96 crates</b></li>
          </ul>
          <p className="muted small">Family Pack is the next reorder: under a week of cover.</p>
        </Card>
        <Card title="This week" sub="What left the depot">
          <ul className="kv">
            <li><span>Dispatched</span><b>{out} crates</b></li>
            <li><span>Delivered</span><b>{out - 34} crates</b></li>
            <li><span>Returned</span><b>{back} crates</b></li>
          </ul>
          <p className="muted small">Returns are recorded per product when a crate comes back damaged or short-dated.</p>
        </Card>
      </div>
    </div>
  )
}
