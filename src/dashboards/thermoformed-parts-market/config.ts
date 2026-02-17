import { BarChart3, Plane, Globe, Users, Layers, FlaskConical } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";
export interface TabConfig { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; }

export const config = {
  dataUrl: "/data/aircraft-thermoformed-parts-market.json",
  title: "Aircraft Interior Thermoformed Parts Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025, useMillions: true,
  footerText: "Aircraft Interior Thermoformed Parts Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors", backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "application", label: "Application Type", icon: Layers },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "material", label: "Material Type", icon: FlaskConical },
    { id: "endUser", label: "End User", icon: Users },
  ] as TabConfig[],
  labels: { endUser: "End User", equipment: "Material Type", application: "Application Type", processType: "Process Type", materialType: "Material Type" },
  segmentMapping: {
    application: { dataKey: "application", title: "Application Type" }, aircraft: { dataKey: "aircraftType", title: "Aircraft Type" },
    region: { dataKey: "region", title: "Region" }, material: { dataKey: "materialType", title: "Material Type" },
    endUser: { dataKey: "endUser", title: "End User" },
  } as Record<string, { dataKey: string; title: string }>,
} as const;
