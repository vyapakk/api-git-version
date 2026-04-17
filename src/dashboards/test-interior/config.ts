import { BarChart3 } from "lucide-react";

export const config = {
    dataUrl: "/data/test-dashboard.json",
    title: "Test Interior Dashboard",
    subtitle: "Demonstration of Manual Dashboard Addition",
    defaultYear: 2025,
    useMillions: true,
    footerText: "Test Market Research Dashboard",
    footerUnit: "All values in US$ Million",
    backPath: "/dataset/aircraft-interiors",
    backLabel: "Back to Aircraft Interiors",
    tabs: [
        { id: "overview", label: "Market Overview", icon: BarChart3 },
    ],
    labels: {},
    segmentMapping: {
        overview: { dataKey: "overview", title: "Market Overview" },
    },
    routePath: "/dashboard/test-interior",
    catalog: {
        categoryId: "aerospace-defense",
        datasetId: "aircraft-interiors",
        dashboardId: "test-interior-dash"
    },
} as const;
