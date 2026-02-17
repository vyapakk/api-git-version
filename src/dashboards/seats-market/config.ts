import { BarChart3, Plane, Globe, Users, Armchair, Package, ShoppingCart } from "lucide-react";

export type TabType = "overview" | "endUser" | "aircraft" | "region" | "application" | "equipment" | "process" | "material";
export interface TabConfig { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; }

export const config = {
  dataUrl: "/data/aircraft-seats-market.json",
  title: "Aircraft Seats Market",
  subtitle: "Global Market Research Dashboard",
  defaultYear: 2025, useMillions: true,
  footerText: "Aircraft Seats Market Research Report",
  footerUnit: "All values in US$ Million unless otherwise specified",
  backPath: "/dataset/aircraft-interiors", backLabel: "Back to Aircraft Interiors",
  tabs: [
    { id: "overview", label: "Market Overview", icon: BarChart3 },
    { id: "endUser", label: "Sales Type", icon: Users },
    { id: "aircraft", label: "Aircraft Type", icon: Plane },
    { id: "region", label: "Region", icon: Globe },
    { id: "application", label: "Seat Class Type", icon: Armchair },
    { id: "equipment", label: "Component", icon: Package },
    { id: "material", label: "Sales Channel Type", icon: ShoppingCart },
  ] as TabConfig[],
  labels: { endUser: "Sales Type", equipment: "Component", application: "Seat Class Type", processType: "Process Type", materialType: "Sales Channel Type" },
  segmentMapping: {
    endUser: { dataKey: "endUser", title: "Sales Type" }, aircraft: { dataKey: "aircraftType", title: "Aircraft Type" },
    region: { dataKey: "region", title: "Region" }, application: { dataKey: "application", title: "Seat Class Type" },
    equipment: { dataKey: "furnishedEquipment", title: "Component" }, material: { dataKey: "materialType", title: "Sales Channel Type" },
  } as Record<string, { dataKey: string; title: string }>,
} as const;
