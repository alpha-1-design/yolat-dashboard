// Deterministic sample data for the Yolat demo.  Nothing here talks to a
// server: the whole dashboard runs on this week's seeded records.

export const TEAMS = [
  {
    id: 'A',
    name: 'Team A',
    lead: 'Ama Dwomoh',
    members: ['Ama Dwomoh', 'Kwame Mensah'],
    days: [1, 4],
  },
  {
    id: 'B',
    name: 'Team B',
    lead: 'Akosua Boateng',
    members: ['Akosua Boateng', 'Yaw Osei'],
    days: [2, 5],
  },
]

export const AREAS = [
  { name: 'Adum', x: 54, y: 46 },
  { name: 'Asokwa', x: 45, y: 64 },
  { name: 'Suame', x: 33, y: 27 },
  { name: 'Bantama', x: 41, y: 39 },
  { name: 'Ahodwo', x: 48, y: 55 },
  { name: 'KNUST', x: 64, y: 72 },
  { name: 'Tafo', x: 58, y: 23 },
  { name: 'Manhyia', x: 50, y: 33 },
  { name: 'Atonsu', x: 36, y: 77 },
  { name: 'Santasi', x: 30, y: 58 },
  { name: 'Buokrom', x: 69, y: 32 },
  { name: 'Ejisu', x: 83, y: 58 },
]

export const PRODUCTS = [
  { id: 'p1', name: 'Plain 500ml', stock: 412, dispatched: 286, returned: 8 },
  { id: 'p2', name: 'Strawberry 500ml', stock: 236, dispatched: 198, returned: 5 },
  { id: 'p3', name: 'Vanilla 1L', stock: 148, dispatched: 121, returned: 3 },
  { id: 'p4', name: 'Yoghurt Drink 250ml', stock: 508, dispatched: 344, returned: 12 },
  { id: 'p5', name: 'Mango 500ml', stock: 184, dispatched: 152, returned: 4 },
  { id: 'p6', name: 'Family Pack 2L', stock: 96, dispatched: 74, returned: 2 },
]

// day: 1 = Monday ... 5 = Friday
export const SHOPS = [
  { id: 's1', name: 'Joyce Provision Store', area: 'Adum', team: 'A', day: 1 },
  { id: 's2', name: 'Mama’s Mart', area: 'Asokwa', team: 'A', day: 1 },
  { id: 's3', name: 'Suame Wholesale Hub', area: 'Suame', team: 'A', day: 1 },
  { id: 's4', name: 'Bantama Corner Shop', area: 'Bantama', team: 'A', day: 1 },
  { id: 's5', name: 'Ahodwo Grocers', area: 'Ahodwo', team: 'A', day: 1 },
  { id: 's6', name: 'Santasi Corner', area: 'Santasi', team: 'A', day: 1 },
  { id: 's7', name: 'Adum Fresh Mart', area: 'Adum', team: 'A', day: 4 },
  { id: 's8', name: 'Osei Kofi Stores', area: 'Suame', team: 'A', day: 4 },
  { id: 's9', name: 'Nyame Nti Provisions', area: 'Bantama', team: 'A', day: 4 },
  { id: 's10', name: 'Aduanepa Mart', area: 'Ahodwo', team: 'A', day: 4 },
  { id: 's11', name: 'Asokwa Mini Market', area: 'Asokwa', team: 'A', day: 4 },
  { id: 's12', name: 'Atonsu Lake Mart', area: 'Atonsu', team: 'A', day: 4 },
  { id: 's13', name: 'Campus Kiosk', area: 'KNUST', team: 'B', day: 2 },
  { id: 's14', name: 'Tafo Traders', area: 'Tafo', team: 'B', day: 2 },
  { id: 's15', name: 'Manhyia Market Stall 14', area: 'Manhyia', team: 'B', day: 2 },
  { id: 's16', name: 'Ayeduase Corner', area: 'KNUST', team: 'B', day: 2 },
  { id: 's17', name: 'Buokrom Stores', area: 'Buokrom', team: 'B', day: 2 },
  { id: 's18', name: 'Old Tafo Provisions', area: 'Tafo', team: 'B', day: 2 },
  { id: 's19', name: 'Manhyia Mini Mart', area: 'Manhyia', team: 'B', day: 5 },
  { id: 's20', name: 'Ejisu Road Mart', area: 'Ejisu', team: 'B', day: 5 },
  { id: 's21', name: 'Adum Station Kiosk', area: 'Adum', team: 'B', day: 5 },
  { id: 's22', name: 'Asokwa Junction Shop', area: 'Asokwa', team: 'B', day: 5 },
  { id: 's23', name: 'Bantama Market Stall 3', area: 'Bantama', team: 'B', day: 5 },
  { id: 's24', name: 'Atonsu Beach Mart', area: 'Atonsu', team: 'B', day: 5 },
]

