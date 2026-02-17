import { BarChart3, Plane, Globe, Users, Package, Layers, FlaskConical } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";
export interface TabConfig { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; }

export const config = {
  dataUrl: "/data/aircraft-interior-non-sandwich-panel-composites-market.json",
  title: "Aircraft Interior Non-Sandwich Panel Composites Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025, useMillions: true,
  footerText: "Aircraft Interior Non-Sandwich Panel Composites Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors", backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Application Type", icon: Layers },
    { id: "equipment", label: "Core Material Type", icon: Package },
    { id: "process", label: "Resin Type", icon: FlaskConical },
  ] as TabConfig[],
  labels: { endUser: "End-User Type", equipment: "Core Material Type", application: "Application Type", processType: "Resin Type", materialType: "Material Type" },
  segmentMapping: {
    endUser: { dataKey: "endUser", title: "End-User Type" }, aircraft: { dataKey: "aircraftType", title: "Aircraft Type" },
    region: { dataKey: "region", title: "Region" }, application: { dataKey: "application", title: "Application Type" },
    equipment: { dataKey: "furnishedEquipment", title: "Core Material Type" }, process: { dataKey: "processType", title: "Resin Type" },
  } as Record<string, { dataKey: string; title: string }>,
} as const;
