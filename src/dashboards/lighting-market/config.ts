import { BarChart3, Plane, Globe, Users, Package, Lightbulb, FlaskConical } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";
export interface TabConfig { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; }

export const config = {
  dataUrl: "/data/aircraft-interior-lighting-market.json",
  title: "Aircraft Interior Lighting Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025, useMillions: true,
  footerText: "Aircraft Interior Lighting Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors", backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Light Type", icon: Lightbulb },
    { id: "equipment", label: "Equipment Type", icon: Package },
    { id: "material", label: "Product Type", icon: FlaskConical },
  ] as TabConfig[],
  labels: { endUser: "End-User Type", equipment: "Equipment Type", application: "Light Type", processType: "Process Type", materialType: "Product Type" },
  segmentMapping: {
    endUser: { dataKey: "endUser", title: "End-User Type" }, aircraft: { dataKey: "aircraftType", title: "Aircraft Type" },
    region: { dataKey: "region", title: "Region" }, application: { dataKey: "application", title: "Light Type" },
    equipment: { dataKey: "furnishedEquipment", title: "Equipment Type" }, material: { dataKey: "materialType", title: "Product Type" },
  } as Record<string, { dataKey: string; title: string }>,
  routePath: "/dashboard/lighting-market",
  catalog: { categoryId: "aerospace-defense", datasetId: "aircraft-interiors", dashboardId: "ai-lighting" },
} as const;
