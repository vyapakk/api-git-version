/**
 * ============================================================
 * DASHBOARD CONFIGURATION
 * ============================================================
 * This is the ONLY file a developer needs to edit when creating
 * a new dashboard. Copy this entire folder, update the values
 * below, and provide the corresponding JSON data file.
 * ============================================================
 */

import { BarChart3, Users, Globe, Layers, Beaker, Box, Settings } from "lucide-react";

// Tab type must match the segment mapping keys below
export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const config = {
  // ── Data Source ──────────────────────────────────────────────
  // Path to the JSON data file in /public/data/
  dataUrl: "/data/thermoplastic-prepreg-market.json",

  // ── Display ─────────────────────────────────────────────────
  title: "Global Thermoplastic Prepreg Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2026,        // Default selected year in the year picker
  useMillions: true,         // true = show values in US$ M, false = US$ B

  // ── Footer ──────────────────────────────────────────────────
  footerText: "Thermoplastic Prepreg Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",

  // ── Navigation ──────────────────────────────────────────────
  backPath: "/dataset/prepregs",   // Where "Back" button goes
  backLabel: "Back to Prepregs",   // Back button label

  // ── Tabs ────────────────────────────────────────────────────
  // Define which tabs appear in the navigation bar.
  // The "overview" tab is always first and uses MarketOverviewTab.
  // All other tabs use SegmentDetailTab with the matching segment data.
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-Use Industry", icon: Users },
    { id: "region", label: "Region", icon: Globe },
    { id: "material", label: "Resin Type", icon: Beaker },
    { id: "application", label: "Product Form", icon: Box },
    { id: "equipment", label: "Fiber Type", icon: Layers },
    { id: "process", label: "Process Type", icon: Settings },
  ] as TabConfig[],

  // ── Labels ──────────────────────────────────────────────────
  // Custom labels for segment categories (used in chart titles, tooltips, etc.)
  labels: {
    endUser: "End-Use Industry",
    equipment: "Fiber Type",
    application: "Product Form",
    processType: "Process Type",
    materialType: "Resin Type",
  },

  // ── Segment Mapping ─────────────────────────────────────────
  // Maps each tab ID to its data source field in MarketData and display title.
  // dataKey must match a field name from the MarketData interface in data.ts.
  // Supported dataKeys: "endUser", "aircraftType", "region", "application",
  //                     "furnishedEquipment", "processType", "materialType"
  segmentMapping: {
    endUser:      { dataKey: "endUser",            title: "End-Use Industry Type" },
    region:       { dataKey: "region",             title: "Region" },
    material:     { dataKey: "materialType",       title: "Resin Type" },
    application:  { dataKey: "application",        title: "Product Form Type" },
    equipment:    { dataKey: "furnishedEquipment", title: "Fiber Type" },
    process:      { dataKey: "processType",        title: "Process Type" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/thermoplastic-prepreg-market",
  catalog: { categoryId: "prepregs", datasetId: "prepregs", dashboardId: "pp-thermoplastic" },
} as const;
