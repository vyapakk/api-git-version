import { BarChart3, Plane, Globe, Users, Package, Layers } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";
export interface TabConfig { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; }

export const config = {
  dataUrl: "/data/aircraft-cabin-interiors-market.json",
  title: "Aircraft Cabin Interiors Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025, useMillions: true,
  footerText: "Aircraft Cabin Interiors Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors", backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "End-User Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Application Type", icon: Layers },
    { id: "equipment", label: "Furnished Equipment Type", icon: Package },
  ] as TabConfig[],
  labels: { endUser: "End-User Type", equipment: "Furnished Equipment Type", application: "Application Type", processType: "Process Type", materialType: "Material Type" },
  segmentMapping: {
    endUser: { dataKey: "endUser", title: "End-User Type" }, aircraft: { dataKey: "aircraftType", title: "Aircraft Type" },
    region: { dataKey: "region", title: "Region" }, application: { dataKey: "application", title: "Application Type" },
    equipment: { dataKey: "furnishedEquipment", title: "Furnished Equipment Type" },
  } as Record<string, { dataKey: string; title: string }>,
} as const;
