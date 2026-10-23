# Yolat — delivery operations

A working demo of the dashboard Yolat's wholesale side needs: the route teams log
what they delivered when they get back, and the office sees the week without
compiling anything by hand.

Built with React + Vite. No backend — every screen runs on the sample week in
`src/data.js`, so it can be shown anywhere without a server.

## What it does

- **Overview** — crates, stops, punctuality and retailer count for the week, a
  day-by-day chart, today's route on a schematic Kumasi map, and recent visits.
- **Teams** — Team A and Team B, their people, route days and output.
- **Shop deliveries** — every logged visit, filterable by team, status or search,
  with a real CSV export.
- **Log a visit** — the form the teams use. Pick a shop from the route list, or
  choose **“Somewhere not on the list”** and type the name and area; the new place
  is added to the route and appears in every table and total immediately.
- **Retailers** — standing supply accounts, kept separate from the scheduled shops.
- **Products** — stock, dispatch, returns and days of cover.
- **Analytics** — on-time trend, crates by team and by area, product mix.

## Themes

Paper (white/black), Ink (all black), Ocean (black/blue), Gold (black/gold) and
Cloud (soft grey). Switch from the palette button in the top bar; the choice is a
`data-theme` attribute on `<html>` and everything is driven by CSS variables.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
```

The demo data is deterministic for the current week: opening it another day keeps
the dates current. Nothing typed is stored — a reload resets the demo.
