import type { PanelEntries } from "./panels";

interface Range {
  min: number;
  max: number;
}

interface Query {
  price?: Range;
  watt?: Range;
}

export type { Query };

export function filterPanels(panels: PanelEntries, query: Query): PanelEntries {
  return panels.filter(([, panel]) => {
    // iterate over all keys of Query
    for (const key of Object.keys(query) as (keyof Query)[]) {
      const range = query[key];
      if (!range) continue; // skip undefined filters

      const value = panel[key]; // TypeScript knows this is number
      if (value < range.min || value > range.max) return false;
    }

    return true; // passes all filters
  });
}