export const RETAILERS = [
  { id: 'r1', name: 'Adepa Retail', area: 'Adum', crates: 40, last: -2, next: 2, status: 'Active' },
  { id: 'r2', name: 'FreshPoint', area: 'Ahodwo', crates: 28, last: -1, next: 3, status: 'Active' },
  { id: 'r3', name: 'Kente Kitchen', area: 'Bantama', crates: 16, last: -4, next: 1, status: 'Active' },
  { id: 'r4', name: 'Nkwa Stores', area: 'Suame', crates: 34, last: -3, next: 1, status: 'Active' },
  { id: 'r5', name: 'Baobab Grocers', area: 'Asokwa', crates: 22, last: -2, next: 2, status: 'Active' },
  { id: 'r6', name: 'Sankofa Mart', area: 'Adum', crates: 18, last: -5, next: 0, status: 'Active' },
  { id: 'r7', name: 'Ohemaa Foods', area: 'Tafo', crates: 26, last: -1, next: 3, status: 'Active' },
  { id: 'r8', name: 'Aseda Retail', area: 'Atonsu', crates: 14, last: -6, next: 0, status: 'Paused' },
  { id: 'r9', name: 'Kente & Co', area: 'Manhyia', crates: 12, last: -3, next: 4, status: 'Active' },
  { id: 'r10', name: 'Aduane Express', area: 'KNUST', crates: 20, last: -2, next: 2, status: 'Active' },
]

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const shift = (d.getDay() + 6) % 7 // Monday = 0
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() - shift)
}

const MONDAY = startOfWeek(new Date())

export const WEEK = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(MONDAY.getFullYear(), MONDAY.getMonth(), MONDAY.getDate() + i)
  return {
    index: i,
    label: DAY_LABELS[i],
    iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    date: d,
    short: `${d.getDate()} ${MONTHS[d.getMonth()]}`,
  }
})

export const TODAY_INDEX = Math.min(6, Math.max(0, (new Date().getDay() + 6) % 7))

export const WEEK_LABEL = `${WEEK[0].short} – ${WEEK[6].short}`

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function buildReports() {
  const rows = []
  for (const shop of SHOPS) {
    if (shop.day > TODAY_INDEX + 1) continue // visit day not reached yet
    const r = rng(971 + Number(shop.id.slice(1)) * 137 + shop.day * 17)
    const product = PRODUCTS[Math.floor(r() * PRODUCTS.length)]
    const crates = 12 + Math.floor(r() * 23)
    const onTime = r() > 0.06
    const isToday = shop.day === TODAY_INDEX + 1
    let status = 'Delivered'
    if (isToday) {
      const t = r()
      status = t > 0.74 ? 'Pending' : t > 0.48 ? 'In transit' : 'Delivered'
    }
    const hour = 8 + Math.floor(r() * 9)
    const minute = Math.floor(r() * 60)
    const day = WEEK[shop.day - 1]
    rows.push({
      id: `d${rows.length + 1}`,
      shopId: shop.id,
      shop: shop.name,
      area: shop.area,
      team: shop.team,
      day: shop.day,
      date: day.short,
      iso: day.iso,
      time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      productId: product.id,
      product: product.name,
      crates,
      status,
      onTime,
    })
  }
  return rows.sort((a, b) => (a.iso === b.iso ? a.time.localeCompare(b.time) : a.iso.localeCompare(b.iso)))
}

export function daySummary(rows, dayIndex) {
  const dayRows = rows.filter((r) => r.day === dayIndex + 1)
  return {
    rows: dayRows,
    stops: dayRows.length,
    crates: dayRows.reduce((n, r) => n + r.crates, 0),
  }
}

export function relativeDate(offset) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export const CURRENT_USER = { name: 'Ama Dwomoh', role: 'Operations' }
