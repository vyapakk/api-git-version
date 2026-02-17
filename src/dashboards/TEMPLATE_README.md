# How to Create a New Dashboard

## Steps

1. **Copy the template folder**
   ```
   cp -r src/dashboards/thermoplastic-prepreg src/dashboards/your-new-dashboard
   ```

2. **Edit `config.ts`** — This is the ONLY file you need to change:
   - `dataUrl` → path to your JSON file in `/public/data/`
   - `title`, `subtitle` → dashboard header text
   - `defaultYear` → initial year selected in the picker
   - `useMillions` → `true` for US$ M, `false` for US$ B
   - `tabs` → which tabs to show (add/remove as needed)
   - `labels` → custom names for segment categories
   - `segmentMapping` → maps each tab to a `MarketData` field
   - `backPath`, `backLabel` → back button navigation
   - `footerText`, `footerUnit` → footer content

3. **Add your JSON data file** to `/public/data/your-market.json`
   - Must follow the compact schema (see `data.ts` types)

4. **Add a route** in `src/App.tsx`:
   ```tsx
   import YourDashboard from "./dashboards/your-new-dashboard/Dashboard";
   // ...
   <Route path="/dashboard/your-market" element={<YourDashboard />} />
   ```

5. **Register in datasets** (optional) in `src/data/datasets.ts`

## File Structure

```
src/dashboards/your-new-dashboard/
  config.ts              ← EDIT THIS (all settings)
  Dashboard.tsx           ← Main page (reads config, no changes needed)
  data.ts                 ← Types + hooks (no changes needed)
  layout.tsx              ← Header, nav, skeleton (no changes needed)
  ui-helpers.tsx           ← KPI cards, counters (no changes needed)
  charts.tsx              ← All chart components (no changes needed)
  MarketOverviewTab.tsx   ← Overview tab (no changes needed)
  SegmentDetailTab.tsx    ← Segment tabs (no changes needed)
```

## Available Tab Types

`overview`, `endUser`, `aircraft`, `region`, `application`, `equipment`, `process`, `material`

## Available Segment Data Keys

`endUser`, `aircraftType`, `region`, `application`, `furnishedEquipment`, `processType`, `materialType`
