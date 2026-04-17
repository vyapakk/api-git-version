import { BarChart3, Plane, Globe, Droplets, Users, Package, Wrench } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const config = {
  dataUrl: "/data/aircraft-water-waste-water-market.json",
  title: "Aircraft Water/Waste Water Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025,
  useMillions: true,
  footerText: "Aircraft Water/Waste Water Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors",
  backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Water System Type", icon: Droplets },
    { id: "equipment", label: "Equipment Type", icon: Package },
    { id: "process", label: "Component Type", icon: Wrench },
  ] as TabConfig[],
  labels: {
    endUser: "End-User Type",
    equipment: "Equipment Type",
    application: "Water System Type",
    processType: "Component Type",
    materialType: "Material Type",
  },
  segmentMapping: {
    endUser:     { dataKey: "endUser",            title: "End-User Type" },
    aircraft:    { dataKey: "aircraftType",       title: "Aircraft Type" },
    region:      { dataKey: "region",             title: "Region" },
    application: { dataKey: "application",        title: "Water System Type" },
    equipment:   { dataKey: "furnishedEquipment", title: "Equipment Type" },
    process:     { dataKey: "processType",        title: "Component Type" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/water-waste-water",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-water-waste" },
} as const;
