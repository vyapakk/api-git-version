import { BarChart3, Plane, Globe, Users, Package, BoxSelect } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const config = {
  dataUrl: "/data/aircraft-ohsb-market.json",
  title: "Aircraft OHSB Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025,
  useMillions: true,
  footerText: "Aircraft OHSB Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors",
  backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Stowage Bin Type", icon: BoxSelect },
    { id: "equipment", label: "Furnished Equipment Type", icon: Package },
  ] as TabConfig[],
  labels: {
    endUser: "End-User Type",
    equipment: "Furnished Equipment Type",
    application: "Stowage Bin Type",
    processType: "Process Type",
    materialType: "Material Type",
  },
  segmentMapping: {
    endUser:     { dataKey: "endUser",            title: "End-User Type" },
    aircraft:    { dataKey: "aircraftType",       title: "Aircraft Type" },
    region:      { dataKey: "region",             title: "Region" },
    application: { dataKey: "application",        title: "Stowage Bin Type" },
    equipment:   { dataKey: "furnishedEquipment", title: "Furnished Equipment Type" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/ohsb-market",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-ohsb" },
} as const;
