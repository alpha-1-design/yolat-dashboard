import { useEffect, useMemo, useState } from 'react'
import { AREAS, PRODUCTS, TEAMS } from '../data'
import { Icon, Modal } from './ui'

const NEW = '__new'

function nowTime() {
  const d = new Date()
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function LogVisit({ open, onClose, onSave, shops }) {
  const [team, setTeam] = useState('A')
  const [shopId, setShopId] = useState('')
  const [newName, setNewName] = useState('')
  const [area, setArea] = useState('')
  const [newArea, setNewArea] = useState('')
  const [productId, setProductId] = useState(PRODUCTS[0].id)
  const [crates, setCrates] = useState(18)
  const [time, setTime] = useState(nowTime())
  const [status, setStatus] = useState('Delivered')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return
    setTeam('A')
    setShopId('')
    setNewName('')
    setArea('')
    setNewArea('')
    setProductId(PRODUCTS[0].id)
    setCrates(18)
    setTime(nowTime())
    setStatus('Delivered')
    setNote('')
    setError('')
  }, [open])

  const areas = useMemo(() => {
    const names = new Set(AREAS.map((a) => a.name))
    shops.forEach((s) => names.add(s.area))
    return [...names].sort()
  }, [shops])

  const picked = shops.find((s) => s.id === shopId)
  const isNew = shopId === NEW

  function submit(e) {
    e.preventDefault()
    const name = isNew ? newName.trim() : picked?.name
    const place = isNew ? (area === NEW ? newArea.trim() : area) : picked?.area
    if (!name) return setError('Give the shop or place a name.')
    if (!place) return setError('Pick an area, or type the new one.')
    if (!Number(crates) || Number(crates) < 1) return setError('Crates must be at least 1.')
    onSave({
      team,
      shopId: isNew ? null : shopId,
      shopName: name,
      area: place,
      productId,
      crates: Number(crates),
      time,
      status,
      note: note.trim(),
    })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Log a visit" sub="Fill this in when the team is back from the route.">
      <form className="form" onSubmit={submit}>
        <div className="field">
          <label>Team</label>
          <div className="segmented">
            {TEAMS.map((t) => (
              <button type="button" key={t.id} className={team === t.id ? 'on' : ''} onClick={() => setTeam(t.id)}>
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label htmlFor="shop">Where did they go?</label>
          <select id="shop" value={shopId} onChange={(e) => { setShopId(e.target.value); setError('') }}>
            <option value="">Choose a shop on the route…</option>
            {shops.map((s) => (
              <option key={s.id} value={s.id}>{s.name} — {s.area}</option>
            ))}
            <option value={NEW}>+ Somewhere not on the list</option>
          </select>
          <p className="hint">New places you type here join the route list for next time.</p>
        </div>

        {isNew && (
          <div className="grid-2">
            <div className="field">
              <label htmlFor="new-name">Shop or place name</label>
              <input
                id="new-name"
                autoFocus
                placeholder="e.g. Nyame Adom Stores"
                value={newName}
                onChange={(e) => { setNewName(e.target.value); setError('') }}
              />
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <select id="area" value={area} onChange={(e) => { setArea(e.target.value); setError('') }}>
                <option value="">Choose an area…</option>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
                <option value={NEW}>+ New area</option>
              </select>
            </div>
            {area === NEW && (
              <div className="field field-wide">
                <label htmlFor="new-area">Name of the area</label>
                <input
                  id="new-area"
                  placeholder="e.g. Asawase"
                  value={newArea}
                  onChange={(e) => { setNewArea(e.target.value); setError('') }}
                />
              </div>
            )}
          </div>
        )}

        <div className="grid-2">
          <div className="field">
            <label htmlFor="product">Product</label>
            <select id="product" value={productId} onChange={(e) => setProductId(e.target.value)}>
              {PRODUCTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="crates">Crates delivered</label>
            <input
              id="crates"
              type="number"
              min="1"
              inputMode="numeric"
              value={crates}
              onChange={(e) => setCrates(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="time">Time</label>
            <input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Delivered</option>
              <option>In transit</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="note">Note <span className="opt">optional</span></label>
          <input
            id="note"
            placeholder="e.g. owner asked for an extra crate on Friday"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <footer className="modal-foot">
          <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary"><Icon name="check" size={16} />Save visit</button>
        </footer>
      </form>
    </Modal>
  )
}
