/**
 * ============================================================
 * DASHBOARD AUTO-DISCOVERY REGISTRY
 * ============================================================
 * Uses Vite's import.meta.glob to automatically discover all
 * dashboard folders. No shared file edits needed when adding
 * a new dashboard — just drop the folder + JSON file.
 * ============================================================
 */

import { ComponentType } from "react";

// ── Types ─────────────────────────────────────────────────────

export interface CatalogEntry {
  categoryId: string;
  datasetId: string;
  dashboardId: string;
  dashboardName?: string;   // defaults to config.title
  purchased?: boolean;      // defaults to true
  // Only needed when creating a NEW category/dataset:
  categoryTitle?: string;
  categoryColor?: string;
  categoryDescription?: string;
  datasetName?: string;
}

export interface DashboardRegistration {
  routePath: string;
  component: ComponentType;
  title: string;
  catalog?: CatalogEntry;
}

// ── Auto-discover all dashboards ──────────────────────────────

const configModules = import.meta.glob<{ config: any }>(
  './*/config.ts',
  { eager: true }
);

const dashboardModules = import.meta.glob<{ default: ComponentType }>(
  './*/Dashboard.tsx',
  { eager: true }
);

const registry: DashboardRegistration[] = [];

for (const [path, module] of Object.entries(configModules)) {
  const folderName = path.split('/')[1];
  const dashboardPath = `./${folderName}/Dashboard.tsx`;
  const dashboardModule = dashboardModules[dashboardPath];

  if (dashboardModule && module.config?.routePath) {
    registry.push({
      routePath: module.config.routePath,
      component: dashboardModule.default,
      title: module.config.title,
      catalog: module.config.catalog,
    });
  }
}

export const dashboardRegistry = registry;

// ── Derived: dashboardId → routePath map ──────────────────────

export const activeDashboardRoutes: Record<string, string> = {};
for (const entry of registry) {
  if (entry.catalog) {
    activeDashboardRoutes[entry.catalog.dashboardId] = entry.routePath;
  }
}
