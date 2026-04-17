import { BarChart3, Users, Plane, Globe, Layers, Settings } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const config = {
  dataUrl: "/data/global-aircraft-interiors-market.json",
  title: "Global Aircraft Interiors Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025,
  useMillions: false,
  footerText: "Aircraft Interiors Market Research Report",
  footerUnit: "All values in US$ Billion unless otherwise specified",
  backPath: "/dataset/aircraft-interiors",
  backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User", icon: Users },
    { id: "aircraft", label: "Aircraft-Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Application", icon: Layers },
    { id: "equipment", label: "Equipment", icon: Settings },
  ] as TabConfig[],
  labels: {
    endUser: "End User",
    equipment: "Equipment",
    application: "Application",
    processType: "Process Type",
    materialType: "Material Type",
  },
  segmentMapping: {
    endUser:     { dataKey: "endUser",            title: "End User" },
    aircraft:    { dataKey: "aircraftType",       title: "Aircraft Type" },
    region:      { dataKey: "region",             title: "Region" },
    application: { dataKey: "application",        title: "Application" },
    equipment:   { dataKey: "furnishedEquipment", title: "Equipment" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/aircraft-interiors",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-global" },
} as const;
