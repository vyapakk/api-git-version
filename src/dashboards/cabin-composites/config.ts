import { BarChart3, Plane, Globe, Layers, Users, Beaker, Cog } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const config = {
  dataUrl: "/data/aircraft-cabin-interior-composites-market.json",
  title: "Aircraft Cabin Interior Composites Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025,
  useMillions: true,
  footerText: "Aircraft Cabin Interior Composites Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors",
  backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Application", icon: Layers },
    { id: "endUser", label: "Sales Channel", icon: Users },
    { id: "equipment", label: "Composites Type", icon: Beaker },
    { id: "process", label: "Process Type", icon: Cog },
  ] as TabConfig[],
  labels: {
    endUser: "Sales Channel",
    equipment: "Composites Type",
    application: "Application",
    processType: "Process Type",
    materialType: "Material Type",
  },
  segmentMapping: {
    aircraft:    { dataKey: "aircraftType",       title: "Aircraft Type" },
    region:      { dataKey: "region",             title: "Region" },
    application: { dataKey: "application",        title: "Application" },
    endUser:     { dataKey: "endUser",            title: "Sales Channel" },
    equipment:   { dataKey: "furnishedEquipment", title: "Composites Type" },
    process:     { dataKey: "processType",        title: "Process Type" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/cabin-composites",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-cabin-composites" },
} as const;
