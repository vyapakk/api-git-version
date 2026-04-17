import { BarChart3, Plane, Globe, Users, Package, Archive } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";

export interface TabConfig { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; }

export const config = {
  dataUrl: "/data/aircraft-stowages-market.json",
  title: "Aircraft Stowages Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025,
  useMillions: true,
  footerText: "Aircraft Stowages Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors",
  backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Stowage Type", icon: Archive },
    { id: "equipment", label: "Furnished Equipment Type", icon: Package },
  ] as TabConfig[],
  labels: { endUser: "End-User Type", equipment: "Furnished Equipment Type", application: "Stowage Type", processType: "Process Type", materialType: "Material Type" },
  segmentMapping: {
    endUser: { dataKey: "endUser", title: "End-User Type" }, aircraft: { dataKey: "aircraftType", title: "Aircraft Type" },
    region: { dataKey: "region", title: "Region" }, application: { dataKey: "application", title: "Stowage Type" },
    equipment: { dataKey: "furnishedEquipment", title: "Furnished Equipment Type" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/stowages-market",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-stowages" },
} as const;
