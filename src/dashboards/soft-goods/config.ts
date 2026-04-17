import { BarChart3, Plane, Globe, Layers, Users, Shirt } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const config = {
  dataUrl: "/data/aircraft-soft-goods-market.json",
  title: "Aircraft Soft Goods Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025,
  useMillions: true,
  footerText: "Aircraft Soft Goods Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors",
  backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Product Type", icon: Layers },
    { id: "equipment", label: "Material Type", icon: Shirt },
    { id: "endUser", label: "End User", icon: Users },
  ] as TabConfig[],
  labels: {
    endUser: "End User",
    equipment: "Material Type",
    application: "Product Type",
    processType: "Process Type",
    materialType: "Material Type",
  },
  segmentMapping: {
    aircraft:    { dataKey: "aircraftType",       title: "Aircraft Type" },
    region:      { dataKey: "region",             title: "Region" },
    application: { dataKey: "application",        title: "Product Type" },
    equipment:   { dataKey: "furnishedEquipment", title: "Material Type" },
    endUser:     { dataKey: "endUser",            title: "End User" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/soft-goods",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-soft-goods" },
} as const;
